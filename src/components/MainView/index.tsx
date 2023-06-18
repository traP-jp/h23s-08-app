import { Stage, Container, Text } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { SwayAquaticPlants } from './SwayAquaticPlants'
import { Aji } from './Aji'
import { EiRight } from './EiRight'
import { EiLeft } from './EiLeft'
import { Cover } from './Cover'
import { SignBoard } from './SignBoard'

interface Props {
  width: number
  height: number
}

export const MainView: React.FC<Props> = ({ width, height }) => {
  return (
    <Stage
      width={width}
      height={height}
      options={{ backgroundColor: 0x1b2668 , transparent: true }}
    >
      <Container x={0} y={0}>
        <SwayAquaticPlants />
        <Aji scale={0.5} x={width} y={height * 0.5} baseVelocity={0.8} />
        <EiRight scale={0.5} x={-width} y={height * 0.2} baseVelocity={0.4} />
        <EiLeft scale={0.5} x={width} y={height * 0.8} baseVelocity={0.4} />
        <SignBoard text='Hello World!' x={width * 0.5} y={height * 0.5} />
      </Container>
      <Cover width={width} height={height} />
    </Stage>
  )
}
