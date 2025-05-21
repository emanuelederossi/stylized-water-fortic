import clsx from "clsx"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { AdaptiveDpr } from "@react-three/drei"
import { Leva } from "leva"

import { Interior } from "./components/Interior"
import { Experience } from "./components/Experience"
import { UI } from "./ui"
import { Loading } from "./ui/Loading"

import { useStore } from "./hooks/useStore"

import s from "./ui/ui.module.scss"
import Modal from "./components/Modal"

function App() {
  const ready = useStore((state) => state.ready)
  const open = useStore((state) => state.interiorOpen)

  const showLeva = window.location.hash === "#debug"

  return (
    <>
      <Loading />
      <Suspense>
        <div className={clsx(s.transition, { [s.show]: ready })}>
          <Modal
            isOpen={open}
            onClose={() => {
              useStore.setState({ interiorOpen: false })
            }}
          >
            <Interior />
          </Modal>
          <Leva hidden={!ready || !showLeva} />

          <Canvas camera={{ position: [30, 10, -30], fov: 35 }} shadows>
            <Experience />
            <AdaptiveDpr pixelated />
          </Canvas>

          <UI />
        </div>
      </Suspense>
    </>
  )
}

export default App
