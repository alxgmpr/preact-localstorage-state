import './storageProxy'
import { useState, useEffect } from 'preact/hooks'

type StorageValue<T> = T

/**
 * Creates a 'store' of state in a JSON blob in LocalStorage. Hooks up event
 * listeners to re-render on changes
 * @param key - name of the key in localStorage to use
 * @param initialValue - initial state
 */
export function useLocalStorageState<T>(
  key: string,
  initialValue: T
): { state: StorageValue<T>; setState: (value: T) => void } {
  const [storedValue, setStoredValue] = useState<StorageValue<T>>(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  const setValue = (value: Partial<T>) => {
    const mutatedValue = { ...storedValue, ...value }
    setStoredValue(mutatedValue)
    localStorage.setItem(key, JSON.stringify(mutatedValue))
  }

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        const parsedNewValue = JSON.parse(e.newValue)
        if (parsedNewValue !== storedValue)
          setStoredValue(JSON.parse(e.newValue))
      }
    }

    const handleLocalStorageChange = () => {
      const item = localStorage.getItem(key)
      const parsedItem = item ? JSON.parse(item) : initialValue
      if (parsedItem !== storedValue) setStoredValue(parsedItem)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener(
      'localstorage',
      handleLocalStorageChange as EventListener
    )

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener(
        'localstorage',
        handleLocalStorageChange as EventListener
      )
    }
  }, [key])

  return { state: storedValue, setState: setValue }
}
