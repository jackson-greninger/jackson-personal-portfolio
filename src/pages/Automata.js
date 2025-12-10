import React, { useEffect } from "react";
import PageButtonsPanel from "../components/pagebutton/pagebuttonpanel.js";
import { initInstancedRenderer, drawGridInstanced } from "../components/wildfires/drawGrid.js";
import { createWildfireState, stepWildfire } from "../components/wildfires/wildfirelogic.js";

export const Automata = () => {
  useEffect(() => {
    const canvas = document.getElementById("automata-canvas");

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gl = canvas.getContext("webgl2");

    // Wildfire state
    const cols = 1000;
    const rows = 1000;
    let grid = createWildfireState(cols, rows);
    initInstancedRenderer(gl, cols, rows);

    // tick speed (ms)
    const tickInterval = 1;
    let lastTick = performance.now();

    function loop(now) {
      
      if (now - lastTick >= tickInterval) {
        lastTick = now;
        grid = stepWildfire(grid, cols, rows);
      }

      drawGridInstanced(gl, grid, cols, rows);
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);


  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      
      {/* WebGL Canvas */}
      <canvas
        id="automata-canvas"
        style={{
          width: "100%",
          height: "100%",
          flexGrow: 1,
          display: "block",
        }}
      />

      {/* Page Buttons */}
      <div
        style={{
          flexGrow: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingBottom: "2rem",
        }}
      >
        <PageButtonsPanel />
      </div>
    </div>
  );
};
