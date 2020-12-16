import React, { useEffect, useRef } from 'react'

import * as THREE from 'three'

import { useThree, useFrame, useLoader } from 'react-three-fiber'
import { useSphere } from '@react-three/cannon'

import { PlayerControls } from './PlayerControls'

import cobble from '../assets/cobble.png'

const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

export const SPEED = 15

export const Player = props => {
  const c = useRef(0)

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 10, 10],
    ...props,
  }))

  const { forward, backward, left, right, jump } = PlayerControls()

  const { camera } = useThree()

  const rotateCam = pos => {
    const radius = 15

    camera.position.y = pos.y + 8

    camera.position.x = pos.x /*radius * Math.sin((1 * c.current) / 100)*/

    camera.position.z = pos.z + 20 /*radius * Math.cos((1 * c.current) / 100)*/

    camera.lookAt(pos)
  }

  const texture = useLoader(THREE.TextureLoader, cobble)

  const velocity = useRef([0, 0, 0])

  useEffect(() => {
    api.velocity.subscribe(v => (velocity.current = v))
  }, [])

  useFrame(() => {
    c.current += left - right

    const pos = ref.current.position

    rotateCam(pos)

    frontVector.set(0, 0, backward - forward)
    sideVector.set(left - right, 0, 0)

    if (pos.y < 2)
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)
    // .applyEuler(camera.rotation)

    // api.velocity.set(direction.x, velocity.current[1], direction.z)

      velocity.current[0] -= velocity.current[0] / 100
      velocity.current[2] -= velocity.current[2] / 100

    const v = [
      velocity.current[0] + direction.x / 100,
      velocity.current[1],
      velocity.current[2] + direction.z / 100,
    ]

    api.velocity.set(v[0], v[1], v[2])

    if (jump && pos.y < 1) {
      api.velocity.set(velocity.current[0], 10, velocity.current[2])
    }
  })

  return (
    <mesh ref={ref} castShadow>
      <sphereBufferGeometry attach="geometry" args={[1, 16, 16]} />
      <meshLambertMaterial map={texture} attach="material" />
    </mesh>
  )
}
