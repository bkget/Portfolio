'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import styles from './Skills.module.css';

const categories = [
  { id: 'all', name: 'All Skills' },
  { id: 'languages', name: 'Languages' },
  { id: 'processing', name: 'ETL & Orchestration' },
  { id: 'storage', name: 'Storage & Warehouse' },
  { id: 'analytics', name: 'Analytics & BI' },
  { id: 'devops', name: 'DevOps & MLOps' }
];

const skills = [
  // Languages
  { name: 'Python', category: 'languages' },
  { name: 'Scala', category: 'languages' },
  { name: 'SQL', category: 'languages' },
  { name: 'PL/SQL', category: 'languages' }, 
  { name: 'JavaScript', category: 'languages' },

  // Processing & ETL
  { name: 'Apache Airflow', category: 'processing' },
  { name: 'Apache Spark', category: 'processing' },
  { name: 'Apache Trino', category: 'processing' },
  { name: 'Data Build Tool (dbt)', category: 'processing' },
  { name: 'Apache Kafka', category: 'processing' }, 
  { name: 'Salesforce Marketing Cloud (SFMC)', category: 'processing' },
  { name: 'Druid', category: 'processing' },
  { name: 'Azure Data Factory', category: 'processing' },
  
  // Storage & Warehousing
  { name: 'Amazon Redshift', category: 'storage' },
  { name: 'Snowflake', category: 'storage' },
  { name: 'AWS S3', category: 'storage' },
  { name: 'Google Cloud Storage', category: 'storage' },
  { name: 'Google BigQuery', category: 'storage' },
  { name: 'PostgreSQL', category: 'storage' },
  { name: 'MySQL', category: 'storage' },
  { name: 'Oracle DB', category: 'storage' },
  { name: 'MS SQL Server', category: 'storage' }, 

  // BI & Analytics
  { name: 'Apache Superset', category: 'analytics' },
  { name: 'Power BI', category: 'analytics' },
  { name: 'Looker Studio', category: 'analytics' },
  { name: 'Pandas', category: 'analytics' },

  // DevOps & MLOps
  { name: 'Docker', category: 'devops' },
  { name: 'GitHub Actions', category: 'devops' },
  { name: 'GitHab', category: 'devops' },
  { name: 'GitLab', category: 'devops' }, 
  { name: 'Bash', category: 'devops' }, 
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = activeTab === 'all' || skill.category === activeTab;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.skillsContainer}>
      <div className={styles.searchAndFilter}>
        <div className={styles.tabs}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.tab} ${activeTab === cat.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search skills (e.g. Airflow)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.skillsGrid}>
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <div key={skill.name} className={styles.skillCard}>
              <span className={styles.skillName}>{skill.name}</span>
              <span className={styles.skillCategory}>
                {categories.find(c => c.id === skill.category)?.name || skill.category}
              </span>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            No skills found matching "{searchQuery}" under this category.
          </div>
        )}
      </div>
    </div>
  );
}
