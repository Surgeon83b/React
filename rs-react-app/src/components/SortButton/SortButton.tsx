import React from "react";
import styles from "./SortButton.module.css";

interface SortButtonProps {
  label: string;
  isActive: boolean;
  sortOrder: "asc" | "desc";
  onClick: () => void;
}

export const SortButton: React.FC<SortButtonProps> = React.memo(
  ({ label, isActive, sortOrder, onClick }) => {
    return (
      <button
        className={`${styles.sortButton} ${isActive ? styles.active : ""}`}
        onClick={onClick}
      >
        {label} {isActive && (sortOrder === "asc" ? "↑" : "↓")}
      </button>
    );
  },
);

SortButton.displayName = "SortButton";
