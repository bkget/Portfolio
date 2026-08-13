'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Play, Square, Terminal as TerminalIcon } from 'lucide-react';
import styles from './Projects.module.css';

const projects = [
  {
    id: 'agentic_copilot',
    title: 'Retail Agentic Copilot',
    githubUrl: 'https://github.com/bkget/retail-agentic-copilot',
    tech: ['Python', 'Next.js', 'PostgreSQL', 'FastAPI', 'Gemini Flash', 'sqlglot', 'Docker'],
    bullets: [
      'Designed a conversational analytics platform allowing users to ask plain English questions over a 1,000,000-row PostgreSQL retail sales database.',
      'Implemented an AST-validated SQL guardrail using sqlglot to parse queries, enforce table allow-lists, and prevent DML query injections before execution.',
      'Created a streaming SSE (Server-Sent Events) pipeline to push orchestrator statuses, generated SQL statements, narrative answers, and interactive charts live to the user.',
      'Gated CI deployment at ≥90% execution accuracy using an automated testing accuracy harness.'
    ],
    logs: [
      { level: 'info', text: 'Initializing Airflow DAG: retail_agentic_copilot_pipeline' },
      { level: 'info', text: 'Incoming user query: "total revenue by division in 2024"' },
      { level: 'info', text: 'Intent classification: conversational database query' },
      { level: 'info', text: 'Invoking Gemini Flash to generate read-only PostgreSQL query...' },
      { level: 'info', text: 'SQL generated: SELECT division, SUM(price) FROM sales WHERE EXTRACT(YEAR FROM sale_date) = 2024 GROUP BY division;' },
      { level: 'info', text: 'Verifying query with AST Guardrail...' },
      { level: 'success', text: 'sqlglot: AST verification PASSED. Safe read-only SELECT query.' },
      { level: 'info', text: 'Executing validated query on PostgreSQL database...' },
      { level: 'success', text: 'Returned 7 rows in 42ms.' },
      { level: 'info', text: 'Formatting response with hallucination-safe narrative parser...' },
      { level: 'success', text: 'Response streamed to front-end client via Server-Sent Events.' },
      { level: 'success', text: 'Orchestrator session finished successfully. [Exit 0]' }
    ]
  },
  {
    id: 'ad_prediction',
    title: 'AdTech Creative Performance Prediction',
    githubUrl: 'https://github.com/bkget/Ad-Challenge',
    tech: ['Python', 'PostgreSQL', 'FastAPI', 'LightGBM', 'ResNet50', 'OpenCV', 'Docker', 'DVC'],
    bullets: [
      'Built an end-to-end Machine Learning platform predicting click-through rate (CTR) and engagement rate (ER) of digital advertising images before launch.',
      'Extracted 2048-dimensional visual embeddings using ResNet50 deep learning, compressing them via PCA to 32 dimensions for LightGBM compatibility.',
      'Engineered a multimodal feature store linking campaign parameters, budgets, and user contexts with image-based color histograms, brightness, and visual features.',
      'Implemented GroupKFold cross-validation grouped by campaign to prevent data leakage and ensure generalizability on unseen campaigns.'
    ],
    logs: [
      { level: 'info', text: 'Starting pipeline run: ad_creative_prediction_training' },
      { level: 'info', text: 'Loading raw datasets: briefing.csv and inventory.parquet' },
      { level: 'info', text: 'Preprocessing image creatives and extracting visual heuristics (brightness, saturation, entropy)...' },
      { level: 'info', text: 'Passing 144 creative PNG images through ResNet50 backbone...' },
      { level: 'success', text: 'Visual features extracted. Dim-reduction (PCA) compressed 2048-D to 32-D vectors.' },
      { level: 'info', text: 'Assembling multimodal dataset (Contextual features + Tabular meta + Visual features)...' },
      { level: 'info', text: 'Training LightGBM Regressor using GroupKFold cross-validation (Grouped by campaign)...' },
      { level: 'success', text: 'Training complete. R2 Score: 0.952 (Multimodal model improved R2 by 19.3%).' },
      { level: 'info', text: 'Exporting benchmarks and pipeline weights to PostgreSQL database...' },
      { level: 'success', text: 'Inference model saved to models/lightgbm_v1.bin and loaded by FastAPI serving layer.' },
      { level: 'success', text: 'Pipeline run complete. [Exit 0]' }
    ]
  },
  {
    id: 'open_source_platform',
    title: 'Modern Open-Source Data Platform (CDC & OLAP)',
    githubUrl: 'https://github.com/bkget/inkomoko-data-platform',
    tech: ['PostgreSQL', 'Debezium', 'Redpanda', 'ClickHouse', 'dbt', 'Dagster', 'Prometheus', 'Grafana'],
    bullets: [
      'Designed a production-grade, vendor-agnostic data platform capable of processing real-time analytical workloads under constrained resources.',
      'Implemented near-real-time Change Data Capture (CDC) utilizing Debezium to stream logical replication slots from PostgreSQL OLTP into Redpanda (Kafka-compatible).',
      'Configured ClickHouse OLAP database with a native Kafka engine to automatically consume streams, collapsing event history using ReplacingMergeTree and dbt staging.',
      'Orchestrated the complete pipeline (API ingestion, CDC verification, dbt compiles, and dbt tests) using Dagster for end-to-end data lineage.',
      'Built observability framework featuring Grafana alerts and cdc-monitor to compare Postgres/ClickHouse row counts and trigger alert notifications on CDC replication lag.'
    ],
    logs: [
      { level: 'info', text: 'Initializing Dagster asset materialization...' },
      { level: 'info', text: 'Polling public Kiva Loan REST API search endpoint...' },
      { level: 'success', text: 'Upserted 5,000 active loan records into PostgreSQL oltp.raw_data.' },
      { level: 'info', text: 'Debezium CDC capturing WAL logical replication slot changes...' },
      { level: 'success', text: 'Streamed 5,000 JSON CDC event messages to Redpanda topic: cdc.raw_data.loans' },
      { level: 'info', text: 'ClickHouse Kafka-engine consuming Redpanda topics in real-time...' },
      { level: 'success', text: 'Sunk 5,000 raw events directly to raw_data.loans_raw' },
      { level: 'info', text: 'Dagster running dbt models inside ClickHouse...' },
      { level: 'info', text: 'dbt: running model staging.stg_loans (ReplacingMergeTree FINAL) [OK]' },
      { level: 'info', text: 'dbt: running model analytics.mart_loans_by_sector [OK]' },
      { level: 'success', text: 'dbt validations passed. 0 data errors detected.' },
      { level: 'info', text: 'cdc-monitor checking data sync status...' },
      { level: 'success', text: 'Observability check: CDC row count drift = 0, replication lag = 0.38s.' },
      { level: 'success', text: 'Asset materialization complete.' }
    ]
  }
];

export default function Projects() {
  const [activeProjId, setActiveProjId] = useState('agentic_copilot');
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
