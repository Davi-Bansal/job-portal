import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/PublicPages.css";

export default function PublicServices() {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      icon: "📝",
      title: "Resume Builder",
      description: "Create professional, ATS-friendly resumes in minutes with AI-powered suggestions",
      features: ["50+ Templates", "AI Writing Assistant", "PDF Export", "ATS Score Check"],
      price: "Free",
      popular: false
    },
    {
      id: 2,
      icon: "🎓",
      title: "Career Guidance",
      description: "Get personalized career advice from industry experts and mentors",
      features: ["1-on-1 Sessions", "Expert Mentors", "Career Roadmap", "Industry Insights"],
      price: "₹999/month",
      popular: true
    },
    {
      id: 3,
      icon: "💬",
      title: "Interview Preparation",
      description: "Practice with AI-powered mock interviews and get instant feedback",
      features: ["Mock Interviews", "Video Practice", "Real Questions", "Detailed Reports"],
      price: "₹1,499/month",
      popular: false
    },
    {
      id: 4,
      icon: "📊",
      title: "Skill Assessment",
      description: "Evaluate your skills with industry-standard tests and earn certificates",
      features: ["100+ Tests", "Certifications", "Skill Reports", "Learning Paths"],
      price: "Free",
      popular: false
    },
    {
      id: 5,
      icon: "🔔",
      title: "Job Alerts",
      description: "Get instant notifications for jobs matching your profile and preferences",
      features: ["Email Alerts", "SMS Alerts", "Custom Filters", "Daily Digest"],
      price: "Free",
      popular: false
    },
    {
      id: 6,
      icon: "💰",
      title: "Salary Insights",
      description: "Know your market worth with comprehensive salary data and trends",
      features: ["Salary Reports", "Company Data", "Market Trends", "Negotiation Tips"],
      price: "Free",
      popular: false
    }
  ];

  const handleServiceClick = () => {
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
      <section className="page-hero services-hero">
        <div className="container">
          <h1 className="page-title">Career Growth Services</h1>
          <p className="page-subtitle">Everything you need to accelerate your career journey</p>
        </div>
      </section>

      {/* SERVICES LISTING */}
      <section className="services-listing">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                {service.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}
                
                <div className="service-icon-large">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <div className="service-features">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <span className="feature-check">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="service-footer">
                  <div className="service-price">{service.price}</div>
                  <button 
                    className="btn-get-started"
                    onClick={handleServiceClick}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="pricing-section">
        <div className="container">
          <h2 className="section-title">Choose Your Plan</h2>
          <p className="section-subtitle">Unlock premium features to accelerate your career</p>

          <div className="pricing-cards">
            {/* FREE PLAN */}
            <div className="pricing-card">
              <h3 className="plan-name">Free</h3>
              <div className="plan-price">
                <span className="price">₹0</span>
                <span className="period">/month</span>
              </div>
              <ul className="plan-features">
                <li>✓ Basic job search</li>
                <li>✓ Resume builder</li>
                <li>✓ Job alerts</li>
                <li>✓ Skill assessments</li>
                <li>✓ Company reviews</li>
              </ul>
              <Link to="/signup">
                <button className="btn-select-plan">Get Started</button>
              </Link>
            </div>

            {/* PRO PLAN */}
            <div className="pricing-card featured-plan">
              <div className="plan-badge">Most Popular</div>
              <h3 className="plan-name">Pro</h3>
              <div className="plan-price">
                <span className="price">₹999</span>
                <span className="period">/month</span>
              </div>
              <ul className="plan-features">
                <li>✓ Everything in Free</li>
                <li>✓ Career guidance sessions</li>
                <li>✓ Priority support</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Unlimited applications</li>
                <li>✓ Profile highlighting</li>
              </ul>
              <Link to="/signup">
                <button className="btn-select-plan primary">Get Pro</button>
              </Link>
            </div>

            {/* PREMIUM PLAN */}
            <div className="pricing-card">
              <h3 className="plan-name">Premium</h3>
              <div className="plan-price">
                <span className="price">₹1,999</span>
                <span className="period">/month</span>
              </div>
              <ul className="plan-features">
                <li>✓ Everything in Pro</li>
                <li>✓ Interview preparation</li>
                <li>✓ 1-on-1 mentorship</li>
                <li>✓ Salary negotiation coach</li>
                <li>✓ Direct recruiter access</li>
                <li>✓ Resume review by experts</li>
                <li>✓ Career coaching sessions</li>
              </ul>
              <Link to="/signup">
                <button className="btn-select-plan">Get Premium</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Success Stories</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "The interview prep service helped me crack Google's technical rounds. The mock interviews were incredibly realistic and helpful!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💼</div>
                <div className="author-info">
                  <h4>Rahul Kumar</h4>
                  <p>Software Engineer at Google</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Career guidance sessions gave me clarity on my career path. The mentors are experienced professionals who genuinely care."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍💻</div>
                <div className="author-info">
                  <h4>Priya Sharma</h4>
                  <p>Product Manager at Amazon</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Resume builder is amazing! Created an ATS-friendly resume in 15 minutes. Got 3x more interview calls after using it."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍🎨</div>
                <div className="author-info">
                  <h4>Arjun Singh</h4>
                  <p>UX Designer at Microsoft</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container">
          <h2>Ready to Accelerate Your Career?</h2>
          <p>Join thousands of professionals who achieved their career goals with us</p>
          <Link to="/signup">
            <button className="btn-cta-large">Start Free Trial</button>
          </Link>
        </div>
      </section>
    </div>
  );
}