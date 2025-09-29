import * as THREE from "three"
import { useEffect, useMemo, useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import CustomShaderMaterial from "three-custom-shader-material"

import { useStore } from "../../hooks/useStore"

import vertexShader from "./shaders/vertex.glsl"
import fragmentShader from "./shaders/fragment.glsl"


export function Terrain() {
  // Global states
  const waterLevel = useStore((state) => state.waterLevel)
  const waveSpeed = useStore((state) => state.waveSpeed)
  const waveAmplitude = useStore((state) => state.waveAmplitude)
  const foamDepth = useStore((state) => state.foamDepth)

  // Load model
  const { nodes } = useGLTF("/models/baselow.glb")
  const grassTextture = {
    normal: useMemo(() => new THREE.TextureLoader().load("/textures/grass/normal.png", ), []),
    displacement: useMemo(() => new THREE.TextureLoader().load("/textures/grass/displacement.tiff"), []),
    base: useMemo(() => new THREE.TextureLoader().load("/textures/grass/base.jpg"), []),
    ao  : useMemo(() => new THREE.TextureLoader().load("/textures/grass/ao.jpg"), []),
    roughness  : useMemo(() => new THREE.TextureLoader().load("/textures/grass/rough.jpg"), []), 
    metalness  : useMemo(() => new THREE.TextureLoader().load("/textures/grass/metal.jpg"), [])
  }

  const repeat = 100

  grassTextture.normal.wrapS = grassTextture.normal.wrapT = THREE.RepeatWrapping
  grassTextture.normal.repeat.set(repeat, repeat)

  grassTextture.displacement.wrapS = grassTextture.displacement.wrapT = THREE.RepeatWrapping
  grassTextture.displacement.repeat.set(repeat, repeat)

  grassTextture.base.wrapS = grassTextture.base.wrapT = THREE.RepeatWrapping
  grassTextture.base.repeat.set(repeat, repeat)

  grassTextture.ao.wrapS = grassTextture.ao.wrapT = THREE.RepeatWrapping
  grassTextture.ao.repeat.set(repeat, repeat)

  grassTextture.roughness.wrapS = grassTextture.roughness.wrapT = THREE.RepeatWrapping
  grassTextture.roughness.repeat.set(repeat, repeat)

  grassTextture.metalness.wrapS = grassTextture.metalness.wrapT = THREE.RepeatWrapping
  grassTextture.metalness.repeat.set(repeat, repeat)

  // Interactive color parameters
  const { SAND_BASE_COLOR, GRASS_BASE_COLOR, UNDERWATER_BASE_COLOR } =
    useControls("Terrain", {
      SAND_BASE_COLOR: { value: "#ff9900", label: "Sand" },
      GRASS_BASE_COLOR: { value: "#2f8323", label: "Grass" },
      UNDERWATER_BASE_COLOR: { value: "#005956", label: "Underwater" }
    })

  // Convert color hex values to Three.js Color objects
  const GRASS_COLOR = useMemo(
    () => new THREE.Color(GRASS_BASE_COLOR),
    [GRASS_BASE_COLOR]
  )
  const UNDERWATER_COLOR = useMemo(
    () => new THREE.Color(UNDERWATER_BASE_COLOR),
    [UNDERWATER_BASE_COLOR]
  )

  // Material
  const materialRef = useRef()
  
  // Update shader uniforms whenever control values change
  useEffect(() => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uGrassColor.value = GRASS_COLOR
    materialRef.current.uniforms.uUnderwaterColor.value = UNDERWATER_COLOR
    materialRef.current.uniforms.uWaterLevel.value = waterLevel
    materialRef.current.uniforms.uWaveSpeed.value = waveSpeed
    materialRef.current.uniforms.uWaveAmplitude.value = waveAmplitude
    materialRef.current.uniforms.uFoamDepth.value = foamDepth
  }, [
    GRASS_COLOR,
    UNDERWATER_COLOR,
    waterLevel,
    waveSpeed,
    waveAmplitude,
    foamDepth
  ])

  // Update shader time
  useFrame(({ clock }) => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <group dispose={null} position={[50, 0, 50]}>
      {/* Big plane as a ground or backdrop */}
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, -0.2, 0]} // Positioned further down
        receiveShadow
      >
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color={UNDERWATER_BASE_COLOR} />
      </mesh>
      <mesh
        geometry={nodes.Plane.geometry}
        position={[0, -2, 0]}
        scale={[200, 200, 200]}
        receiveShadow
      >
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshStandardMaterial}
          color={SAND_BASE_COLOR}
         
          normalMap={grassTextture.normal}
          displacementMap={grassTextture.displacement}
          // map={grassTextture.base}
          aoMap={grassTextture.ao}
          roughnessMap={grassTextture.roughness}
          metalnessMap={grassTextture.metalness}
          normalScale={new THREE.Vector2(0.15, 0.15)}
          aoMapIntensity={5.0}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          displacementScale={10}
          metalness={1.0}
          roughness={1.0}
          uniforms={{
            uTime: { value: 0 },
            uGrassColor: { value: GRASS_COLOR },
            uUnderwaterColor: { value: UNDERWATER_COLOR },
            uWaterLevel: { value: waterLevel },
            uWaveSpeed: { value: waveSpeed },
            uFoamDepth: { value: foamDepth },
            uWaveAmplitude: { value: waveAmplitude }
          }}
        />
      </mesh>

      {/* <mesh
        rotation-x={-Math.PI / 2}
        position={[0, -0.01, 0]} // Moved it down slightly to avoid the odd visual glitch from plane collision
        receiveShadow
      >
        <planeGeometry args={[256, 256]} />
        <meshStandardMaterial color={UNDERWATER_BASE_COLOR} />
      </mesh> */}
    </group>
  )
}

useGLTF.preload("/models/terrain2.glb")
