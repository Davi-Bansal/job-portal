

// import React, { useEffect, useState } from "react";
// import api from "../api/api";
// import { useAuth } from "../context/AuthContext";
// import LogoutButton from "../components/LogoutButton";
// import { Link } from "react-router-dom";
// import "../styles/DarkMode.css"; // Import dark mode styles

// export default function CandidateDashboard() {
//   const { user } = useAuth();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filter, setFilter] = useState("ALL");
//   const [sortBy, setSortBy] = useState("recent");
//   const [viewMode, setViewMode] = useState("grid");
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [compareMode, setCompareMode] = useState(false);
//   const [selectedForCompare, setSelectedForCompare] = useState([]);

//   useEffect(() => {
//     loadApplications();
//     // Load dark mode preference
//     const savedDarkMode = localStorage.getItem("darkMode") === "true";
//     setDarkMode(savedDarkMode);
//     if (savedDarkMode) {
//       document.body.classList.add("dark-mode");
//     }
//   }, [user?.id]);

//   const loadApplications = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/applications/user/${user.id}`);
//       setApplications(res.data);
//     } catch (err) {
//       console.error("Error loading applications:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Toggle dark mode with proper body class management
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("darkMode", newMode);
    
//     if (newMode) {
//       document.body.classList.add("dark-mode");
//     } else {
//       document.body.classList.remove("dark-mode");
//     }
//   };

//   // Filter applications
//   const filteredApplications = applications.filter((app) => {
//     if (filter !== "ALL" && app.status !== filter) return false;
    
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       return (
//         app.job.title.toLowerCase().includes(query) ||
//         app.job.description.toLowerCase().includes(query) ||
//         app.status.toLowerCase().includes(query)
//       );
//     }
    
//     return true;
//   });

//   // Sort applications
//   const sortedApplications = [...filteredApplications].sort((a, b) => {
//     if (sortBy === "recent") return b.id - a.id;
//     if (sortBy === "score") return b.aiScore - a.aiScore;
//     if (sortBy === "title") return a.job.title.localeCompare(b.job.title);
//     return 0;
//   });

//   // Calculate stats
//   const stats = {
//     total: applications.length,
//     applied: applications.filter(a => a.status === "APPLIED").length,
//     shortlisted: applications.filter(a => a.status === "SHORTLISTED").length,
//     interview: applications.filter(a => a.status === "INTERVIEW").length,
//     hired: applications.filter(a => a.status === "HIRED").length,
//     rejected: applications.filter(a => a.status === "REJECTED").length
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     switch(status) {
//       case "APPLIED": return "badge-blue";
//       case "SHORTLISTED": return "badge-purple";
//       case "INTERVIEW": return "badge-orange";
//       case "HIRED": return "badge-green";
//       case "REJECTED": return "badge-red";
//       default: return "badge-gray";
//     }
//   };

//   // Get score color
//   const getScoreColor = (score) => {
//     if (score >= 80) return "#10b981";
//     if (score >= 60) return "#f59e0b";
//     return "#ef4444";
//   };

//   // Get score label
//   const getScoreLabel = (score) => {
//     if (score >= 80) return "🎯 Excellent Match";
//     if (score >= 60) return "👍 Good Match";
//     return "💡 Moderate Match";
//   };

//   // Toggle compare selection
//   const toggleCompareSelection = (app) => {
//     if (selectedForCompare.find(a => a.id === app.id)) {
//       setSelectedForCompare(selectedForCompare.filter(a => a.id !== app.id));
//     } else if (selectedForCompare.length < 3) {
//       setSelectedForCompare([...selectedForCompare, app]);
//     }
//   };

//   // Reset comparison
//   const resetComparison = () => {
//     setCompareMode(false);
//     setSelectedForCompare([]);
//   };

//   if (loading) {
//     return (
//       <div className={`page dashboard ${darkMode ? 'dark-mode' : ''}`}>
//         <div className="container">
//           <div className="loading-spinner">
//             <div className="spinner"></div>
//             <p>Loading your applications...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`page dashboard ${darkMode ? 'dark-mode' : ''}`}>
//       <div className="container">

//         {/* TOP BAR */}
//         <div className="topbar">
//           <h2>My Applications</h2>
//           <div className="topbar-actions">
//             {/* Dark Mode Toggle */}
//             <button 
//               className="icon-btn" 
//               onClick={toggleDarkMode}
//               title={darkMode ? "Light Mode" : "Dark Mode"}
//             >
//               {darkMode ? "☀️" : "🌙"}
//             </button>
            
//             {/* View Mode Toggle */}
//             <button 
//               className="icon-btn"
//               onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
//               title={viewMode === "grid" ? "List View" : "Grid View"}
//             >
//               {viewMode === "grid" ? "📋" : "📊"}
//             </button>

//             {/* Compare Mode Toggle */}
//             <button 
//               className={`icon-btn ${compareMode ? 'active' : ''}`}
//               onClick={() => {
//                 setCompareMode(!compareMode);
//                 if (compareMode) resetComparison();
//               }}
//               title="Compare Applications"
//             >
//               ⚖️
//             </button>
            
//             <Link to="/jobs">
//               <button className="btn btn-primary">🔍 Browse Jobs</button>
//             </Link>
//             <LogoutButton />
//           </div>
//         </div>

//         {/* COMPARISON BAR */}
//         {compareMode && (
//           <div className="comparison-bar">
//             <div className="comparison-info">
//               <span>Select up to 3 applications to compare</span>
//               <span className="selected-count">
//                 {selectedForCompare.length}/3 selected
//               </span>
//             </div>
//             {selectedForCompare.length >= 2 && (
//               <button 
//                 className="btn btn-primary btn-sm"
//                 onClick={() => setSelectedApp({ type: 'compare', apps: selectedForCompare })}
//               >
//                 Compare Selected
//               </button>
//             )}
//             <button className="btn btn-secondary btn-sm" onClick={resetComparison}>
//               Cancel
//             </button>
//           </div>
//         )}

//         {/* SUMMARY STATS */}
//         <div className="stats-grid">
//           <div className="stat-card blue">
//             <div className="stat-icon">📊</div>
//             <h4>Total Applied</h4>
//             <p>{stats.total}</p>
//           </div>

//           <div className="stat-card purple">
//             <div className="stat-icon">⭐</div>
//             <h4>Shortlisted</h4>
//             <p>{stats.shortlisted}</p>
//           </div>

//           <div className="stat-card green">
//             <div className="stat-icon">✅</div>
//             <h4>Hired</h4>
//             <p>{stats.hired}</p>
//           </div>

//           <div className="stat-card red">
//             <div className="stat-icon">❌</div>
//             <h4>Rejected</h4>
//             <p>{stats.rejected}</p>
//           </div>
//         </div>

//         {/* FILTERS & CONTROLS */}
//         {applications.length > 0 && (
//           <div className="controls-section">
//             {/* Search Bar */}
//             <div className="search-bar">
//               <input
//                 type="text"
//                 placeholder="🔍 Search by job title, description, or status..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="search-input"
//               />
//               {searchQuery && (
//                 <button 
//                   className="clear-search-btn"
//                   onClick={() => setSearchQuery("")}
//                   title="Clear search"
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>

//             {/* Filter Buttons */}
//             <div className="filter-buttons">
//               <button 
//                 className={`filter-btn ${filter === "ALL" ? "active" : ""}`}
//                 onClick={() => setFilter("ALL")}
//               >
//                 All ({stats.total})
//               </button>
//               <button 
//                 className={`filter-btn ${filter === "APPLIED" ? "active" : ""}`}
//                 onClick={() => setFilter("APPLIED")}
//               >
//                 Applied ({stats.applied})
//               </button>
//               <button 
//                 className={`filter-btn ${filter === "SHORTLISTED" ? "active" : ""}`}
//                 onClick={() => setFilter("SHORTLISTED")}
//               >
//                 Shortlisted ({stats.shortlisted})
//               </button>
//               <button 
//                 className={`filter-btn ${filter === "INTERVIEW" ? "active" : ""}`}
//                 onClick={() => setFilter("INTERVIEW")}
//               >
//                 Interview ({stats.interview})
//               </button>
//               <button 
//                 className={`filter-btn ${filter === "HIRED" ? "active" : ""}`}
//                 onClick={() => setFilter("HIRED")}
//               >
//                 Hired ({stats.hired})
//               </button>
//               <button 
//                 className={`filter-btn ${filter === "REJECTED" ? "active" : ""}`}
//                 onClick={() => setFilter("REJECTED")}
//               >
//                 Rejected ({stats.rejected})
//               </button>
//             </div>

//             {/* Sort Dropdown */}
//             <div className="sort-section">
//               <label>Sort by:</label>
//               <select 
//                 value={sortBy} 
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="sort-select"
//               >
//                 <option value="recent">Most Recent</option>
//                 <option value="score">Highest Score</option>
//                 <option value="title">Job Title (A-Z)</option>
//               </select>
//             </div>
//           </div>
//         )}

//         {/* EMPTY STATE */}
//         {applications.length === 0 && (
//           <div className="empty-state">
//             <div className="empty-icon">📭</div>
//             <h3>No Applications Yet</h3>
//             <p>Start your job search journey by browsing available positions!</p>
//             <Link to="/jobs">
//               <button className="btn btn-primary btn-lg">
//                 🚀 Browse Available Jobs
//               </button>
//             </Link>
//           </div>
//         )}

//         {/* NO SEARCH RESULTS */}
//         {applications.length > 0 && sortedApplications.length === 0 && (
//           <div className="empty-state">
//             <div className="empty-icon">🔍</div>
//             <h3>No Results Found</h3>
//             <p>No applications match "{searchQuery}"</p>
//             <button 
//               className="btn btn-secondary"
//               onClick={() => {
//                 setSearchQuery("");
//                 setFilter("ALL");
//               }}
//             >
//               Clear Filters
//             </button>
//           </div>
//         )}

//         {/* RESULTS COUNT */}
//         {applications.length > 0 && sortedApplications.length > 0 && (
//           <div className="results-header">
//             <h3>Your Applications</h3>
//             <span className="results-count">
//               Showing {sortedApplications.length} of {applications.length} application(s)
//             </span>
//           </div>
//         )}

//         {/* APPLICATION CARDS */}
//         <div className={`card-grid ${viewMode}`}>
//           {sortedApplications.map(app => (
//             <div 
//               key={app.id} 
//               className={`application-card ${compareMode && selectedForCompare.find(a => a.id === app.id) ? 'selected-for-compare' : ''}`}
//             >
//               {/* Compare Checkbox */}
//               {compareMode && (
//                 <div className="compare-checkbox">
//                   <input
//                     type="checkbox"
//                     checked={!!selectedForCompare.find(a => a.id === app.id)}
//                     onChange={() => toggleCompareSelection(app)}
//                     disabled={!selectedForCompare.find(a => a.id === app.id) && selectedForCompare.length >= 3}
//                   />
//                 </div>
//               )}

//               <div className="card-header">
//                 <h3>{app.job.title}</h3>
//                 <span className={`badge ${getStatusColor(app.status)}`}>
//                   {app.status}
//                 </span>
//               </div>

//               <p className="job-description">{app.job.description}</p>

//               {/* Job Details */}
//               <div className="job-details">
//                 {app.job.location && (
//                   <div className="detail-item">
//                     <span>📍</span>
//                     <span>{app.job.location}</span>
//                   </div>
//                 )}
//                 {app.job.salary && (
//                   <div className="detail-item">
//                     <span>💰</span>
//                     <span>{app.job.salary}</span>
//                   </div>
//                 )}
//                 {app.job.experience && (
//                   <div className="detail-item">
//                     <span>⏱️</span>
//                     <span>{app.job.experience}</span>
//                   </div>
//                 )}
//               </div>

//               {/* AI Score */}
//               <div className="score-section">
//                 <div className="score-header">
//                   <strong>AI Match Score</strong>
//                   <span 
//                     className="score-value"
//                     style={{ color: getScoreColor(app.aiScore) }}
//                   >
//                     {app.aiScore}/100
//                   </span>
//                 </div>
//                 <div className="progress">
//                   <div
//                     className="progress-fill"
//                     style={{ 
//                       width: `${app.aiScore}%`,
//                       backgroundColor: getScoreColor(app.aiScore)
//                     }}
//                   ></div>
//                 </div>
//                 <p className="score-label">{getScoreLabel(app.aiScore)}</p>
//               </div>

//               {/* Skills */}
//               {app.job.skills && (
//                 <div className="skills-section">
//                   <strong>Skills:</strong>
//                   <div className="skills-tags">
//                     {app.job.skills.split(',').slice(0, 3).map((skill, idx) => (
//                       <span key={idx} className="skill-tag">
//                         {skill.trim()}
//                       </span>
//                     ))}
//                     {app.job.skills.split(',').length > 3 && (
//                       <span className="skill-tag more">
//                         +{app.job.skills.split(',').length - 3} more
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Actions */}
//               {!compareMode && (
//                 <div className="card-actions">
//                   <button 
//                     className="btn btn-outline btn-sm"
//                     onClick={() => setSelectedApp({ type: 'detail', app })}
//                   >
//                     View Details
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* DETAIL MODAL */}
//         {selectedApp && selectedApp.type === 'detail' && (
//           <div className="modal" onClick={() => setSelectedApp(null)}>
//             <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
//               <div className="modal-header">
//                 <h3>Application Details</h3>
//                 <button className="close-btn" onClick={() => setSelectedApp(null)}>✕</button>
//               </div>

//               <div className="modal-body">
//                 <div className="detail-section">
//                   <div className="detail-title-row">
//                     <h4>{selectedApp.app.job.title}</h4>
//                     <span className={`badge ${getStatusColor(selectedApp.app.status)}`}>
//                       {selectedApp.app.status}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="detail-section">
//                   <h5>Job Description</h5>
//                   <p>{selectedApp.app.job.description}</p>
//                 </div>

//                 {selectedApp.app.job.skills && (
//                   <div className="detail-section">
//                     <h5>Required Skills</h5>
//                     <div className="skills-tags">
//                       {selectedApp.app.job.skills.split(',').map((skill, idx) => (
//                         <span key={idx} className="skill-tag">
//                           {skill.trim()}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div className="detail-grid">
//                   {selectedApp.app.job.location && (
//                     <div className="detail-item">
//                       <strong>Location:</strong>
//                       <span>{selectedApp.app.job.location}</span>
//                     </div>
//                   )}
//                   {selectedApp.app.job.salary && (
//                     <div className="detail-item">
//                       <strong>Salary:</strong>
//                       <span>{selectedApp.app.job.salary}</span>
//                     </div>
//                   )}
//                   {selectedApp.app.job.experience && (
//                     <div className="detail-item">
//                       <strong>Experience:</strong>
//                       <span>{selectedApp.app.job.experience}</span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="detail-section">
//                   <h5>AI Match Analysis</h5>
//                   <div className="score-display-large">
//                     <span>Your Match Score:</span>
//                     <span 
//                       className="score-value-large"
//                       style={{ color: getScoreColor(selectedApp.app.aiScore) }}
//                     >
//                       {selectedApp.app.aiScore}/100
//                     </span>
//                   </div>
//                   <div className="progress progress-large">
//                     <div
//                       className="progress-fill"
//                       style={{ 
//                         width: `${selectedApp.app.aiScore}%`,
//                         backgroundColor: getScoreColor(selectedApp.app.aiScore)
//                       }}
//                     ></div>
//                   </div>
//                   <p className="score-explanation">{getScoreLabel(selectedApp.app.aiScore)}</p>
//                 </div>
//               </div>

//               <div className="modal-footer">
//                 <button className="btn" onClick={() => setSelectedApp(null)}>Close</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* COMPARISON MODAL */}
//         {selectedApp && selectedApp.type === 'compare' && (
//           <div className="modal" onClick={() => setSelectedApp(null)}>
//             <div className="modal-content modal-xlarge" onClick={(e) => e.stopPropagation()}>
//               <div className="modal-header">
//                 <h3>Compare Applications</h3>
//                 <button className="close-btn" onClick={() => setSelectedApp(null)}>✕</button>
//               </div>

//               <div className="modal-body">
//                 <div className="comparison-grid">
//                   {selectedApp.apps.map((app, idx) => (
//                     <div key={app.id} className="comparison-column">
//                       <h4>{app.job.title}</h4>
//                       <span className={`badge ${getStatusColor(app.status)}`}>
//                         {app.status}
//                       </span>
                      
//                       <div className="comparison-item">
//                         <strong>AI Score</strong>
//                         <div className="score-bar-small">
//                           <div 
//                             className="score-fill"
//                             style={{ 
//                               width: `${app.aiScore}%`,
//                               backgroundColor: getScoreColor(app.aiScore)
//                             }}
//                           ></div>
//                         </div>
//                         <span style={{ color: getScoreColor(app.aiScore) }}>
//                           {app.aiScore}/100
//                         </span>
//                       </div>

//                       <div className="comparison-item">
//                         <strong>Location</strong>
//                         <span>{app.job.location || 'Not specified'}</span>
//                       </div>

//                       <div className="comparison-item">
//                         <strong>Salary</strong>
//                         <span>{app.job.salary || 'Not specified'}</span>
//                       </div>

//                       <div className="comparison-item">
//                         <strong>Experience</strong>
//                         <span>{app.job.experience || 'Not specified'}</span>
//                       </div>

//                       <div className="comparison-item">
//                         <strong>Skills</strong>
//                         <div className="skills-tags">
//                           {app.job.skills ? app.job.skills.split(',').slice(0, 3).map((skill, i) => (
//                             <span key={i} className="skill-tag skill-tag-sm">
//                               {skill.trim()}
//                             </span>
//                           )) : <span>Not specified</span>}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="modal-footer">
//                 <button className="btn" onClick={() => setSelectedApp(null)}>Close</button>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import api from "../api/api";
// import { useAuth } from "../context/AuthContext";
// import LogoutButton from "../components/LogoutButton";
// import { Link } from "react-router-dom";
// import "../styles/DarkMode.css";
// import "../styles/HamburgerMenu.css"; // New hamburger menu styles

// export default function CandidateDashboard() {
//   const { user } = useAuth();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filter, setFilter] = useState("ALL");
//   const [sortBy, setSortBy] = useState("recent");
//   const [viewMode, setViewMode] = useState("grid");
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [compareMode, setCompareMode] = useState(false);
//   const [selectedForCompare, setSelectedForCompare] = useState([]);
//   const [menuOpen, setMenuOpen] = useState(false); // Hamburger menu state

//   useEffect(() => {
//     loadApplications();
//     // Load dark mode preference
//     const savedDarkMode = localStorage.getItem("darkMode") === "true";
//     setDarkMode(savedDarkMode);
//     if (savedDarkMode) {
//       document.body.classList.add("dark-mode");
//     }
//   }, [user?.id]);

//   const loadApplications = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/applications/user/${user.id}`);
//       setApplications(res.data);
//     } catch (err) {
//       console.error("Error loading applications:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("darkMode", newMode);
    
//     if (newMode) {
//       document.body.classList.add("dark-mode");
//     } else {
//       document.body.classList.remove("dark-mode");
//     }
//   };

//   // Toggle hamburger menu
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   // Close menu when clicking a link
//   const handleMenuLinkClick = () => {
//     setMenuOpen(false);
//   };

//   // Filter applications
//   const filteredApplications = applications.filter((app) => {
//     if (filter !== "ALL" && app.status !== filter) return false;
    
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       return (
//         app.job.title.toLowerCase().includes(query) ||
//         app.job.description.toLowerCase().includes(query) ||
//         app.status.toLowerCase().includes(query)
//       );
//     }
    
//     return true;
//   });

//   // Sort applications
//   const sortedApplications = [...filteredApplications].sort((a, b) => {
//     if (sortBy === "recent") return b.id - a.id;
//     if (sortBy === "score") return b.aiScore - a.aiScore;
//     if (sortBy === "title") return a.job.title.localeCompare(b.job.title);
//     return 0;
//   });

//   // Calculate stats
//   const stats = {
//     total: applications.length,
//     applied: applications.filter(a => a.status === "APPLIED").length,
//     shortlisted: applications.filter(a => a.status === "SHORTLISTED").length,
//     interview: applications.filter(a => a.status === "INTERVIEW").length,
//     hired: applications.filter(a => a.status === "HIRED").length,
//     rejected: applications.filter(a => a.status === "REJECTED").length
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     switch(status) {
//       case "APPLIED": return "badge-blue";
//       case "SHORTLISTED": return "badge-purple";
//       case "INTERVIEW": return "badge-orange";
//       case "HIRED": return "badge-green";
//       case "REJECTED": return "badge-red";
//       default: return "badge-gray";
//     }
//   };

//   // Get score color
//   const getScoreColor = (score) => {
//     if (score >= 80) return "#10b981";
//     if (score >= 60) return "#f59e0b";
//     return "#ef4444";
//   };

//   // Get score label
//   const getScoreLabel = (score) => {
//     if (score >= 80) return "🎯 Excellent Match";
//     if (score >= 60) return "👍 Good Match";
//     return "💡 Moderate Match";
//   };

//   // Toggle compare selection
//   const toggleCompareSelection = (app) => {
//     if (selectedForCompare.find(a => a.id === app.id)) {
//       setSelectedForCompare(selectedForCompare.filter(a => a.id !== app.id));
//     } else if (selectedForCompare.length < 3) {
//       setSelectedForCompare([...selectedForCompare, app]);
//     }
//   };

//   // Reset comparison
//   const resetComparison = () => {
//     setCompareMode(false);
//     setSelectedForCompare([]);
//   };

//   if (loading) {
//     return (
//       <div className={`page dashboard ${darkMode ? 'dark-mode' : ''}`}>
//         <div className="container">
//           <div className="loading-spinner">
//             <div className="spinner"></div>
//             <p>Loading your applications...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`page dashboard ${darkMode ? 'dark-mode' : ''}`}>
//       <div className="container">

//         {/* HAMBURGER MENU BUTTON */}
//         <button 
//           className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
//           onClick={toggleMenu}
//           aria-label="Menu"
//         >
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//         </button>

//         {/* SIDEBAR MENU */}
//         <div className={`sidebar-menu ${menuOpen ? 'open' : ''}`}>
//           <div className="sidebar-header">
//             <div className="user-info">
//               <div className="user-avatar">{user?.username?.charAt(0).toUpperCase()}</div>
//               <div className="user-details">
//                 <h3>{user?.username}</h3>
//                 <p>{user?.email}</p>
//               </div>
//             </div>
//             <button className="close-menu-btn" onClick={toggleMenu}>✕</button>
//           </div>

//           <nav className="sidebar-nav">
//             <Link to="/candidate/dashboard" className="nav-item active" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">🏠</span>
//               <span>Dashboard</span>
//             </Link>

//             <Link to="/candidate/profile" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">👤</span>
//               <span>Profile</span>
//             </Link>

//             <Link to="/my-applications" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">📝</span>
//               <span>My Applications</span>
//               {stats.total > 0 && <span className="nav-badge">{stats.total}</span>}
//             </Link>

//             <Link to="/candidate/saved-jobs" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">⭐</span>
//               <span>Saved Jobs</span>
//             </Link>

//             <Link to="/candidate/interviews" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">📅</span>
//               <span>Interviews</span>
//               {stats.interview > 0 && <span className="nav-badge interview">{stats.interview}</span>}
//             </Link>

//             <Link to="/candidate/job-alerts" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">🔔</span>
//               <span>Job Alerts</span>
//             </Link>

//             <Link to="/jobs" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">🔍</span>
//               <span>Browse Jobs</span>
//             </Link>

//             <div className="nav-divider"></div>

//             <Link to="/help" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">❓</span>
//               <span>Help Center</span>
//             </Link>

//             <Link to="/contact" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">📧</span>
//               <span>Contact Us</span>
//             </Link>

//             <Link to="/privacy" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">🔒</span>
//               <span>Privacy Policy</span>
//             </Link>
//           </nav>

//           <div className="sidebar-footer">
//             <button className="sidebar-logout-btn" onClick={() => { handleMenuLinkClick(); /* Logout logic */ }}>
//               <span className="nav-icon">🚪</span>
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>

//         {/* OVERLAY */}
//         {menuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}

//         {/* TOP BAR */}
//         <div className="topbar">
//           <h2>My Applications</h2>
//           <div className="topbar-actions">
//             {/* Dark Mode Toggle */}
//             <button 
//               className="icon-btn" 
//               onClick={toggleDarkMode}
//               title={darkMode ? "Light Mode" : "Dark Mode"}
//             >
//               {darkMode ? "☀️" : "🌙"}
//             </button>
            
//             {/* View Mode Toggle */}
//             <button 
//               className="icon-btn"
//               onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
//               title={viewMode === "grid" ? "List View" : "Grid View"}
//             >
//               {viewMode === "grid" ? "📋" : "📊"}
//             </button>

//             {/* Compare Mode Toggle */}
//             <button 
//               className={`icon-btn ${compareMode ? 'active' : ''}`}
//               onClick={() => {
//                 setCompareMode(!compareMode);
//                 if (compareMode) resetComparison();
//               }}
//               title="Compare Applications"
//             >
//               ⚖️
//             </button>
            
//             <Link to="/jobs">
//               <button className="btn btn-primary">🔍 Browse Jobs</button>
//             </Link>
//             <LogoutButton />
//           </div>
//         </div>

//         {/* COMPARISON BAR */}
//         {compareMode && (
//           <div className="comparison-bar">
//             <div className="comparison-info">
//               <span>Select up to 3 applications to compare</span>
//               <span className="selected-count">
//                 {selectedForCompare.length}/3 selected
//               </span>
//             </div>
//             {selectedForCompare.length >= 2 && (
//               <button 
//                 className="btn btn-primary btn-sm"
//                 onClick={() => setSelectedApp({ type: 'compare', apps: selectedForCompare })}
//               >
//                 Compare Selected
//               </button>
//             )}
//             <button className="btn btn-secondary btn-sm" onClick={resetComparison}>
//               Cancel
//             </button>
//           </div>
//         )}

//         {/* SUMMARY STATS */}
//         <div className="stats-grid">
//           <div className="stat-card blue">
//             <div className="stat-icon">📊</div>
//             <h4>Total Applied</h4>
//             <p>{stats.total}</p>
//           </div>

//           <div className="stat-card purple">
//             <div className="stat-icon">⭐</div>
//             <h4>Shortlisted</h4>
//             <p>{stats.shortlisted}</p>
//           </div>

//           <div className="stat-card green">
//             <div className="stat-icon">✅</div>
//             <h4>Hired</h4>
//             <p>{stats.hired}</p>
//           </div>

//           <div className="stat-card red">
//             <div className="stat-icon">❌</div>
//             <h4>Rejected</h4>
//             <p>{stats.rejected}</p>
//           </div>
//         </div>

//         {/* REST OF THE COMPONENT REMAINS THE SAME */}
//         {/* FILTERS & CONTROLS */}
//         {applications.length > 0 && (
//           <div className="controls-section">
//             {/* Search Bar */}
//             <div className="search-bar">
//               <input
//                 type="text"
//                 placeholder="🔍 Search by job title, description, or status..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="search-input"
//               />
//               {searchQuery && (
//                 <button 
//                   className="clear-search-btn"
//                   onClick={() => setSearchQuery("")}
//                   title="Clear search"
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>

//             {/* Filter Buttons */}
//             <div className="filter-buttons">
//               <button 
//                 className={`filter-btn ${filter === "ALL" ? "active" : ""}`}
//                 onClick={() => setFilter("ALL")}
//               >
//                 All ({stats.total})
//               </button>
//               <button 
//                 className={`filter-btn ${filter === "APPLIED" ? "active" : ""}`}
//                 onClick={() => setFilter("APPLIED")}
//               >
//                 Applied ({stats.applied})
//               </button>
//               <button 
//                 className={`filter-btn ${filter === "SHORTLISTED" ? "active" : ""}`}
//                 onClick={() => setFilter("SHORTLISTED")}
//               >
//                 Shortlisted ({stats.shortlisted})
//               </button>
//               <button 
//                 className={`filter-btn ${filter === "INTERVIEW" ? "active" : ""}`}
//                 onClick={() => setFilter("INTERVIEW")}
//               >
//                 Interview ({stats.interview})
//               </button>
//               <button 
//                 className={`filter-btn ${filter === "HIRED" ? "active" : ""}`}
//                 onClick={() => setFilter("HIRED")}
//               >
//                 Hired ({stats.hired})
//               </button>
//               <button 
//                 className={`filter-btn ${filter === "REJECTED" ? "active" : ""}`}
//                 onClick={() => setFilter("REJECTED")}
//               >
//                 Rejected ({stats.rejected})
//               </button>
//             </div>

//             {/* Sort Dropdown */}
//             <div className="sort-section">
//               <label>Sort by:</label>
//               <select 
//                 value={sortBy} 
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="sort-select"
//               >
//                 <option value="recent">Most Recent</option>
//                 <option value="score">Highest Score</option>
//                 <option value="title">Job Title (A-Z)</option>
//               </select>
//             </div>
//           </div>
//         )}

//         {/* EMPTY STATE */}
//         {applications.length === 0 && (
//           <div className="empty-state">
//             <div className="empty-icon">📭</div>
//             <h3>No Applications Yet</h3>
//             <p>Start your job search journey by browsing available positions!</p>
//             <Link to="/jobs">
//               <button className="btn btn-primary btn-lg">
//                 🚀 Browse Available Jobs
//               </button>
//             </Link>
//           </div>
//         )}

//         {/* NO SEARCH RESULTS */}
//         {applications.length > 0 && sortedApplications.length === 0 && (
//           <div className="empty-state">
//             <div className="empty-icon">🔍</div>
//             <h3>No Results Found</h3>
//             <p>No applications match "{searchQuery}"</p>
//             <button 
//               className="btn btn-secondary"
//               onClick={() => {
//                 setSearchQuery("");
//                 setFilter("ALL");
//               }}
//             >
//               Clear Filters
//             </button>
//           </div>
//         )}

//         {/* RESULTS COUNT */}
//         {applications.length > 0 && sortedApplications.length > 0 && (
//           <div className="results-header">
//             <h3>Your Applications</h3>
//             <span className="results-count">
//               Showing {sortedApplications.length} of {applications.length} application(s)
//             </span>
//           </div>
//         )}

//         {/* APPLICATION CARDS */}
//         <div className={`card-grid ${viewMode}`}>
//           {sortedApplications.map(app => (
//             <div 
//               key={app.id} 
//               className={`application-card ${compareMode && selectedForCompare.find(a => a.id === app.id) ? 'selected-for-compare' : ''}`}
//             >
//               {/* Compare Checkbox */}
//               {compareMode && (
//                 <div className="compare-checkbox">
//                   <input
//                     type="checkbox"
//                     checked={!!selectedForCompare.find(a => a.id === app.id)}
//                     onChange={() => toggleCompareSelection(app)}
//                     disabled={!selectedForCompare.find(a => a.id === app.id) && selectedForCompare.length >= 3}
//                   />
//                 </div>
//               )}

//               <div className="card-header">
//                 <h3>{app.job.title}</h3>
//                 <span className={`badge ${getStatusColor(app.status)}`}>
//                   {app.status}
//                 </span>
//               </div>

//               <p className="job-description">{app.job.description}</p>

//               {/* Job Details */}
//               <div className="job-details">
//                 {app.job.location && (
//                   <div className="detail-item">
//                     <span>📍</span>
//                     <span>{app.job.location}</span>
//                   </div>
//                 )}
//                 {app.job.salary && (
//                   <div className="detail-item">
//                     <span>💰</span>
//                     <span>{app.job.salary}</span>
//                   </div>
//                 )}
//                 {app.job.experience && (
//                   <div className="detail-item">
//                     <span>⏱️</span>
//                     <span>{app.job.experience}</span>
//                   </div>
//                 )}
//               </div>

//               {/* AI Score */}
//               <div className="score-section">
//                 <div className="score-header">
//                   <strong>AI Match Score</strong>
//                   <span 
//                     className="score-value"
//                     style={{ color: getScoreColor(app.aiScore) }}
//                   >
//                     {app.aiScore}/100
//                   </span>
//                 </div>
//                 <div className="progress">
//                   <div
//                     className="progress-fill"
//                     style={{ 
//                       width: `${app.aiScore}%`,
//                       backgroundColor: getScoreColor(app.aiScore)
//                     }}
//                   ></div>
//                 </div>
//                 <p className="score-label">{getScoreLabel(app.aiScore)}</p>
//               </div>

//               {/* Skills */}
//               {app.job.skills && (
//                 <div className="skills-section">
//                   <strong>Skills:</strong>
//                   <div className="skills-tags">
//                     {app.job.skills.split(',').slice(0, 3).map((skill, idx) => (
//                       <span key={idx} className="skill-tag">
//                         {skill.trim()}
//                       </span>
//                     ))}
//                     {app.job.skills.split(',').length > 3 && (
//                       <span className="skill-tag more">
//                         +{app.job.skills.split(',').length - 3} more
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Actions */}
//               {!compareMode && (
//                 <div className="card-actions">
//                   <button 
//                     className="btn btn-outline btn-sm"
//                     onClick={() => setSelectedApp({ type: 'detail', app })}
//                   >
//                     View Details
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* MODALS REMAIN THE SAME */}
//         {/* ... (Detail Modal and Comparison Modal code) ... */}

//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import api from "../api/api";
// import { useAuth } from "../context/AuthContext";
// import LogoutButton from "../components/LogoutButton";
// import { Link } from "react-router-dom";
// import "../styles/DarkMode.css";
// import "../styles/HamburgerMenu.css";

// export default function CandidateDashboard() {
//   const { user } = useAuth();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filter, setFilter] = useState("ALL");
//   const [sortBy, setSortBy] = useState("recent");
//   const [viewMode, setViewMode] = useState("grid");
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [compareMode, setCompareMode] = useState(false);
//   const [selectedForCompare, setSelectedForCompare] = useState([]);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     loadApplications();
//     const savedDarkMode = localStorage.getItem("darkMode") === "true";
//     setDarkMode(savedDarkMode);
//     if (savedDarkMode) document.body.classList.add("dark-mode");
//   }, [user?.id]);

//   const loadApplications = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/applications/user/${user.id}`);
//       setApplications(res.data);
//     } catch (err) {
//       console.error("Error loading applications:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("darkMode", newMode);
//     if (newMode) document.body.classList.add("dark-mode");
//     else document.body.classList.remove("dark-mode");
//   };

//   const toggleMenu = () => setMenuOpen(!menuOpen);
//   const handleMenuLinkClick = () => setMenuOpen(false);

//   const filteredApplications = applications.filter((app) => {
//     if (filter !== "ALL" && app.status !== filter) return false;
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       return (
//         app.job.title.toLowerCase().includes(query) ||
//         app.job.description.toLowerCase().includes(query) ||
//         app.status.toLowerCase().includes(query)
//       );
//     }
//     return true;
//   });

//   const sortedApplications = [...filteredApplications].sort((a, b) => {
//     if (sortBy === "recent") return b.id - a.id;
//     if (sortBy === "score") return b.aiScore - a.aiScore;
//     if (sortBy === "title") return a.job.title.localeCompare(b.job.title);
//     return 0;
//   });

//   const stats = {
//     total: applications.length,
//     applied: applications.filter(a => a.status === "APPLIED").length,
//     shortlisted: applications.filter(a => a.status === "SHORTLISTED").length,
//     interview: applications.filter(a => a.status === "INTERVIEW").length,
//     hired: applications.filter(a => a.status === "HIRED").length,
//     rejected: applications.filter(a => a.status === "REJECTED").length
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case "APPLIED": return "badge-blue";
//       case "SHORTLISTED": return "badge-purple";
//       case "INTERVIEW": return "badge-orange";
//       case "HIRED": return "badge-green";
//       case "REJECTED": return "badge-red";
//       default: return "badge-gray";
//     }
//   };

//   const getScoreColor = (score) => {
//     if (score >= 80) return "#10b981";
//     if (score >= 60) return "#f59e0b";
//     return "#ef4444";
//   };

//   const getScoreLabel = (score) => {
//     if (score >= 80) return "🎯 Excellent Match";
//     if (score >= 60) return "👍 Good Match";
//     return "💡 Moderate Match";
//   };

//   const toggleCompareSelection = (app) => {
//     if (selectedForCompare.find(a => a.id === app.id)) {
//       setSelectedForCompare(selectedForCompare.filter(a => a.id !== app.id));
//     } else if (selectedForCompare.length < 3) {
//       setSelectedForCompare([...selectedForCompare, app]);
//     }
//   };

//   const resetComparison = () => {
//     setCompareMode(false);
//     setSelectedForCompare([]);
//   };

//   if (loading) {
//     return (
//       <div className={`page dashboard ${darkMode ? 'dark-mode' : ''}`}>
//         <div className="container">
//           <div className="loading-spinner">
//             <div className="spinner"></div>
//             <p>Loading your applications...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`page dashboard ${darkMode ? 'dark-mode' : ''}`}>
//       <div className="container">

//         {/* HAMBURGER BUTTON */}
//         <button
//           className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
//           onClick={toggleMenu}
//           aria-label="Menu"
//         >
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//         </button>

//         {/* SIDEBAR */}
//         <div className={`sidebar-menu ${menuOpen ? 'open' : ''}`}>
//           <div className="sidebar-header">
//             <div className="user-info">
//               <div className="user-avatar">{user?.username?.charAt(0).toUpperCase()}</div>
//               <div className="user-details">
//                 <h3>{user?.username}</h3>
//                 <p>{user?.email}</p>
//               </div>
//             </div>
//             <button className="close-menu-btn" onClick={toggleMenu}>✕</button>
//           </div>
//           <nav className="sidebar-nav">
//             <Link to="/candidate/dashboard" className="nav-item active" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">🏠</span><span>Dashboard</span>
//             </Link>
//             <Link to="/candidate/profile" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">👤</span><span>Profile</span>
//             </Link>
//             <Link to="/my-applications" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">📝</span><span>My Applications</span>
//               {stats.total > 0 && <span className="nav-badge">{stats.total}</span>}
//             </Link>
//             <Link to="/candidate/saved-jobs" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">⭐</span><span>Saved Jobs</span>
//             </Link>
//             <Link to="/candidate/interviews" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">📅</span><span>Interviews</span>
//               {stats.interview > 0 && <span className="nav-badge interview">{stats.interview}</span>}
//             </Link>
//             <Link to="/jobs" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">🔍</span><span>Browse Jobs</span>
//             </Link>
//             <div className="nav-divider"></div>
//             <Link to="/help" className="nav-item" onClick={handleMenuLinkClick}>
//               <span className="nav-icon">❓</span><span>Help Center</span>
//             </Link>
//           </nav>
//           <div className="sidebar-footer">
//             <LogoutButton />
//           </div>
//         </div>

//         {menuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}

//         {/* TOP BAR */}
//         <div className="topbar">
//           <h2>My Applications</h2>
//           <div className="topbar-actions">
//             <button className="icon-btn" onClick={toggleDarkMode} title={darkMode ? "Light Mode" : "Dark Mode"}>
//               {darkMode ? "☀️" : "🌙"}
//             </button>
//             <button className="icon-btn" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
//               {viewMode === "grid" ? "📋" : "📊"}
//             </button>
//             <button className={`icon-btn ${compareMode ? 'active' : ''}`} onClick={() => { setCompareMode(!compareMode); if (compareMode) resetComparison(); }}>
//               ⚖️
//             </button>
//             <Link to="/jobs"><button className="btn btn-primary">🔍 Browse Jobs</button></Link>
//             <LogoutButton />
//           </div>
//         </div>

//         {/* COMPARISON BAR */}
//         {compareMode && (
//           <div className="comparison-bar">
//             <div className="comparison-info">
//               <span>Select up to 3 applications to compare</span>
//               <span className="selected-count">{selectedForCompare.length}/3 selected</span>
//             </div>
//             {selectedForCompare.length >= 2 && (
//               <button className="btn btn-primary btn-sm" onClick={() => setSelectedApp({ type: 'compare', apps: selectedForCompare })}>
//                 Compare Selected
//               </button>
//             )}
//             <button className="btn btn-secondary btn-sm" onClick={resetComparison}>Cancel</button>
//           </div>
//         )}

//         {/* STATS */}
//         <div className="stats-grid">
//           <div className="stat-card blue"><div className="stat-icon">📊</div><h4>Total Applied</h4><p>{stats.total}</p></div>
//           <div className="stat-card purple"><div className="stat-icon">⭐</div><h4>Shortlisted</h4><p>{stats.shortlisted}</p></div>
//           <div className="stat-card green"><div className="stat-icon">✅</div><h4>Hired</h4><p>{stats.hired}</p></div>
//           <div className="stat-card red"><div className="stat-icon">❌</div><h4>Rejected</h4><p>{stats.rejected}</p></div>
//         </div>

//         {/* FILTERS */}
//         {applications.length > 0 && (
//           <div className="controls-section">
//             <div className="search-bar">
//               <input
//                 type="text"
//                 placeholder="🔍 Search by job title, description, or status..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="search-input"
//               />
//               {searchQuery && <button className="clear-search-btn" onClick={() => setSearchQuery("")}>✕</button>}
//             </div>
//             <div className="filter-buttons">
//               {["ALL", "APPLIED", "SHORTLISTED", "INTERVIEW", "HIRED", "REJECTED"].map(f => (
//                 <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
//                   {f === "ALL" ? `All (${stats.total})` : `${f.charAt(0) + f.slice(1).toLowerCase()} (${stats[f.toLowerCase()]})`}
//                 </button>
//               ))}
//             </div>
//             <div className="sort-section">
//               <label>Sort by:</label>
//               <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
//                 <option value="recent">Most Recent</option>
//                 <option value="score">Highest Score</option>
//                 <option value="title">Job Title (A-Z)</option>
//               </select>
//             </div>
//           </div>
//         )}

//         {/* EMPTY STATE */}
//         {applications.length === 0 && (
//           <div className="empty-state">
//             <div className="empty-icon">📭</div>
//             <h3>No Applications Yet</h3>
//             <p>Start your job search journey by browsing available positions!</p>
//             <Link to="/jobs"><button className="btn btn-primary btn-lg">🚀 Browse Available Jobs</button></Link>
//           </div>
//         )}

//         {/* NO RESULTS */}
//         {applications.length > 0 && sortedApplications.length === 0 && (
//           <div className="empty-state">
//             <div className="empty-icon">🔍</div>
//             <h3>No Results Found</h3>
//             <p>No applications match "{searchQuery}"</p>
//             <button className="btn btn-secondary" onClick={() => { setSearchQuery(""); setFilter("ALL"); }}>Clear Filters</button>
//           </div>
//         )}

//         {/* RESULTS COUNT */}
//         {applications.length > 0 && sortedApplications.length > 0 && (
//           <div className="results-header">
//             <h3>Your Applications</h3>
//             <span className="results-count">Showing {sortedApplications.length} of {applications.length} application(s)</span>
//           </div>
//         )}

//         {/* APPLICATION CARDS */}
//         <div className={`card-grid ${viewMode}`}>
//           {sortedApplications.map(app => (
//             <div key={app.id} className={`application-card ${compareMode && selectedForCompare.find(a => a.id === app.id) ? 'selected-for-compare' : ''}`}>
//               {compareMode && (
//                 <div className="compare-checkbox">
//                   <input
//                     type="checkbox"
//                     checked={!!selectedForCompare.find(a => a.id === app.id)}
//                     onChange={() => toggleCompareSelection(app)}
//                     disabled={!selectedForCompare.find(a => a.id === app.id) && selectedForCompare.length >= 3}
//                   />
//                 </div>
//               )}
//               <div className="card-header">
//                 <h3>{app.job.title}</h3>
//                 <span className={`badge ${getStatusColor(app.status)}`}>{app.status}</span>
//               </div>
//               <p className="job-description">{app.job.description}</p>
//               <div className="job-details">
//                 {app.job.location && <div className="detail-item"><span>📍</span><span>{app.job.location}</span></div>}
//                 {app.job.salary && <div className="detail-item"><span>💰</span><span>{app.job.salary}</span></div>}
//                 {app.job.experience && <div className="detail-item"><span>⏱️</span><span>{app.job.experience}</span></div>}
//               </div>
//               <div className="score-section">
//                 <div className="score-header">
//                   <strong>AI Match Score</strong>
//                   <span className="score-value" style={{ color: getScoreColor(app.aiScore) }}>{app.aiScore}/100</span>
//                 </div>
//                 <div className="progress">
//                   <div className="progress-fill" style={{ width: `${app.aiScore}%`, backgroundColor: getScoreColor(app.aiScore) }}></div>
//                 </div>
//                 <p className="score-label">{getScoreLabel(app.aiScore)}</p>
//               </div>
//               {app.job.skills && (
//                 <div className="skills-section">
//                   <strong>Skills:</strong>
//                   <div className="skills-tags">
//                     {app.job.skills.split(',').slice(0, 3).map((skill, idx) => (
//                       <span key={idx} className="skill-tag">{skill.trim()}</span>
//                     ))}
//                     {app.job.skills.split(',').length > 3 && (
//                       <span className="skill-tag more">+{app.job.skills.split(',').length - 3} more</span>
//                     )}
//                   </div>
//                 </div>
//               )}
//               {!compareMode && (
//                 <div className="card-actions">
//                   <button className="btn btn-outline btn-sm" onClick={() => setSelectedApp({ type: 'detail', app })}>
//                     View Details
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* ✅ DETAIL MODAL */}
//         {selectedApp && selectedApp.type === 'detail' && (
//           <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//               <div className="modal-header">
//                 <h2>{selectedApp.app.job.title}</h2>
//                 <button className="close-btn" onClick={() => setSelectedApp(null)}>✕</button>
//               </div>
//               <div className="modal-body">
//                 <span className={`badge ${getStatusColor(selectedApp.app.status)}`}>{selectedApp.app.status}</span>
//                 <h4>📄 Job Description</h4>
//                 <p>{selectedApp.app.job.description}</p>
//                 <div className="job-details">
//                   {selectedApp.app.job.location && <div className="detail-item"><span>📍</span><span>{selectedApp.app.job.location}</span></div>}
//                   {selectedApp.app.job.salary && <div className="detail-item"><span>💰</span><span>{selectedApp.app.job.salary}</span></div>}
//                   {selectedApp.app.job.experience && <div className="detail-item"><span>⏱️</span><span>{selectedApp.app.job.experience}</span></div>}
//                 </div>
//                 <h4>🤖 AI Match Score</h4>
//                 <div className="score-section">
//                   <div className="score-header">
//                     <strong>Score</strong>
//                     <span style={{ color: getScoreColor(selectedApp.app.aiScore) }}>{selectedApp.app.aiScore}/100</span>
//                   </div>
//                   <div className="progress">
//                     <div className="progress-fill" style={{ width: `${selectedApp.app.aiScore}%`, backgroundColor: getScoreColor(selectedApp.app.aiScore) }}></div>
//                   </div>
//                   <p>{getScoreLabel(selectedApp.app.aiScore)}</p>
//                 </div>
//                 {selectedApp.app.job.skills && (
//                   <>
//                     <h4>🛠️ Required Skills</h4>
//                     <div className="skills-tags">
//                       {selectedApp.app.job.skills.split(',').map((skill, idx) => (
//                         <span key={idx} className="skill-tag">{skill.trim()}</span>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-secondary" onClick={() => setSelectedApp(null)}>Close</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ✅ COMPARE MODAL */}
//         {selectedApp && selectedApp.type === 'compare' && (
//           <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
//             <div className="modal-content modal-wide" onClick={(e) => e.stopPropagation()}>
//               <div className="modal-header">
//                 <h2>⚖️ Compare Applications</h2>
//                 <button className="close-btn" onClick={() => setSelectedApp(null)}>✕</button>
//               </div>
//               <div className="compare-grid">
//                 {selectedApp.apps.map(app => (
//                   <div key={app.id} className="compare-column">
//                     <h3>{app.job.title}</h3>
//                     <span className={`badge ${getStatusColor(app.status)}`}>{app.status}</span>
//                     <div className="compare-score" style={{ color: getScoreColor(app.aiScore) }}>{app.aiScore}/100</div>
//                     <p>{getScoreLabel(app.aiScore)}</p>
//                     {app.job.location && <p>📍 {app.job.location}</p>}
//                     {app.job.salary && <p>💰 {app.job.salary}</p>}
//                     {app.job.experience && <p>⏱️ {app.job.experience}</p>}
//                   </div>
//                 ))}
//               </div>
    
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";
import { Link } from "react-router-dom";
import "../styles/DarkMode.css";
import "../styles/HamburgerMenu.css";

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedApp, setSelectedApp] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    loadApplications();
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) document.body.classList.add("dark-mode");
  }, [user?.id]);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/applications/user/${user.id}`);
      setApplications(res.data);
    } catch (err) {
      console.error("Error loading applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleMenuLinkClick = () => setMenuOpen(false);

  const filteredApplications = applications.filter((app) => {
    if (filter !== "ALL" && app.status !== filter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        app.job.title.toLowerCase().includes(query) ||
        app.job.description.toLowerCase().includes(query) ||
        app.status.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === "recent") return b.id - a.id;
    if (sortBy === "score") return b.aiScore - a.aiScore;
    if (sortBy === "title") return a.job.title.localeCompare(b.job.title);
    return 0;
  });

  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === "APPLIED").length,
    shortlisted: applications.filter(a => a.status === "SHORTLISTED").length,
    interview: applications.filter(a => a.status === "INTERVIEW").length,
    hired: applications.filter(a => a.status === "HIRED").length,
    rejected: applications.filter(a => a.status === "REJECTED").length
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "APPLIED": return "badge-blue";
      case "SHORTLISTED": return "badge-purple";
      case "INTERVIEW": return "badge-orange";
      case "HIRED": return "badge-green";
      case "REJECTED": return "badge-red";
      default: return "badge-gray";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "🎯 Excellent Match";
    if (score >= 60) return "👍 Good Match";
    return "💡 Moderate Match";
  };

  const toggleCompareSelection = (app) => {
    if (selectedForCompare.find(a => a.id === app.id)) {
      setSelectedForCompare(selectedForCompare.filter(a => a.id !== app.id));
    } else if (selectedForCompare.length < 3) {
      setSelectedForCompare([...selectedForCompare, app]);
    }
  };

  const resetComparison = () => {
    setCompareMode(false);
    setSelectedForCompare([]);
  };

  if (loading) {
    return (
      <div className={`page dashboard ${darkMode ? 'dark-mode' : ''}`}>
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading your applications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`page dashboard ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">

        {/* HAMBURGER BUTTON */}
        <button
          className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* SIDEBAR */}
        <div className={`sidebar-menu ${menuOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div className="user-info">
              <div className="user-avatar">{user?.username?.charAt(0).toUpperCase()}</div>
              <div className="user-details">
                <h3>{user?.username}</h3>
                <p>{user?.email}</p>
              </div>
            </div>
            <button className="close-menu-btn" onClick={toggleMenu}>✕</button>
          </div>
          <nav className="sidebar-nav">
            <Link to="/candidate/dashboard" className="nav-item active" onClick={handleMenuLinkClick}>
              <span className="nav-icon">🏠</span><span>Dashboard</span>
            </Link>
            <Link to="/candidate/profile" className="nav-item" onClick={handleMenuLinkClick}>
              <span className="nav-icon">👤</span><span>Profile</span>
            </Link>
            <Link to="/my-applications" className="nav-item" onClick={handleMenuLinkClick}>
              <span className="nav-icon">📝</span><span>My Applications</span>
              {stats.total > 0 && <span className="nav-badge">{stats.total}</span>}
            </Link>
            <Link to="/candidate/saved-jobs" className="nav-item" onClick={handleMenuLinkClick}>
              <span className="nav-icon">⭐</span><span>Saved Jobs</span>
            </Link>
            <Link to="/candidate/interviews" className="nav-item" onClick={handleMenuLinkClick}>
              <span className="nav-icon">📅</span><span>Interviews</span>
              {stats.interview > 0 && <span className="nav-badge interview">{stats.interview}</span>}
            </Link>
            <Link to="/jobs" className="nav-item" onClick={handleMenuLinkClick}>
              <span className="nav-icon">🔍</span><span>Browse Jobs</span>
            </Link>
            <div className="nav-divider"></div>
            <Link to="/help" className="nav-item" onClick={handleMenuLinkClick}>
              <span className="nav-icon">❓</span><span>Help Center</span>
            </Link>
          </nav>
          <div className="sidebar-footer">
            <LogoutButton />
          </div>
        </div>

        {menuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}

        {/* TOP BAR */}
        <div className="topbar">
          <h2>My Applications</h2>
          <div className="topbar-actions">
            <button className="icon-btn" onClick={toggleDarkMode} title={darkMode ? "Light Mode" : "Dark Mode"}>
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button className="icon-btn" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
              {viewMode === "grid" ? "📋" : "📊"}
            </button>
            <button className={`icon-btn ${compareMode ? 'active' : ''}`} onClick={() => { setCompareMode(!compareMode); if (compareMode) resetComparison(); }}>
              ⚖️
            </button>
            <Link to="/jobs"><button className="btn btn-primary">🔍 Browse Jobs</button></Link>
            <LogoutButton />
          </div>
        </div>

        {/* COMPARISON BAR */}
        {compareMode && (
          <div className="comparison-bar">
            <div className="comparison-info">
              <span>Select up to 3 applications to compare</span>
              <span className="selected-count">{selectedForCompare.length}/3 selected</span>
            </div>
            {selectedForCompare.length >= 2 && (
              <button className="btn btn-primary btn-sm" onClick={() => setSelectedApp({ type: 'compare', apps: selectedForCompare })}>
                Compare Selected
              </button>
            )}
            <button className="btn btn-secondary btn-sm" onClick={resetComparison}>Cancel</button>
          </div>
        )}

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card blue"><div className="stat-icon">📊</div><h4>Total Applied</h4><p>{stats.total}</p></div>
          <div className="stat-card purple"><div className="stat-icon">⭐</div><h4>Shortlisted</h4><p>{stats.shortlisted}</p></div>
          <div className="stat-card green"><div className="stat-icon">✅</div><h4>Hired</h4><p>{stats.hired}</p></div>
          <div className="stat-card red"><div className="stat-icon">❌</div><h4>Rejected</h4><p>{stats.rejected}</p></div>
        </div>

        {/* FILTERS */}
        {applications.length > 0 && (
          <div className="controls-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="🔍 Search by job title, description, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && <button className="clear-search-btn" onClick={() => setSearchQuery("")}>✕</button>}
            </div>
            <div className="filter-buttons">
              {["ALL", "APPLIED", "SHORTLISTED", "INTERVIEW", "HIRED", "REJECTED"].map(f => (
                <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                  {f === "ALL" ? `All (${stats.total})` : `${f.charAt(0) + f.slice(1).toLowerCase()} (${stats[f.toLowerCase()]})`}
                </button>
              ))}
            </div>
            <div className="sort-section">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                <option value="recent">Most Recent</option>
                <option value="score">Highest Score</option>
                <option value="title">Job Title (A-Z)</option>
              </select>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {applications.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No Applications Yet</h3>
            <p>Start your job search journey by browsing available positions!</p>
            <Link to="/jobs"><button className="btn btn-primary btn-lg">🚀 Browse Available Jobs</button></Link>
          </div>
        )}

        {/* NO RESULTS */}
        {applications.length > 0 && sortedApplications.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No Results Found</h3>
            <p>No applications match "{searchQuery}"</p>
            <button className="btn btn-secondary" onClick={() => { setSearchQuery(""); setFilter("ALL"); }}>Clear Filters</button>
          </div>
        )}

        {/* RESULTS COUNT */}
        {applications.length > 0 && sortedApplications.length > 0 && (
          <div className="results-header">
            <h3>Your Applications</h3>
            <span className="results-count">Showing {sortedApplications.length} of {applications.length} application(s)</span>
          </div>
        )}

        {/* APPLICATION CARDS */}
        <div className={`card-grid ${viewMode}`}>
          {sortedApplications.map(app => (
            <div key={app.id} className={`application-card ${compareMode && selectedForCompare.find(a => a.id === app.id) ? 'selected-for-compare' : ''}`}>
              {compareMode && (
                <div className="compare-checkbox">
                  <input
                    type="checkbox"
                    checked={!!selectedForCompare.find(a => a.id === app.id)}
                    onChange={() => toggleCompareSelection(app)}
                    disabled={!selectedForCompare.find(a => a.id === app.id) && selectedForCompare.length >= 3}
                  />
                </div>
              )}
              <div className="card-header">
                <h3>{app.job.title}</h3>
                <span className={`badge ${getStatusColor(app.status)}`}>{app.status}</span>
              </div>
              <p className="job-description">{app.job.description}</p>
              <div className="job-details">
                {app.job.location && <div className="detail-item"><span>📍</span><span>{app.job.location}</span></div>}
                {app.job.salary && <div className="detail-item"><span>💰</span><span>{app.job.salary}</span></div>}
                {app.job.experience && <div className="detail-item"><span>⏱️</span><span>{app.job.experience}</span></div>}
              </div>
              <div className="score-section">
                <div className="score-header">
                  <strong>AI Match Score</strong>
                  <span className="score-value" style={{ color: getScoreColor(app.aiScore) }}>{app.aiScore}/100</span>
                </div>
                <div className="progress">
                  <div className="progress-fill" style={{ width: `${app.aiScore}%`, backgroundColor: getScoreColor(app.aiScore) }}></div>
                </div>
                <p className="score-label">{getScoreLabel(app.aiScore)}</p>
              </div>
              {app.job.skills && (
                <div className="skills-section">
                  <strong>Skills:</strong>
                  <div className="skills-tags">
                    {app.job.skills.split(',').slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill.trim()}</span>
                    ))}
                    {app.job.skills.split(',').length > 3 && (
                      <span className="skill-tag more">+{app.job.skills.split(',').length - 3} more</span>
                    )}
                  </div>
                </div>
              )}
              {!compareMode && (
                <div className="card-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => setSelectedApp({ type: 'detail', app })}>
                    View Details
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* DETAIL MODAL - no close button, click overlay to close */}
        {selectedApp && selectedApp.type === 'detail' && (
          <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedApp.app.job.title}</h2>
              </div>
              <div className="modal-body">
                <span className={`badge ${getStatusColor(selectedApp.app.status)}`}>{selectedApp.app.status}</span>
                <h4>📄 Job Description</h4>
                <p>{selectedApp.app.job.description}</p>
                <div className="job-details">
                  {selectedApp.app.job.location && <div className="detail-item"><span>📍</span><span>{selectedApp.app.job.location}</span></div>}
                  {selectedApp.app.job.salary && <div className="detail-item"><span>💰</span><span>{selectedApp.app.job.salary}</span></div>}
                  {selectedApp.app.job.experience && <div className="detail-item"><span>⏱️</span><span>{selectedApp.app.job.experience}</span></div>}
                </div>
                <h4>🤖 AI Match Score</h4>
                <div className="score-section">
                  <div className="score-header">
                    <strong>Score</strong>
                    <span style={{ color: getScoreColor(selectedApp.app.aiScore) }}>{selectedApp.app.aiScore}/100</span>
                  </div>
                  <div className="progress">
                    <div className="progress-fill" style={{ width: `${selectedApp.app.aiScore}%`, backgroundColor: getScoreColor(selectedApp.app.aiScore) }}></div>
                  </div>
                  <p>{getScoreLabel(selectedApp.app.aiScore)}</p>
                </div>
                {selectedApp.app.job.skills && (
                  <>
                    <h4>🛠️ Required Skills</h4>
                    <div className="skills-tags">
                      {selectedApp.app.job.skills.split(',').map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill.trim()}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedApp(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* COMPARE MODAL - no close button, click overlay to close */}
        {selectedApp && selectedApp.type === 'compare' && (
          <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
            <div className="modal-content modal-wide" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>⚖️ Compare Applications</h2>
              </div>
              <div className="compare-grid">
               {selectedApp.apps.map(app => (
                  <div key={app.id} className="compare-column">
                    <h3>{app.job.title}</h3>
                    <span className={`badge ${getStatusColor(app.status)}`}>{app.status}</span>
                    <div className="compare-score" style={{ color: getScoreColor(app.aiScore) }}>{app.aiScore}/100</div>
                    <p>{getScoreLabel(app.aiScore)}</p>
                    {app.job.location && <p>📍 {app.job.location}</p>}
                    {app.job.salary && <p>💰 {app.job.salary}</p>}
                    {app.job.experience && <p>⏱️ {app.job.experience}</p>}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedApp(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}