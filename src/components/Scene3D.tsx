import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Trail, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Mouse position store
let mouseX = 0;
let mouseY = 0;

// Main reflective sphere with dramatic cursor rotation
function ReflectiveSphere({ scrollY }: { scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { pointer, viewport } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Dramatic rotation based on cursor
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        pointer.x * Math.PI * 0.5 + state.clock.elapsedTime * 0.1,
        0.08
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        pointer.y * Math.PI * 0.3 - scrollY * 0.001,
        0.08
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1,
        0.05
      );
      
      // Subtle position shift based on cursor
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        pointer.x * 0.5,
        0.05
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        pointer.y * 0.3 - scrollY * 0.002,
        0.05
      );
    }
    
    if (glowRef.current) {
      glowRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <group>
      {/* Inner glow sphere */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.7, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} />
      </mesh>
      
      {/* Main sphere */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[2.5, 4]} />
        <meshPhysicalMaterial
          color="#0a0a1a"
          metalness={1}
          roughness={0.02}
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

// Orbit ring with cursor reaction
function OrbitRing({ radius, rotation, color, thickness = 0.02, scrollY, speed = 1 }: { 
  radius: number; 
  rotation: [number, number, number];
  color: string;
  thickness?: number;
  scrollY: number;
  speed?: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.002 * speed;
      ringRef.current.rotation.x = rotation[0] + pointer.y * 0.2;
      ringRef.current.rotation.y = rotation[1] + pointer.x * 0.2;
      ringRef.current.position.y = -scrollY * 0.001;
    }
  });

  return (
    <mesh ref={ringRef} rotation={rotation}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshStandardMaterial color={color} transparent opacity={0.6} emissive={color} emissiveIntensity={0.3} />
    </mesh>
  );
}

// Floating sphere with trail effect
function FloatingSphere({ position, color, size }: { 
  position: [number, number, number]; 
  color: string; 
  size: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[1]) * 0.4;
      meshRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 0.3) * 0.3;
      
      // React to cursor
      meshRef.current.position.x += pointer.x * 0.3;
      meshRef.current.position.y += pointer.y * 0.2;
    }
  });

  return (
    <Trail width={2} length={6} color={color} attenuation={(t) => t * t}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          metalness={1}
          roughness={0.05}
          envMapIntensity={2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Trail>
  );
}

// Enhanced star field
function StarField({ scrollY }: { scrollY: number }) {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color();
      const rand = Math.random();
      if (rand < 0.3) {
        color.setHSL(0.6, 1, 0.8);
      } else if (rand < 0.5) {
        color.setHSL(0.85, 1, 0.8);
      } else if (rand < 0.7) {
        color.setHSL(0.1, 1, 0.8);
      } else {
        color.setHSL(0, 0, 1);
      }
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return cols;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015 + pointer.x * 0.1;
      pointsRef.current.rotation.x = pointer.y * 0.05;
      pointsRef.current.position.y = -scrollY * 0.003;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

// Floating geometric shapes
function GeometricShapes({ scrollY }: { scrollY: number }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05 + pointer.x * 0.3;
      group.current.rotation.x = pointer.y * 0.2;
    }
  });

  return (
    <group ref={group}>
      {/* Octahedron */}
      <Float speed={2} floatIntensity={2}>
        <mesh position={[-5, 2, -3]}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.5} />
        </mesh>
      </Float>
      
      {/* Tetrahedron */}
      <Float speed={3} floatIntensity={1.5}>
        <mesh position={[5, -2, -2]}>
          <tetrahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#f97316" wireframe transparent opacity={0.5} />
        </mesh>
      </Float>
      
      {/* Dodecahedron */}
      <Float speed={1.5} floatIntensity={2.5}>
        <mesh position={[0, 4, -4]}>
          <dodecahedronGeometry args={[0.6]} />
          <meshStandardMaterial color="#ec4899" wireframe transparent opacity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

function SceneContent({ scrollY }: { scrollY: number }) {
  return (
    <>
      <color attach="background" args={['#030308']} />
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#3b82f6" />
      <pointLight position={[-10, -5, -10]} intensity={1.5} color="#f97316" />
      <pointLight position={[0, -10, 5]} intensity={1} color="#ec4899" />
      <pointLight position={[5, 5, -5]} intensity={0.8} color="#10b981" />
      <spotLight position={[0, 15, 5]} angle={0.4} penumbra={1} intensity={2} color="#ffffff" />
      
      <ReflectiveSphere scrollY={scrollY} />
      
      <OrbitRing radius={3.5} rotation={[Math.PI / 3, 0, 0]} color="#3b82f6" thickness={0.02} scrollY={scrollY} speed={1} />
      <OrbitRing radius={4.2} rotation={[Math.PI / 2.5, Math.PI / 4, 0]} color="#ec4899" thickness={0.015} scrollY={scrollY} speed={-0.8} />
      <OrbitRing radius={5} rotation={[Math.PI / 4, Math.PI / 3, Math.PI / 6]} color="#f97316" thickness={0.01} scrollY={scrollY} speed={0.5} />
      
      <FloatingSphere position={[-4, -2, 2]} color="#ec4899" size={0.35} />
      <FloatingSphere position={[4, 2.5, -1]} color="#3b82f6" size={0.25} />
      <FloatingSphere position={[-2.5, 3, 1]} color="#f97316" size={0.2} />
      <FloatingSphere position={[3, -3, 1]} color="#10b981" size={0.3} />
      <FloatingSphere position={[-5, 1, -2]} color="#ec4899" size={0.4} />
      
      <GeometricShapes scrollY={scrollY} />
      <StarField scrollY={scrollY} />
      
      <Sparkles count={100} scale={15} size={2} speed={0.3} color="#3b82f6" />
      
      <Environment preset="night" />
      <fog attach="fog" args={['#030308', 8, 35]} />
    </>
  );
}

export default function Scene3D() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 h-screen">
      <Canvas camera={{ position: [0, 0, 10], fov: 55 }} dpr={[1, 2]}>
        <SceneContent scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
