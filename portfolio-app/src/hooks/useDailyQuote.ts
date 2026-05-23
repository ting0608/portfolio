import { useMemo } from 'react'
import quotes from '../data/quotes.json'

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export function useDailyQuote() {
  return useMemo(() => {
    const index = dayOfYear(new Date()) % quotes.length
    return quotes[index]
  }, [])
}
