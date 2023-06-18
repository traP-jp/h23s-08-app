import { Sprite, useTick } from '@pixi/react'
import AjiImg from './assets/fish/aji.png'
import { useSwinger } from '@/utils/useSwinger'
import { useState } from 'react'

interface Props {
  scale: number
  x: number
  y: number
  baseVelocity: number
}

export const Aji: React.FC<Props> = ({ scale, x, y, baseVelocity }) => {
  const [velocity, addVelocity] = useSwinger(baseVelocity, [0, baseVelocity])

  const [nowX, setNowX] = useState(x)

  useTick(delta => {
    addVelocity(delta * 0.02)
    setNowX(prev => prev - velocity)
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
