import { useEffect, useState } from 'react'
import { SidebarIcon } from './SidebarIcon'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: 'home' as const },
  { id: 'quotes', label: 'Quotes', icon: 'comment' as const },
  { id: 'work', label: 'Work', icon: 'briefcase' as const },
]

export function GlassSidebar() {
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean,
    ) as HTMLElement[]

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { threshold: [0.35, 0.55, 0.75] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
  }

  return (
    <nav className="glass-sidebar" aria-label="Page sections">
      <ul className="glass-sidebar-list">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`glass-sidebar-link${activeId === item.id ? ' is-active' : ''}`}
              aria-label={item.label}
              aria-current={activeId === item.id ? 'page' : undefined}
              title={item.label}
              onClick={() => scrollTo(item.id)}
            >
              <SidebarIcon name={item.icon} bold={activeId === item.id} />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
