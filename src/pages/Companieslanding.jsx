import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/PublicPages.css";

export default function CompaniesLanding() {
  const navigate = useNavigate();

  const companies = [
    {
      name: "Tech Corp",
      logo: "🏢",
      industry: "Technology",
      employees: "10,000+",
      openings: 50,
      rating: 4.5,
      description: "Leading technology solutions provider"
    },
    {
      name: "Startup Inc",
      logo: "🚀",
      industry: "SaaS",
      employees: "500-1000",
      openings: 30,
      rating: 4.7,
      description: "Fast-growing startup revolutionizing the industry"
    },
    {
      name: "Global Industries",
      logo: "🏭",
      industry: "Manufacturing",
      employees: "50,000+",
      openings: 100,
      rating: 4.3,
      description: "Fortune 500 manufacturing giant"
    },
    {
      name: "Innovation Labs",
      logo: "💡",
      industry: "R&D",
      employees: "1000-5000",
      openings: 25,
      rating: 4.6,
      description: "Cutting-edge research and development"
    },
    {
      name: "Digital Agency",
      logo: "🎯",
      industry: "Marketing",
      employees: "100-500",
      openings: 40,
      rating: 4.4,
      description: "Award-winning digital marketing agency"
    },
    {
      name: "Fast Solutions",
      logo: "⚡",
      industry: "Consulting",
      employees: "5000-10000",
      openings: 35,
      rating: 4.5,
      description: "Global consulting powerhouse"
    },
    {
      name: "Creative Studio",
      logo: "🎨",
      industry: "Design",
      employees: "50-100",
      openings: 20,
      rating: 4.8,
      description: "Premium design and branding studio"
    },
    {
      name: "Data Systems",
      logo: "📊",
      industry: "Analytics",
      employees: "1000-5000",
      openings: 45,
      rating: 4.6,
      description: "Data analytics and AI solutions"
    }
  ];

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

            <nav className="nav-menu">
              <Link to="/jobs-landing" className="nav-link">Jobs</Link>
              <Link to="/companies-landing" className="nav-link active">Companies</Link>
              <Link to="/services-landing" className="nav-link">Services</Link>
            </nav>

            <div className="auth-buttons">
              <Link to="/login">
                <button className="btn-login">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn-register">Register</button>
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
        </div>
      </section>

      {/* STATS */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10,000+</h3>
              <p>Companies</p>
            </div>
            <div className="stat-item">
              <h3>500K+</h3>
              <p>Active Jobs</p>
            </div>
            <div className="stat-item">
              <h3>4.5★</h3>
              <p>Avg Rating</p>
            </div>
            <div className="stat-item">
              <h3>1M+</h3>
              <p>Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANIES GRID */}
      <section className="companies-section">
        <div className="container">
          <h2 className="section-title">Featured Companies</h2>
          <div className="companies-grid">
            {companies.map((company, idx) => (
              <div
                key={idx}
                className="company-card"
                onClick={() => navigate("/signup")}
              >
                <div className="company-header">
                  <div className="company-logo-large">{company.logo}</div>
                  <div className="company-rating">
                    ⭐ {company.rating}
                  </div>
                </div>
                <h3>{company.name}</h3>
                <p className="company-industry">{company.industry}</p>
                <p className="company-description">{company.description}</p>
                <div className="company-meta">
                  <span>👥 {company.employees}</span>
                  <span>💼 {company.openings} jobs</span>
                </div>
                <button className="company-btn">View Company</button>
              </div>
            ))}
          </div>

          <div className="cta-center">
            <Link to="/signup">
              <button className="btn-primary-large">
                View All Companies →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="why-section">
        <div className="container">
          <h2 className="section-title">Why Top Companies Choose Us</h2>
          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon">🎯</div>
              <h3>Quality Candidates</h3>
              <p>Access to pre-screened, qualified candidates</p>
            </div>
            <div className="feature-box">
              <div className="feature-icon">⚡</div>
              <h3>Fast Hiring</h3>
              <p>Reduce time-to-hire by 50%</p>
            </div>
            <div className="feature-box">
              <div className="feature-icon">📊</div>
              <h3>Analytics</h3>
              <p>Track and optimize your hiring process</p>
            </div>
            <div className="feature-box">
              <div className="feature-icon">🤝</div>
              <h3>Support</h3>
              <p>Dedicated account manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Find Your Perfect Company Match</h2>
            <p>Join JobPortal to explore company reviews, salaries, and culture</p>
            <div className="cta-buttons">
              <Link to="/signup">
                <button className="btn-cta-primary">Get Started Free</button>
              </Link>
              <Link to="/signup?role=hr">
                <button className="btn-cta-secondary">Post Jobs</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="public-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>JobPortal</h4>
              <p>Your trusted career partner</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <Link to="/jobs-landing">Jobs</Link>
              <Link to="/companies-landing">Companies</Link>
              <Link to="/services-landing">Services</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 JobPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}