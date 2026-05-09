import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import "../styles/CandidatePages.css";

export default function SavedJobs() {
  const { user } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadSavedJobs();
  }, [user?.id]);

  const loadSavedJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/saved-jobs/user/${user.id}`);
      setSavedJobs(res.data);
    } catch (error) {
      console.error("Error loading saved jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (jobId) => {
    try {
      await api.delete(`/saved-jobs/${jobId}`);
      setSavedJobs(savedJobs.filter(job => job.id !== jobId));
    } catch (error) {
      console.error("Error removing saved job:", error);
    }
  };

  const filteredJobs = savedJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading saved jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page saved-jobs-page">
      <div className="container">
        {/* Header */}
        <div className="page-header-section">
          <Link to="/candidate/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
          <h1>Saved Jobs</h1>
          <p>Jobs you've bookmarked for later</p>
        </div>

        {/* Search */}
        {savedJobs.length > 0 && (
          <div className="search-bar-section">
            <input
              type="text"
              placeholder="🔍 Search saved jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        )}

        {/* Empty State */}
        {savedJobs.length === 0 && (
          <div className="empty-state-card">
            <div className="empty-icon">⭐</div>
            <h3>No Saved Jobs Yet</h3>
            <p>Start saving jobs to quickly access them later</p>
            <Link to="/jobs">
              <button className="btn btn-primary">Browse Jobs</button>
            </Link>
          </div>
        )}

        {/* Saved Jobs Grid */}
        {filteredJobs.length > 0 && (
          <div className="jobs-grid">
            {filteredJobs.map(job => (
              <div key={job.id} className="job-card saved">
                <div className="job-card-header">
                  <div>
                    <h3>{job.title}</h3>
                    <p className="company-name">{job.company || "Company Name"}</p>
                  </div>
                  <button
                    className="unsave-btn"
                    onClick={() => handleUnsave(job.id)}
                    title="Remove from saved"
                  >
                    ❤️
                  </button>
                </div>

                <p className="job-description">{job.description}</p>

                <div className="job-meta">
                  {job.location && (
                    <span className="meta-item">
                      <span>📍</span> {job.location}
                    </span>
                  )}
                  {job.salary && (
                    <span className="meta-item">
                      <span>💰</span> {job.salary}
                    </span>
                  )}
                  {job.experience && (
                    <span className="meta-item">
                      <span>⏱️</span> {job.experience}
                    </span>
                  )}
                </div>

                {job.skills && (
                  <div className="skills-preview">
                    {job.skills.split(',').slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="skill-badge">
                        {skill.trim()}
                      </span>
                    ))}
                    {job.skills.split(',').length > 3 && (
                      <span className="skill-badge more">
                        +{job.skills.split(',').length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="job-card-actions">
                  <Link to={`/apply/${job.id}`}>
                    <button className="btn btn-primary btn-sm">Apply Now</button>
                  </Link>
                  <Link to={`/jobs/${job.id}`}>
                    <button className="btn btn-outline btn-sm">View Details</button>
                  </Link>
                </div>

                <div className="saved-date">
                  Saved on {new Date().toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {savedJobs.length > 0 && filteredJobs.length === 0 && (
          <div className="empty-state-card">
            <div className="empty-icon">🔍</div>
            <h3>No Results Found</h3>
            <p>No saved jobs match "{searchQuery}"</p>
            <button
              className="btn btn-secondary"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}