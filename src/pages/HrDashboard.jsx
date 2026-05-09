import React, { useState, useEffect, useRef } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";
import { Link } from "react-router-dom";

export default function HrDashboard() {
  const { user } = useAuth();
  const notificationRef = useRef(null);

  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({ jobsPosted: 0, totalApplicants: 0, hired: 0 });
  const [notifications, setNotifications] = useState([]); // Notifications state
  const [showNotifications, setShowNotifications] = useState(false); // Dropdown toggle
  const [searchQuery, setSearchQuery] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: "",
    experience: "",
    location: "",
    salary: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.id) {
      loadJobs();
      loadStats();
      loadNotifications(); // Load notifications
    } else {
      setError("User not authenticated. Please log in.");
    }
  }, [user?.id]);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  const loadJobs = async () => {
    try {
      setError(null);
      const res = await api.get(`/jobs/hr/${user.id}`);
      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Load Jobs Error:", err);
      setError("Failed to load jobs. Please try again.");
      setJobs([]);
    }
  };

  const loadStats = async () => {
    try {
      const res = await api.get(`/applications/hr/${user.id}/stats`);
      setStats(res.data || { jobsPosted: 0, totalApplicants: 0, hired: 0 });
    } catch (err) {
      console.error("Load Stats Error:", err);
    }
  };

  // Load notifications
  const loadNotifications = async () => {
    try {
      const res = await api.get(`/applications/hr/${user.id}/notifications`);
      setNotifications(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Load Notifications Error:", err);
      // Silent fail - just keep empty notifications
      setNotifications([]);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const createJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/jobs/create", form, {
        params: { hrId: user.id }
      });

      setMessage("✅ Job created successfully!");

      setForm({
        title: "",
        description: "",
        skills: "",
        experience: "",
        location: "",
        salary: ""
      });

      loadJobs();
      loadStats();
    } catch (err) {
      console.error("Create Job Error:", err);
      setMessage("❌ Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs with null checks
  const filteredJobs = (Array.isArray(jobs) ? jobs : []).filter((job) =>
    job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job?.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job?.skills?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (job) => {
    setEditingJob({ ...job });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage("");
    try {
      const res = await api.put(`/jobs/${editingJob.id}`, editingJob, {
        params: { hrId: user.id }
      });
      setJobs(jobs.map(job => job.id === editingJob.id ? res.data.job : job));
      setEditingJob(null);
      setMessage("✅ Job updated successfully!");
      loadStats();
    } catch (err) {
      console.error("Update Job Error:", err);
      const errorMessage = err.response?.data?.error || "Failed to update job";
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setMessage("");
    try {
      await api.delete(`/jobs/${showConfirmDelete}`, {
        params: { hrId: user.id }
      });
      setJobs(jobs.map(job => 
        job.id === showConfirmDelete ? { ...job, removing: true } : job
      ));
      setTimeout(() => {
        setJobs(jobs.filter(job => job.id !== showConfirmDelete));
        loadStats(); // Refresh stats after deletion
      }, 500);
      setShowConfirmDelete(null);
      setMessage("✅ Job deleted successfully!");
    } catch (err) {
      console.error("Delete Job Error:", err);
      const errorMessage = err.response?.data?.error || "Failed to delete job";
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setDeleting(false);
    }
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Error fallback UI
  if (error) {
    return (
      <div className="page dashboard">
        <div className="container">
          <p className="error-msg">{error}</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page dashboard">
      <div className="container">
        {/* TOP BAR */}
        <div className="topbar">
          <h2>HR Dashboard</h2>
          <div className="topbar-actions">
            {/* NOTIFICATION BELL WRAPPER */}
            <div className="notification-wrapper" ref={notificationRef}>
              <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
                🔔
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
              </div>

              {/* NOTIFICATION DROPDOWN */}
              {showNotifications && (
                <div className="notification-dropdown">
                  <h4>Notifications</h4>
                  {notifications.length === 0 ? (
                    <p>No new notifications.</p>
                  ) : (
                    notifications.map(notif => (
                      <div 
                        key={notif.id} 
                        className={`notification-item ${notif.read ? 'read' : 'unread'}`} 
                        onClick={() => markAsRead(notif.id)}
                      >
                        {notif.message}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            <LogoutButton />
          </div>
        </div>

        {/* STATS GRID */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <h4>Jobs Posted</h4>
            <p>{stats.jobsPosted}</p>
          </div>
          <div className="stat-card green">
            <h4>Total Applicants</h4>
            <p>{stats.totalApplicants}</p>
          </div>
          <div className="stat-card red">
            <h4>Hired</h4>
            <p>{stats.hired}</p>
          </div>
        </div>

        {/* CREATE JOB */}
        <div className="card">
          <h3>Create Job</h3>
          <form className="form" onSubmit={createJob}>
            <input 
              name="title" 
              placeholder="Job Title" 
              value={form.title} 
              onChange={handleChange} 
              required 
              disabled={loading} 
            />
            <textarea 
              name="description" 
              placeholder="Job Description" 
              value={form.description} 
              onChange={handleChange} 
              required 
              disabled={loading} 
            />
            <input 
              name="skills" 
              placeholder="Skills" 
              value={form.skills} 
              onChange={handleChange} 
              disabled={loading} 
            />
            <input 
              name="experience" 
              placeholder="Experience" 
              value={form.experience} 
              onChange={handleChange} 
              disabled={loading} 
            />
            <input 
              name="location" 
              placeholder="Location" 
              value={form.location} 
              onChange={handleChange} 
              disabled={loading} 
            />
            <input 
              name="salary" 
              placeholder="Salary" 
              value={form.salary} 
              onChange={handleChange} 
              disabled={loading} 
            />
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Creating..." : "Create Job"}
            </button>
            {message && <p className="status-msg">{message}</p>}
          </form>
        </div>

        {/* SEARCH BAR */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search jobs by title, location, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* JOB LIST */}
        <h3>My Jobs</h3>
        {filteredJobs.length === 0 && jobs.length > 0 && (
          <p className="no-results">No jobs match your search. Try a different query!</p>
        )}
        {jobs.length === 0 && <p>No jobs created yet.</p>}
        
        <div className="card-grid">
          {filteredJobs.map((job) => (
            <div key={job.id} className={`card ${job.removing ? "removing" : ""}`}>
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <div className="job-actions">
                <button className="btn btn-edit" onClick={() => handleEdit(job)}>
                  ✏️ Edit
                </button>
                <button className="btn btn-delete" onClick={() => setShowConfirmDelete(job.id)}>
                  🗑️ Delete
                </button>
                <Link to={`/applicants/${job.id}`}>
                  <button className="btn">View Applicants</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* EDIT MODAL */}
        {editingJob && (
          <div className="modal">
            <div className="modal-content">
              <h3>Edit Job</h3>
              <form onSubmit={handleUpdate}>
                <input 
                  name="title" 
                  placeholder="Job Title" 
                  value={editingJob.title || ""} 
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })} 
                  required 
                />
                <textarea 
                  name="description" 
                  placeholder="Job Description" 
                  value={editingJob.description || ""} 
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })} 
                  required 
                />
                <input 
                  name="skills" 
                  placeholder="Skills" 
                  value={editingJob.skills || ""} 
                  onChange={(e) => setEditingJob({ ...editingJob, skills: e.target.value })} 
                />
                <input 
                  name="experience" 
                  placeholder="Experience" 
                  value={editingJob.experience || ""} 
                  onChange={(e) => setEditingJob({ ...editingJob, experience: e.target.value })} 
                />
                <input 
                  name="location" 
                  placeholder="Location" 
                  value={editingJob.location || ""} 
                  onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })} 
                />
                <input 
                  name="salary" 
                  placeholder="Salary" 
                  value={editingJob.salary || ""} 
                  onChange={(e) => setEditingJob({ ...editingJob, salary: e.target.value })} 
                />
                <button type="submit" className="btn" disabled={updating}>
                  {updating ? "Updating..." : "Update Job"}
                </button>
                <button type="button" className="btn" onClick={() => setEditingJob(null)}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {showConfirmDelete && (
          <div className="modal">
            <div className="modal-content">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this job? This action cannot be undone.</p>
              <button className="btn btn-delete" onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button className="btn" onClick={() => setShowConfirmDelete(null)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}