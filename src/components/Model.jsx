import { useLoader } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { Animate } from './Animate'

const gltf = './assets/3D/me/combined.gltf'

export const Model = () => {

    //const ref = useRef()
    useGLTF.preload(gltf)
    const model = useLoader(GLTFLoader, gltf)

    return (

        <Animate model={model} />
    )
}