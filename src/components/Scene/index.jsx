import { Colosseum } from "../Colosseum"
import { Pontili } from "../Pontili"
import { Rocks } from "../Rocks"
import { Terrain } from "../Terrain"
import { Water } from "../Water"

export const Scene = () => {
  return (
    <>
      <Rocks />
      <Terrain />
      <Water />
      <Pontili position={[50, -1.5, 50]} scale={[200, 250, 200]} />
      <Colosseum />
    </>
  )
}
