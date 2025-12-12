// drawGridInstanced.js
let program = null;
let quadBuffer = null;
let offsetBuffer = null;
let colorBuffer = null;

let posLoc, offsetLoc, colorLoc;

export function initInstancedRenderer(gl, cols, rows) {
  const vs = `
  // Vertex shader (vs)
  // this shader takes in a position, an offset, and a color for each instance
  // it scales the quad to the cell size and adds the offset to position it correctly
  // then it converts the position to clip space and passes the color to the fragment shader

    attribute vec2 aPos;        
    attribute vec2 aOffset;
    attribute vec4 aColor;      

    uniform vec2 uCellSize;

    varying vec4 vColor;

    void main() {
      // Scale to cell size and add offset
      vec2 scaled = aPos * uCellSize + aOffset;

      // Convert to clip space
      vec2 clip = scaled * 2.0 - 1.0;
      clip.y = -clip.y;

      gl_Position = vec4(clip, 0, 1);
      vColor = aColor;
    }
  `;

  const fs = `
    precision mediump float;
    varying vec4 vColor;
    void main() {
      gl_FragColor = vColor;
    }
  `;

  function makeShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  program = gl.createProgram();
  gl.attachShader(program, makeShader(gl.VERTEX_SHADER, vs));
  gl.attachShader(program, makeShader(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(program);

  gl.useProgram(program);

  posLoc = gl.getAttribLocation(program, "aPos");
  offsetLoc = gl.getAttribLocation(program, "aOffset");
  colorLoc = gl.getAttribLocation(program, "aColor");

  // the quad buffer is a set of two triangles that form a quad (square)
  const quad = new Float32Array([
    0, 0,
    1, 0,
    0, 1,
    1, 0,
    1, 1,
    0, 1,
  ]);

  quadBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

  offsetBuffer = gl.createBuffer();
  colorBuffer = gl.createBuffer();

  return { quadBuffer, offsetBuffer, colorBuffer };
}

// grids to hold the states and colors of each cell
// this will let us keep the same color for each frame/tick
// At module top - REPLACE your existing cachedStates/cachedColors declarations
const CacheManager = {
  states: null,
  colors: null,
  size: 0
};

function ensureCaches(size) {
  if (size !== CacheManager.size) {
    CacheManager.states = new Int8Array(size).fill(-1);
    CacheManager.colors = new Float32Array(size * 4);
    CacheManager.size = size;
    console.log(`Cache resized to ${size}`);
  }
}


export function drawGridInstanced(gl, grid, cols, rows) {
  if (!program) return; // safety
  gl.useProgram(program);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const cellWidth = 1.0 / cols;
  const cellHeight = 1.0 / rows;

  const uCellSizeLoc = gl.getUniformLocation(program, "uCellSize");
  gl.uniform2f(uCellSizeLoc, cellWidth, cellHeight);

  const instanceCount = cols * rows;
  ensureCaches(instanceCount);

  // Offsets: one per instance (x,y)
  const offsets = new Float32Array(instanceCount * 2);
  let p = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      offsets[p++] = x * cellWidth;
      offsets[p++] = y * cellHeight;
    }
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, offsetBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, offsets, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(offsetLoc);
  gl.vertexAttribPointer(offsetLoc, 2, gl.FLOAT, false, 0, 0);
  gl.vertexAttribDivisor(offsetLoc, 1);

  // Palettes (same as before)
  function pickRandom(palette) {
    return palette[Math.floor(Math.random() * palette.length)];
  }

  const treePalette = [
    [0.65, 0.85, 0.60, 1],
    [0.45, 0.75, 0.40, 1],
    [0.30, 0.65, 0.30, 1],
    [0.20, 0.55, 0.25, 1],
    [0.12, 0.45, 0.20, 1],
    [0.08, 0.35, 0.15, 1], 
  ];
  
  const firePalette = [
    [0.98, 0.84, 0.26, 1],
    [0.902, 0.349, 0.059, 1],
    [0.980, 0.600, 0.180, 1],
    [0.604, 0.106, 0.016, 1],
    [0.376, 0.043, 0.016, 1],
    [0.627, 0.200, 0.055, 1],
    [0.184, 0.016, 0.016, 1],
    [0.439, 0.235, 0.031, 1],
    [0.894, 0.490, 0.314, 1],
  ];
  
  const burnedPalette = [
    [0.02, 0.02, 0.02, 1],
    [0.05, 0.05, 0.05, 1],
    [0.08, 0.08, 0.08, 1],
    [0.12, 0.12, 0.12, 1],
    [0.16, 0.16, 0.16, 1]
  ];

  const groundPalette = [
    [0.70, 0.60, 0.50], 
    [0.62, 0.52, 0.42], 
    [0.54, 0.44, 0.34], 
    [0.46, 0.36, 0.28], 
    [0.38, 0.29, 0.22], 
    [0.30, 0.22, 0.16], 
    [0.22, 0.16, 0.12], 
    [0.14, 0.10, 0.08],
  ];


  let idx = 0; // instance index (0 .. instanceCount-1)
  for (let y = 0; y < rows; y++) {
    const row = grid[y];
    for (let x = 0; x < cols; x++, idx++) {
      const cell = row?.[x];

      // If the cell is missing / malformed, treat as empty burned
      if (!cell || typeof cell !== "object") {
        if (CacheManager.states[idx] !== 3) {
          CacheManager.states[idx] = 3;
          const base = pickRandom(burnedPalette);
          const baseIdx = idx * 4;
          CacheManager.colors[baseIdx + 0] = base[0];
          CacheManager.colors[baseIdx + 1] = base[1];
          CacheManager.colors[baseIdx + 2] = base[2];
          CacheManager.colors[baseIdx + 3] = base[3];
        }
        continue;
      }

      // Derive state
      let derivedState;
      const fuel = Number(cell.fuel) || 0;
      const burning = Boolean(cell.burning);

      if (cell.burnedOut) {
        derivedState = 4;
      } else if (fuel <= 0) {
        derivedState = 3;
      } else if (burning) {
        derivedState = 2;
      } else {
        derivedState = 1;
      }

      // If state changed, compute & cache color
      if (CacheManager.states[idx] !== derivedState) {
        CacheManager.states[idx] = derivedState;

        let base;
        if (derivedState === 1) {
          // healthy tree
          base = pickRandom(treePalette);
        } else if (derivedState === 2) {
          // burning
          base = pickRandom(firePalette);
        } else if (derivedState === 3) {
          // ground
          base = pickRandom(groundPalette);
        } else { 
          // burnt
          base = pickRandom(burnedPalette);
        }

        const baseIdx = idx * 4;
        CacheManager.colors[baseIdx + 0] = base[0];
        CacheManager.colors[baseIdx + 1] = base[1];
        CacheManager.colors[baseIdx + 2] = base[2];
        CacheManager.colors[baseIdx + 3] = base[3];
      } // end if state changed
    } // x
  } // y

  // Upload colors
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, CacheManager.colors, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(colorLoc);
  gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
  gl.vertexAttribDivisor(colorLoc, 1);

  // Bind quad vertices
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  // Draw instanced
  gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, instanceCount);
}