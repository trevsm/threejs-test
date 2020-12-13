import React from 'react'
import { Canvas } from 'react-three-fiber'
import { Sky, PointerLockControls, softShadows } from '@react-three/drei'
import { Lighting, Ground } from '../mesh/Landscape'
import { Block } from '../mesh/Object'
import { Player } from '../player/Player'
import { Physics } from '@react-three/cannon'

import 'minireset.css'
import './App.css'

softShadows()

export default function App() {
  return (
    <Canvas shadowMap colorManagement>
      <Sky />
      <Lighting />
      <Physics>
        <PointerLockControls />
        <Player />
        <Block x={0} y={0} z={0} />
        <Ground />
      </Physics>
    </Canvas>
  )
}
