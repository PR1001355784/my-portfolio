import { type FormEvent, useRef, useState } from 'react'
import { MapPin, Mail, Linkedin, Send, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const contactLinks = [
  { icon: MapPin, label: 'Location', value: 'Bhopal, Madhya Pradesh, India', href: '#' },
  { icon: Mail, label: 'Email', value: 'virendra5649patel@email.com', href: 'mailto:virendra5649patel@email.com' },
  { icon: Linkedin, label: 'LinkedIn', value: 'virendra-patel-10a383325', href: 'https://www.linkedin.com/in/virendra-patel-10a383325' },
]

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error')
      return
    }

    setStatus('sending')

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        setStatus('success')
        setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      })
      .catch(() => {
        setStatus('error')
      })
  }

  return (
    <section id="contact" className="py-24 lg:py-32" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="reveal text-center mb-14">
          <div className="section-label mb-4">Contact</div>
          <h2
            className="font-bold tracking-tight"
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              lineHeight: 1.15,
            }}
          >
            Let's Work <span style={{ color: 'var(--accent-emerald)' }}>Together</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[38%_58%] gap-[4%]">
          <div className="space-y-4">
            <p className="reveal text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              I'm actively looking for full-time software developer opportunities.
              Feel free to reach out for job openings, projects, or just to connect!
            </p>
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="reveal glass-card p-4 flex items-center gap-4"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-hover)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)'
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(16, 185, 129, 0.1)' }}
                >
                  <link.icon size={18} style={{ color: 'var(--accent-emerald)' }} />
                </div>
                <div>
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
                  >
                    {link.label}
                  </div>
                  <div className="text-sm font-medium mt-0.5" style={{ color: 'var(--text-primary)' }}>
                    {link.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="reveal glass-card p-6 lg:p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <CheckCircle size={48} style={{ color: 'var(--accent-emerald)' }} />
                <h3 className="font-bold text-lg mt-4" style={{ color: 'var(--text-primary)' }}>
                  Message Sent!
                </h3>
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                    Unable to send message. Please verify your EmailJS keys and try again.
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}>
                      First Name
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(11, 17, 32, 0.6)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-emerald)' }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}>
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(11, 17, 32, 0.6)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-emerald)' }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}>
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: 'rgba(11, 17, 32, 0.6)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-emerald)' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                    placeholder="abc@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}>
                    Subject
                  </label>
                  <input
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: 'rgba(11, 17, 32, 0.6)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-emerald)' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                    placeholder="Enter your subject here .."
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                    style={{
                      background: 'rgba(11, 17, 32, 0.6)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-emerald)' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                    placeholder="Tell me about the opportunity  ..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary-emerald w-full"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
