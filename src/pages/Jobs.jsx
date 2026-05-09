import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

export default function Jobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user?.id]);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load jobs
      const jobsRes = await api.get("/jobs");
      setJobs(jobsRes.data);

      // Load applied jobs
      const appsRes = await api.get(`/applications/user/${user.id}`);
      const jobIds = appsRes.data.map(app => app.job.id);
      setAppliedJobIds(jobIds);

    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page"><h2>Loading...</h2></div>;
  }

  return (
  <div className="page dashboard">
    <div className="container">
      
      {/* Top Bar */}
      <div className="topbar">
        <h2>Available Jobs</h2>
        <div>
          <Link to="/my-applications">
            <button className="btn">📂 My Applications</button>
          </Link>
          <LogoutButton />
        </div>
      </div>

      {jobs.length === 0 && <p>No jobs available</p>}

      {/* Jobs Grid */}
      <div className="card-grid">
        {jobs.map(job => (
          <div key={job.id} className="card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>

            {appliedJobIds.includes(job.id) ? (
              <span className="badge badge-green">✅ Applied</span>
            ) : (
              <Link to={`/apply/${job.id}`}>
                <button className="btn">Apply Now</button>
              </Link>
            )}
          </div>
        ))}
      </div>

    </div>
  </div>
);

}