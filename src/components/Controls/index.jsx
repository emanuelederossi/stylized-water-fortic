import { CameraControls, useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

export function CameraAndKeyControlsEvent() {
  const [_, get] = useKeyboardControls()
  useFrame((state, delta) => {
    const { forward, backward, left, right } = get()
    // You can use these boolean values to control your character or camera
    // For example:
    if (forward) {
      // Move forward
      state.camera.position.z -= 0.5 * (1 + delta * 10)
    }
    if (backward) {
      // Move backward
      state.camera.position.z += 0.5 * (1 + delta * 10)
    }
    if (left) {
      // Move left
      state.camera.position.x -= 0.5 * (1 + delta * 10)
    }
    if (right) {
      // Move right
      state.camera.position.x += 0.5 * (1 + delta * 10)
    }
  })
  return (
    <CameraControls
      enabled={true}
      maxPolarAngle={Math.PI / 2.2}
      maxDistance={300}
      minDistance={10}
      makeDefault
    />
    // <PointerLockControls />
  )
}
