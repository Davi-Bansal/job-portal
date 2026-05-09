import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import LogoutButton from "../components/LogoutButton";

export default function Applicants() {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplicants();
  }, [jobId]);

  const loadApplicants = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/applications/job/${jobId}`);
      setApps(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/applications/${id}/status`, null, {
        params: { status }
      });

      // update UI instantly
      setApps(apps.map(a =>
        a.id === id ? { ...a, status } : a
      ));
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="page dashboard">
      <div className="container">

        {/* TOP BAR */}
        <div className="topbar">
          <h2>Applicants</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <Link to="/hr/dashboard">
              <button className="btn">← Back</button>
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* EMPTY STATE */}
        {apps.length === 0 && (
          <div className="empty-state">
            <p>No applications yet for this job.</p>
          </div>
        )}

        {/* APPLICANT CARDS */}
        <div className="card-grid">
          {apps.map(app => (
            <div key={app.id} className="card applicant-card">

              <h3>{app.user.name}</h3>
              <p><b>Email:</b> {app.user.email}</p>
              <p><b>Resume:</b> {app.resume.fileName}</p>

              {/* AI SCORE */}
              <p style={{ marginTop: 8 }}>
                <b>AI Score:</b> {app.aiScore}/100
              </p>

              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: `${app.aiScore}%` }}
                ></div>
              </div>

              {/* FEEDBACK */}
              {app.resume.feedback && (
                <details className="feedback-box">
                  <summary>View AI Feedback</summary>
                  <pre>{app.resume.feedback}</pre>
                </details>
              )}

              {/* DOWNLOAD */}
              <button
                className="btn"
                style={{ marginTop: 10 }}
                onClick={() =>
                  window.open(
                    `http://localhost:8080/api/resume/download/${app.resume.id}`,
                    "_blank"
                  )
                }
              >
                📄 Download Resume
              </button>

              {/* STATUS + ACTIONS */}
              <div className="status-box">
                <span
                  className={`badge ${
                    app.status === "HIRED"
                      ? "badge-green"
                      : app.status === "REJECTED"
                      ? "badge-red"
                      : "badge-orange"
                  }`}
                >
                  {app.status}
                </span>

                <div className="action-row">
                  <button
                    className="btn"
                    onClick={() => updateStatus(app.id, "SHORTLISTED")}
                    disabled={app.status === "SHORTLISTED"}
                  >
                    ✅ Shortlist
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => updateStatus(app.id, "REJECTED")}
                    disabled={app.status === "REJECTED"}
                  >
                    ❌ Reject
                  </button>

                  <button
                    className="btn btn-hire"
                    onClick={() => updateStatus(app.id, "HIRED")}
                    disabled={app.status === "HIRED"}
                  >
                    🎉 Hire
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
