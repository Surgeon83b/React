import React from 'react';
import styles from './SkeletonLoader.module.css';

export const SkeletonLoader: React.FC = React.memo(() => {
  return (
    <div className={styles.skeletonContainer}>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          <div className={styles.skeletonHeader}>
            <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`}></div>
            <div className={`${styles.skeletonLine} ${styles.skeletonSubtitle}`}></div>
          </div>
          <div className={styles.skeletonTable}>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <div key={rowIndex} className={styles.skeletonRow}>
                <div className={styles.skeletonCell}></div>
                <div className={styles.skeletonCell}></div>
                <div className={styles.skeletonCell}></div>
                <div className={styles.skeletonCell}></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

SkeletonLoader.displayName = 'SkeletonLoader';