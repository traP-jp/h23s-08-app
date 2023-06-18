import { Container, Sprite, withFilters, useTick } from '@pixi/react'
import * as PIXI from 'pixi.js'
import Mizukusa01 from './assets/mizukusa_01.png'
import { ComponentProps, useEffect, useMemo, useRef, useState } from 'react'
import { DisplacementFilter } from 'pixi.js'
import { useSwinger } from '@/utils/useSwinger'

const Filters = withFilters(Container, {
  displacement: DisplacementFilter,
})

type Props = ComponentProps<typeof Container>

export const SwayAquaticPlants: React.FC<Props> = props => {
  const displacementSpriteRef = useRef<PIXI.Sprite>(null)
  const [renderFilter, setRenderFilter] = useState(false)

  useEffect(() => {
    if (displacementSpriteRef.current === null) {
      return
    }

    displacementSpriteRef.current.texture.baseTexture.wrapMode =
      PIXI.WRAP_MODES.REPEAT
    setRenderFilter(true)
  }, [])

  const [swingValue, addSwingValue] = useSwinger(
    0,
    useMemo(() => {
      return [0, 1000]
    }, [])
  )
  const config = useMemo(() => {
    return {
      x: swingValue,
      y: swingValue,
    }
  }, [swingValue])

  useTick(delta => {
    addSwingValue(delta * 0.02)
  })

  return (
    <Container {...props}>
      <Sprite
        {...config}
        image='https://pixijs.io/examples/examples/assets/pixi-filters/displacement_map_repeat.jpg'
        ref={displacementSpriteRef}
      />
      {renderFilter && (
        <Filters
          displacement={{
            construct:
              displacementSpriteRef.current === null
                ? undefined
                : [displacementSpriteRef.current],
            scale: new PIXI.Point(30, 60),
          }}
        >
          <Sprite image={Mizukusa01.src} width={362} height={780} />
        </Filters>
      )}
    </Container>
  )
}
