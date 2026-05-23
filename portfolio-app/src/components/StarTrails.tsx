import { useEffect, useMemo, useRef } from 'react'

type TrailArc = {
  radius: number
  baseStart: number
  span: number
  opacity: number
  width: number
  stroke: string
  speed: number
}

const DESIGN_SIZE = 1000
const ROTATION_PERIOD_S = 160

function createSeededRandom(seed: number) {
  let state = seed % 2147483647
  if (state <= 0) state += 2147483646

  return () => {
    state = (state * 16807) % 2147483647
    return (state - 1) / 2147483646
  }
}

function buildTrailArcs(): TrailArc[] {
  const arcs: TrailArc[] = []
  const rand = createSeededRandom(20260523)
  const ringCount = 30

  for (let ring = 0; ring < ringCount; ring += 1) {
    const baseRadius = 140 + ring * 12
    const arcCount = 8 + Math.floor(rand() * 16)
    const ringSpeed = 0.82 + ring * 0.012

    for (let i = 0; i < arcCount; i += 1) {
      const baseStart = rand() * Math.PI * 2
      const span = 0.02 + rand() * rand() * 0.16
      const radiusJitter = (rand() - 0.5) * 14

      arcs.push({
        radius: baseRadius + radiusJitter,
        baseStart,
        span,
        opacity: 0.14 + rand() * 0.42,
        width: 0.35 + rand() * 0.65,
        stroke: rand() > 0.38 ? '#ffffff' : '#bbe1fa',
        speed: ringSpeed * (0.92 + rand() * 0.16),
      })
    }
  }

  return arcs
}

function drawTrails(
  ctx: CanvasRenderingContext2D,
  arcs: TrailArc[],
  elapsedSeconds: number,
  width: number,
  height: number,
) {
  const centerX = width / 2
  const centerY = height / 2
  const scale = Math.min(width, height) / DESIGN_SIZE

  ctx.clearRect(0, 0, width, height)
  ctx.lineCap = 'round'

  const baseOmega = (Math.PI * 2) / ROTATION_PERIOD_S

  for (const arc of arcs) {
    const drift = baseOmega * arc.speed * elapsedSeconds
    const start = arc.baseStart - drift
    const end = start + arc.span

    ctx.beginPath()
    ctx.arc(centerX, centerY, arc.radius * scale, start, end)
    ctx.strokeStyle = arc.stroke
    ctx.lineWidth = arc.width * scale
    ctx.globalAlpha = arc.opacity
    ctx.stroke()
  }

  ctx.globalAlpha = 1
}

export function StarTrails() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const arcs = useMemo(() => buildTrailArcs(), [])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let elapsedSeconds = 0
    let displayWidth = 0
    let displayHeight = 0

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

    const start = performance.now()

    const tick = (now: number) => {
      elapsedSeconds = (now - start) / 1000
      drawTrails(ctx, arcs, reducedMotion ? 0 : elapsedSeconds, displayWidth, displayHeight)
      if (!reducedMotion) {
        frame = requestAnimationFrame(tick)
      }
    }

    tick(start)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
    }
  }, [arcs])

  return (
    <div className="star-trails" ref={containerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="star-trails-canvas" />
      <div className="star-trails-center" />
    </div>
  )
}
