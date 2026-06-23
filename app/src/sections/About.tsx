import { GraduationCap, Globe, Rocket, Code2, Database, Server } from 'lucide-react'

const highlights = [
  { icon: Code2, title: 'Java Developer', desc: 'Core Java, Spring Boot, REST APIs' },
  { icon: Database, title: 'Database Expert', desc: 'MS SQL Server, MongoDB, SQL' },
  { icon: Server, title: 'Web Developer', desc: 'HTML, CSS, JavaScript' },
  { icon: GraduationCap, title: 'B.Tech CSE', desc: 'Bansal Goup Of Institute' },
  { icon: Globe, title: 'Language', desc: 'Hindi & English Fluent' },
  { icon: Rocket, title: 'Quick Learner', desc: 'Adapt to new tech rapidly' },
]

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <div className="reveal section-label mb-4">About Me</div>
            <h2
              className="reveal font-bold tracking-tight mb-6"
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                lineHeight: 1.15,
              }}
            >
              Dedicated Developer Ready to{' '}
              <span style={{ color: 'var(--accent-emerald)' }}>Contribute</span>
            </h2>

            <div className="space-y-4">
              <p className="reveal leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                Hi! I'm <strong style={{ color: 'var(--text-primary)' }}>Virendra Patel</strong>,Aspiring a software
                developer from Bhopal, Madhya Pradesh. I recently completed my{' '}
                <strong style={{ color: 'var(--text-primary)' }}>B.Tech in Computer Science Engineering</strong>{' '}
                from Bansal Institute of Research and Technology.
              </p>
              <p className="reveal leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                I have hands-on experience at{' '}
                <strong style={{ color: 'var(--text-primary)' }}>ITSC Technologies</strong> as a Trainee
                Software Support developer, and completed an internship at{' '}
                <strong style={{ color: 'var(--text-primary)' }}>Corecard Software India</strong>, where I
                optimized report generation processes and collaborated with cross-functional teams.
              </p>
              <p className="reveal leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                I'm skilled in <strong style={{ color: 'var(--text-primary)' }}>Java, JavaScript, HTML,
                CSS, Spring Boot, MS SQL Server</strong>, and MongoDB. Always eager to learn and grow.
              </p>
            </div>

            {/* <a
              href="https://docs.google.com/document/d/10xQN8y8_f5OpcVMTnitFRG3UJZrJk46v/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="reveal btn-outline-emerald mt-8"
            >
              Download Resume
            </a> */}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="reveal glass-card p-5 flex flex-col items-center text-center gap-3"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(16, 185, 129, 0.1)' }}
                >
                  <item.icon size={20} style={{ color: 'var(--accent-emerald)' }} />
                </div>
                <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
