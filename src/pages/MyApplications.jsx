import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";
import { Link } from "react-router-dom";

export default function MyApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, [user?.id]);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/applications/user/${user.id}`);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
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

      {/* TOP BAR */}
      <div className="topbar">
        <h2>My Applications</h2>
        <div className="top-actions">
          <Link to="/jobs">
            <button className="btn">🔍 Browse Jobs</button>
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* EMPTY STATE */}
      {applications.length === 0 && (
        <div className="empty-state">
          <p>No applications yet</p>
          <Link to="/jobs">
            <button className="btn">Browse Available Jobs</button>
          </Link>
        </div>
      )}

      {/* APPLICATION LIST */}
      <div className="card-grid">
        {applications.map(app => (
          <div key={app.id} className="card application-card">
            <h4>{app.job.title}</h4>
            <p>{app.job.description}</p>

            <div className="application-meta">
              <span className={`badge ${
                app.status === "HIRED"
                  ? "badge-green"
                  : app.status === "REJECTED"
                  ? "badge-red"
                  : "badge-orange"
              }`}>
                {app.status}
              </span>

              <span className="score">
                ATS Score: <b>{app.aiScore}/100</b>
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
);

}