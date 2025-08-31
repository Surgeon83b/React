import React from "react";
import styles from "./ProgressIndicator.module.css";

interface ProgressIndicatorProps {
  progress: number;
  isLoading: boolean;
  stage?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  isLoading,
  stage = "processing",
}) => {
  if (!isLoading) return null;

  const getStageText = () => {
    switch (stage) {
      case "downloading":
        return "Downloading data...";
      case "parsing":
        return "Processing data...";
      case "complete":
        return "Finalizing...";
      default:
        return "Loading data...";
    }
  };

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressHeader}>
        <h3>Loading CO2 Emissions Data</h3>
        <p>This may take a while due to the large dataset (210MB)</p>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={styles.progressInfo}>
        <div className={styles.progressText}>
          {getStageText()} {Math.round(progress)}%
        </div>
        <div className={styles.stageText}>Stage: {stage}</div>
      </div>

      <div className={styles.progressNote}>
        Please don't close this page while loading...
      </div>
    </div>
  );
};
