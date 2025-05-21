import { useGLTF, Html } from "@react-three/drei"
import { useStore } from "../../hooks/useStore"

export function Colosseum() {

  const { nodes, materials } = useGLTF('/models/colosseum.glb')
  return (
    <group dispose={null}>
      <group scale={0.02}
        position={[0.2, 1.7, 0.2]}
      >
        <group rotation={[-Math.PI / 2, -Math.PI / 64, 0]} scale={77.824}>
          <Html
          position={[0, 0, 3]}
            as="div"
            zIndexRange={[1, 0]}
            distanceFactor={15}
            center
          >
            <div
            onClick={() => {
              useStore.setState({ interiorOpen: true })
            }}
            style={{
                  all: 'unset',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  pointerEvents: 'visible',
                  width: 'max-content',
                  // maxWidth: '2.36em',
                  height: '2.36em',
                  padding: 'calc(0.5em - 1px)',
                  backgroundColor: 'var(--font-background)',
                  borderRadius: '3em',
                  clipPath: 'inset(0 round 3em)',
                  boxSizing: 'border-box',
                  border: '2px solid #e1e5e1',
                  cursor: 'pointer',
            }}
            >visit room 1</div>
          </Html>
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