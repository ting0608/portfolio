import { useEffect, useState } from 'react'
import { typingLines } from '../data/typingLines'

const TYPING_MS = 70
const PAUSE_MS = 1800
const DELETE_MS = 40

export function TypingAnimation() {
  const [lineIndex, setLineIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = typingLines[lineIndex]

    if (!deleting && text === full) {
      const pause = window.setTimeout(() => setDeleting(true), PAUSE_MS)
      return () => window.clearTimeout(pause)
    }

    if (deleting && text === '') {
      setDeleting(false)
      setLineIndex((i) => (i + 1) % typingLines.length)
      return
    }

    const delay = deleting ? DELETE_MS : TYPING_MS
    const timer = window.setTimeout(() => {
      setText((current) =>
        deleting ? current.slice(0, -1) : full.slice(0, current.length + 1),
      )
    }, delay)

    return () => window.clearTimeout(timer)
  }, [text, deleting, lineIndex])

  return (
    <p className="typing-line" aria-live="polite">
      <span>{text}</span>
      <span className="typing-cursor" aria-hidden="true">
        |
      </span>
    </p>
  )
}
