import { useGLTF } from "@react-three/drei"

export function Pontili(props) {
  const { nodes, materials } = useGLTF("/models/pontili/1.glb")
  return (
    <group {...props} dispose={null}>
      <group position={[0.117, 0.011, 0.009]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long_1.geometry}
          material={materials.Wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long_2.geometry}
          material={materials.LightWood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long_3.geometry}
          material={materials.String}
        />
      </group>
      <group position={[0.144, 0.011, -0.211]} rotation={[0, 0.425, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long001_1.geometry}
          material={materials["Wood.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long001_2.geometry}
          material={materials["LightWood.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long001_3.geometry}
          material={materials["String.001"]}
        />
      </group>
      <group position={[0.384, 0.011, -0.03]} rotation={[0, -0.338, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long004_1.geometry}
          material={materials["Wood.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long004_2.geometry}
          material={materials["LightWood.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long004_3.geometry}
          material={materials["String.001"]}
        />
      </group>
      <group position={[-0.143, 0.011, -0.267]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long002_1.geometry}
          material={materials["Wood.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long002_2.geometry}
          material={materials["LightWood.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long002_3.geometry}
          material={materials["String.001"]}
        />
      </group>
      <group position={[-0.147, 0.011, -0.494]} rotation={[0, 0.759, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long003_1.geometry}
          material={materials["Wood.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long003_2.geometry}
          material={materials["LightWood.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Dock_Long003_3.geometry}
          material={materials["String.001"]}
        />
      </group>
    </group>
  )
}

useGLTF.preload("/1.glb")
