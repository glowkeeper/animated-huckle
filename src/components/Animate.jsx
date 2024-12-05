import { useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAnimations } from '@react-three/drei'
import { AnimationMixer } from 'three'

//import { useKeyPress, useMousePosition, useMouseClick } from '../utils'
import { Animations, useKeyPress, useMousePosition } from '../utils'

const ninety = Math.PI / 2

export const Animate = (props) => {

    const { model } = props

    //console.log('model', model)
    const modelAnimations = useAnimations(model.animations)

    const keyPress = useKeyPress(true)
    //console.log("modeling key", keyPress)
    const mousePosition = useMousePosition()
    //const click = useMouseClick(true)

    const mixer = useMemo(() => {
        return new AnimationMixer(model.scene)
    }, [model.scene])

    const [animation, setAnimation] = useState(Animations.idle.name)

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

    // useEffect(() => {

    //     console.log('model mouse click', click)

    //     switch(click) {
    //         case Animations.walking.mouseClickCode:
    //           setAnimation(Animations.walking.name)
    //           break;
    //         case Animations.standingJump.mouseClickCode:              
    //           setAnimation(Animations.standingJump.name)
    //           break;
    //         case Animations.running.mouseClickCode:
    //           setAnimation(Animations.running.name)
    //           break;
    //         default:
    //           console.log("mouse click request", click)
    //     }
        
    // }, [click]) 

    useEffect(() => {

        //console.log('model key press', keyPress)

        switch(keyPress) {
            case Animations.idle.keyCode:
              setAnimation(Animations.idle.name)
              break;
            case Animations.walking.keyCode:
              setAnimation(Animations.walking.name)
              break;
            case Animations.standingJump.keyCode:              
              setAnimation(Animations.standingJump.name)
              break;
            case Animations.running.keyCode:
              setAnimation(Animations.running.name)
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