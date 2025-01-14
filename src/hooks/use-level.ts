import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface MyState {
  level: number
  nextLevel: () => void
}

export const useLevelStore = create<MyState>()(
  persist(
    (set, get) => ({
      level: 1,
      nextLevel: () => {
        let level = get().level
        if (level >= 6) level = 1;
        else level += 1;

        set({ level })
      },
    }),
    {
      name: 'level-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)