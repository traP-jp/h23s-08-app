import { atom, useAtom } from 'jotai'

const stageSizeAtom = atom({ width: 450, height: 800 })
export const useStageSize = () => {
  return useAtom(stageSizeAtom)
}
