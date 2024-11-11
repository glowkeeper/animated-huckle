import { useEffect, useState } from 'react';

export const useMouseClick = () => {

  const [button, setButton] = useState("")

  useEffect(() => {

    const updateMouseClick = (ev) => {

      //ev.button describes the mouse button that was clicked
      // 0 is left, 1 is middle, 2 is right

      console.log('mouse button', ev.button)
      
      switch(ev.button) {
        case 0:
          setButton("Left")
          break;
        case 1:
          setButton("Middle")
          break;
        case 2:
          setButton("Right")
          break;
        default:
          console.log('mouse button', ev.button)
      }
    }
    
    window.addEventListener('mousedown', updateMouseClick);
    
    return () => {
      window.removeEventListener('mousedown', updateMouseClick);
    }
  }, [])

  return button;
}