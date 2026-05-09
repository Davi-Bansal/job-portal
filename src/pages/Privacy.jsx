import React from "react";
import { Link } from "react-router-dom";
import "../styles/PublicPages.css";

export default function Privacy() {
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
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-subtitle">Last updated: January 31, 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="content-section">
        <div className="container">
          <div className="policy-content">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, including:
            </p>
            <ul>
              <li>Personal details (name, email, phone number)</li>
              <li>Resume and professional information</li>
              <li>Job preferences and search history</li>
              <li>Account credentials</li>
              <li>Communication preferences</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Match you with relevant job opportunities</li>
              <li>Send you job alerts and notifications</li>
              <li>Communicate with you about our services</li>
              <li>Analyze and improve our platform</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>Employers when you apply for jobs</li>
              <li>Service providers who assist our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <p>
              We do NOT sell your personal information to third parties.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul>
              <li>SSL encryption for data transmission</li>
              <li>Secure servers and databases</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
            </ul>

            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data</li>
            </ul>

            <h2>6. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience. 
              You can control cookies through your browser settings.
            </p>

            <h2>7. Third-Party Services</h2>
            <p>
              Our platform may contain links to third-party websites. We are not 
              responsible for their privacy practices.
            </p>

            <h2>8. Children's Privacy</h2>
            <p>
              Our services are not intended for users under 18 years of age. We do not 
              knowingly collect information from children.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of 
              any significant changes via email or platform notification.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us at:
            </p>
            <div className="contact-box">
              <p>📧 Email: davybansal714.com</p>
              <p>📞 Phone: 6284563921</p>
              <p>📍 Address: JobPortal HQ, Gurugram, Haryana - 122001</p>
            </div>

            <div className="policy-footer">
              <Link to="/terms">
                <button className="btn-secondary">View Terms of Service</button>
              </Link>
              <Link to="/contact">
                <button className="btn-secondary">Contact Support</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}