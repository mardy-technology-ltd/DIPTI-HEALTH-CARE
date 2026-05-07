'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create 30 base pairs for the DNA
  const basePairs = 30;
  const height = 10;
  const radius = 1.5;
  const turns = 3;

  const dnaStrands = useMemo(() => {
    const strands = [];
    for (let i = 0; i < basePairs; i++) {
      const t = i / basePairs;
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * height;
      
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      
      strands.push({
        pos1: new THREE.Vector3(x1, y, z1),
        pos2: new THREE.Vector3(x2, y, z2),
        color1: new THREE.Color().setHSL(0.5 + t * 0.2, 0.8, 0.5), // Teal to Blue
        color2: new THREE.Color().setHSL(0.6 + t * 0.2, 0.8, 0.5),
      });
    }
    return strands;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
      {dnaStrands.map((strand, i) => (
        <group key={i}>
          {/* Backbone sphere 1 */}
          <mesh position={strand.pos1} castShadow receiveShadow>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color={strand.color1} roughness={0.2} metalness={0.8} />
          </mesh>
          
          {/* Backbone sphere 2 */}
          <mesh position={strand.pos2} castShadow receiveShadow>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color={strand.color2} roughness={0.2} metalness={0.8} />
          </mesh>

          {/* Connecting bond */}
          <mesh 
            position={strand.pos1.clone().lerp(strand.pos2, 0.5)} 
            onUpdate={(self) => self.lookAt(strand.pos2)}
            castShadow
          >
            <cylinderGeometry args={[0.08, 0.08, radius * 2, 8]} onUpdate={(self) => self.rotateX(Math.PI / 2)} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.6} opacity={0.6} transparent />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#0d9488" />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0.1, -0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI, Math.PI]}
        >
          <Float
            speed={1.5} 
            rotationIntensity={0.5} 
            floatIntensity={1.5}
          >
            <DNAHelix />
          </Float>
        </PresentationControls>

        <ContactShadows 
          position={[0, -3.5, 0]} 
          opacity={0.6} 
          scale={20} 
          blur={2.5} 
          far={10} 
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
