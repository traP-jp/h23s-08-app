import { Stage, Container, Sprite, Text } from '@pixi/react'
import * as PIXI from 'pixi.js'

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
      <Container x={width} y={height}>
        <Text
          text='Hello World!'
          style={new PIXI.TextStyle({ fill: 0xedf5f7 })}
        />
      </Container>
    </Stage>
  )
}
