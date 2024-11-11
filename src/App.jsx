import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
//import { OrbitControls } from '@react-three/drei'

import { Model } from './components'

export const App = () => {

  return (
    <main>
        <Canvas camera={{ fov: 50, zoom: 1, near: 1, far: 1000, position: [0, 0, 5], rotation: [0, 0, 0]}}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight />
            {/* <OrbitControls makeDefault/> */}
            {/* <Camera /> */}
            <Model />
          </Suspense>
        </Canvas>
    </main>
  )
}
