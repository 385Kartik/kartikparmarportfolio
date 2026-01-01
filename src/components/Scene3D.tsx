import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Main reflective sphere
function ReflectiveSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        pointer.y * 0.2,
        0.05
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        pointer.x * 0.1,
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshPhysicalMaterial
        color="#1a1a2e"
        metalness={1}
        roughness={0.05}
        envMapIntensity={2}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

// Orbit ring
function OrbitRing({ radius, rotation, color, thickness = 0.02 }: { 
  radius: number; 
  rotation: [number, number, number];
  color: string;
  thickness?: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.001;
    }
  });

  return (
    <mesh ref={ringRef} rotation={rotation}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

// Small metallic spheres floating around
function FloatingSphere({ position, color, size }: { 
  position: [number, number, number]; 
  color: string; 
  size: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          metalness={1}
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

// Star field particles
function StarField() {
  const count = 300;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color();
      const rand = Math.random();
      if (rand < 0.3) {
        color.setHSL(0.6, 1, 0.7); // Blue
      } else if (rand < 0.5) {
        color.setHSL(0.85, 1, 0.7); // Pink/Magenta
      } else {
        color.setHSL(0, 0, 0.8); // White
      }
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return cols;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
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
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <color attach="background" args={['#06060f']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -5, -10]} intensity={0.8} color="#f97316" />
        <pointLight position={[0, -10, 5]} intensity={0.5} color="#ec4899" />
        <spotLight
          position={[0, 10, 5]}
          angle={0.5}
          penumbra={1}
          intensity={1}
          color="#ffffff"
        />
        
        {/* Main sphere */}
        <ReflectiveSphere />
        
        {/* Orbit rings */}
        <OrbitRing radius={3.5} rotation={[Math.PI / 3, 0, 0]} color="#3b82f6" thickness={0.015} />
        <OrbitRing radius={4} rotation={[Math.PI / 2.5, Math.PI / 4, 0]} color="#ec4899" thickness={0.01} />
        <OrbitRing radius={4.5} rotation={[Math.PI / 4, Math.PI / 3, Math.PI / 6]} color="#3b82f6" thickness={0.008} />
        
        {/* Floating metallic spheres */}
        <FloatingSphere position={[-3.5, -1.5, 1]} color="#ec4899" size={0.4} />
        <FloatingSphere position={[3, 2, -1]} color="#ec4899" size={0.25} />
        <FloatingSphere position={[-2, 2.5, 2]} color="#3b82f6" size={0.15} />
        <FloatingSphere position={[4, -2, 0]} color="#f97316" size={0.2} />
        <FloatingSphere position={[-4, 0.5, -2]} color="#ec4899" size={0.35} />
        
        {/* Star field */}
        <StarField />
        
        <Environment preset="night" />
        
        <fog attach="fog" args={['#06060f', 10, 40]} />
      </Canvas>
    </div>
  );
}
