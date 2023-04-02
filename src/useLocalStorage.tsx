// src/useLocalStorage.tsx
import './storageProxy'
import { useState, useEffect } from 'preact/hooks'

type StorageValue<T> = T | null

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [StorageValue<T>, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<StorageValue<T>>(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  const setValue = (value: T) => {
    setStoredValue(value)
    localStorage.setItem(key, JSON.stringify(value))
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
      handleLocalStorageChange as EventListener,
    )

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener(
        'localstorage',
        handleLocalStorageChange as EventListener,
      )
    }
  }, [key])

  return [storedValue, setValue]
}
