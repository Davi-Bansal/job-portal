import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import "../styles/CandidatePages.css";

export default function InterviewSchedule() {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming"); // upcoming, past, all

  useEffect(() => {
    loadInterviews();
  }, [user?.id]);

  const loadInterviews = async () => {
    try {
      setLoading(true);
      // Get applications with INTERVIEW status
      const res = await api.get(`/applications/user/${user.id}`);
      const interviewApps = res.data.filter(app => app.status === "INTERVIEW");
      setInterviews(interviewApps);
    } catch (error) {
      console.error("Error loading interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeUntil = (date) => {
    const now = new Date();
    const interviewDate = new Date(date);
    const diff = interviewDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `In ${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `In ${hours} hour${hours > 1 ? 's' : ''}`;
    if (diff > 0) return "Soon";
    return "Past";
  };

  const getStatusColor = (date) => {
    const now = new Date();
    const interviewDate = new Date(date);
    const diff = interviewDate - now;
    
    if (diff < 0) return "past";
    if (diff < 24 * 60 * 60 * 1000) return "today";
    if (diff < 7 * 24 * 60 * 60 * 1000) return "thisweek";
    return "upcoming";
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading interviews...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page interview-schedule-page">
      <div className="container">
        {/* Header */}
        <div className="page-header-section">
          <Link to="/candidate/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
          <h1>Interview Schedule</h1>
          <p>Manage your upcoming interviews</p>
        </div>

        {/* Stats */}
        <div className="interview-stats">
          <div className="stat-box">
            <span className="stat-number">{interviews.length}</span>
            <span className="stat-label">Total Interviews</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">
              {interviews.filter(i => getStatusColor(i.interviewDate) !== "past").length}
            </span>
            <span className="stat-label">Upcoming</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">
              {interviews.filter(i => getStatusColor(i.interviewDate) === "today").length}
            </span>
            <span className="stat-label">Today</span>
          </div>
        </div>

        {/* Filters */}
        {interviews.length > 0 && (
          <div className="filter-tabs">
            <button
              className={`filter-tab ${filter === "upcoming" ? "active" : ""}`}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`filter-tab ${filter === "past" ? "active" : ""}`}
              onClick={() => setFilter("past")}
            >
              Past
            </button>
            <button
              className={`filter-tab ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
          </div>
        )}

        {/* Empty State */}
        {interviews.length === 0 && (
          <div className="empty-state-card">
            <div className="empty-icon">📅</div>
            <h3>No Interviews Scheduled</h3>
            <p>Your interview schedule will appear here once you're shortlisted</p>
            <Link to="/jobs">
              <button className="btn btn-primary">Browse Jobs</button>
            </Link>
          </div>
        )}

        {/* Interview List */}
        {interviews.length > 0 && (
          <div className="interview-list">
            {interviews.map(interview => (
              <div
                key={interview.id}
                className={`interview-card ${getStatusColor(interview.interviewDate)}`}
              >
                <div className="interview-header">
                  <div className="interview-title-section">
                    <h3>{interview.job.title}</h3>
                    <p className="company-name">{interview.job.company || "Company"}</p>
                  </div>
                  <div className={`time-badge ${getStatusColor(interview.interviewDate)}`}>
                    {getTimeUntil(interview.interviewDate)}
                  </div>
                </div>

                <div className="interview-details">
                  <div className="detail-row">
                    <span className="detail-icon">📅</span>
                    <div>
                      <strong>Date & Time</strong>
                      <p>{new Date(interview.interviewDate || Date.now()).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="detail-icon">📍</span>
                    <div>
                      <strong>Location</strong>
                      <p>{interview.interviewLocation || "Virtual (Link will be shared)"}</p>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="detail-icon">👤</span>
                    <div>
                      <strong>Interviewer</strong>
                      <p>{interview.interviewer || "To be announced"}</p>
                    </div>
                  </div>

                  {interview.interviewNotes && (
                    <div className="detail-row">
                      <span className="detail-icon">📝</span>
                      <div>
                        <strong>Notes</strong>
                        <p>{interview.interviewNotes}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="interview-actions">
                  <button className="btn btn-outline btn-sm">
                    📧 Send Email
                  </button>
                  <button className="btn btn-outline btn-sm">
                    📅 Add to Calendar
                  </button>
                  <Link to={`/interview-prep/${interview.id}`}>
                    <button className="btn btn-primary btn-sm">
                      📚 Prepare
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interview Tips */}
        <div className="tips-section">
          <h3>Interview Preparation Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-icon">📖</span>
              <h4>Research the Company</h4>
              <p>Learn about company culture, values, and recent news</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">💼</span>
              <h4>Review Your Resume</h4>
              <p>Be ready to discuss your experience and achievements</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">💭</span>
              <h4>Practice Common Questions</h4>
              <p>Prepare answers for behavioral and technical questions</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🎯</span>
              <h4>Prepare Questions</h4>
              <p>Have thoughtful questions ready to ask the interviewer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}