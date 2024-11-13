import { useEffect, useState } from 'react'

export const useKeyPress = () => {

  const [keyPress, setKeyPress] = useState("")

  useEffect(() => {

    const updateKeyPress = (ev) => {

      //ev.button describes the mouse button that was clicked
      // 0 is left, 1 is middle, 2 is right
      
      switch(ev.code) {
        case "Space":
          //console.log('key press space', ev.code)
          setKeyPress("Space")
          break;
        default:
          setKeyPress(ev.code)
          console.log('key press', ev.code)
      }

      ev.preventDefault()
    }
    
    window.addEventListener('keydown', updateKeyPress);
    
    return () => {
      window.removeEventListener('keydown', updateKeyPress);
    }
  }, [])

  return keyPress
}