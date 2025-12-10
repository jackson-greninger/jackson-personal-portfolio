// drawGridInstanced.js
let program = null;
let quadBuffer = null;
let offsetBuffer = null;
let colorBuffer = null;

let posLoc, offsetLoc, colorLoc;

export function initInstancedRenderer(gl, cols, rows) {
  // --- 1. Create shaders ---
  const vs = `
    attribute vec2 aPos;        // quad vertex
    attribute vec2 aOffset;     // instance position (cell offset)
    attribute vec4 aColor;      // instance color

    uniform vec2 uCellSize;

    varying vec4 vColor;

    void main() {
      // Scale quad to cell size and add offset
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

  // --- 2. Locations ---
  posLoc = gl.getAttribLocation(program, "aPos");
  offsetLoc = gl.getAttribLocation(program, "aOffset");
  colorLoc = gl.getAttribLocation(program, "aColor");

  // --- 3. Quad buffer (STATIC) ---
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

  // 4. Create offset + color buffers (instances)
  offsetBuffer = gl.createBuffer();
  colorBuffer = gl.createBuffer();

  return { quadBuffer, offsetBuffer, colorBuffer };
}


export function drawGridInstanced(gl, grid, cols, rows) {
  gl.useProgram(program);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const cellWidth = 1.0 / cols;
  const cellHeight = 1.0 / rows;

  const uCellSizeLoc = gl.getUniformLocation(program, "uCellSize");
  gl.uniform2f(uCellSizeLoc, cellWidth, cellHeight);

  const instanceCount = cols * rows;

  // --- Build offsets array (STATIC layout) ---
  const offsets = new Float32Array(instanceCount * 2);
  let p = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      offsets[p++] = x * cellWidth;
      offsets[p++] = y * cellHeight;
    }
  }

  // --- Upload offsets (ONLY if you want dynamic repositioning) ---
  gl.bindBuffer(gl.ARRAY_BUFFER, offsetBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, offsets, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(offsetLoc);
  gl.vertexAttribPointer(offsetLoc, 2, gl.FLOAT, false, 0, 0);
  gl.vertexAttribDivisor(offsetLoc, 1);

  // --- Build color array ---
  const colors = new Float32Array(instanceCount * 4);
  let c = 0;

  for (let i = 0; i < grid.length; i++) {
    const state = grid[i];
    let color;

    if (state === 1) color = [0.2, 0.8, 0.2, 1]; // tree
    else if (state === 2) color = [0.9, 0.2, 0.1, 1]; // fire
    else if (state === 3) color = [0.5, 0.5, 0.5, 1]; // burned
    else color = [0, 0, 0, 1]; // empty

    colors.set(color, c);
    c += 4;
  }

  // Upload colors
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(colorLoc);
  gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
  gl.vertexAttribDivisor(colorLoc, 1);

  // --- Bind quad vertices ---
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  // --- Draw MANY INSTANCE QUADS IN ONE CALL ---
  gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, instanceCount);
}
