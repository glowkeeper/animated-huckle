import { useState, useEffect, useMemo } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { AnimationMixer } from 'three'

import { useKeyPress, useMousePosition, useMouseClick } from '../utils'

const gltf = './assets/3D/me/combined.gltf'
const animations = {
    idle: 'idle',
    walking: 'walking',
    running: 'running',
    standingJump: 'standingJump'
}
const ninety = Math.PI / 2

export const Model = (props) => {

    //const ref = useRef()
    useGLTF.preload(gltf)
    const model = useLoader(GLTFLoader, gltf)
    //console.log('model', model)
    const modelAnimations = useAnimations(model.animations)

    const keyPress = useKeyPress()
    //console.log("modeling key", keyPress)
    const mousePosition = useMousePosition()
    const click = useMouseClick()

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
            case "Left":
              setAnimation(animations.walking)
              break;
            case "Middle":              
              setAnimation(animations.standingJump)
              break;
            case "Right":
              setAnimation(animations.running)
              break;
            default:
              setAnimation(animations.idle)
        }
        
    }, [click]) 

    useEffect(() => {

        //console.log('model key press', keyPress)

        switch(keyPress) {
            case "Space":
              setAnimation(animations.idle)
              break;
            default:
              setAnimation(animations.idle)
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