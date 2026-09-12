import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Inner 3D card and holographic effects
function HolographicIDCard({ isReducedMotion }: { isReducedMotion: boolean }) {
  const cardGroupRef = useRef<THREE.Group>(null);
  const scanBeamRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // 5 Layer Node Orbits (representing the 5 verification layers)
  const nodeRefs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];

  const nodeColors = ['#00f0ff', '#8b5cf6', '#38bdf8', '#d946ef', '#10b981'];

  // Particle cloud points
  const [particlePositions, particleColors] = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color('#00f0ff');
    const c2 = new THREE.Color('#8b5cf6');
    const c3 = new THREE.Color('#10b981');

    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (isReducedMotion) return;

    const t = state.clock.getElapsedTime();

    // Floating idle oscillation
    if (cardGroupRef.current) {
      cardGroupRef.current.position.y = Math.sin(t * 1.2) * 0.08;
      cardGroupRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
      cardGroupRef.current.rotation.x = Math.cos(t * 0.5) * 0.05;
    }

    // Scan beam traversing vertically across card (-1.1 to +1.1)
    if (scanBeamRef.current) {
      const scanY = Math.sin(t * 1.8) * 1.1;
      scanBeamRef.current.position.y = scanY;
    }

    // Holographic outer scanning rings
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.25;
      ringRef1.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.35;
      ringRef2.current.rotation.y = Math.cos(t * 0.4) * 0.15;
    }

    // Orbiting 5 layer verification nodes
    nodeRefs.forEach((ref, idx) => {
      if (ref.current) {
        const speed = 0.6 + idx * 0.12;
        const angle = t * speed + (idx * Math.PI * 2) / 5;
        const radius = 2.1 + (idx % 2) * 0.4;
        ref.current.position.x = Math.cos(angle) * radius;
        ref.current.position.z = Math.sin(angle) * radius;
        ref.current.position.y = Math.sin(t * 1.5 + idx) * 0.35;
        ref.current.rotation.x += delta;
        ref.current.rotation.y += delta * 1.5;
      }
    });

    // Slow ambient rotation of cloud particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Identity Document Card */}
      <group ref={cardGroupRef}>
        {/* Main Card Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 2.0, 0.06]} />
          <meshStandardMaterial
            color="#09132c"
            roughness={0.2}
            metalness={0.8}
            emissive="#002b4d"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Card Border Rim Glow */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.24, 2.04, 0.05]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.35} />
        </mesh>

        {/* ID Photo Frame Area */}
        <mesh position={[-0.95, 0.15, 0.04]}>
          <planeGeometry args={[0.85, 1.05]} />
          <meshStandardMaterial
            color="#0b2247"
            emissive="#00f0ff"
            emissiveIntensity={0.25}
            roughness={0.4}
          />
        </mesh>

        {/* Holographic Chip on ID */}
        <mesh position={[-0.95, -0.6, 0.04]}>
          <planeGeometry args={[0.5, 0.35]} />
          <meshStandardMaterial
            color="#eab308"
            metalness={0.9}
            roughness={0.1}
            emissive="#eab308"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Synthetic Text Simulation Bars */}
        <mesh position={[0.45, 0.55, 0.04]}>
          <planeGeometry args={[1.5, 0.12]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.85} />
        </mesh>
        <mesh position={[0.45, 0.32, 0.04]}>
          <planeGeometry args={[1.3, 0.08]} />
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.65} />
        </mesh>
        <mesh position={[0.45, 0.14, 0.04]}>
          <planeGeometry args={[1.4, 0.08]} />
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.65} />
        </mesh>
        <mesh position={[0.45, -0.04, 0.04]}>
          <planeGeometry args={[1.1, 0.08]} />
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.65} />
        </mesh>

        {/* QR Security Placeholder */}
        <mesh position={[0.85, -0.48, 0.04]}>
          <planeGeometry args={[0.55, 0.55]} />
          <meshStandardMaterial
            color="#050b1a"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Animated Holographic Scan Beam */}
        <mesh ref={scanBeamRef} position={[0, 0, 0.06]}>
          <boxGeometry args={[3.3, 0.04, 0.02]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* Holographic Scanning Rings */}
      <mesh ref={ringRef1} rotation={[Math.PI / 2.3, 0, 0]}>
        <ringGeometry args={[2.5, 2.54, 64]} />
        <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.4} />
      </mesh>

      <mesh ref={ringRef2} rotation={[-Math.PI / 3, 0.2, 0]}>
        <ringGeometry args={[2.8, 2.83, 64]} />
        <meshBasicMaterial color="#8b5cf6" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>

      {/* 5 Orbiting Layer Verification Nodes */}
      {nodeRefs.map((ref, i) => (
        <mesh key={i} ref={ref}>
          <octahedronGeometry args={[0.13, 0]} />
          <meshStandardMaterial
            color={nodeColors[i]}
            emissive={nodeColors[i]}
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Floating Cyber Particle Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export function HeroScene3D() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.5;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center select-none"
    >
      {/* Background glow orbs for depth */}
      <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none -translate-x-12" />
      <div className="absolute w-72 h-72 rounded-full bg-violet-600/10 blur-3xl pointer-events-none translate-x-12" />

      {/* WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-5, -5, 2]} intensity={1.2} color="#8b5cf6" />
        <directionalLight position={[0, 4, 3]} intensity={1} />
        <group
          rotation={[
            mousePos.y * 0.4,
            mousePos.x * 0.4,
            0,
          ]}
        >
          <HolographicIDCard isReducedMotion={isReducedMotion} />
        </group>
      </Canvas>

      {/* Accessible HTML HUD overlays positioned cleanly around the 3D canvas */}
      <div className="absolute top-4 left-4 sm:left-8 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 flex items-center gap-2 shadow-lg">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
        </span>
        <span className="text-[11px] font-mono tracking-wider text-cyan-300 uppercase">
          5-Layer Sensor Array Active
        </span>
      </div>

      <div className="absolute bottom-4 right-4 sm:right-8 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/50 flex items-center gap-2 text-slate-300 text-xs font-mono">
        <span className="text-emerald-400">●</span>
        <span>Simulated 3D Cryptographic Core</span>
      </div>
    </div>
  );
}
