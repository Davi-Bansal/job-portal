import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/PublicPages.css";

export default function Help() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { id: "general", name: "General", icon: "❓" },
    { id: "account", name: "Account", icon: "👤" },
    { id: "jobs", name: "Jobs", icon: "💼" },
    { id: "employers", name: "Employers", icon: "🏢" }
  ];

  const faqs = {
    general: [
      {
        q: "What is JobPortal?",
        a: "JobPortal is India's leading job search platform connecting job seekers with top companies. We offer AI-powered job matching, resume building tools, and career guidance."
      },
      {
        q: "Is JobPortal free to use?",
        a: "Yes! Job seekers can create an account, search jobs, and apply for free. We also offer premium features with our Pro and Premium plans."
      },
      {
        q: "How does AI matching work?",
        a: "Our AI analyzes your skills, experience, and preferences to match you with the most relevant job opportunities, saving you time and increasing your chances of success."
      }
    ],
    account: [
      {
        q: "How do I create an account?",
        a: "Click the 'Sign Up' button, fill in your details, and verify your email. You can then complete your profile and start applying for jobs."
      },
      {
        q: "I forgot my password. What should I do?",
        a: "Click 'Forgot Password' on the login page, enter your email, and we'll send you a reset link."
      },
      {
        q: "How do I delete my account?",
        a: "Go to Settings > Account > Delete Account. Note that this action is permanent and cannot be undone."
      },
      {
        q: "Can I have multiple accounts?",
        a: "No, each user should have only one account. Multiple accounts may result in suspension."
      }
    ],
    jobs: [
      {
        q: "How do I search for jobs?",
        a: "Use the search bar on the homepage or Jobs page. Filter by skills, location, experience, and company to find relevant opportunities."
      },
      {
        q: "How do I apply for a job?",
        a: "Click on a job listing, review the details, and click 'Apply Now'. You can apply with your saved resume or upload a new one."
      },
      {
        q: "Can I track my applications?",
        a: "Yes! Go to 'My Applications' in your dashboard to see the status of all your applications."
      },
      {
        q: "How long does it take to hear back?",
        a: "Response times vary by company, typically 3-7 business days. You'll receive notifications for any status changes."
      }
    ],
    employers: [
      {
        q: "How do I post a job?",
        a: "Create an employer account, verify your company, and click 'Post Job'. Fill in the job details and publish."
      },
      {
        q: "What are the pricing plans for employers?",
        a: "We offer flexible plans starting from ₹5,000/month. Contact our sales team for custom enterprise solutions."
      },
      {
        q: "How do I review applications?",
        a: "Go to your HR Dashboard, select the job posting, and view all applicants with their profiles and resumes."
      }
    ]
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
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

      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Help Center</h1>
          <p className="page-subtitle">Find answers to frequently asked questions</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="content-section">
        <div className="container">
          {/* Category Tabs */}
          <div className="help-categories">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="faq-list">
            {faqs[activeCategory].map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${openFaq === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="help-cta">
            <h3>Still need help?</h3>
            <p>Our support team is here to assist you</p>
            <div className="help-buttons">
              <Link to="/contact">
                <button className="btn-primary-large">Contact Support</button>
              </Link>
              <a href="mailto:support@jobportal.com">
                <button className="btn-secondary">Email Us</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}