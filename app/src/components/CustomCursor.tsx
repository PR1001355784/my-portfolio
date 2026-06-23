import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)

  useEffect(() => {
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window
    if (isMobile) return

    const cursor = cursorRef.current
    if (!cursor) return

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement
      if (
        targetEl.closest('a') ||
        targetEl.closest('button') ||
        targetEl.closest('[role="button"]') ||
        targetEl.tagName === 'A' ||
        targetEl.tagName === 'BUTTON' ||
        targetEl.closest('input') ||
        targetEl.closest('textarea')
      ) {
        isHovering.current = true
      }
    }

    const handleMouseOut = () => {
      isHovering.current = false
    }

    let raf: number
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15

      if (cursor) {
        cursor.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px) scale(${isHovering.current ? 2.5 : 1})`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 768 || 'ontouchstart' in window)
  if (isMobile) return null

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: '#3A6EA5',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'transform 0.3s ease, width 0.3s ease, height 0.3s ease',
        willChange: 'transform',
      }}
    />
  )
}
