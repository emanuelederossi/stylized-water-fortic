import clsx from "clsx"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { AdaptiveDpr, KeyboardControls } from "@react-three/drei"
import { Leva } from "leva"

import { Experience } from "./components/Experience"
import { Loading } from "./ui/Loading"

import { useStore } from "./hooks/useStore"

import s from "./ui/ui.module.scss"
import { CameraAndKeyControlsEvent } from "./components/Controls"

function App() {
  const ready = useStore((state) => state.ready)

  const showLeva = window.location.hash === "#debug"

  return (
    <>
      <Loading />
      <Suspense>
        <div className={clsx(s.transition, { [s.show]: ready })}>
          <Leva hidden={!ready || !showLeva} />
          <KeyboardControls
            map={[
              { name: "forward", keys: ["ArrowUp", "w", "W"] },
              { name: "backward", keys: ["ArrowDown", "s", "S"] },
              { name: "left", keys: ["ArrowLeft", "a", "A"] },
              { name: "right", keys: ["ArrowRight", "d", "D"] },
              { name: "jump", keys: ["Space"] },
              { name: "escape", keys: ["Escape"] }
            ]}
          >
            <Canvas camera={{ position: [-10, 13, 40], fov: 35 }} shadows>
              <CameraAndKeyControlsEvent />
              <Experience />
              <AdaptiveDpr pixelated />
            </Canvas>
          </KeyboardControls>
        </div>
      </Suspense>
    </>
  )
}

export default App
