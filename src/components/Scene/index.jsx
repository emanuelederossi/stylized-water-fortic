import { Colosseum } from "../Colosseum"
import { Pontili } from "../Pontili"
import { Rocks } from "../Rocks"
import { Terrain } from "../Terrain"
import { Water } from "../Water"
import { Trees } from "../Trees"

export const Scene = () => {
  return (
    <>
      <Rocks />
      <Terrain />
      <Water />
      <Pontili position={[50, -1.5, 50]} scale={[200, 250, 200]} />
      <Trees position={[50, -4.0, 50]} scale={[200, 200, 200]} />
      <Colosseum />
    </>
  )
}
