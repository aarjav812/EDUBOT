'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function BackgroundObject() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.15
    meshRef.current.rotation.x += delta * 0.08
  })
  return (
    <mesh ref={meshRef} position={[0, 0, -8]} scale={2.4}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial 
        color={new THREE.Color('#7c3aed')} 
        metalness={0.4} 
        roughness={0.3} 
        envMapIntensity={0.8} 
      />
    </mesh>
  )
}

const BackgroundScene = React.memo(() => {
  return (
    <Canvas
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 60 }}
      className="pointer-events-none fixed inset-0 -z-10"
      dpr={[1, 1.5]} // Limit pixel ratio for better performance
    >
      {/* Solid dark background to prevent white flashes */}
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={["#020617", 10, 60]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <Stars 
        radius={60} 
        depth={40} 
        count={800} // Reduced from 1200
        factor={3} 
        saturation={0} 
        fade 
        speed={0.6} 
      />
      <BackgroundObject />
    </Canvas>
  )
})

BackgroundScene.displayName = 'BackgroundScene'

export default BackgroundScene
