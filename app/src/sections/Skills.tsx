import { useEffect, useRef } from 'react'
import { Globe, Code, Database, GitBranch, Users } from 'lucide-react'

const categories = [
   {
    icon: Globe,
    title: 'Frontend-Tech..',
    color: '#06B6D4',
    skills: [
      { name: 'HTML', level: 70 },
      { name: 'CSS', level: 50 },
      { name: 'JavaScript', level: 60 },
    ],
  },
  {
    icon: Code,
    title: 'Backend-Tech..',
    color: '#10B981',
    skills: [
      { name: 'Java With Spring Boot', level: 80 },
      { name: 'C', level: 70 },
      { name: 'C++', level: 75 },
    ],
  },
  // {
  //   icon: Layers,
  //   title: 'Frameworks',
  //   color: '#F59E0B',
  //   skills: [
  //     { name: 'Spring Boot', level: 72 },
  //     { name: 'REST APIs', level: 70 },
  //   ],
  // },
  {
    icon: Database,
    title: 'Databases',
    color: '#8B5CF6',
    skills: [
      { name: 'MS SQL Server', level: 75 },
      { name: 'MongoDB', level: 60 },
    ],
  },
  {
    icon: GitBranch,
    title: 'Tools',
    color: '#EC4899',
    skills: [
      { name: 'Git & GitHub', level: 70 },
      { name: 'VS Code', level: 70 },
      { name: 'IntelliJ Idea', level: 70 },
      { name: 'Postman', level: 70 },
    ],
  },
  {
    icon: Users,
    title: 'Soft Skills',
    color: '#14B8A6',
    skills: [
      { name: 'Team Collaboration', level: 85 },
      { name: 'Problem Solving', level: 80 },
      { name: 'Quick Learner', level: 80 },
      { name: 'Possitive Mindset', level: 80 },
    ],
  },
]

function SkillCard({ category }: { category: typeof categories[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-bar-fill')
            fills.forEach((fill, i) => {
              setTimeout(() => fill.classList.add('animate'), i * 150)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={cardRef} className="glass-card overflow-hidden">
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: `${category.color}18` }}
        >
          <category.icon size={18} style={{ color: category.color }} />
        </div>
        <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          {category.title}
        </span>
      </div>
      <div className="p-5 space-y-4">
        {category.skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{skill.name}</span>
              <span
                className="text-xs font-medium"
                style={{ color: category.color, fontFamily: "'Space Mono', monospace" }}
              >
                {skill.level}%
              </span>
            </div>
            <div className="skill-bar-track">
              <div
                className="skill-bar-fill"
                style={{ '--fill-width': `${skill.level}%` } as React.CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="reveal text-center mb-14">
          <div className="section-label mb-4">My Skills</div>
          <h2
            className="font-bold tracking-tight"
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              lineHeight: 1.15,
            }}
          >
            Technical <span style={{ color: 'var(--accent-emerald)' }}>Expertise</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div key={cat.title} className="reveal">
              <SkillCard category={cat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
