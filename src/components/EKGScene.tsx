'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function EKGLine() {
  const lineRef = useRef<THREE.Line>();

  const points = useMemo(() => {
    const p = [];
    const numPoints = 500;
    const width = 10;
    // EKG pulse shape
    const pulse = [0, 0, 0.5, 0, 0.6, 1.5, 0.7, -1, 0.8, 0, 0.9, 0, 1, 0];
    
    for (let i = 0; i < numPoints; i++) {
      const x = (i / numPoints) * width - width / 2;
      let y = 0;

      // Create repeating pulses
      const segment = (x + width / 2) % 4;
      if (segment > 2 && segment < 3) {
        const pulseX = segment - 2;
        for(let j = 0; j < pulse.length - 2; j += 2) {
          if (pulseX >= pulse[j] && pulseX <= pulse[j+2]) {
            const t = (pulseX - pulse[j]) / (pulse[j+2] - pulse[j]);
            y = pulse[j+1] * (1 - t) + pulse[j+3] * t;
            break;
          }
        }
      }
      p.push(new THREE.Vector3(x, y, 0));
    }
    return p;
  }, []);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color('#0d9488'),
      linewidth: 2,
      transparent: true,
    });
  }, []);

  useFrame((state) => {
    if (material) {
      // Make the line glow and fade
      material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.5;
    }
  });

  return <line ref={lineRef} geometry={lineGeometry} material={material} />;
}

export default function EKGScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <EKGLine />
      </Canvas>
    </div>
  );
}
