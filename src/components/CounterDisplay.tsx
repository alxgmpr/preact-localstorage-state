import { h, FunctionComponent } from 'preact'
import { useCounterWithStorage } from '../useCounterWithStorage'

export const CounterDisplay: FunctionComponent = () => {
  const { count } = useCounterWithStorage()

  return <div>Counter: {count}</div>
}
