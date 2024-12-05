import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
//import { OrbitControls } from '@react-three/drei'

import { Header, Footer, Model } from './components'
import { Animations } from './utils'

export const App = () => {

  return (
    <>
      <Header />
      <main>
        <p>
          {Animations.walking.title}: <strong>{Animations.walking.key}</strong>, {Animations.idle.title}: <strong>{Animations.idle.key}</strong>, {Animations.standingJump.title}: <strong>{Animations.standingJump.key}</strong>, {Animations.running.title}: <strong>{Animations.running.key}</strong>
        </p> 
        <div
          id="AnimationCanvas"
        >
          <Canvas camera={{ fov: 50, zoom: 1, near: 1, far: 1000, position: [0, 0, 5], rotation: [0, 0, 0]}}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
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
