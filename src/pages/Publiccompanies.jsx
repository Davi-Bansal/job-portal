import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/PublicPages.css";

export default function PublicCompanies() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample companies data
  const companies = [
    {
      id: 1,
      name: "Tech Corp",
      logo: "🏢",
      industry: "Information Technology",
      employees: "10,000+",
      openJobs: 45,
      rating: 4.5,
      location: "Bangalore, India",
      description: "Leading technology solutions provider specializing in cloud computing and AI"
    },
    {
      id: 2,
      name: "Startup Inc",
      logo: "🚀",
      industry: "SaaS",
      employees: "500-1000",
      openJobs: 28,
      rating: 4.7,
      location: "Mumbai, India",
      description: "Fast-growing startup revolutionizing the B2B software industry"
    },
    {
      id: 3,
      name: "Global Industries",
      logo: "🏭",
      industry: "Manufacturing",
      employees: "50,000+",
      openJobs: 120,
      rating: 4.3,
      location: "Delhi NCR, India",
      description: "Fortune 500 manufacturing giant with global operations"
    },
    {
      id: 4,
      name: "Innovation Labs",
      logo: "💡",
      industry: "Research & Development",
      employees: "1000-5000",
      openJobs: 32,
      rating: 4.6,
      location: "Hyderabad, India",
      description: "Cutting-edge research and development in emerging technologies"
    },
    {
      id: 5,
      name: "Digital Agency",
      logo: "🎯",
      industry: "Marketing & Advertising",
      employees: "100-500",
      openJobs: 18,
      rating: 4.4,
      location: "Pune, India",
      description: "Award-winning digital marketing agency serving global brands"
    },
    {
      id: 6,
      name: "Creative Studio",
      logo: "🎨",
      industry: "Design & Creative",
      employees: "50-100",
      openJobs: 15,
      rating: 4.8,
      location: "Bangalore, India",
      description: "Premium design and branding studio for luxury brands"
    }
  ];

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewCompany = (companyId) => {
    // Redirect to signup for non-authenticated users
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
      <section className="page-hero companies-hero">
        <div className="container">
          <h1 className="page-title">Explore Top Companies</h1>
          <p className="page-subtitle">Discover great places to work and grow your career</p>
          
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search companies by name, industry, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-row">
            <div className="stat-box">
              <h3>10,000+</h3>
              <p>Companies</p>
            </div>
            <div className="stat-box">
              <h3>500K+</h3>
              <p>Active Jobs</p>
            </div>
            <div className="stat-box">
              <h3>4.5★</h3>
              <p>Average Rating</p>
            </div>
            <div className="stat-box">
              <h3>1M+</h3>
              <p>Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANIES LISTING */}
      <section className="companies-listing">
        <div className="container">
          <div className="results-info">
            <h2>
              {filteredCompanies.length} {filteredCompanies.length === 1 ? 'Company' : 'Companies'}
            </h2>
          </div>

          <div className="companies-grid">
            {filteredCompanies.map(company => (
              <div key={company.id} className="company-card">
                <div className="company-header">
                  <div className="company-logo-large">{company.logo}</div>
                  <div className="company-rating">
                    <span>⭐ {company.rating}</span>
                  </div>
                </div>

                <h3 className="company-name">{company.name}</h3>
                <p className="company-industry">{company.industry}</p>
                <p className="company-description">{company.description}</p>

                <div className="company-info">
                  <div className="info-item">
                    <span className="info-icon">👥</span>
                    <span>{company.employees}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">📍</span>
                    <span>{company.location}</span>
                  </div>
                </div>

                <div className="company-footer">
                  <div className="open-jobs">
                    💼 {company.openJobs} open positions
                  </div>
                  <button 
                    className="btn-view-company"
                    onClick={() => handleViewCompany(company.id)}
                  >
                    View Company
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🏢</div>
              <h3>No companies found</h3>
              <p>Try adjusting your search</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container">
          <h2>Want to explore more companies?</h2>
          <p>Sign up to view detailed company profiles, reviews, and culture insights</p>
          <Link to="/signup">
            <button className="btn-cta-large">Create Free Account</button>
          </Link>
        </div>
      </section>
    </div>
  );
}