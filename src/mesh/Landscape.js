import React from 'react'
import * as THREE from "three"
import { Sky } from '@react-three/drei'
import { usePlane } from '@react-three/cannon'
import { useLoader } from 'react-three-fiber'
import grass from '../assets/grass.png'

export function Lighting() {
  return (
    <>
      <Sky
        distance={450000}
        sunPosition={[10, 15, 20]}
        inclination={0}
        azimuth={0.25}
      />
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={1.5}
        shadow-mapSize-width={10024}
        shadow-mapSize-height={10024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  )
}

export function Ground() {
  const texture = useLoader(THREE.TextureLoader, grass)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(100, 100)

  const [mesh] = usePlane(() => ({
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }))
  return (
    <mesh ref={mesh} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial map={texture} color={'lightgreen'} />
    </mesh>
  )
}
