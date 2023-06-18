import { Sprite, useTick } from '@pixi/react'
import EiImg from './assets/fish/ei_right.svg'
import { useSwinger } from '@/utils/useSwinger'
import { useState } from 'react'

interface Props {
  scale: number
  x: number
  y: number
  baseVelocity: number
}

export const EiRight: React.FC<Props> = ({ scale, x, y, baseVelocity }) => {
  const [velocity, addVelocity] = useSwinger(baseVelocity, [0, baseVelocity])

  const [nowX, setNowX] = useState(x)
  const [nowY, addNowY] = useSwinger(y, [y - 10, y + 10])

  useTick(delta => {
    addVelocity(delta * 0.02)
    setNowX(prev => prev + velocity)
    addNowY(delta * 0.001)
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
