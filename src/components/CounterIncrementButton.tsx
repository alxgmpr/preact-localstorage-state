import { h, FunctionComponent } from 'preact'
import { useCounter } from '../useCounter'

export const CounterIncrementButton: FunctionComponent = () => {
  const { increment } = useCounter()
  return <button onClick={increment}>Increment</button>
}
