import React from 'react';
import PageButtonsPanel from '../components/pagebutton/pagebuttonpanel.js';
import { ProceduralBackgroundOnly } from '../components/background/BackgroundOnly.js';


export const Resume = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <ProceduralBackgroundOnly />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          padding: "2rem",
          color: "white",
          textAlign: "center",
        }}
      >
        <div>
          <h1>Resume</h1>
          <p>Last updated on 10/10/25.</p>

          {/* PDF preview */}
          <div style={{ width: "55%", height: "88vh", margin: "2rem auto" }}>
            <iframe
              src="/Jackson_Greninger_Engineering_Resume.pdf"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "8px",
              }}
              title="Resume Preview"
            />
          </div>
        </div>
      
        <div style={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <PageButtonsPanel />
        </div>
      </div>
    </div>
  );
};