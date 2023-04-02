import { h, FunctionComponent } from 'preact'
import { useCounterWithStorage } from '../useCounterWithStorage'

export const CounterIncrementButton: FunctionComponent = () => {
  const { increment } = useCounterWithStorage()
  return <button onClick={increment}>Increment</button>
}
