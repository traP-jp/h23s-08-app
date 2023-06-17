import {
  Stage,
  Container,
  Text,
} from '@pixi/react'
import * as PIXI from 'pixi.js'
import { SwayAquaticPlants } from './SwayAquaticPlants'

interface Props {
  width: number
  height: number
}

export const MainView: React.FC<Props> = ({ width, height }) => {
  return (
    <Stage
      width={width}
      height={height}
      options={{ backgroundColor: 0x1b2668 }}
    >
    <Container x={0} y={0}>
      <SwayAquaticPlants />
      <Text
        text='Hello World!'
        style={new PIXI.TextStyle({ fill: 0xedf5f7 })}
        x={0}
        y={0}
      />
    </Container>
    </Stage>
  )
}
