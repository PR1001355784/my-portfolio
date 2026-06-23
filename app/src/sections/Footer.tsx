import { Heart } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="py-14" style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-emerald)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* <div className="flex justify-center gap-4 mb-8">
          {[
            { icon: Linkedin, href: 'https://www.linkedin.com/in/virendra-patel-10a383325', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:virendra5649patel@email.com', label: 'Email' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                background: 'rgba(16, 185, 129, 0.08)',
                color: 'var(--text-muted)',
                border: '1px solid rgba(16, 185, 129, 0.12)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-emerald)'
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)'
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.08)'
              }}
              aria-label={link.label}
            >
              <link.icon size={16} />
            </a>
          ))}
        </div> */}

        <div className="text-center">
          <p className="text-xs flex items-center justify-center gap-1" style={{ color: 'var(--text-muted)' }}>
            Designed & Built with <Heart size={12} style={{ color: '#EF4444' }} /> by{' '}
            <span style={{ color: 'var(--accent-emerald)' }}>Virendra Patel</span> · 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
