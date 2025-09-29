import { createContext, useContext, useEffect, useMemo } from "react"
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

const KeyboardControlsContext = createContext(null)

export function KeyboardControls({ map, children, onChange, domElement }) {
  const key = useMemo(
    () => map.map((item) => `${item.name}-${item.keys.join("|")}`).join("--"),
    [map]
  )

  const normalizedMap = useMemo(
    () =>
      map.map((entry) => ({
        name: entry.name,
        keys: [...entry.keys],
        up: entry.up ?? true
      })),
    [key]
  )

  const store = useMemo(
    () =>
      create(
        subscribeWithSelector(() =>
          normalizedMap.reduce(
            (acc, entry) => ({
              ...acc,
              [entry.name]: false
            }),
            {}
          )
        )
      ),
    [key]
  )

  const api = useMemo(() => [store.subscribe, store.getState, store], [store])
  const setState = store.setState

  useEffect(() => {
    const handlers = normalizedMap.map(({ name, keys, up }) => ({
      keys,
      up,
      fn: (value) => {
        setState({ [name]: value })
        if (onChange) onChange(name, value, api[1]())
      }
    }))

    const keyRegistry = handlers.reduce((acc, { keys, fn, up = true }) => {
      keys.forEach((key) => {
        acc[key] = {
          fn,
          pressed: false,
          up
        }
      })
      return acc
    }, {})

    const downHandler = (event) => {
      const info = keyRegistry[event.key] || keyRegistry[event.code]
      if (!info) return
      const { fn, pressed, up } = info
      info.pressed = true
      if (up || !pressed) fn(true)
    }

    const upHandler = (event) => {
      const info = keyRegistry[event.key] || keyRegistry[event.code]
      if (!info) return
      const { fn, up = true } = info
      info.pressed = false
      if (up) fn(false)
    }

    const target = domElement ?? (typeof window !== "undefined" ? window : undefined)
    if (!target) return undefined

    target.addEventListener("keydown", downHandler, { passive: true })
    target.addEventListener("keyup", upHandler, { passive: true })

    return () => {
      target.removeEventListener("keydown", downHandler)
      target.removeEventListener("keyup", upHandler)
    }
  }, [api, domElement, normalizedMap, onChange, setState])

  return (
    <KeyboardControlsContext.Provider value={api}>{children}</KeyboardControlsContext.Provider>
  )
}

export function useKeyboardControls(selector) {
  const contextValue = useContext(KeyboardControlsContext)
  if (!contextValue) {
    throw new Error("useKeyboardControls must be used within a <KeyboardControls> provider")
  }

  const [subscribe, get, store] = contextValue
  if (selector) return store(selector)
  return [subscribe, get]
}
