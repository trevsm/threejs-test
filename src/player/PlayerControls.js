import { useEffect, useState } from 'react'

const keys = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  ShiftLeft: 'boost',
}

export const moveFieldByKey = key => keys[key]

export function PlayerControls() {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
  })

  useEffect(() => {
    const handleKeyDown = e => {
      return setMovement(m => ({ ...m, [moveFieldByKey(e.code)]: true }))
    }

    const handleKeyUp = e => {
      return setMovement(m => ({ ...m, [moveFieldByKey(e.code)]: false }))
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return movement
}
