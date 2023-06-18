import { TilingSprite, withFilters } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { useMemo } from 'react'
import MaskerImg from './assets/masker.png'

interface Props {
  width: number
  height: number
}

export const Cover: React.FC<Props> = ({ width, height }) => {
  return (
    <TilingSprite
      tilePosition={0}
      image={MaskerImg.src}
      width={width}
      height={height}
    />
  )
}
