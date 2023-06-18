import { Sprite, useTick } from '@pixi/react'
import EiImg from './assets/fish/ei_left.svg'
import { useSwinger } from '@/utils/useSwinger'
import { useState } from 'react'
import { useStageSize } from './stageSize'

interface Props {
  scale: number
  x: number
  y: number
  baseVelocity: number
  onLeave?: () => void
}

/// degree
const TILT = 40

export const EiLeft: React.FC<Props> = ({
  scale,
  x,
  y,
  baseVelocity,
  onLeave,
}) => {
  const [stageSize] = useStageSize()
  const [velocity, addVelocity] = useSwinger(baseVelocity, [0, baseVelocity])

  const [distance, setDistance] = useState(0)

  const [fluctuation, addFluctuation] = useSwinger(0, [-20, 20])

  useTick(delta => {
    addVelocity(delta * 0.02)
    setDistance(prev => prev + velocity)
    addFluctuation(delta * 0.001)
  })

  const nowX =
    x -
    distance * Math.cos((TILT * Math.PI) / 180) +
    fluctuation * Math.sin((TILT * Math.PI) / 180)
  const nowY =
    y -
    distance * Math.sin((TILT * Math.PI) / 180) -
    fluctuation * Math.cos((TILT * Math.PI) / 180)

  useTick(() => {
    if (
      nowX + EiImg.width * scale < 0 &&
      (nowY + EiImg.height * scale < 0 || nowY > stageSize.height)
    ) {
      onLeave?.()
    }
  })

  return (
    <Sprite
      image={EiImg.src}
      width={EiImg.width * scale}
      height={EiImg.height * scale}
      x={nowX}
      y={nowY}
    />
  )
}
