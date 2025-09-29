import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    trees: THREE.Mesh
    group100681590: THREE.Mesh
    group100681590_1: THREE.Mesh
    group1932686607: THREE.Mesh
    group1932686607_1: THREE.Mesh
    group1958235271: THREE.Mesh
    group1958235271_1: THREE.Mesh
    group874600975: THREE.Mesh
    group874600975_1: THREE.Mesh
    group874600975_2: THREE.Mesh
    group1114869579: THREE.Mesh
    group1114869579_1: THREE.Mesh
    group373735999: THREE.Mesh
    group373735999_1: THREE.Mesh
    group1206298165: THREE.Mesh
    group1206298165_1: THREE.Mesh
    trees7: THREE.Mesh
    group2102696020: THREE.Mesh
    group2102696020_1: THREE.Mesh
    group546125134: THREE.Mesh
    group546125134_1: THREE.Mesh
    group2112331936: THREE.Mesh
    group2112331936_1: THREE.Mesh
    group1610579876: THREE.Mesh
    group1610579876_1: THREE.Mesh
    trees12: THREE.Mesh
    group720331588: THREE.Mesh
    group720331588_1: THREE.Mesh
    group1145296422: THREE.Mesh
    group1145296422_1: THREE.Mesh
    grass: THREE.Mesh
    grass0: THREE.Mesh
  }
  materials: {
    ['Material.003']: THREE.MeshStandardMaterial
    mat11: THREE.MeshPhysicalMaterial
    mat19: THREE.MeshPhysicalMaterial
    mat9: THREE.MeshPhysicalMaterial
    mat10: THREE.MeshPhysicalMaterial
    mat17: THREE.MeshPhysicalMaterial
    mat20: THREE.MeshPhysicalMaterial
    mat16: THREE.MeshPhysicalMaterial
    _4: THREE.MeshStandardMaterial
  }
}

export function Grass(props: JSX.IntrinsicElements['group']) {
  const gltf = useGLTF('/models/grass_trees2.glb') as GLTFResult
  return <primitive object={gltf.scene} {...props} />
}

useGLTF.preload('/models/grass_trees.glb')
