import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, color, size, speed, distort = 0.4 }: { 
  position: [number, number, number]; 
  color: string; 
  size: number;
  speed: number;
  distort?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={3}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={3}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function Octahedron({ position, color, size }: { position: [number, number, number]; color: string; size: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[size, 0]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function Torus({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[size, size * 0.4, 16, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.05}
          metalness={0.95}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

function TorusKnot({ position, color, size = 0.8 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={[size, size * 0.3, 100, 16]} />
        <MeshDistortMaterial
          color={color}
          distort={0.2}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00d4ff"
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

function MouseFollower() {
  const { viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const x = (state.pointer.x * viewport.width) / 2;
      const y = (state.pointer.y * viewport.height) / 2;
      meshRef.current.position.x += (x - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (y - meshRef.current.position.y) * 0.05;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <dodecahedronGeometry args={[0.5, 0]} />
      <MeshDistortMaterial
        color="#00d4ff"
        distort={0.5}
        speed={4}
        roughness={0}
        metalness={1}
        emissive="#00d4ff"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
        <pointLight position={[0, 10, 5]} intensity={1.5} color="#a855f7" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.4}
          penumbra={1}
          intensity={1}
          color="#00d4ff"
        />
        
        {/* Main floating shapes - positioned around viewport */}
        <FloatingShape position={[-5, 3, -2]} color="#00d4ff" size={1.2} speed={0.4} distort={0.5} />
        <FloatingShape position={[5, -2, -3]} color="#ff00ff" size={1.5} speed={0.3} distort={0.6} />
        <FloatingShape position={[0, 4, -4]} color="#a855f7" size={1} speed={0.5} />
        <FloatingShape position={[-4, -3, -2]} color="#00d4ff" size={0.8} speed={0.35} />
        <FloatingShape position={[4, 2, -1]} color="#ff00ff" size={1.1} speed={0.45} />
        <FloatingShape position={[-6, 0, -5]} color="#a855f7" size={1.3} speed={0.25} />
        <FloatingShape position={[6, 4, -6]} color="#00d4ff" size={0.9} speed={0.55} />
        
        {/* Torus shapes */}
        <Torus position={[6, 2, -4]} color="#00d4ff" size={1.2} />
        <Torus position={[-6, -2, -3]} color="#ff00ff" size={1} />
        <Torus position={[0, -4, -5]} color="#a855f7" size={0.8} />
        
        {/* Octahedrons */}
        <Octahedron position={[-3, 5, -4]} color="#ff00ff" size={0.9} />
        <Octahedron position={[3, -4, -3]} color="#00d4ff" size={0.7} />
        
        {/* Torus Knots */}
        <TorusKnot position={[7, -3, -6]} color="#a855f7" size={0.7} />
        <TorusKnot position={[-7, 4, -5]} color="#00d4ff" size={0.6} />
        
        {/* Mouse follower */}
        <MouseFollower />
        
        {/* Particles */}
        <Particles />
        
        <fog attach="fog" args={['#0a0a12', 8, 30]} />
      </Canvas>
    </div>
  );
}
