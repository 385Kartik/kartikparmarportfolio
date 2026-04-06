import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Sparkles, Trail } from '@react-three/drei';
import * as THREE from 'three';

// --- 1. INTERACTIVE CORE SPHERE ---
// Reacts to Hover (Speed/Scale) and Click (Shockwave)
function InteractiveCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const scrollY = window.scrollY;

    if (meshRef.current) {
      // Rotation logic: Base speed + Hover boost + Mouse influence
      const rotationSpeed = hovered ? 1.5 : 0.2;
      
      meshRef.current.rotation.y += delta * rotationSpeed;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        pointer.y * 0.5 + (active ? time * 5 : 0), // Spin fast on click
        0.1
      );

      // Scale logic: Breathe normally, expand on hover, pulse on click
      const targetScale = active ? 1.2 : (hovered ? 1.1 : 1);
      const currentScale = meshRef.current.scale.x;
      const smoothScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
      meshRef.current.scale.setScalar(smoothScale);

      // Position Parallax
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, pointer.x * 1.5, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, pointer.y * 1.5 - scrollY * 0.002, 0.05);
    }
    
    if (glowRef.current) {
      // Glow pulse
      glowRef.current.rotation.y -= delta * 0.5;
      const glowIntensity = hovered ? 1.2 : 1;
      glowRef.current.scale.setScalar((1 + Math.sin(time * 2) * 0.05) * glowIntensity);
    }
  });

  return (
    <group 
      onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
      onPointerDown={() => setActive(true)}
      onPointerUp={() => setActive(false)}
    >
      {/* Outer Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={hovered ? 0.15 : 0.05} />
      </mesh>
      
      {/* Core Object */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 5]} /> {/* Higher detail */}
        <meshPhysicalMaterial
          color={active ? "#60a5fa" : "#0a0a1a"} // Flash blue on click
          metalness={1}
          roughness={hovered ? 0.1 : 0.02} // Rougher on hover looks like energy
          envMapIntensity={3}
          clearcoat={1}
          clearcoatRoughness={0.05}
          iridescence={1}
          iridescenceIOR={1.5}
        />
      </mesh>
    </group>
  );
}

// Reusable objects to avoid GC spikes
const _tempVec = new THREE.Vector3();
const _mouseVec = new THREE.Vector3();
const _targetVec = new THREE.Vector3();
const _dirVec = new THREE.Vector3();

function InteractiveParticles() {
  const count = 1000; // Reduced from 1500 for better performance
  const meshRef = useRef<THREE.Points>(null);
  const { mouse, camera } = useThree();
  
  const { positions, originalPositions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const color = new THREE.Color();
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 40 - 10;

      pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      orig[i * 3] = x; orig[i * 3 + 1] = y; orig[i * 3 + 2] = z;

      if (Math.random() > 0.6) color.setHex(0x3b82f6);
      else if (Math.random() > 0.3) color.setHex(0xec4899);
      else color.setHex(0xffffff);
      
      cols[i * 3] = color.r; cols[i * 3 + 1] = color.g; cols[i * 3 + 2] = color.b;
    }
    return { positions: pos, originalPositions: orig, colors: cols };
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    const positionsArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    // Project mouse to world space once per frame
    _mouseVec.set(mouse.x, mouse.y, 0.5);
    _mouseVec.unproject(camera);
    _dirVec.copy(_mouseVec).sub(camera.position).normalize();
    const distance = -camera.position.z / _dirVec.z;
    _mouseVec.copy(camera.position).add(_dirVec.multiplyScalar(distance));

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Use index access instead of Vector3 creation
      const px = positionsArray[i3];
      const py = positionsArray[i3 + 1];
      const pz = positionsArray[i3 + 2];
      
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      // Distance check without Vector3 allocation
      const dx = px - _mouseVec.x;
      const dy = py - _mouseVec.y;
      const dz = pz - _mouseVec.z;
      const distSq = dx * dx + dy * dy + dz * dz;
      
      const repelRange = 8;
      const repelRangeSq = repelRange * repelRange;
      const repelStrength = 0.5;

      let tx = ox;
      let ty = oy;
      let tz = oz;

      if (distSq < repelRangeSq) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / repelRange) * repelStrength;
        // Simple repulsion vector
        tx += (dx / dist) * force * 10;
        ty += (dy / dist) * force * 10;
        tz += (dz / dist) * force * 10;
      }

      // Lerp back to target
      positionsArray[i3] += (tx - px) * 0.05;
      positionsArray[i3 + 1] += (ty - py) * 0.05;
      positionsArray[i3 + 2] += (tz - pz) * 0.05;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.z += 0.0005;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.12} 
        vertexColors 
        transparent 
        opacity={0.6} 
        sizeAttenuation 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// --- 3. REACTIVE RINGS ---
// Expand slightly when mouse moves fast (simulated energy)
function InteractiveRings() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    const scrollY = window.scrollY;
    
    if (groupRef.current) {
      // Rotate entire group based on mouse
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.2, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.2, 0.05);
      groupRef.current.position.y = -scrollY * 0.001;
    }
  });

  return (
    <group ref={groupRef}>
       <OrbitRing radius={3.5} rotation={[Math.PI / 3, 0, 0]} color="#3b82f6" speed={1} />
       <OrbitRing radius={4.2} rotation={[Math.PI / 2.5, Math.PI / 4, 0]} color="#ec4899" speed={-0.8} />
       <OrbitRing radius={5} rotation={[Math.PI / 4, Math.PI / 3, Math.PI / 6]} color="#f97316" speed={0.5} />
    </group>
  );
}

function OrbitRing({ radius, rotation, color, speed = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.002 * speed;
      // Pulse thickness based on time
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.01;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} rotation={rotation}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial color={color} transparent opacity={0.4} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

// --- 4. FLOATING SHAPES (With Trail) ---
function FloatingShape({ position, color, size, geometry }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Organic movement
      const t = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.5;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;

      // Mouse influence
      meshRef.current.position.x += (pointer.x * 0.5 - meshRef.current.position.x + position[0]) * 0.05;
      
      // Hover Scale effect
      const targetScale = hovered ? 1.5 : 1;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));
    }
  });

  return (
    <Trail width={1} length={4} color={color} attenuation={(t) => t * t}>
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        {geometry === 'box' && <boxGeometry args={[size, size, size]} />}
        {geometry === 'oct' && <octahedronGeometry args={[size]} />}
        {geometry === 'sphere' && <sphereGeometry args={[size, 16, 16]} />}
        
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5} // Glow on hover
          toneMapped={false}
        />
      </mesh>
    </Trail>
  );
}

function SceneContent() {
  const { camera } = useThree();
  const lastScrollY = useRef(0);

  useFrame(() => {
    const currentScroll = window.scrollY;
    const scrollSpeed = (currentScroll - lastScrollY.current) * 0.05;
    lastScrollY.current = currentScroll;

    // Dynamic Camera Shake on Scroll
    if (Math.abs(scrollSpeed) > 0.5) {
      const shake = Math.min(Math.abs(scrollSpeed) * 0.01, 0.2);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, (Math.random() - 0.5) * shake, 0.1);
    }
  });

  return (
    <>
      <color attach="background" args={['#030308']} />
      
      {/* Dynamic Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#ec4899" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} />

      {/* --- SCENE COMPONENTS --- */}
      <InteractiveCore />
      <InteractiveParticles />
      <InteractiveRings />
      
      <FloatingShape position={[-4, 2, 0]} color="#ec4899" size={0.5} geometry="oct" />
      <FloatingShape position={[4, -1, 2]} color="#3b82f6" size={0.4} geometry="box" />
      <FloatingShape position={[0, -5, -2]} color="#f97316" size={0.6} geometry="sphere" />

      <Sparkles count={50} scale={12} size={4} speed={0.4} opacity={0.5} color="#ffffff" />
      <Environment preset="city" />
      <fog attach="fog" args={['#030308', 5, 40]} />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }} 
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}