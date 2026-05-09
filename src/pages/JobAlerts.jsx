import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import "../styles/CandidatePages.css";

export default function JobAlerts() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const [newAlert, setNewAlert] = useState({
    keywords: "",
    location: "",
    jobType: "ALL",
    experience: "",
    salary: "",
    frequency: "DAILY"
  });

  useEffect(() => {
    loadAlerts();
  }, [user?.id]);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/job-alerts/user/${user.id}`);
      setAlerts(res.data);
    } catch (error) {
      console.error("Error loading alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    try {
      await api.post("/job-alerts", {
        ...newAlert,
        userId: user.id
      });
      setShowCreateForm(false);
      setNewAlert({
        keywords: "",
        location: "",
        jobType: "ALL",
        experience: "",
        salary: "",
        frequency: "DAILY"
      });
      loadAlerts();
    } catch (error) {
      console.error("Error creating alert:", error);
    }
  };

  const handleDeleteAlert = async (id) => {
    if (window.confirm("Delete this job alert?")) {
      try {
        await api.delete(`/job-alerts/${id}`);
        setAlerts(alerts.filter(alert => alert.id !== id));
      } catch (error) {
        console.error("Error deleting alert:", error);
      }
    }
  };

  const toggleAlertStatus = async (id, currentStatus) => {
    try {
      await api.patch(`/job-alerts/${id}`, { active: !currentStatus });
      setAlerts(alerts.map(alert =>
        alert.id === id ? { ...alert, active: !currentStatus } : alert
      ));
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  return (
    <div className="page job-alerts-page">
      <div className="container">
        {/* Header */}
        <div className="page-header-section">
          <Link to="/candidate/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
          <div className="header-with-action">
            <div>
              <h1>Job Alerts</h1>
              <p>Get notified about jobs matching your criteria</p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm ? "Cancel" : "+ Create Alert"}
            </button>
          </div>
        </div>

        {/* Create Alert Form */}
        {showCreateForm && (
          <div className="create-alert-form">
            <h3>Create New Job Alert</h3>
            <form onSubmit={handleCreateAlert}>
              <div className="form-row">
                <div className="form-group">
                  <label>Keywords *</label>
                  <input
                    type="text"
                    value={newAlert.keywords}
                    onChange={(e) => setNewAlert({ ...newAlert, keywords: e.target.value })}
                    placeholder="e.g., React Developer, Data Scientist"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={newAlert.location}
                    onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                    placeholder="e.g., Bangalore, Remote"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Job Type</label>
                  <select
                    value={newAlert.jobType}
                    onChange={(e) => setNewAlert({ ...newAlert, jobType: e.target.value })}
                  >
                    <option value="ALL">All Types</option>
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERNSHIP">Internship</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Experience Level</label>
                  <select
                    value={newAlert.experience}
                    onChange={(e) => setNewAlert({ ...newAlert, experience: e.target.value })}
                  >
                    <option value="">Any Experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Min Salary (Optional)</label>
                  <input
                    type="text"
                    value={newAlert.salary}
                    onChange={(e) => setNewAlert({ ...newAlert, salary: e.target.value })}
                    placeholder="e.g., 10 LPA"
                  />
                </div>
                <div className="form-group">
                  <label>Alert Frequency *</label>
                  <select
                    value={newAlert.frequency}
                    onChange={(e) => setNewAlert({ ...newAlert, frequency: e.target.value })}
                    required
                  >
                    <option value="INSTANT">Instant</option>
                    <option value="DAILY">Daily</option>
                    <option value="WEEKLY">Weekly</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Create Alert
              </button>
            </form>
          </div>
        )}

        {/* Alerts List */}
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading alerts...</p>
          </div>
        ) : alerts.length === 0 ? (
          <div className="empty-state-card">
            <div className="empty-icon">🔔</div>
            <h3>No Job Alerts Yet</h3>
            <p>Create your first alert to get notified about relevant jobs</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowCreateForm(true)}
            >
              Create Your First Alert
            </button>
          </div>
        ) : (
          <div className="alerts-list">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert-card ${!alert.active ? 'inactive' : ''}`}>
                <div className="alert-header">
                  <div className="alert-title-section">
                    <h3>{alert.keywords}</h3>
                    <div className="alert-meta">
                      {alert.location && <span>📍 {alert.location}</span>}
                      {alert.jobType !== "ALL" && <span>💼 {alert.jobType.replace('_', ' ')}</span>}
                      {alert.experience && <span>⏱️ {alert.experience} years</span>}
                    </div>
                  </div>
                  <div className="alert-actions">
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={alert.active}
                        onChange={() => toggleAlertStatus(alert.id, alert.active)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteAlert(alert.id)}
                      title="Delete alert"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="alert-details">
                  <div className="detail-item">
                    <span className="detail-label">Frequency:</span>
                    <span className="detail-value">{alert.frequency}</span>
                  </div>
                  {alert.salary && (
                    <div className="detail-item">
                      <span className="detail-label">Min Salary:</span>
                      <span className="detail-value">{alert.salary}</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <span className="detail-label">Created:</span>
                    <span className="detail-value">
                      {new Date(alert.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="alert-stats">
                  <span className="stat-item">
                    <strong>0</strong> jobs matched this week
                  </span>
                  <span className="stat-item">
                    <strong>0</strong> emails sent
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="info-section">
          <h3>How Job Alerts Work</h3>
          <div className="info-grid">
            <div className="info-card">
              <span className="info-icon">🔍</span>
              <h4>Smart Matching</h4>
              <p>We search for jobs matching your criteria across all listings</p>
            </div>
            <div className="info-card">
              <span className="info-icon">📧</span>
              <h4>Email Notifications</h4>
              <p>Get notified via email based on your chosen frequency</p>
            </div>
            <div className="info-card">
              <span className="info-icon">⚡</span>
              <h4>Quick Apply</h4>
              <p>Apply directly from the email notification</p>
            </div>
            <div className="info-card">
              <span className="info-icon">🎯</span>
              <h4>Never Miss Out</h4>
              <p>Stay ahead with instant alerts for new opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}