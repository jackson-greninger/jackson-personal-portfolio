export default `
uniform float time;
varying float vDisplacement;

void main() {
    float freq = 10.0;   // number of bumps in each direction
    float amp = 1.5;     // bump height

    vec3 pos = position;

    // Simple grid pattern using sine waves
    float disp = sin(pos.x * freq + time) * sin(pos.y * freq + time) * amp;

    // Small random noise to break uniformity
    float noise = fract(sin(dot(pos.xy ,vec2(12.9898,78.233))) * 43758.5453);
    disp += (noise - 0.5) * 0.3;

    pos.z += disp;
    vDisplacement = disp;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;