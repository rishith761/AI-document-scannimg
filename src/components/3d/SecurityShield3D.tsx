import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function HolographicShieldMesh({ isReducedMotion }: { isReducedMotion: boolean }) {
  const shieldGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    const t = state.clock.getElapsedTime();

    if (shieldGroupRef.current) {
      shieldGroupRef.current.rotation.y = Math.sin(t * 0.5) * 0.25;
      shieldGroupRef.current.position.y = Math.sin(t * 1.4) * 0.06;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4;
      ring1Ref.current.rotation.y = t * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.35;
      ring2Ref.current.rotation.z = t * 0.45;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.8;
      coreRef.current.rotation.x += delta * 0.4;
    }
  });

  return (
    <group ref={shieldGroupRef} position={[0, 0, 0]}>
      {/* Central Holographic Shield Prism */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1.2, 0.2, 1.8, 6, 1]} />
        <meshStandardMaterial
          color="#0d1b38"
          wireframe={false}
          roughness={0.2}
          metalness={0.9}
          emissive="#005288"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Glowing Outer Wireframe Contour */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1.22, 0.22, 1.82, 6, 2]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.5} />
      </mesh>

      {/* Internal Cryptographic Core Key / Octahedron */}
      <mesh ref={coreRef} position={[0, 0.15, 0]}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Gyroscopic Cryptographic Guard Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.7, 0.02, 16, 64]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.9, 0.02, 16, 64]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export function SecurityShield3D() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="relative w-full h-[280px] sm:h-[340px] flex items-center justify-center select-none">
      <div className="absolute w-52 h-52 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute w-52 h-52 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 3, 3]} intensity={1.8} color="#00f0ff" />
        <pointLight position={[-3, -3, 2]} intensity={1.2} color="#10b981" />
        <HolographicShieldMesh isReducedMotion={isReducedMotion} />
      </Canvas>
    </div>
  );
}
