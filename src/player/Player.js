import React, { useEffect, useRef } from 'react'

import * as THREE from 'three'

import { useFrame, useThree, useLoader } from 'react-three-fiber'
import { useCylinder, useSphere } from '@react-three/cannon'

import { PlayerControls } from './PlayerControls'
import cobble from '../assets/cobble.png'

export function Player(props) {
  const MAX_SPEED = 10
  const INERTIA = 50

  const [ref, api] = useCylinder(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 10, 10],
    args: [1, 1, 2, 32],
    rotation:[-Math.PI / 2, 0, -Math.PI / 2],
    ...props,
  }))

  const { forward, backward, left, right, boost } = PlayerControls()
  const { camera } = useThree()

  const velocity = useRef([0, 0, 0])

  const direction = new THREE.Vector3()
  const frontVector = new THREE.Vector3()
  const sideVector = new THREE.Vector3()

  function applyVelocity() {
    frontVector.set(0, 0, backward - forward)
    sideVector.set(left - right, 0, 0)

    direction
      .subVectors(frontVector, sideVector)
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
    // const radius = 15

    camera.position.y = pos.y + 3

    camera.position.x = pos.x /*radius * Math.sin((1 * c.current) / 100)*/

    camera.position.z = pos.z + 20 /*radius * Math.cos((1 * c.current) / 100)*/

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
      <cylinderBufferGeometry attach="geometry" args={[1, 1, 1, 64]} />
      <meshLambertMaterial map={texture} attach="material" />
    </mesh>
  )
}
