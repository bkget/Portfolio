'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000); // clear success state after 5 seconds
    }, 1500);
  };

  return (
    <div className={styles.contactGrid}>
      <div className={styles.infoColumn}>
        <div className={styles.infoDetails}>
          <h3 className={styles.infoHeading}>Let's Connect</h3>
          <p className={styles.infoText} style={{ marginTop: '0.5rem' }}>
            Looking for a Senior Data Engineer to design, scale, or optimize your data pipelines? Feel free to reach out.
          </p>
        </div>

        <div className={styles.infoList}>
          <a href="mailto:bkgetmom@gmail.com" className={styles.infoItem}>
            <div className={styles.iconCircle}>
              <Mail size={20} />
            </div>
            <div className={styles.infoDetails}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoVal}>bkgetmom@gmail.com</span>
            </div>
          </a>

          <a href="tel:+251940369300" className={styles.infoItem}>
            <div className={styles.iconCircle}>
              <Phone size={20} />
            </div>
            <div className={styles.infoDetails}>
              <span className={styles.infoLabel}>Call / Telegram</span>
              <span className={styles.infoVal}>+251 940-369300</span>
            </div>
          </a>

          <div className={styles.infoItem}>
            <div className={styles.iconCircle}>
              <MapPin size={20} />
            </div>
            <div className={styles.infoDetails}>
              <span className={styles.infoLabel}>Location</span>
              <span className={styles.infoVal}>Addis Ababa, Ethiopia</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card">
        {status === 'success' ? (
          <div className={styles.successMessage}>
            <CheckCircle size={32} />
            <div>
              <h4 style={{ fontSize: '1.2rem', color: '#fff' }}>Message Sent!</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Thank you. I will get back to you shortly.
              </p>
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder=" "
                  className={styles.input}
                  value={form.name}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                />
                <label htmlFor="name" className={styles.label}>Your Name</label>
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder=" "
                  className={styles.input}
                  value={form.email}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                />
                <label htmlFor="email" className={styles.label}>Email Address</label>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder=" "
                className={styles.input}
                value={form.subject}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
              <label htmlFor="subject" className={styles.label}>Subject</label>
            </div>

            <div className={styles.inputGroup}>
              <textarea
                name="message"
                id="message"
                required
                placeholder=" "
                className={`${styles.input} ${styles.textarea}`}
                value={form.message}
                onChange={handleChange}
                disabled={status === 'loading'}
              ></textarea>
              <label htmlFor="message" className={styles.label}>Message</label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary submitBtn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <Loader size={16} className="animate-float" /> Sending...
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
