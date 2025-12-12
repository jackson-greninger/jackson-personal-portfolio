import React, { useEffect, useRef } from "react";
import PageButtonsPanel from "../components/pagebutton/pagebuttonpanel.js";
import { initInstancedRenderer, drawGridInstanced } from "../components/wildfires/drawGrid.js";
import { createWildfireState, stepWildfire } from "../components/wildfires/wildfirelogic.js";

export const Automata = () => {

  const [treeDensity, setTreeDensity] = React.useState(0.05);
  const [lightningProb, setLightningProb] = React.useState(0.0000001);
  const [tickInterval, setTickInterval] = React.useState(10);

  const gridRef = useRef(null);
  const paramsRef = useRef({
    treeDensity: treeDensity,
    lightningProb: lightningProb,
    tickInterval: tickInterval
  });

  const handleTreeChange = (v) => {
    setTreeDensity(v);
    paramsRef.current.treeDensity = v;
  };

  const handleLightningChange = (v) => {
    setLightningProb(v);
    paramsRef.current.lightningProb = v;
  };

  const handleTickChange = (v) => {
    setTickInterval(v);
    paramsRef.current.tickInterval = v;
  };

  useEffect(() => {
    const canvas = document.getElementById("automata-canvas");
    const gl = canvas.getContext("webgl2");

    const cols = 500;
    const rows = 500;

    // Initialize grid
    gridRef.current = createWildfireState(cols, rows, treeDensity);

    initInstancedRenderer(gl, cols, rows);

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let lastTick = performance.now();

    function loop(now) {
      const { treeDensity, lightningProb, tickInterval } = paramsRef.current;

      if (now - lastTick >= tickInterval) {
        lastTick = now;

        gridRef.current = stepWildfire(gridRef.current, cols, rows, {
          treeDensity,
          lightningProb,
        });
      }
      if (Math.random() < 0.001) console.log(gridRef.current[0][0]);
      drawGridInstanced(gl, gridRef.current, cols, rows);
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const resetSim = () => {
    gridRef.current = createWildfireState(500, 500, treeDensity);
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#121212",
      color: "white"
    }}>

      {/* Left: Simulation Canvas */}
      <div style={{ flex: 3 }}>
        <canvas
          id="automata-canvas"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </div>

      {/* Right: Sliders */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "500px", padding: "1rem" }}>

        {/* Tick Interval Slider */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <label style={{ width: "160px", textAlign: "right" }}>
            Tick Interval:
          </label>

          <input
            type="range"
            min="1"
            max="100"
            value={tickInterval}
            onChange={(e) => handleTickChange(Number(e.target.value))}
            style={{ flexGrow: 1 }}
          />

          <span style={{ width: "40px" }}>
            {tickInterval}
          </span>
        </div>

        {/* Tree Density Slider */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <label style={{ width: "160px", textAlign: "right" }}>
            Tree Density:
          </label>

          <input
            type="range"
            min="0"
            max="0.1"
            step="0.01"
            value={treeDensity}
            onChange={(e) => handleTreeChange(Number(e.target.value))}
            style={{ flexGrow: 1 }}
          />

          <span style={{ width: "40px" }}>
            {treeDensity.toFixed(2)}
          </span>
        </div>

        {/* Lightning Probability Slider */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <label style={{ width: "160px", textAlign: "right" }}>
            Lightning Probability:
          </label>

          <input
            type="range"
            min="0"
            max="0.000001"
            step="0.0000001"
            value={lightningProb}
            onChange={(e) => handleLightningChange(Number(e.target.value))}
          />

          <span style={{ width: "60px" }}>
            {lightningProb.toFixed(4)}
          </span>
        </div>
          <button
            onClick={resetSim}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 1rem",
              backgroundColor: "#222",
              color: "white",
              border: "1px solid #555",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            Reset Simulation
          </button>
      </div>

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
