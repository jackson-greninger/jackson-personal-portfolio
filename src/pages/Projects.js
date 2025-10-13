// src/pages/Projects.js
import React from "react";
import PageButtonsPanel from "../components/pagebutton/pagebuttonpanel.js";
import { ProceduralBackgroundOnly } from "../components/background/BackgroundOnly.js";
import { ProjectTimeline } from "../components/projects/ProjectTimeline";

export const Projects = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh", color: "white" }}>
      <ProceduralBackgroundOnly />
      <div style={{ position: "relative", zIndex: 1, padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#ffae00", marginBottom: "2rem" }}>
          Projects
        </h1>

        {/* Let ProjectTimeline flow naturally */}
        <ProjectTimeline />

        <PageButtonsPanel />
      </div>
    </div>
  );
};

