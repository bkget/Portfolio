import React from 'react';
import { Download, ArrowRight } from 'lucide-react';
import PipelineVisualizer from '@/components/PipelineVisualizer';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* Sticky Header */}
      <header className={styles.header}>
        <div className={`${styles.navContainer} container`}>
          <div className={styles.logo}>
            BG<span>.data</span><span className={styles.logoDot}></span>
          </div>
          <nav>
            <ul className={styles.navLinks}>
              <li><a href="#pipeline">Pipeline Visualizer</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="container">
        
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.availBadge}>
              <span className={styles.availDot}></span>
              Available for Contracts & Remote Work
            </div>
            <h1 className={styles.title}>Biruk Getaneh</h1>
            <h2 className={styles.roleTitle} style={{ margin: 0 }}>Senior Data Engineer</h2>
            <p className={styles.heroDesc}>
              I design and optimize end-to-end data pipelines, utilizing medallion lakehouse architectures, 
              scalable warehousing, and automated ETL workflows to transform raw telemetry into high-quality business assets.
            </p>
            <div className={styles.ctaGroup}>
              <a href="#pipeline" className="btn btn-primary">
                Explore Pipelines <ArrowRight size={16} />
              </a>
              <a href="/Biruk_CV___DE.pdf" download className="btn btn-secondary">
                <Download size={16} /> Download CV
              </a>
            </div>
          </div>

          {/* Core Metrics from Resume */}
          <div className={styles.metricsGrid}>
            <div className={`${styles.metricCard} glass-card`}>
              <span className={styles.metricVal}>15M+</span>
              <p className={styles.metricLabel}>Subscriber Data Handled</p>
              <p className={styles.metricSublabel}>Safaricom Telecom Analytics</p>
            </div>
            <div className={`${styles.metricCard} glass-card`}>
              <span className={styles.metricVal}>30%</span>
              <p className={styles.metricLabel}>Pipeline Efficiency Gain</p>
              <p className={styles.metricSublabel}>BigQuery, Dataflow & Pub/Sub</p>
            </div>
            <div className={`${styles.metricCard} glass-card`}>
              <span className={styles.metricVal}>25%</span>
              <p className={styles.metricLabel}>DB Performance Boost</p>
              <p className={styles.metricSublabel}>Snowflake & SFMC Optimization</p>
            </div>
          </div>
        </section>

        {/* Medallion Pipeline Visualizer */}
        <section id="pipeline" className="section">
          <h2>Data Pipeline Architecture</h2>
          <p className={styles.sectionIntro}>
            Click through the stages of a standard Medallion architecture to see how I ingest, clean, store, and analyze complex datasets.
          </p>
          <PipelineVisualizer />
        </section>

        {/* Experience Timeline */}
        <section id="experience" className="section">
          <h2>Professional Journey</h2>
          <p className={styles.sectionIntro}>
            A timeline of my professional experience driving data strategies across telecommunications, fintech, and enterprise environments.
          </p>
          <Experience />
        </section>

        {/* Projects & Terminal */}
        <section id="projects" className="section">
          <h2>Featured Systems</h2>
          <p className={styles.sectionIntro}>
            Explore some of my core data engineering projects and trigger simulated Airflow pipeline runs in the adjacent console.
          </p>
          <Projects />
        </section>

        {/* Skills Grid */}
        <section id="skills" className="section">
          <h2>Technical Toolbox</h2>
          <p className={styles.sectionIntro}>
            A comprehensive list of technologies, frameworks, and programming languages I use to build scalable data platforms.
          </p>
          <Skills />
        </section>

        {/* Contact Form */}
        <section id="contact" className="section" style={{ paddingBottom: '10rem' }}>
          <h2>Get In Touch</h2>
          <p className={styles.sectionIntro}>
            Drop me a message to discuss data infrastructure, freelance opportunities, or collaboration.
          </p>
          <Contact />
        </section>

      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`${styles.footerContainer} container`}>
          <div className={styles.logo}>
            BG<span>.data</span><span className={styles.logoDot}></span>
          </div>
          <div className={styles.footerLinks}>
            <a href="https://github.com/bkget" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://linkedin.com/in/bkget" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Biruk Getaneh. Built with Next.js and custom Vanilla CSS.
          </p>
        </div>
      </footer>
    </>
  );
}
