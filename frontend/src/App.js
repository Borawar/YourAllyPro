import React, { useState } from 'react';
import { Clock, Users, AlertTriangle, Zap, Shield, Code, TrendingUp, Layout, Globe, ShoppingCart, RefreshCw, MessageCircle } from 'lucide-react';
import './App.css';

const API_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="container nav-content">
          <div className="logo" data-testid="logo">YourAllyPro</div>
          <a href="#contact" className="nav-cta" data-testid="nav-cta">Become a Partner</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" data-testid="hero-section">
        <div className="container hero-content">
          <h1>Your White-Label Website Development Partner</h1>
          <p>Help your agency deliver websites to clients in just 3–5 days.</p>
          <a href="#contact" className="btn-primary" data-testid="hero-cta">Become a Partner</a>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section" data-testid="problem-section">
        <div className="container">
          <h2 className="section-title">Agencies Win Clients — But Delivery Is Hard</h2>
          <p className="section-subtitle">Running an agency means juggling multiple projects. Here's what makes website delivery challenging:</p>
          <div className="problems-grid">
            <div className="problem-card" data-testid="problem-card-1">
              <div className="problem-icon"><Users size={28} /></div>
              <h3>Too Many Client Projects</h3>
              <p>Your team is stretched thin managing multiple campaigns and client demands.</p>
            </div>
            <div className="problem-card" data-testid="problem-card-2">
              <div className="problem-icon"><AlertTriangle size={28} /></div>
              <h3>Hiring Developers Is Expensive</h3>
              <p>Full-time developers cost $60K-$120K/year. Freelancers are unreliable.</p>
            </div>
            <div className="problem-card" data-testid="problem-card-3">
              <div className="problem-icon"><Clock size={28} /></div>
              <h3>Slow Delivery Hurts Reputation</h3>
              <p>Delayed websites mean unhappy clients and lost referrals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section section-alt" data-testid="solution-section">
        <div className="container">
          <h2 className="section-title">Your Reliable Website Production Team</h2>
          <p className="section-subtitle">YourAllyPro becomes your invisible development partner, handling all the heavy lifting.</p>
          <div className="benefits-grid">
            <div className="benefit-item" data-testid="benefit-1">
              <div className="benefit-icon"><Zap size={24} /></div>
              <div>
                <h4>3–5 Day Delivery</h4>
                <p>Lightning-fast turnaround on every project</p>
              </div>
            </div>
            <div className="benefit-item" data-testid="benefit-2">
              <div className="benefit-icon"><Shield size={24} /></div>
              <div>
                <h4>Fully White-Label</h4>
                <p>Your brand, your client relationship</p>
              </div>
            </div>
            <div className="benefit-item" data-testid="benefit-3">
              <div className="benefit-icon"><TrendingUp size={24} /></div>
              <div>
                <h4>SEO-Friendly</h4>
                <p>Modern, optimized websites that rank</p>
              </div>
            </div>
            <div className="benefit-item" data-testid="benefit-4">
              <div className="benefit-icon"><Code size={24} /></div>
              <div>
                <h4>Modern Tech Stack</h4>
                <p>Built with React / Next.js</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" data-testid="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How Our Agency Partnership Works</h2>
          <p className="section-subtitle">Simple 3-step process to deliver websites faster</p>
          <div className="steps-container">
            <div className="step" data-testid="step-1">
              <div className="step-number">1</div>
              <h3>Send Website Request</h3>
              <p>Share the project details and requirements with us</p>
            </div>
            <div className="step" data-testid="step-2">
              <div className="step-number">2</div>
              <h3>We Build It</h3>
              <p>Our team develops the website in 3-5 days</p>
            </div>
            <div className="step" data-testid="step-3">
              <div className="step-number">3</div>
              <h3>You Deliver</h3>
              <p>Present the finished website to your client</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section section-alt" data-testid="services-section">
        <div className="container">
          <h2 className="section-title">What We Build</h2>
          <p className="section-subtitle">Complete website solutions for your agency clients</p>
          <div className="services-grid">
            <div className="service-card" data-testid="service-1">
              <div className="service-icon"><Layout size={24} /></div>
              <h3>Landing Pages</h3>
            </div>
            <div className="service-card" data-testid="service-2">
              <div className="service-icon"><Globe size={24} /></div>
              <h3>Business Websites</h3>
            </div>
            <div className="service-card" data-testid="service-3">
              <div className="service-icon"><Zap size={24} /></div>
              <h3>Startup Websites</h3>
            </div>
            <div className="service-card" data-testid="service-4">
              <div className="service-icon"><ShoppingCart size={24} /></div>
              <h3>Ecommerce Websites</h3>
            </div>
            <div className="service-card" data-testid="service-5">
              <div className="service-icon"><RefreshCw size={24} /></div>
              <h3>Website Redesigns</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Profit Section */}
      <section className="section" data-testid="profit-section">
        <div className="container">
          <h2 className="section-title">You Keep the Profit. We Handle the Work.</h2>
          <div className="profit-content">
            <div className="profit-example" data-testid="profit-example">
              <div className="profit-row">
                <span className="profit-label">Your cost</span>
                <span className="profit-value cost">$300</span>
              </div>
              <div className="profit-row">
                <span className="profit-label">You charge client</span>
                <span className="profit-value sell">$1,200</span>
              </div>
              <div className="profit-row">
                <span className="profit-label">Your profit</span>
                <span className="profit-value profit">$900</span>
              </div>
            </div>
            <div className="profit-text">
              <h3>300% Profit Margins</h3>
              <p>Resell our services at your own rates. We stay behind the scenes while you grow your business and keep all the profit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-alt" data-testid="testimonials-section">
        <div className="container">
          <h2 className="section-title">Agencies Love Working With Us</h2>
          <p className="section-subtitle">Hear from agencies who transformed their delivery</p>
          <div className="testimonials-grid">
            <div className="testimonial-card" data-testid="testimonial-1">
              <p className="testimonial-text">"YourAllyPro has completely changed how we handle website projects. What used to take us 3 weeks now takes 4 days. Our clients are thrilled."</p>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div className="author-info">
                  <h4>James Davis</h4>
                  <p>Founder, Digital Growth Agency</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card" data-testid="testimonial-2">
              <p className="testimonial-text">"We added website development to our services without hiring a single developer. The profit margins are incredible and the quality is top-notch."</p>
              <div className="testimonial-author">
                <div className="author-avatar">SR</div>
                <div className="author-info">
                  <h4>Sarah Rodriguez</h4>
                  <p>CEO, BrandBoost Marketing</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card" data-testid="testimonial-3">
              <p className="testimonial-text">"The white-label approach is perfect. Our clients never know we outsource, and we've doubled our revenue from web projects."</p>
              <div className="testimonial-author">
                <div className="author-avatar">MK</div>
                <div className="author-info">
                  <h4>Michael Kim</h4>
                  <p>Director, SEO Masters Inc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section cta-section" data-testid="final-cta-section">
        <div className="container">
          <h2 className="section-title">Ready to Deliver Websites Faster?</h2>
          <p>Join agencies that have transformed their website delivery with YourAllyPro.</p>
          <a href="#contact" className="btn-white" data-testid="final-cta-btn">Partner With YourAllyPro</a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section" id="contact" data-testid="contact-section">
        <div className="container">
          <h2 className="section-title">Get Started Today</h2>
          <p className="section-subtitle">Fill out the form or book a call to discuss your partnership</p>
          <div className="contact-grid">
            <div className="contact-form" data-testid="contact-form">
              <h3 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>Send Us a Message</h3>
              {submitted && (
                <div className="success-message" data-testid="success-message">
                  Thank you! We'll get back to you within 24 hours.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    data-testid="input-name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-testid="input-email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Agency Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    data-testid="input-company"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Tell us about your agency</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    data-testid="input-message"
                  />
                </div>
                <button type="submit" className="btn-primary submit-btn" disabled={loading} data-testid="submit-btn">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            <div className="calendly-embed" data-testid="calendly-section">
              <h3>Book a Discovery Call</h3>
              <div className="calendly-placeholder">
                <p>Schedule a 15-minute call to discuss how we can help your agency</p>
                <a 
                  href="https://calendly.com/yourallypro" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary"
                  data-testid="calendly-btn"
                >
                  Schedule Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" data-testid="footer">
        <div className="container">
          <p>© 2024 YourAllyPro. All rights reserved.</p>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-btn"
        data-testid="whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}

export default App;
