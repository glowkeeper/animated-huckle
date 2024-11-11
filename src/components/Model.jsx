import { useState, useEffect, useMemo } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { AnimationMixer } from 'three'

import { useMousePosition, useMouseClick} from '../utils'

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

    const mousePosition = useMousePosition();
    const button = useMouseClick();

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
                    action?.play()
                }
            })
        }
        
    }, [animation, modelAnimations, mixer])    

    useEffect(() => {

        switch(button) {
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
        
    }, [button]) 
    

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