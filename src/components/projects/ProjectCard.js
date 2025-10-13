import React from "react";
import "./Timeline.css";

export const ProjectCard = ({ title, description, tech }) => {
  return (
    <div
      style={{
        background: "rgba(121, 119, 119, 0)",
        borderRadius: "1rem",
        padding: "1.5rem",
        margin: "1rem 0",
        color: "white",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        width: "90%",
        maxWidth: "500px",
        textAlign: "left",
        transition: "transform 0.2s, box-shadow 0.2s, border 0.2s",
        cursor: "pointer",
        border: "2px solid transparent",
      }}
      className="project-card"
    >
      <h2 style={{ marginBottom: "0.5rem", color: "#ffae00" }}>{title}</h2>
      <p style={{ marginBottom: "0.75rem", lineHeight: "1.6" }}>{description}</p>
      <p style={{ fontStyle: "italic", opacity: 0.8 }}>{tech}</p>
    </div>
  );
};
