import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as PIXI from 'pixi.js'
import { Container, Graphics, Text, useTick } from '@pixi/react'
import { useSwinger } from '@/utils/useSwinger'

interface Props {
  text: string
  x: number
  y: number
}

export const SignBoard: React.FC<Props> = ({ text, x, y }) => {
  const containerRef = useRef<PIXI.Container>(null)

  const expectedArea = useMemo(() => {
    const textMetrics = PIXI.TextMetrics.measureText(
      text,
      new PIXI.TextStyle({ fill: 0xedf5f7 })
    )

    return textMetrics
  }, [text])

  const draw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear()
      g.beginFill(0xbf5745, 0.5)
      g.drawRect(0, 0, expectedArea.width + 20, expectedArea.height + 20)
      g.drawRect(0, expectedArea.height + 20, 5, 20)
      g.drawRect(expectedArea.width + 20 - 5, expectedArea.height + 20, 5, 20)
      g.endFill()
    },
    [expectedArea.height, expectedArea.width]
  )

  const [velocity, addVelocity] = useSwinger(0.5, [0, 0.5])

  const [nowX, setNowX] = useState(x)
  const [nowY, setNowY] = useState(y)

  useTick(delta => {
    addVelocity(delta * 0.02)
    setNowX(prev => prev - velocity)
    setNowY(prev => prev + delta * 0.1)
  })

  return (
    <Container x={nowX} y={nowY} ref={containerRef} rotation={-0.1}>
      <Graphics
        draw={draw}
        interactive={true}
        buttonMode={true}
        pointerdown={() => console.log('pointerdown')}
      />
      <Text
        text={text}
        style={new PIXI.TextStyle({ fill: 0xedf5f7 })}
        x={10}
        y={10}
      />
    </Container>
  )
}
