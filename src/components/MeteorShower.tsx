import { useEffect, useRef } from 'react'

type Meteor = {
  x: number
  y: number
  vx: number
  vy: number
  length: number
  opacity: number
  width: number
  color: string
}

type MeteorShowerProps = {
  active: boolean
}

const COLORS = ['#ffffff', '#bbe1fa', '#8ecae6']

function spawnMeteor(width: number, height: number): Meteor {
  const angle = (Math.PI / 4) * (0.82 + Math.random() * 0.36)
  const speed = 8 + Math.random() * 10

  return {
    x: Math.random() * width * 1.2 - width * 0.1,
    y: -40 - Math.random() * height * 0.4,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    length: 56 + Math.random() * 88,
    opacity: 0.65 + Math.random() * 0.35,
    width: 1.5 + Math.random() * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }
}

function drawMeteor(ctx: CanvasRenderingContext2D, meteor: Meteor) {
  const tailScale = meteor.length / 10
  const tailX = meteor.x - meteor.vx * tailScale
  const tailY = meteor.y - meteor.vy * tailScale

  const gradient = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY)
  gradient.addColorStop(0, meteor.color)
  gradient.addColorStop(0.25, `rgba(187, 225, 250, ${meteor.opacity * 0.85})`)
  gradient.addColorStop(1, 'rgba(187, 225, 250, 0)')

  ctx.beginPath()
  ctx.moveTo(meteor.x, meteor.y)
  ctx.lineTo(tailX, tailY)
  ctx.strokeStyle = gradient
  ctx.lineWidth = meteor.width
  ctx.lineCap = 'round'
  ctx.globalAlpha = meteor.opacity
  ctx.stroke()
  ctx.globalAlpha = 1
}

export function MeteorShower({ active }: MeteorShowerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const meteorsRef = useRef<Meteor[]>([])
  const spawnTimerRef = useRef(0)
  const activeRef = useRef(active)

  activeRef.current = active

  useEffect(() => {
    if (!active) {
      meteorsRef.current = []
      spawnTimerRef.current = 0
    }
  }, [active])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let frame = 0
    let displayWidth = 0
    let displayHeight = 0
    let lastTime = performance.now()

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      displayWidth = rect.width
      displayHeight = rect.height

      canvas.width = Math.max(1, Math.round(displayWidth * dpr))
      canvas.height = Math.max(1, Math.round(displayHeight * dpr))
      canvas.style.width = `${displayWidth}px`
      canvas.style.height = `${displayHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resizeCanvas()

    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(container)

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      const isActive = activeRef.current

      if (isActive) {
        spawnTimerRef.current += dt
        while (spawnTimerRef.current > 0.14) {
          spawnTimerRef.current -= 0.14
          if (displayWidth > 0 && displayHeight > 0) {
            meteorsRef.current.push(spawnMeteor(displayWidth, displayHeight))
          }
        }
      }

      if (isActive && meteorsRef.current.length < 8 && displayWidth > 0) {
        meteorsRef.current.push(spawnMeteor(displayWidth, displayHeight))
      }

      for (const meteor of meteorsRef.current) {
        meteor.x += meteor.vx * dt * 60
        meteor.y += meteor.vy * dt * 60
      }

      meteorsRef.current = meteorsRef.current.filter(
        (m) =>
          m.y < displayHeight + 140 &&
          m.x > -180 &&
          m.x < displayWidth + 180,
      )

      ctx.clearRect(0, 0, displayWidth, displayHeight)
      for (const meteor of meteorsRef.current) {
        drawMeteor(ctx, meteor)
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div className="meteor-shower" ref={containerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="meteor-shower-canvas" />
    </div>
  )
}
