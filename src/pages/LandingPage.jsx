import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    skills: "",
    experience: "",
    location: ""
  });

  // Cookie banner state
  const [showCookie, setShowCookie] = useState(true);

  // Check if user already accepted cookies
  useEffect(() => {
    const cookieAccepted = localStorage.getItem("cookieAccepted");
    if (cookieAccepted === "true") {
      setShowCookie(false);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to signup for non-authenticated users
    navigate("/signup");
  };

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  // Cookie banner handler
  const handleCookieAccept = () => {
    setShowCookie(false);
    localStorage.setItem("cookieAccepted", "true");
  };

  // Navigate to pro offer page
  const handleClaimOffer = () => {
    navigate("/pro-offer");
  };

  return (
    <div className="landing-page">
      {/* HEADER */}
      <header className="landing-header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <Link to="/" className="logo">
              <div className="logo-icon">🎯</div>
              <span className="logo-text">JobPortal</span>
            </Link>

            {/* Navigation */}
            <nav className="nav-menu">
              <Link to="/public-jobs" className="nav-link">Jobs</Link>
              <Link to="/public-companies" className="nav-link">Companies</Link>
              <Link to="/public-services" className="nav-link">Services</Link>
            </nav>

            {/* Auth Buttons */}
            <div className="auth-buttons">
              <Link to="/login">
                <button className="btn-login">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn-register">Register</button>
              </Link>
              <div className="dropdown">
                <button className="btn-employers">
                  For employers
                  <span className="dropdown-icon">▼</span>
                </button>
                <div className="dropdown-content">
                  <Link to="/login?role=hr">HR Login</Link>
                  <Link to="/signup?role=hr">Post a Job</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Find your dream job now</h1>
            <p className="hero-subtitle">5 lakh+ jobs for you to explore</p>

            {/* SEARCH BAR */}
            <form className="search-container" onSubmit={handleSearch}>
              <div className="search-box">
                <div className="search-input-group">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    name="skills"
                    placeholder="Enter skills / designations / companies"
                    value={searchData.skills}
                    onChange={handleChange}
                    className="search-input"
                  />
                </div>

                <div className="search-divider"></div>

                <div className="search-input-group">
                  <select
                    name="experience"
                    value={searchData.experience}
                    onChange={handleChange}
                    className="search-select"
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div className="search-divider"></div>

                <div className="search-input-group">
                  <span className="search-icon">📍</span>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter location"
                    value={searchData.location}
                    onChange={handleChange}
                    className="search-input"
                  />
                </div>

                <button type="submit" className="search-button">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* PROMOTIONAL BANNER */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-content">
            <div className="promo-decoration left">
              <div className="tree">🌲</div>
              <div className="tree">🌲</div>
            </div>

            <div className="promo-text">
              <span className="promo-badge">Winter offer</span>
              <h2 className="promo-title">
                25% off on <span className="highlight">Pro</span>
              </h2>
              <button className="promo-button" onClick={handleClaimOffer}>
                🎁 Claim your offer
              </button>
            </div>

            <div className="promo-decoration right">
              <div className="snowman">☃️</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why choose us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>AI-Powered Matching</h3>
              <p>Get matched with jobs that fit your skills and experience perfectly</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Apply</h3>
              <p>Apply to multiple jobs with just one click using your saved profile</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Applications</h3>
              <p>Monitor all your applications in one place with real-time updates</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Top Companies</h3>
              <p>Access opportunities from leading companies across industries</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3 className="stat-number">5L+</h3>
              <p className="stat-label">Active Jobs</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">10K+</h3>
              <p className="stat-label">Companies</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">1M+</h3>
              <p className="stat-label">Job Seekers</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">50K+</h3>
              <p className="stat-label">Hired Monthly</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to take the next step?</h2>
            <p className="cta-subtitle">Join thousands of job seekers finding their dream careers</p>
            <div className="cta-buttons">
              <Link to="/signup">
                <button className="btn-cta primary">Get Started Free</button>
              </Link>
              <Link to="/public-jobs">
                <button className="btn-cta secondary">Browse Jobs</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>JobPortal</h4>
              <p>Your trusted partner in finding the perfect career opportunity</p>
            </div>

            <div className="footer-section">
              <h4>For Job Seekers</h4>
              <Link to="/public-jobs">Browse Jobs</Link>
              <Link to="/public-companies">Companies</Link>
              <Link to="/signup">Create Account</Link>
            </div>

            <div className="footer-section">
              <h4>For Employers</h4>
              <Link to="/signup?role=hr">Post a Job</Link>
              <Link to="/public-services">Pricing</Link>
              <Link to="/login?role=hr">Employer Login</Link>
            </div>

            <div className="footer-section">
              <h4>Support</h4>
              <Link to="/help">Help Center</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 JobPortal. All rights reserved.</p>
            <div className="footer-links">
              <Link to="/about">About</Link>
              <span>•</span>
              <Link to="/privacy">Privacy</Link>
              <span>•</span>
              <Link to="/help">Help</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* COOKIE BANNER - Only show if not accepted */}
      {showCookie && (
        <div className="cookie-banner">
          <div className="cookie-content">
            <p>
              We use cookies to improve your experience. By continuing to browse the site, you agree to our{" "}
              <Link to="/privacy">Privacy Policy</Link> & <a href="#cookies">Cookie Policy</a>
            </p>
            <button className="cookie-button" onClick={handleCookieAccept}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}