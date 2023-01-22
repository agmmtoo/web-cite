import { useEffect, useState } from 'react'

export function useClipboard() {
  const [data, setData] = useState<string | null>(null)
  useEffect(() => {
    const listener = (event: ClipboardEvent) => {
      setData(event.clipboardData.getData('text'))
      console.log(data)
    }

    document.addEventListener('paste', listener)
    return () => {
      document.removeEventListener('paste', listener)
    }
  }, [])

  return { data }
}
