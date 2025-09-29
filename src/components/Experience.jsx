import { Environment } from "@react-three/drei"
import { useControls } from "leva"

import { Scene } from "./Scene"

export const Experience = () => {
  // Interactive color parameters
  const { BACKGROUND } = useControls("Sky", {
    BACKGROUND: { value: "#fffff4", label: "Background" }
  })

  return (
    <>
      <Environment preset="forest" environmentIntensity={0.5} />
      <ambientLight intensity={2.0} />

      <directionalLight
        position={[13, 5, 5]}
        castShadow
        intensity={2}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          attach="shadow-camera"
          left={-30}
          right={30}
          top={30}
          bottom={-30}
        />
      </directionalLight>

      {/* <Audio /> */}

      <color attach="background" args={[BACKGROUND]} />
      <fog attach="fog" args={[BACKGROUND, 400, 500]} />
      <Scene />
    </>
  )
}
