import * as THREE from "three";
import vertShader from "./backgroundVertShader";
import fragShader from "./backgroundFragShader";

export function createProceduralFoamBackground() {
  const geometry = new THREE.PlaneBufferGeometry(100, 100, 50, 50);

  const material = new THREE.ShaderMaterial({
    vertexShader: vertShader,
    fragmentShader: fragShader,
    uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xAAAAAA) }
    }
});

  const mesh = new THREE.Mesh(geometry, material);

  // Face the camera directly (no rotation needed)
  mesh.position.z = -1; // push it slightly back behind the text
  return mesh;
}
