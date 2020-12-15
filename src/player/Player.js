import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { Box, PointerLockControls } from '@react-three/drei'
import { useThree, useFrame, useLoader } from 'react-three-fiber'
import { useBox } from '@react-three/cannon'
import cobble from '../assets/cobble.png'

const SPEED = 3
const keys = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
}
const moveFieldByKey = key => keys[key]
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })
  useEffect(() => {
    const handleKeyDown = e =>
      setMovement(m => ({ ...m, [moveFieldByKey(e.code)]: true }))
    const handleKeyUp = e =>
      setMovement(m => ({ ...m, [moveFieldByKey(e.code)]: false }))
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
  return movement
}

export const Player = props => {
  const [ref, api] = useBox(() => ({
    mass: 0,
    type: 'Dynamic',
    position: [0, 1, 10],
    ...props,
  }))

  const { forward, backward, left, right } = usePlayerControls()

  const { camera } = useThree()
  camera.fov = 90

  const texture = useLoader(THREE.TextureLoader, cobble)

  const velocity = useRef([0, 0, 0])

  useEffect(() => api.velocity.subscribe(v => (velocity.current = v)), [])

  useFrame(() => {
    const pos = ref.current.position
    camera.position.copy({ x: pos.x, y: pos.y + 3, z: pos.z + 6 })

    frontVector.set(0, 0, backward - forward)
    sideVector.set(left - right, 0, 0)

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation) // rotates

    api.velocity.set(direction.x, velocity.current[1], direction.z)
  })

  return (
    <>
      <PointerLockControls />
      <Box ref={ref} castShadow>
        <meshLambertMaterial attach="material" map={texture} />
      </Box>
    </>
  )
}
