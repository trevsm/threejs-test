import React from 'react'

import * as THREE from "three"

import { usePlane } from '@react-three/cannon'
import { useLoader } from 'react-three-fiber'

import grass from '../assets/grass.png'

export function Landscape() {

  const [mesh] = usePlane(() => ({
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }))

  const texture = useLoader(THREE.TextureLoader, grass)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(64, 64)

  return (
    <mesh ref={mesh} receiveShadow >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial map={texture} color={'lightgreen'} />
    </mesh>
  )
}
