export function initWebGL(canvas, draw) {
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    console.error("WebGL2 not supported.");
    return null;
  }

  function resizeCanvas() {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
  }

  resizeCanvas();

  return gl;
}
