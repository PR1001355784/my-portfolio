import { GraduationCap, BookOpen, BookText, Globe } from 'lucide-react'

const educationItems = [
  {
    icon: GraduationCap,
    degree: 'B.Tech — Computer Science Engineering',
    school: 'Bansal Institute of Research and Technology, Bhopal, MP',
    meta: '2021 — 2025 · CGPA: 6.69 / 10',
    desc: 'Studied Data Structures, Algorithms, DBMS, Software Engineering, and OOP.',
  },
  {
    icon: BookOpen,
    degree: 'Class 12th — PCM',
    school: 'Govt. H.S. School Belwa Badgaiyan, Rewa, MP',
    meta: '2021 · Percentage: 69%',
    desc: 'Higher secondary with Physics, Chemistry, and Mathematics.',
  },
  {
    icon: BookText,
    degree: 'Class 10th',
    school: 'Saraswati Gyan Mandir High School, Lalgaon, Rewa, MP',
    meta: '2019 · Percentage: 69%',
    desc: 'Secondary education with strong foundation in Mathematics and Sciences.',
  },
  {
    icon: Globe,
    degree: 'Languages',
    school: 'Communication Proficiency',
    meta: 'Fluent',
    desc: 'Fluent in Hindi (native) and English (professional working proficiency).',
  },
]

const certifications = [
  { icon: '🏅', name: 'C Programming', issuer: 'Core Technical' },
  { icon: '☕', name: 'Core Java', issuer: 'Core Technical' },
  { icon: '🗄️', name: 'SQL', issuer: 'SQL Certification' },
  { icon: '🏢', name: 'Internship', issuer: 'Corecard Software' },
  { icon: '💼', name: 'Experience', issuer: 'ITSC Technologies' },
]

export default function Education() {
  return (
    <section id="education" className="py-24 lg:py-32" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="reveal mb-14">
          <div className="section-label mb-4">Education</div>
          <h2
            className="font-bold tracking-tight"
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              lineHeight: 1.15,
            }}
          >
            Academic <span style={{ color: 'var(--accent-emerald)' }}>Background</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {educationItems.map((item) => (
            <div
              key={item.degree}
              className="reveal glass-card p-6 flex gap-4"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-hover)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)'
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{ background: 'rgba(16, 185, 129, 0.1)' }}
              >
                <item.icon size={20} style={{ color: 'var(--accent-emerald)' }} />
              </div>
              <div>
                <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {item.degree}
                </h4>
                <p className="text-sm mt-0.5" style={{ color: 'var(--accent-cyan)' }}>
                  {item.school}
                </p>
                <p
                  className="text-xs mt-1 uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
                >
                  {item.meta}
                </p>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mb-10">
          <div className="section-label mb-4">Certifications</div>
          <h3
            className="font-bold text-xl tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Credentials & <span style={{ color: 'var(--accent-emerald)' }}>Achievements</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="reveal glass-card p-5 flex flex-col items-center text-center"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-hover)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span className="text-2xl mb-2">{cert.icon}</span>
              <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                {cert.name}
              </h4>
              <p
                className="text-xs mt-1"
                style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
              >
                {cert.issuer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
