import React, { useEffect, useRef } from 'react'

import * as THREE from 'three'

import { useFrame, useThree, useLoader } from 'react-three-fiber'
import { useCylinder, useSphere } from '@react-three/cannon'

import { PlayerControls } from './PlayerControls'
import cobble from '../assets/cobble.png'

export function Player(props) {
  const MAX_SPEED = 10
  const INERTIA = 50

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    rotation:[Math.PI/2,0,Math.PI/2],
    position: [0, 10, 10],
    ...props,
  }))

  const { forward, backward, left, right, boost } = PlayerControls()
  const { camera } = useThree()

  const velocity = useRef([0, 0, 0])

  const direction = new THREE.Vector3()

  const frontVector = new THREE.Vector3()
  const EmptyVector = new THREE.Vector3()

  function applyVelocity() {
    frontVector.set(0, 0, backward - forward)

    direction
      .subVectors(frontVector, EmptyVector)
      .normalize()
      .multiplyScalar(MAX_SPEED)

    velocity.current[0] -= velocity.current[0] / INERTIA
    velocity.current[2] -= velocity.current[2] / INERTIA

    const v = [
      velocity.current[0] + direction.x / (boost ? INERTIA / 2 : INERTIA),
      velocity.current[1],
      velocity.current[2] + direction.z / (boost ? INERTIA / 2 : INERTIA),
    ]

    api.velocity.set(v[0], v[1], v[2])
  }

  function cameraFollow() {
    const pos = ref.current.position
    const radius = 20

    camera.position.y = pos.y + 10

    camera.position.x = pos.x /*+ radius * Math.sin((rotation.current[1]))*/

    camera.position.z = pos.z + radius /** Math.cos((rotation.current[1]))*/

    camera.lookAt(pos)
  }

  useEffect(() => {
    api.velocity.subscribe(v => (velocity.current = v))
  }, [])

  useFrame(() => {
    applyVelocity()
    cameraFollow()
  })

  const texture = useLoader(THREE.TextureLoader, cobble)

  return (
    <mesh ref={ref}>
      <cylinderBufferGeometry attach="geometry" args={[1, 1, 1, 40]} />
      <meshLambertMaterial map={texture} attach="material" />
    </mesh>
  )
}
