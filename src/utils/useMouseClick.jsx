import { useEffect, useState } from 'react'

export const useMouseClick = (preventDefault) => {

  const [click, setClick] = useState("")

  useEffect(() => {

    const updateMouseClick = (ev) => {

      if (preventDefault) ev.preventDefault()
      setClick(ev.button)
    }
    
    window.addEventListener('mousedown', updateMouseClick)
    
    return () => {
      window.removeEventListener('mousedown', updateMouseClick)
    }
  }, [])

  return click
}