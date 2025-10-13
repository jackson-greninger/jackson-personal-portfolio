export default `
uniform vec3 color;
varying float vDisplacement;

void main() {
    // Map displacement to brightness
    float brightness = 0.5 + vDisplacement * 0.15; // subtle shading
    gl_FragColor = vec4(color * brightness, 1.0);
}
`;