import React from 'react'

import { Sky } from '@react-three/drei'

export function Lighting() {
  return (
    <>
      <Sky
        distance={450000}
        sunPosition={[10, 15, 20]}
        inclination={0}
        azimuth={0.25}
      />
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  )
}
