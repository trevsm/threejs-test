import React, { useState } from 'react'

import { Canvas } from 'react-three-fiber'
import { Physics } from '@react-three/cannon'
// import { softShadows } from '@react-three/drei'

import { Lighting } from './lighting/Lighting'
import { CameraEffects } from './effects/CameraEffects'
import { Landscape } from './terrain/Landscape'
import { Player } from './player/Player'

import 'minireset.css'
import './App.css'
import { PointerLockControls } from '@react-three/drei'

// softShadows()

function App() {
  return (
    <Canvas camera={{ fov: 45 }}>
      <Lighting />
      <CameraEffects />
      {/* <PointerLockControls/> */}
      <Physics gravity={[0, -20, 0]}>
        <Player />
        <Landscape />
      </Physics>
    </Canvas>
  )
}

export default App
