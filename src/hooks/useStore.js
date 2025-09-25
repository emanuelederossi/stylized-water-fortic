import { create } from "zustand"

export const useStore = create((set) => ({
  ready: false,
  waterLevel: 0.5,
  waveSpeed: 0.7,
  waveAmplitude: 0.2,
  foamDepth: 0.12,
  audioEnabled: false,
  interiorOpen: false,
  setInteriorOpen: (open) => set(() => ({ interiorOpen: open })),

  setAudioEnabled: (enabled) => set(() => ({ audioEnabled: enabled })),
  setReady: (ready) => set(() => ({ ready: ready }))
}))
