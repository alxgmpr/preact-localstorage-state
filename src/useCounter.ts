import { useLocalStorageState } from './useLocalStorageState'
import { STORE_NAME } from './constants'

type CounterState = {
  counter: number
}

const initialState: CounterState = {
  counter: 0,
}

/**
 * Example hook that implements a 'counter' state into the useLocalStorage store
 */
export function useCounter() {
  const { state, setState } = useLocalStorageState<CounterState>(
    STORE_NAME,
    initialState
  )

  function increment() {
    setState({
      counter: state.counter + 1,
    })
  }

  return { count: state.counter, increment }
}
