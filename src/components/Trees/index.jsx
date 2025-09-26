import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

export function Trees(props) {
  const gltf = useGLTF("/models/trees3.glb")
  useEffect(() => {
    gltf.scene.traverse((o) => {
      if (o.isInstancedMesh) {
        o.frustumCulled = false
        o.instanceMatrix.needsUpdate = true
      }
    })
  }, [gltf])
  return <primitive object={gltf.scene} {...props} />
}

useGLTF.preload("/models/trees3.glb")
