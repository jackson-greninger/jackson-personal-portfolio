import React from 'react';
import PageButtonsPanel from '../components/pagebutton/pagebuttonpanel.js';
import DisplacementSphere from '../components/background/DisplacementSphere';

export const About = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
        <DisplacementSphere
          primaryColor="106, 13, 173"
          backgroundColor="216, 180, 254"
          rotationSpeed={0.001}
          sphereAmplitude={0.00005}
        />
        
        <h1>About Me</h1>
        <p>Something crucial to my identity.</p>
      
        {/* Right-side buttons */}
        <PageButtonsPanel />
    </div>
  );
};
