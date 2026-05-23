import type { CSSProperties, ElementType, ReactNode, Ref } from 'react'
import { useInView } from '../hooks/useInView'

type RevealTextProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  delay?: number
}

export function RevealText({
  as: Component = 'div',
  children,
  className = '',
  delay = 0,
}: RevealTextProps) {
  const { ref, inView } = useInView()

  return (
    <Component
      ref={ref as Ref<HTMLElement>}
      className={`reveal-text${inView ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  )
}
