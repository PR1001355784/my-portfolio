import { useEffect, useRef } from 'react'
import { ArrowRight, FileText, } from 'lucide-react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    let particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string
    }> = []

    const colors = ['#10B981', '#06B6D4', '#14B8A6', '#34D399']
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      })

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = '#10B981'
            ctx.globalAlpha = 0.03 * (1 - dist / 150)
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      ctx.globalAlpha = 1
      animId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(11,17,32,0.7) 60%, rgba(11,17,32,0.95) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="reveal flex items-center gap-3 mb-6">
              <div className="status-pulse" />
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--accent-emerald)', fontFamily: "'Space Mono', monospace" }}>
                Available for Hire
              </span>
            </div>

            <h1 className="reveal">
              <span
                className="block font-bold tracking-tight"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                Virendra
              </span>
              <span
                className="block font-bold tracking-tight gradient-text"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                Patel
              </span>
            </h1>

            <p
              className="reveal mt-4 max-w-md leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}
            >
              Aspiring Software Developer with hands-on experience in Java, Spring Boot, and SQL.
              Built real-world applications at ITSC Technologies and Corecard Software India.
              Passionate about writing clean, efficient code.
            </p>

            <div className="reveal flex flex-wrap gap-4 mt-8">
              <a href="#contact" className="btn-primary-emerald">
                Get Start
                <ArrowRight size={16} />
              </a>
              <a
                href="https://docs.google.com/document/d/1g1z_RQuVAeh9E0GG_SA0iRtTNEhZJXQF/edit?usp=sharing&ouid=108546869926084116546&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-emerald"
              >
                <FileText size={16} />
                Download Resume
              </a>
            </div>

            {/* <div className="reveal flex items-center gap-3 mt-8">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/in/virendra-patel-10a383325', label: 'LinkedIn' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    color: 'var(--text-secondary)',
                    border: '1px solid rgba(16, 185, 129, 0.15)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                    e.currentTarget.style.color = 'var(--accent-emerald)'
                    e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(16, 185, 129, 0.08)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.15)'
                  }}
                  aria-label={link.label}
                >
                  <link.icon size={16} />
                </a>
              ))}
            </div> */}

            <div className="reveal flex flex-wrap gap-8 mt-10 pt-8" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              {[
                { num: '6+', label: 'Months Exp.' },
                { num: '2', label: 'Companies' },
                { num: '8+', label: 'Technologies' },
                { num: '5', label: 'Certifications' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {stat.num}
                  </div>
                  <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="reveal relative float-anim" style={{ perspective: '1000px' }}>
              <div
                className="relative rounded-2xl overflow-hidden aspect-[4/5]"
                style={{
                  width: 'min(360px, 90vw)',
                  maxWidth: '520px',
                  boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5), 0 0 40px rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                }}
              >
                <img
                  src="/profile.png"
                  alt="Developer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="absolute -top-4 -right-4 glass-card px-4 py-3"
                style={{ animation: 'float 4s ease-in-out 1s infinite' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-emerald)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>Java</span>
                </div>
              </div>
              <div
                className="absolute -bottom-3 -left-6 glass-card px-4 py-3"
                style={{ animation: 'float 4.5s ease-in-out 0.5s infinite' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-cyan)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>Spring Boot</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
