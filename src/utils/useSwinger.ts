import { useCallback, useMemo, useState } from 'react'
import { clamp } from './clamp'

type Dispatch = (value: number, forward?: boolean) => void


// 振幅 max - min で最大の傾きが 1 であるような三角関数を考える
/// initialValue から始まり、min と max の間を振動する値を返す
/// dispatch によって、変位を与える (forward が true なら正の方向、false なら負の方向)
export const useSwinger = (
  initialValue: number,
  [min, max]: readonly [number, number]
): [number, Dispatch] => {
  const range = max - min
  const lambda = range / 2
  const [value, setValue] = useState(Math.asin((clamp(initialValue, [min, max]) - min - lambda) / lambda) * (Math.PI / 180) * lambda)

  const calculated = useMemo(() => {
    return lambda * Math.sin(value * (180 / Math.PI) / lambda) + lambda + min
  }, [lambda, value, min])

  const dispatch = useCallback<Dispatch>(
    (value, forward = true) => {
      setValue((prev) => {
        const next = prev + (forward ? value : -value)
        return next
      })
    },
    [setValue]
  )

  if (min > max) {
    throw new Error(
      `The minimum value (${min}) cannot be greater than the maximum value (${max}).`
    )
  }

  if (min === max) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return [min, () => {}]
  }

  return [clamp(calculated, [min, max]), dispatch]
}
