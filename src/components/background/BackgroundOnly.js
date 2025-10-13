import { useEffect, useRef } from "react";
import { WebGLRenderer, Scene, PerspectiveCamera } from "three";
import { createProceduralFoamBackground } from "./ProceduralBackground";

export const ProceduralBackgroundOnly = () => {
  const canvasRef = useRef();
  const bgRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const sceneRef = useRef();
  const startRef = useRef(Date.now());

  useEffect(() => {
    // Set up renderer
    rendererRef.current = new WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    rendererRef.current.setPixelRatio(window.devicePixelRatio);

    // Scene & Camera
    sceneRef.current = new Scene();
    cameraRef.current = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    cameraRef.current.position.z = 25;

    // Background mesh
    bgRef.current = createProceduralFoamBackground();
    sceneRef.current.add(bgRef.current);

    const animate = () => {
      requestAnimationFrame(animate);
      bgRef.current.material.uniforms.time.value = (Date.now() - startRef.current) * 0.001;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    animate();

    return () => {
      rendererRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const fullHeight = Math.max(document.body.scrollHeight, window.innerHeight);
      const fullWidth = window.innerWidth;

      // Resize canvas
      canvasRef.current.width = fullWidth;
      canvasRef.current.height = fullHeight;

      // Resize renderer
      rendererRef.current.setSize(fullWidth, fullHeight);

      // Adjust camera aspect
      cameraRef.current.aspect = fullWidth / fullHeight;
      cameraRef.current.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",  // fixed keeps it behind content
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none", // allows clicks through canvas
      }}
    />
  );
};
