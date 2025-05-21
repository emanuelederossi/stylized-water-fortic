import { useGLTF } from "@react-three/drei"

export function Colosseum() {

  const { nodes, materials } = useGLTF('/models/colosseum.glb')
  return (
    <group dispose={null}>
      <group scale={0.02}
      position={[0.2, 1.7, 0.2]}
      >
        <group rotation={[-Math.PI / 2, -Math.PI / 64, 0]} scale={77.824}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder_Bake_0.geometry}
            material={materials.Bake}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder_Bake_0001.geometry}
            material={materials.Bake}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder_Bake_0002.geometry}
            material={materials.Bake}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder_Bake_0003.geometry}
            material={materials.Bake}
          />
        </group>
      </group>
    </group>
  )
}