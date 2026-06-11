'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Play, Square, Terminal as TerminalIcon } from 'lucide-react';
import styles from './Projects.module.css';

const projects = [
  {
    id: 'ad_analysis',
    title: 'Advertisement Data Analysis',
    githubUrl: 'https://github.com/bkget/Ad-Challenge',
    tech: ['Python', 'SQL', 'dbt', 'Airflow', 'PostgreSQL', 'Docker', 'Machine Learning'],
    bullets: [
      'Orchestrated data wrangling operations to seamlessly connect data from different stages of the creative creation and Ad placement process, resulting in a unified dataset.',
      'Devised and deployed a cutting-edge machine learning model to accurately forecast key performance indicators using the integrated data, achieving an impressive accuracy rate of 95%.',
      'Developed an intuitive user interface for machine learning tasks, facilitating seamless integration for predictive analytics and ensuring a streamlined workflow.'
    ],
    logs: [
      { level: 'info', text: 'Initializing Airflow DAG: ad_analysis_pipeline' },
      { level: 'info', text: 'Task 1/4: extract_ad_impressions starting...' },
      { level: 'info', text: 'Fetching telemetry from SFMC and Ad servers...' },
      { level: 'success', text: 'Ingested 124,500 raw impression items to s3://raw-lake/ads/' },
      { level: 'info', text: 'Task 2/4: location_hierarchy_cleanup starting...' },
      { level: 'info', text: 'Standardizing Ethiopian regional hierarchies using location mappings...' },
      { level: 'success', text: 'dbt: clean_location_coordinates [OK in 8.4s]' },
      { level: 'info', text: 'Task 3/4: train_forecasting_kpi_model starting...' },
      { level: 'info', text: 'Fitting XGBoost regressor on ad impressions & media placements...' },
      { level: 'success', text: 'Model validation success. R2 Score: 0.952. RMSE: 0.041' },
      { level: 'info', text: 'Task 4/4: load_to_redshift starting...' },
      { level: 'success', text: 'Redshift tables updated and indexed.' },
      { level: 'success', text: 'Refreshed Looker Studio reporting dashboards.' },
      { level: 'success', text: 'DAG ad_analysis_pipeline finished successfully. [Exit 0]' }
    ]
  },
  {
    id: 'elt_warehousing',
    title: 'ELT - Data Warehousing',
    githubUrl: 'https://github.com/bkget/ELT-Data-Warehousing',
    tech: ['Python', 'SQL', 'Airflow', 'PostgreSQL', 'dbt', 'Docker', 'Redash'],
    bullets: [
      'Engineered a scalable data warehouse infrastructure to efficiently store and manage vehicle trajectory data sourced from CSV files, deploying a PostgreSQL database for robust data storage.',
      'Leveraged dbt for seamless data transformation processes, ensuring data integrity, data quality, and schema enforcement.',
      'Utilized Airflow for effective data orchestration, automating and scheduling workflows for streamlined operations.',
      'Presented comprehensive reports and visualizations using Redash for enhanced data analysis and decision-making capabilities.'
    ],
    logs: [
      { level: 'info', text: 'Initializing Airflow DAG: vehicle_trajectory_elt' },
      { level: 'info', text: 'Task 1/3: raw_csv_extract starting...' },
      { level: 'info', text: 'Extracting vehicle trajectory logs from local ingestion mount...' },
      { level: 'success', text: 'Successfully parsed 4,200,000 GPS ping data rows.' },
      { level: 'info', text: 'Task 2/3: transform_and_load_postgres starting...' },
      { level: 'info', text: 'dbt: compiling models in postgres...' },
      { level: 'info', text: 'dbt: running model stg_trajectory_telemetry [OK]' },
      { level: 'info', text: 'dbt: running model fct_vehicle_trips [OK]' },
      { level: 'success', text: 'All dbt transformations completed successfully.' },
      { level: 'info', text: 'Task 3/3: refresh_redash_cache starting...' },
      { level: 'success', text: 'Redash telemetry dashboards updated successfully.' },
      { level: 'success', text: 'DAG vehicle_trajectory_elt finished successfully. [Exit 0]' }
    ]
  }
];

export default function Projects() {
  const [activeProjId, setActiveProjId] = useState('ad_analysis');
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const logTimerRef = useRef(null);
  const terminalBodyRef = useRef(null);

  const activeProject = projects.find(p => p.id === activeProjId);

  // Auto-scroll the terminal body container internally when new logs print
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (logTimerRef.current) clearTimeout(logTimerRef.current);
    };
  }, []);

  // Set default terminal message
  useEffect(() => {
    stopPipeline();
    setConsoleLogs([
      { level: 'system', text: `Terminal ready. Click "Run Pipeline" to simulate orchestration.` }
    ]);
  }, [activeProjId]);

  const startPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setConsoleLogs([]);
    
    let logIndex = 0;
    const projectLogs = activeProject.logs;

    const printNextLog = () => {
      if (logIndex < projectLogs.length) {
        const timestamp = new Date().toLocaleTimeString();
        setConsoleLogs(prev => [
          ...prev, 
          { 
            ...projectLogs[logIndex], 
            timestamp 
          }
        ]);
        logIndex++;
        logTimerRef.current = setTimeout(printNextLog, Math.random() * 800 + 400); // random time between 400-1200ms
      } else {
        setIsRunning(false);
      }
    };

    printNextLog();
  };

  const stopPipeline = () => {
    if (logTimerRef.current) clearTimeout(logTimerRef.current);
    setIsRunning(false);
  };

  return (
    <div className={styles.projectsSection}>
      <div className={styles.cardsContainer}>
        {projects.map((proj) => {
          const isActive = proj.id === activeProjId;
          return (
            <div 
              key={proj.id} 
              className={`${styles.projectCard} glass-card ${isActive ? styles.projectCardActive : ''}`}
              onClick={() => setActiveProjId(proj.id)}
            >
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>{proj.title}</h3>
                <a 
                  href={proj.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.projectLink}
                  onClick={(e) => e.stopPropagation()} // Prevent selecting card when clicking link
                >
                  <ExternalLink size={16} />
                </a>
              </div>
              
              <div className={styles.techStack}>
                {proj.tech.map(t => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>

              <ul className={styles.bullets}>
                {proj.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>

              <button 
                className={`${styles.runBtn} ${isRunning && isActive ? styles.runBtnActive : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Avoid selecting card if already running
                  setActiveProjId(proj.id);
                  if (isRunning && isActive) {
                    stopPipeline();
                    setConsoleLogs(prev => [...prev, { level: 'warning', text: 'Pipeline run aborted by user.' }]);
                  } else {
                    startPipeline();
                  }
                }}
              >
                {isRunning && isActive ? (
                  <>
                    <Square size={12} fill="currentColor" /> Stop Pipeline
                  </>
                ) : (
                  <>
                    <Play size={12} fill="currentColor" /> Run Pipeline
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.terminalContainer}>
        <div className={styles.terminalHeader}>
          <div className={styles.terminalDots}>
            <div className={`${styles.dot} ${styles.dotRed}`}></div>
            <div className={`${styles.dot} ${styles.dotYellow}`}></div>
            <div className={`${styles.dot} ${styles.dotGreen}`}></div>
          </div>
          <span className={styles.terminalTitle}>
            <TerminalIcon size={12} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
            airflow_dag_run ({activeProject.id}_dag.py)
          </span>
          <div style={{ width: '40px' }}></div>
        </div>

        <div className={styles.terminalBody} ref={terminalBodyRef}>
          {consoleLogs.map((log, i) => (
            <div key={i} className={styles.logLine}>
              {log.timestamp && <span className={styles.logTimestamp}>[{log.timestamp}]</span>}
              {log.level === 'info' && <span className={styles.logLevelInfo}>[INFO]</span>}
              {log.level === 'success' && <span className={styles.logLevelSuccess}>[SUCCESS]</span>}
              {log.level === 'warning' && <span className={styles.logLevelWarning}>[WARN]</span>}
              {log.level === 'system' && <span style={{ color: 'var(--text-muted)' }}>&gt;&gt;</span>}
              {' '}{log.text}
            </div>
          ))}
          {isRunning && <div className={styles.logCursor}></div>}
        </div>
      </div>
    </div>
  );
}
