import { Stage, Container } from '@pixi/react'
import { SwayAquaticPlants } from './SwayAquaticPlants'
import { Aji } from './Aji'
import { EiRight } from './EiRight'
import { EiLeft } from './EiLeft'
import { Cover } from './Cover'
import { SignBoard } from './SignBoard'
import { useCallback, useEffect, useState } from 'react'

interface Props {
  width: number
  height: number
}

export const MainView: React.FC<Props> = ({ width, height }) => {
  const [isAjiIn, setIsAjiIn] = useState(false)
  const ajiIn = useCallback(() => {
    setIsAjiIn(true)
  }, [])
  const onAjiLeave = useCallback(() => {
    setIsAjiIn(false)
    setTimeout(() => {
      ajiIn()
    }, 2000 + Math.random() * 2000)
  }, [ajiIn])

  const [isEiRightIn, setIsEiRightIn] = useState(false)
  const eiRightIn = useCallback(() => {
    setIsEiRightIn(true)
  }, [])
  const onEiRightLeave = useCallback(() => {
    setIsEiRightIn(false)
    setTimeout(() => {
      eiRightIn()
    }, 4000 + Math.random() * 1000)
  }, [eiRightIn])

  const [isEiLeftIn, setIsEiLeftIn] = useState(false)
  const eiLeftIn = useCallback(() => {
    setIsEiLeftIn(true)
  }, [])

  const onEiLeftLeave = useCallback(() => {
    setIsEiLeftIn(false)

    setTimeout(() => {
      eiLeftIn()
    }, 4000 + Math.random() * 1000)
  }, [eiLeftIn])

  useEffect(() => {
    const timer1 = setTimeout(() => {
      ajiIn()
    }, 500 + Math.random() * 500)

    const timer2 = setTimeout(() => {
      eiRightIn()
    }, 1200 + Math.random() * 700)

    const timer3 = setTimeout(() => {
      eiLeftIn()
    }, 6000 + Math.random() * 900)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [ajiIn, eiLeftIn, eiRightIn])

  return (
    <Stage
      width={width}
      height={height}
      options={{ backgroundColor: 0x1b2668 }}
    >
      <Container x={0} y={0}>
        <SwayAquaticPlants />
        {isAjiIn && (
          <Aji
            scale={0.5}
            x={width}
            y={height * 0.5}
            baseVelocity={0.8}
            onLeave={onAjiLeave}
          />
        )}
        {isEiRightIn && (
          <EiRight
            scale={0.5}
            x={-width}
            y={height * 0.2}
            baseVelocity={0.4}
            onLeave={onEiRightLeave}
          />
        )}
        {isEiLeftIn && (
          <EiLeft
            scale={0.5}
            x={width}
            y={height * 0.8}
            baseVelocity={0.4}
            onLeave={onEiLeftLeave}
          />
        )}
        <SignBoard text='Hello World!' x={width * 0.5} y={height * 0.5} />
      </Container>
      <Cover width={width} height={height} />
    </Stage>
  )
}
