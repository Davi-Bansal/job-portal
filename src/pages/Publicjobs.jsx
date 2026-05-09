import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/PublicPages.css";

export default function PublicJobs() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Corp",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹15-25 LPA",
      logo: "💻",
      category: "technology",
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Startup Inc",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "5-8 years",
      salary: "₹25-35 LPA",
      logo: "🚀",
      category: "business",
      posted: "1 day ago"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creative Studio",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹12-18 LPA",
      logo: "🎨",
      category: "design",
      posted: "3 days ago"
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "Data Systems",
      location: "Hyderabad, India",
      type: "Full-time",
      experience: "3-6 years",
      salary: "₹18-28 LPA",
      logo: "📊",
      category: "technology",
      posted: "1 week ago"
    },
    {
      id: 5,
      title: "Digital Marketing Manager",
      company: "Marketing Pro",
      location: "Delhi NCR, India",
      type: "Full-time",
      experience: "4-7 years",
      salary: "₹15-22 LPA",
      logo: "📱",
      category: "marketing",
      posted: "4 days ago"
    },
    {
      id: 6,
      title: "Full Stack Developer",
      company: "Innovation Labs",
      location: "Pune, India",
      type: "Full-time",
      experience: "2-5 years",
      salary: "₹12-20 LPA",
      logo: "⚡",
      category: "technology",
      posted: "5 days ago"
    }
  ];

  const categories = [
    { id: "all", name: "All Jobs", icon: "🔍" },
    { id: "technology", name: "Technology", icon: "💻" },
    { id: "business", name: "Business", icon: "💼" },
    { id: "design", name: "Design", icon: "🎨" },
    { id: "marketing", name: "Marketing", icon: "📊" }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplyClick = (jobId) => {
    // Redirect to signup page for non-authenticated users
    navigate("/signup");
  };

  return (
    <div className="public-page">
      {/* HEADER */}
      <header className="public-header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <div className="logo-icon">🎯</div>
              <span className="logo-text">JobPortal</span>
            </Link>
            <div className="header-actions">
              <Link to="/login">
                <button className="btn-login">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn-signup">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Explore 500,000+ Jobs</h1>
          <p className="page-subtitle">Find your perfect job from top companies</p>
          
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by job title, company, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* JOBS LISTING */}
      <section className="jobs-listing">
        <div className="container">
          <div className="results-info">
            <h2>
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
            </h2>
          </div>

          <div className="jobs-grid">
            {filteredJobs.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <div className="company-logo">{job.logo}</div>
                  <div className="job-meta">
                    <span className="job-type">{job.type}</span>
                    <span className="job-posted">{job.posted}</span>
                  </div>
                </div>

                <h3 className="job-title">{job.title}</h3>
                <p className="company-name">{job.company}</p>

                <div className="job-details">
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">💼</span>
                    <span>{job.experience}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">💰</span>
                    <span>{job.salary}</span>
                  </div>
                </div>

                <button 
                  className="btn-apply"
                  onClick={() => handleApplyClick(job.id)}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No jobs found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container">
          <h2>Ready to apply?</h2>
          <p>Create an account to start applying to jobs</p>
          <Link to="/signup">
            <button className="btn-cta-large">Get Started Free</button>
          </Link>
        </div>
      </section>
    </div>
  );
}