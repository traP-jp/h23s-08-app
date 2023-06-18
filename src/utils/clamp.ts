export const clamp = (value: number, [min, max]: readonly [number, number]) =>
  Math.max(min, Math.min(value, max))
