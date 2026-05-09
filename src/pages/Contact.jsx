import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api"; // Your axios instance
import "../styles/PublicPages.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Send to backend API
      const response = await api.post("/contact/send", formData);
      
      setSuccessMessage("✅ Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage("❌ Failed to send message. Please try again or email us directly at davybansal714@gmail.com");
    } finally {
      setLoading(false);
    }
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
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">We'd love to hear from you</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="content-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send us a Message</h2>
              
              {/* Success Message */}
              {successMessage && (
                <div className="alert alert-success">
                  {successMessage}
                </div>
              )}
              
              {/* Error Message */}
              {errorMessage && (
                <div className="alert alert-error">
                  {errorMessage}
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us more..."
                    disabled={loading}
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <h2>Get in Touch</h2>
              
              <div className="info-card">
                <div className="info-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>davybansal714@gmail.com</p>
                  <p>23BCS11376@cuchd.in</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 6284563921 (Toll Free)</p>
                  <p>Mon-Fri, 9 AM - 6 PM IST</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">📍</div>
                <div>
                  <h4>Address</h4>
                  <p>JobPortal Headquarters</p>
                  <p>Cyber City, Sector 29</p>
                  <p>Gurugram, Haryana - 122001</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">🕐</div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 9 AM - 6 PM</p>
                  <p>Saturday: 10 AM - 4 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="social-links-contact">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a href="#facebook">📘 Facebook</a>
                  <a href="#twitter">🐦 Twitter</a>
                  <a href="https://www.linkedin.com/in/davi-bansal-880208279/">💼 LinkedIn</a>
                  <a href="#instagram">📷 Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}