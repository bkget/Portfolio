'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import styles from './Experience.module.css';

const experiences = [
  {
    company: 'Kifiya Financial Technology',
    role: 'Senior Data Engineer',
    period: 'Dec 2025 – Present',
    location: 'Addis Ababa, Ethiopia',
    bullets: [
      'Engineered the transition from unmanaged S3 Parquet to a governed Apache Iceberg lakehouse and Redshift Data Warehouse utilizing a medallion architecture, defining the core platform standards for a multi-bank partner fintech data ecosystem.',
      'Architected and deployed an OLake-based Change Data Capture (CDC) mechanism in the middleware infrastructure, replacing legacy full-dump data ingestion and enabling real-time delta tracking into a Trino-managed Apache Iceberg bronze layer.',
      'Designed and engineered an automated Ethiopian location standardization pipeline, normalizing highly fragmented, multi-layer user inputs into official government regional hierarchies (Region, City, Zone/Sub-city, and Woreda) to drive accurate business reporting.',
      'Built robust Apache Airflow pipelines to ingest data from varied sources, staged it in AWS S3, applying complex transformations, managing multi-version storage in Trino, and loading reporting-ready data into Amazon Redshift.',
      'Established an automated data observability framework by developing holistic data ingestion and freshness monitoring dashboards coupled with real-time Microsoft Teams alerts, drastically minimizing time-to-detect (TTD) for pipeline failures and processing delays.'
    ]
  },
  {
    company: 'Safaricom Telecommunications Ethiopia',
    role: 'Big Data Analytics Engineer',
    period: 'Sep 2023 – Nov 2025',
    location: 'Addis Ababa, Ethiopia',
    bullets: [
      'Leveraged data from 15 million active Telecom subscribers using advanced analytics to shape targeted marketing and service delivery strategies, ensuring 100% availability of aggregated customer lifecycle data in the managed data warehouse.',
      'Designed and implemented efficient ETL pipelines, guaranteeing smooth extraction from a data lake, transforming, and loading of data into a data-warehouse, resulting in improved data processing efficiency.',
      'Utilized Apache Airflow as a workflow manager, Spark (with Scala) for intricate transformations, and Superset and Power BI for reporting and dashboarding, leading to enhanced data processing workflows and improved reporting accuracy.'
    ]
  },
  {
    company: 'Mattress Firm',
    role: 'Data Engineer, Contract',
    period: 'Feb 2024 – Aug 2025',
    location: 'US, Remote',
    bullets: [
      'Leveraged Google Cloud Platform (GCP) tools such as BigQuery, Dataflow, and Pub/Sub to analyze data, design pipelines, and automate data flows, resulting in a 30% increase in data processing efficiency.',
      'Developed Composer Airflow DAGs to automate data loading from diverse sources such as SFTP and shared Drive into Google Cloud Storage, merging the data into BigQuery tables.',
      'Applied complex data transformations in the data warehouse using dbt jobs, ensuring data integrity and quality, which led to more accurate analytics and reporting capabilities.'
    ]
  },
  {
    company: 'Exxon Mobil',
    role: 'Data Engineer',
    period: 'Jul 2022 – Jul 2024',
    location: 'US, Remote',
    bullets: [
      'Managed customer relationship management by leveraging Salesforce Marketing Cloud & Snowflake.',
      'Orchestrated end-to-end data processing, analysis, and implemented automated workflows.',
      'Re-engineered backend data pipelines in SFMC, seamlessly synchronizing multiple tasks, and validated data integration processes to ensure accuracy and efficiency, resulting in a 25% enhancement of overall computational performance.',
      'Developed and refined SFMC automation monitoring for real-time tracking of automation statuses, ensuring complete oversight and 100% control over all active automations.',
      'Pioneered an automated data backup and monitoring system for enhanced data security.'
    ]
  },
  {
    company: 'Haramaya University',
    role: 'Assistant Lecturer',
    period: 'Oct 2015 – Sep 2019',
    location: 'Haramaya, Ethiopia',
    bullets: [
      'Served as an IT Lecturer, delivering advanced technical instruction, leading external training sessions, and establishing standardized frameworks for evaluating complex engineering and practical projects.',
      'Mentored, coached, and guided students through innovative research and technical projects, setting rigorous documentation and implementation standards to foster industry collaboration.'
    ]
  }
];

export default function Experience() {
  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineLine}></div>
      
      {experiences.map((exp, idx) => {
        return (
          <div 
            key={exp.company + idx} 
            className={styles.timelineItem}
          >
            <div className={styles.timelineDot}></div>
            <div className={`${styles.card} glass-card`}>
              <div className={styles.header}>
                <div className={styles.companyInfo}>
                  <h3 className={styles.company}>{exp.company}</h3>
                  <span className={styles.role}>{exp.role}</span>
                </div>
                <div className={styles.metaInfo}>
                  <span className={styles.period}>{exp.period}</span>
                  <span className={styles.location}>
                    <MapPin size={12} style={{ color: 'var(--accent-purple)' }} />
                    {exp.location}
                  </span>
                </div>
              </div>
              <ul className={styles.details}>
                {exp.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
