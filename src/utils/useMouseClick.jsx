import { useEffect, useState } from 'react'

export const useMouseClick = () => {

  const [click, setClick] = useState("")

  useEffect(() => {

    const updateMouseClick = (ev) => {

      //ev.button describes the mouse button that was clicked
      // 0 is left, 1 is middle, 2 is right

      //console.log('mouse button', ev.button)

      switch(ev.button) {
        case 0:
          setClick("Left")
          break;
        case 1:
          setClick("Middle")
          break;
        case 2:
          setClick("Right")
          break;
        default:
          setClick("Idle")
          console.log('mouse button', ev.button)
      }

      ev.preventDefault()
    }
    
    window.addEventListener('mousedown', updateMouseClick)
    
    return () => {
      window.removeEventListener('mousedown', updateMouseClick)
    }
  }, [])

  return click
}