import React from 'react'
import * as THREE from "three"
import { Box } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { useLoader } from 'react-three-fiber'
import cobble from "../assets/cobble.png"

export function Block({ x, y, z }) {
  const texture = useLoader(THREE.TextureLoader, cobble)
//   texture.wrapS = texture.wrapT = THREE.RepeatWrapping
//   texture.repeat.set(1, 1)

  const [mesh] = useBox(() => ({
    mass: 1,
    position: [x, y, z],
  }))
  return (
    <Box ref={mesh} castShadow>
      <meshLambertMaterial attach="material" map={texture} />
    </Box>
  )
}
