'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Float, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

function HeartShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create a heart shape using THREE.Shape
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = -2.5, y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 5.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    steps: 2,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 0.5,
    bevelSize: 0.5,
    bevelSegments: 5,
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, Math.PI, 0]} scale={[0.1, 0.1, 0.1]}>
      <extrudeGeometry args={[heartShape, extrudeSettings]} />
      <meshStandardMaterial
        color="#e11d48" // A vibrant rose color
        roughness={0.4}
        metalness={0.3}
        flatShading={false}
      />
    </mesh>
  );
}

export default function CodeHeart() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} color="#14b8a6" intensity={1.5} />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0.1, -0.4, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <Float
            speed={1.5} 
            rotationIntensity={0.6} 
            floatIntensity={1.8}
          >
            <HeartShape />
          </Float>
        </PresentationControls>

        <ContactShadows 
          position={[0, -4, 0]} 
          opacity={0.5} 
          scale={20} 
          blur={2} 
          far={10} 
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
