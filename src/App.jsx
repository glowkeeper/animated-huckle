import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
//import { OrbitControls } from '@react-three/drei'

import { Header, Footer, Model } from './components'

export const App = () => {

  return (
    <>
      <Header />      
      <main>
        <div
          id="AnimationCanvas"
        >
          <Canvas camera={{ fov: 50, zoom: 1, near: 1, far: 1000, position: [0, 0, 5], rotation: [0, 0, 0]}}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.9} />
              <directionalLight />
              {/* <OrbitControls makeDefault/> */}
              <Model />
            </Suspense>
          </Canvas>
        </div>
      </main>
      <Footer />
    </>
  )
}
