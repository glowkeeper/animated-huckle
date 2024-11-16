import { useEffect, useState } from 'react'

export const useKeyPress = (preventDefault) => {

  const [keyPress, setKeyPress] = useState("")

  useEffect(() => {

    const updateKeyPress = (ev) => { 
    
      if (preventDefault) ev.preventDefault()
      setKeyPress(ev.code)
    }
    
    window.addEventListener('keydown', updateKeyPress)
    
    return () => {
      window.removeEventListener('keydown', updateKeyPress)
    }
  }, [preventDefault])

  return keyPress
}