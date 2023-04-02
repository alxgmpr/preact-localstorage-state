import { h, FunctionComponent } from 'preact'
import { useCounter } from '../useCounter'

export const CounterDisplay: FunctionComponent = () => {
  const { count } = useCounter()

  return <div>Counter: {count}</div>
}
