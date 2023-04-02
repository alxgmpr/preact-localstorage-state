// src/useCounterWithStorage.tsx
import { useState, useEffect } from 'preact/hooks'
import { useLocalStorage } from './useLocalStorage'
import { LOCAL_STORAGE_CACHE_NAME } from './constants'

type CounterState = {
  counter: number
}

const initialState: CounterState = {
  counter: 0,
}

export function useCounterWithStorage() {
  const [state, setState] = useLocalStorage<CounterState>(
    LOCAL_STORAGE_CACHE_NAME,
    initialState,
  )
  const [count, setCount] = useState(state?.counter ?? 0)

  function increment() {
    const newCount = count + 1
    setCount(newCount)
    setState({
      ...state,
      counter: newCount,
    })
  }

  useEffect(() => {
    setCount(state?.counter ?? 0)
  }, [state])

  return { count, increment }
}
