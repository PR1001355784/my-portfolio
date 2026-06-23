import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_colorSpeed;
uniform float u_colorAmplitude;

varying vec2 vUv;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289v2(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 st) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
  for (int i = 0; i < 5; i++) {
    v += a * snoise(st);
    st = rot * st * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 st = (gl_FragCoord.xy - u_resolution * 0.5) / min(u_resolution.x, u_resolution.y);
  vec2 mouseOffset = (u_mouse - 0.5) * 0.25;
  float r = length(st - mouseOffset * 0.2);
  float angle = atan(st.y - mouseOffset.y * 0.1, st.x - mouseOffset.x * 0.1);
  float t = u_time * 0.4;
  float numRays = 18.0;
  float rayAngle = mod(angle * numRays / 6.28318530718 + t * 0.2 + fbm(st * 3.0 + t * 0.1) * 0.15, 1.0);
  float rayIntensity = smoothstep(0.5, 0.0, abs(rayAngle - 0.5)) * 1.5;
  rayIntensity += fbm(vec2(angle * 2.0, r * 3.0 - t * 0.3)) * 0.3;
  rayIntensity *= exp(-r * 2.5) * 2.0;
  float cursorHue = u_mouse.x * 0.3 + t * u_colorSpeed * 0.05;
  float colorIndex1 = cursorHue * u_colorAmplitude;
  float colorIndex2 = colorIndex1 + 1.0;
  float mixFactor = fract(colorIndex1);
  vec3 color1 = vec3(0.91, 0.66, 0.22);
  vec3 color2 = vec3(1.0, 0.55, 0.26);
  vec3 color3 = vec3(0.227, 0.431, 0.647);
  vec3 color4 = vec3(0.286, 0.816, 0.827);
  vec3 color5 = vec3(0.635, 0.91, 0.769);
  float fi = mod(floor(colorIndex1), 5.0);
  vec3 rayColor = fi < 0.5 ? color1 : fi < 1.5 ? color2 : fi < 2.5 ? color3 : fi < 3.5 ? color4 : color5;
  float fi2 = mod(floor(colorIndex2), 5.0);
  vec3 rayColor2 = fi2 < 0.5 ? color1 : fi2 < 1.5 ? color2 : fi2 < 2.5 ? color3 : fi2 < 3.5 ? color4 : color5;
  vec3 finalRayColor = mix(rayColor, rayColor2, mixFactor);
  vec3 col = vec3(0.0);
  col += finalRayColor * pow(rayIntensity, 1.4) * 0.8;
  float centerGlow = exp(-r * 3.0) * (0.8 + 0.2 * sin(t * 2.0));
  col += vec3(0.14, 0.431, 0.647) * centerGlow * 0.4;
  col += vec3(0.176, 0.769, 0.714) * centerGlow * 0.3 * sin(angle * 3.0 + t);
  col += vec3(0.01, 0.02, 0.03) * fbm(st * 5.0 + t * 0.5) * 0.05;
  col += (sin(gl_FragCoord.y * 0.7) * 0.5 + 0.5) * 0.03 * exp(-r * 2.0);
  col *= (1.0 - smoothstep(0.3, 1.2, r));
  col = pow(col / (1.0 + col * 0.5), vec3(1.1));
  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`

function EnergyPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5))
  const mouseCurrent = useRef(new THREE.Vector2(0.5, 0.5))
  const { viewport, size } = useThree()

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_colorSpeed: { value: 0.4 },
      u_colorAmplitude: { value: 0.6 },
    }),
    []
  )

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseTarget.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight)
    }
    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    uniforms.u_time.value = elapsed
    mouseCurrent.current.lerp(mouseTarget.current, 0.08)
    uniforms.u_mouse.value.copy(mouseCurrent.current)
    uniforms.u_resolution.value.set(size.width * 2, size.height * 2)
  })

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export default function EnergyBurst() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <EnergyPlane />
      </Canvas>
    </div>
  )
}
