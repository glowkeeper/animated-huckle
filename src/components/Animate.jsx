import { useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAnimations } from '@react-three/drei'
import { AnimationMixer } from 'three'

import { useKeyPress, useMousePosition, useMouseClick } from '../utils'
import { KeyCodes, MouseClickCodes } from '../utils'

const animations = {
    idle: 'idle',
    walking: 'walking',
    running: 'running',
    standingJump: 'standingJump'
}
const ninety = Math.PI / 2

export const Animate = (props) => {

    const { model } = props

    //console.log('model', model)
    const modelAnimations = useAnimations(model.animations)

    const keyPress = useKeyPress(true)
    //console.log("modeling key", keyPress)
    const mousePosition = useMousePosition()
    const click = useMouseClick(true)

    const mixer = useMemo(() => {
        return new AnimationMixer(model.scene)
    }, [model.scene])

    const [animation, setAnimation] = useState(animations.idle)

    useEffect(() => {
        if (modelAnimations.clips.length) {
            modelAnimations.clips.forEach(clip => {
                //console.log('clip', clip, animation)
                if(clip.name === animation) {
                    const action = mixer?.clipAction(clip)
                    if (action) 
                    {
                        mixer?.stopAllAction() 
                        action?.play()
                    }
                }
            })
        }
        
    }, [animation, modelAnimations, mixer])    

    useEffect(() => {

        console.log('model mouse click', click)

        switch(click) {
            case MouseClickCodes.Left:
              setAnimation(animations.walking)
              break;
            case MouseClickCodes.Middle:              
              setAnimation(animations.standingJump)
              break;
            case MouseClickCodes.Right:
              setAnimation(animations.running)
              break;
            default:
              console.log("mouse click request", click)
        }
        
    }, [click]) 

    useEffect(() => {

        console.log('model key press', keyPress)

        switch(keyPress) {
            case KeyCodes.AltLeft:
              setAnimation(animations.idle)
              break;
            default:              
              console.log("key press request", keyPress)
        }
        
    }, [keyPress]) 
    
    useFrame((state, delta) => {          
        mixer?.update(delta)
        model.scene.rotation.y = ((mousePosition.x / window.innerWidth) * (Math.PI)) - ninety
    })

    return (

        <primitive 
            {...props}
            object={model.scene} 
        />
    )
}