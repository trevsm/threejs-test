import React from 'react'
import {useBox} from '@react-three/cannon'

export function Box(){
    const [ref, api] = useBox(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 10, 0],
        args:[1,1,1]
      }))
    return (
        <mesh ref={ref}>
            <boxBufferGeometry attach={'geometry'}/>
            <meshLambertMaterial attach={'material'} args={[1,1,1]}/>
        </mesh>
    )
}