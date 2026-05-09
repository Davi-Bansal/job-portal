import React from "react";
import { Link } from "react-router-dom";
import "../styles/PublicPages.css";

export default function About() {
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

      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">About JobPortal</h1>
          <p className="page-subtitle">Your trusted partner in career success</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="content-section">
        <div className="container">
          <div className="content-wrapper">
            <h2>Who We Are</h2>
            <p>
              JobPortal is India's leading job search platform, connecting millions of job seekers with 
              top companies across the country. Founded in 2020, we've helped over 1 million professionals 
              find their dream careers.
            </p>

            <h2>Our Mission</h2>
            <p>
              Our mission is to make job searching simple, efficient, and successful for everyone. 
              We leverage cutting-edge AI technology to match candidates with the perfect opportunities 
              while helping companies find the best talent.
            </p>

            <h2>Why Choose Us</h2>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <div>
                  <h4>500,000+ Active Jobs</h4>
                  <p>Access to the largest database of verified job openings</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <div>
                  <h4>10,000+ Companies</h4>
                  <p>From startups to Fortune 500 companies</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <div>
                  <h4>AI-Powered Matching</h4>
                  <p>Smart algorithms to find your perfect fit</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <div>
                  <h4>Expert Career Guidance</h4>
                  <p>Professional support at every step</p>
                </div>
              </div>
            </div>

            <h2>Our Team</h2>
            <p>
              We're a team of passionate professionals dedicated to transforming the job search 
              experience. Our diverse team brings together expertise in technology, recruitment, 
              and career development.
            </p>

            <div className="cta-box-simple">
              <h3>Ready to Start Your Journey?</h3>
              <Link to="/signup">
                <button className="btn-cta-large">Join JobPortal Today</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}