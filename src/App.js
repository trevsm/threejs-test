import React, { useState } from 'react'

import { Canvas } from 'react-three-fiber'
import { Physics } from '@react-three/cannon'
// import { softShadows } from '@react-three/drei'

import { Lighting } from './lighting/Lighting'
import { CameraEffects } from './effects/CameraEffects'
import { Landscape } from './terrain/Landscape'
import { Player } from './player/Player'
import { Box } from './object/Box'

import 'minireset.css'
import './App.css'

// softShadows()

function App() {
  return (
    <Canvas camera={{ fov: 45 }}>
      <Lighting />
      <CameraEffects />
      <Physics gravity={[0, -20, 0]}>
        <Player />
        <Box/>
        <Landscape />
      </Physics>
    </Canvas>
  )
}

export default App
