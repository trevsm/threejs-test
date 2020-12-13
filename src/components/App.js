import React from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls, Sky, softShadows } from 'drei'
import { Physics, useBox, usePlane } from 'use-cannon'
import 'minireset.css'
import './App.css'

softShadows()

function Box({x, y, z}) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [x, y, z],
  }))
  return (
    <mesh
      ref={ref}
      onClick={() => {
        api.velocity.set(Math.random(), Math.random() * 5 + 3, Math.random())
      }}
      castShadow
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  )
}

function Plane() {
  const [ref] = usePlane(() => ({
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="lightgreen" />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas
      shadowMap
      colorManagement
      camera={{ position: [-15, 10, 6], fov: 60 }}
    >
      <OrbitControls/>
      <Sky
        distance={450000}
        sunPosition={[10, 15, 20]}
        inclination={0}
        azimuth={0.25}
      />
      {/* <fog attach="fog" args={['white', 0, 40]} /> */}
      <ambientLight intensity={0.4} />
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
      <pointLight position={[0, -10, 0]} intensity={1.5} />
      <Physics>
        <Box x={0} y={0} z={0}/>
        <Plane />
      </Physics>
    </Canvas>
  )
}
