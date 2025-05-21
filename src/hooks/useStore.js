import { create } from "zustand"

export const useStore = create((set) => ({
  ready: false,
  waterLevel: 0.9,
  waveSpeed: 0.5,
  waveAmplitude: 0.1,
  foamDepth: 0.01,
  audioEnabled: false,
  interiorOpen: false,
  setInteriorOpen: (open) => set(() => ({ interiorOpen: open })),

  setAudioEnabled: (enabled) => set(() => ({ audioEnabled: enabled })),
  setReady: (ready) => set(() => ({ ready: ready }))
}))
