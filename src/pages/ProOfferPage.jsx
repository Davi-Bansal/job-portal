import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ProOfferPage.css";

export default function ProOfferPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("quarterly");

  const plans = {
    monthly: {
      original: 999,
      discounted: 749,
      savings: 250,
      duration: "per month"
    },
    quarterly: {
      original: 2499,
      discounted: 1874,
      savings: 625,
      duration: "3 months",
      popular: true
    },
    yearly: {
      original: 8999,
      discounted: 6749,
      savings: 2250,
      duration: "12 months",
      badge: "Best Value"
    }
  };

  const handleClaimOffer = () => {
    // Navigate to signup with pro plan selected
    navigate("/signup", { state: { plan: selectedPlan, discount: true } });
  };

  return (
    <div className="pro-offer-page">
      {/* HEADER */}
      <header className="offer-header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="back-link">
              ← Back to Home
            </Link>
            <div className="logo">
              <span className="logo-icon">🎯</span>
              <span className="logo-text">JobPortal Pro</span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="offer-hero">
        <div className="container">
          <div className="hero-badge">
            <span className="badge-icon">❄️</span>
            <span>Winter Offer 2026</span>
          </div>
          
          <h1 className="offer-title">
            Get <span className="highlight">25% OFF</span> on Pro
          </h1>
          
          <p className="offer-subtitle">
            Unlock premium features and supercharge your job search
          </p>

          <div className="offer-timer">
            <span className="timer-icon">⏰</span>
            <span>Offer ends in: 7 days, 23 hours, 45 minutes</span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hero-decorations">
          <div className="decoration tree-left">🌲</div>
          <div className="decoration tree-right">🌲</div>
          <div className="decoration snowman">☃️</div>
          <div className="snowflakes">
            <div className="snowflake">❄</div>
            <div className="snowflake">❄</div>
            <div className="snowflake">❄</div>
            <div className="snowflake">❄</div>
          </div>
        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="pricing-section">
        <div className="container">
          <h2 className="section-title">Choose Your Plan</h2>
          
          <div className="pricing-grid">
            {/* Monthly Plan */}
            <div 
              className={`pricing-card ${selectedPlan === "monthly" ? "selected" : ""}`}
              onClick={() => setSelectedPlan("monthly")}
            >
              <div className="plan-header">
                <h3>Monthly</h3>
                <p className="plan-duration">{plans.monthly.duration}</p>
              </div>

              <div className="plan-pricing">
                <div className="original-price">₹{plans.monthly.original}</div>
                <div className="discounted-price">₹{plans.monthly.discounted}</div>
                <div className="savings-badge">Save ₹{plans.monthly.savings}</div>
              </div>

              <div className="plan-features">
                <div className="feature">✓ Unlimited job applications</div>
                <div className="feature">✓ Priority support</div>
                <div className="feature">✓ Resume builder</div>
                <div className="feature">✓ Profile boost</div>
              </div>

              <button 
                className={`select-plan-btn ${selectedPlan === "monthly" ? "selected" : ""}`}
              >
                {selectedPlan === "monthly" ? "Selected" : "Select Plan"}
              </button>
            </div>

            {/* Quarterly Plan - Popular */}
            <div 
              className={`pricing-card popular ${selectedPlan === "quarterly" ? "selected" : ""}`}
              onClick={() => setSelectedPlan("quarterly")}
            >
              {plans.quarterly.popular && (
                <div className="popular-badge">Most Popular</div>
              )}

              <div className="plan-header">
                <h3>Quarterly</h3>
                <p className="plan-duration">{plans.quarterly.duration}</p>
              </div>

              <div className="plan-pricing">
                <div className="original-price">₹{plans.quarterly.original}</div>
                <div className="discounted-price">₹{plans.quarterly.discounted}</div>
                <div className="savings-badge">Save ₹{plans.quarterly.savings}</div>
              </div>

              <div className="plan-features">
                <div className="feature">✓ All monthly features</div>
                <div className="feature">✓ AI job matching</div>
                <div className="feature">✓ Interview preparation</div>
                <div className="feature">✓ Salary insights</div>
              </div>

              <button 
                className={`select-plan-btn ${selectedPlan === "quarterly" ? "selected" : ""}`}
              >
                {selectedPlan === "quarterly" ? "Selected" : "Select Plan"}
              </button>
            </div>

            {/* Yearly Plan - Best Value */}
            <div 
              className={`pricing-card ${selectedPlan === "yearly" ? "selected" : ""}`}
              onClick={() => setSelectedPlan("yearly")}
            >
              {plans.yearly.badge && (
                <div className="value-badge">{plans.yearly.badge}</div>
              )}

              <div className="plan-header">
                <h3>Yearly</h3>
                <p className="plan-duration">{plans.yearly.duration}</p>
              </div>

              <div className="plan-pricing">
                <div className="original-price">₹{plans.yearly.original}</div>
                <div className="discounted-price">₹{plans.yearly.discounted}</div>
                <div className="savings-badge">Save ₹{plans.yearly.savings}</div>
              </div>

              <div className="plan-features">
                <div className="feature">✓ All quarterly features</div>
                <div className="feature">✓ Career counseling</div>
                <div className="feature">✓ Premium job alerts</div>
                <div className="feature">✓ Direct employer chat</div>
              </div>

              <button 
                className={`select-plan-btn ${selectedPlan === "yearly" ? "selected" : ""}`}
              >
                {selectedPlan === "yearly" ? "Selected" : "Select Plan"}
              </button>
            </div>
          </div>

          <div className="claim-section">
            <button className="claim-offer-btn" onClick={handleClaimOffer}>
              🎁 Claim Your {selectedPlan === "monthly" ? "Monthly" : selectedPlan === "quarterly" ? "Quarterly" : "Yearly"} Offer Now
            </button>
            <p className="money-back">30-day money-back guarantee • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">What You Get with Pro</h2>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🚀</div>
              <h3>3x More Visibility</h3>
              <p>Your profile appears at the top of recruiter searches</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Smart Job Matching</h3>
              <p>AI-powered recommendations based on your skills and preferences</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>Track application performance and optimize your approach</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">💬</div>
              <h3>Priority Support</h3>
              <p>Get help from our team whenever you need it</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📝</div>
              <h3>Resume Builder Pro</h3>
              <p>Professional templates and AI-powered suggestions</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🔔</div>
              <h3>Instant Alerts</h3>
              <p>Be the first to know about matching job opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Pro Users Say</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Got 3 interview calls within a week of upgrading to Pro. Totally worth it!"
              </p>
              <div className="testimonial-author">
                <strong>Priya Sharma</strong>
                <span>Software Engineer</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "The AI matching is incredible. Every job recommendation is spot-on."
              </p>
              <div className="testimonial-author">
                <strong>Rahul Verma</strong>
                <span>Marketing Manager</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Landed my dream job in just 2 months. Best investment I made!"
              </p>
              <div className="testimonial-author">
                <strong>Anita Desai</strong>
                <span>Product Designer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I cancel anytime?</h4>
              <p>Yes! You can cancel your subscription at any time. No questions asked.</p>
            </div>

            <div className="faq-item">
              <h4>What if I don't get a job?</h4>
              <p>We offer a 30-day money-back guarantee if you're not satisfied with the service.</p>
            </div>

            <div className="faq-item">
              <h4>How long is this offer valid?</h4>
              <p>This winter special offer is valid for 7 days only. Don't miss out!</p>
            </div>

            <div className="faq-item">
              <h4>Can I upgrade or downgrade later?</h4>
              <p>Absolutely! You can change your plan anytime from your account settings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Don't Miss This Limited-Time Offer!</h2>
            <p>Join 50,000+ professionals who found their dream jobs with Pro</p>
            <button className="claim-offer-btn large" onClick={handleClaimOffer}>
              🎁 Claim 25% OFF Now
            </button>
            <p className="cta-note">Offer expires in 7 days • Limited slots available</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="offer-footer">
        <div className="container">
          <p>&copy; 2026 JobPortal. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}