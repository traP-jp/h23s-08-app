import { Sprite, useTick } from '@pixi/react'
import AjiImg from './assets/fish/aji.png'
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

export const Aji: React.FC<Props> = ({
  scale,
  x,
  y,
  baseVelocity,
  onLeave,
}) => {
  const [_stageSize] = useStageSize()

  const [velocity, addVelocity] = useSwinger(baseVelocity, [0, baseVelocity])

  const [nowX, setNowX] = useState(x)

  useTick(delta => {
    addVelocity(delta * 0.02)
    setNowX(prev => prev - velocity)

    if (nowX + AjiImg.width * scale < 0) {
      onLeave?.()
    }
  })

  return (
    <Sprite
      image={AjiImg.src}
      width={AjiImg.width * scale}
      height={AjiImg.height * scale}
      x={nowX}
      y={y}
    />
  )
}
