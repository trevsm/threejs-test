import { useThree } from 'react-three-fiber'

export function PlayerCamera() {
  const { camera } = useThree()
}

const MoveCamera = pos => {
  //   const radius = 15

  camera.position.y = pos.y + 8

  camera.position.x = pos.x /*radius * Math.sin((1 * c.current) / 100)*/

  camera.position.z = pos.z + 20 /*radius * Math.cos((1 * c.current) / 100)*/

  camera.lookAt(pos)
}
