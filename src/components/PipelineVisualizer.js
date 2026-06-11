'use client';

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Cpu, 
  Layers, 
  LineChart, 
  Play, 
  Check, 
  Activity, 
  HardDrive, 
  Settings 
} from 'lucide-react';
import styles from './PipelineVisualizer.module.css';

const pipelineStages = [
  {
    id: 'ingest',
    title: '1. Ingestion',
    subtitle: 'Extract & Ingest',
    icon: Settings,
    tag: 'Data Ingestion',
    tech: ['Apache Airflow', 'Kafka', 'Fivetran', 'Pub/Sub', 'SFMC'],
    description: 'Ingesting high-volume data from multiple sources: Telecom systems, customer touchpoints, and CRM logs.',
    metrics: [
      'Orchestrated SFMC pipeline synchronization for real-time tracking.',
      'Designed automated location pipelines resolving multi-layered government hierarchies.',
      'Automated GCS/S3 loads from diverse protocols (SFTP, API, DBs).'
    ]
  },
  {
    id: 'bronze',
    title: '2. Bronze (Raw)',
    subtitle: 'Immutable Data Lake',
    icon: HardDrive,
    tag: 'Raw Storage',
    tech: ['AWS S3', 'Google Cloud Storage', 'Parquet', 'HDFS'],
    description: 'Storing raw, immutable datasets immediately upon ingestion to guarantee historical traceablity and audit capabilities.',
    metrics: [
      'Ingested millions of unstructured and semi-structured payloads daily.',
      'Stored optimized Parquet schemas for high compression rates.',
      'Ensured fault-tolerant staging areas in secure cloud bucket structures.'
    ]
  },
  {
    id: 'silver',
    title: '3. Silver (Clean)',
    subtitle: 'Enriched Lakehouse',
    icon: Layers,
    tag: 'Data Lakehouse',
    tech: ['Apache Iceberg', 'Apache Spark', 'dbt', 'Trino', 'Scala'],
    description: 'Transforming and cleaning data to remove anomalies, standardize formats, and manage transactional schemas with an Iceberg lakehouse.',
    metrics: [
      'Engineered transition from unmanaged S3 Parquet to governed Apache Iceberg.',
      'Utilized dbt and Spark (with Scala) for complex deduplication and transforms.',
      'Created standardized government regional hierarchy location tables.'
    ]
  },
  {
    id: 'gold',
    title: '4. Gold (Warehouse)',
    subtitle: 'Aggregated & Governed',
    icon: Database,
    tag: 'Data Warehouse',
    tech: ['Amazon Redshift', 'Snowflake', 'Google BigQuery', 'PostgreSQL'],
    description: 'Business-level aggregates and governed star-schemas optimized for analytical queries, reporting, and dashboard engines.',
    metrics: [
      'Defined platform standards for a multi-bank partner fintech data ecosystem.',
      'Modeled high-performance schemas in Snowflake and Redshift.',
      'Achieved a 30% increase in pipeline performance using optimized BigQuery DAGs.'
    ]
  },
  {
    id: 'analytics',
    title: '5. Analytics',
    subtitle: 'Actionable Insights',
    icon: LineChart,
    tag: 'Business Intelligence',
    tech: ['Apache Superset', 'Power BI', 'Looker Studio', 'Redash'],
    description: 'Delivering metrics to stakeholders, business intelligence dashboards, and machine learning models for strategic decision making.',
    metrics: [
      'Leveraged analytics from 15 million active Telecom subscribers to shape marketing.',
      'Connected Superset and Redash to Trino/Redshift for real-time business reporting.',
      'Enabled automated forecasting models with 95% key metric accuracy.'
    ]
  }
];

export default function PipelineVisualizer() {
  const [activeStage, setActiveStage] = useState('ingest');
  const [isSimulating, setIsSimulating] = useState(true);

  // Auto transition to show interactive flow if simulating
  useEffect(() => {
    if (!isSimulating) return;
    
    const interval = setInterval(() => {
      setActiveStage((current) => {
        const currentIndex = pipelineStages.findIndex(s => s.id === current);
        const nextIndex = (currentIndex + 1) % pipelineStages.length;
        return pipelineStages[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const activeStageData = pipelineStages.find(s => s.id === activeStage);

  return (
    <div className={styles.visualizerContainer}>
      <div className={styles.controls}>
        <div className={styles.intro}>
          <p>
            An interactive representation of the <strong>Medallion Lakehouse Architecture</strong> I specialize in designing. Click each node below to view technical accomplishments at that stage.
          </p>
        </div>
        <button 
          className="btn btn-secondary"
          onClick={() => setIsSimulating(!isSimulating)}
          style={{ gap: '0.5rem', whiteSpace: 'nowrap' }}
        >
          <Activity size={18} className={isSimulating ? 'animate-float' : ''} style={{ color: isSimulating ? 'var(--accent-cyan)' : 'inherit' }} />
          {isSimulating ? 'Pause Data Simulation' : 'Simulate Data Flow'}
        </button>
      </div>

      <div className={styles.pipelineFlow}>
        {/* SVG connection lines behind the nodes */}
        <svg className={styles.connectionsSvg} viewBox="0 0 1000 200" preserveAspectRatio="none">
          {/* Base inactive connection line */}
          <path d="M 100,100 L 900,100" className={styles.flowPath} />
          {/* Active moving dash path */}
          {isSimulating && (
            <path d="M 100,100 L 900,100" className={styles.flowPathActive} />
          )}
        </svg>

        {pipelineStages.map((stage) => {
          const IconComponent = stage.icon;
          const isActive = stage.id === activeStage;
          
          return (
            <div 
              key={stage.id} 
              className={`${styles.node} ${isActive ? styles.activeNode : ''}`}
              onClick={() => {
                setActiveStage(stage.id);
                setIsSimulating(false); // Pause auto-rotation when user interacts
              }}
            >
              <div className={styles.iconWrapper}>
                <IconComponent size={28} />
              </div>
              <span className={styles.nodeTitle}>{stage.title}</span>
              <span className={styles.nodeSubtitle}>{stage.subtitle}</span>
            </div>
          );
        })}
      </div>

      {activeStageData && (
        <div className={styles.detailPanel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTag}>{activeStageData.tag}</span>
            <h3 className={styles.panelTitle}>{activeStageData.subtitle}</h3>
            <div className={styles.panelTech}>
              {activeStageData.tech.map(t => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>
          </div>
          <div className={styles.panelBody}>
            <p className={styles.panelDesc}>{activeStageData.description}</p>
            <ul className={styles.metricsList}>
              {activeStageData.metrics.map((metric, i) => (
                <li key={i}>
                  <Check size={16} className={styles.metricCheck} />
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
