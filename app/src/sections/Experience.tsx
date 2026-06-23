const experiences = [
  {
    id: 'itsc-2025-1',
    date: 'Aug 2025 — Present',
    badge: 'Trainee',
    badgeColor: '#3A6EA5',
    company: 'ITSC Technologies Pvt. Ltd.',
    role: 'Trainee – Software Support',
    description:
      'Developed and maintained software applications using modern programming languages and tools. Collaborated with the development team to design, code, test, and debug software modules. Provided technical support, troubleshot client issues, and ensured smooth software operation.',
    tags: ['Java', 'Spring Boot', 'HTML', 'CSS', 'JavaScript', 'MS SQL Server'],
  },
  {
    id: 'internship-corecard-2024',
    date: 'Jul 2024 — Aug 2024',
    badge: 'Internship',
    badgeColor: '#10B981',
    company: 'Corecard Software India Pvt. Ltd.',
    role: 'Software Development Intern',
    description:
      'Optimized report generation processes, significantly reducing report delivery time. Collaborated with cross-functional teams to enhance reporting features and boost accuracy. Gained hands-on experience in software development and report management tools.',
    tags: ['MS SQL Server', 'Report Management', 'Team Collaboration'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="reveal mb-14">
          <div className="section-label mb-4">Experience</div>
          <h2
            className="font-bold tracking-tight"
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              lineHeight: 1.15,
            }}
          >
            Work <span style={{ color: 'var(--accent-emerald)' }}>Experience</span>
          </h2>
        </div>

        <div className="relative overflow-visible">
          <div
            className="absolute left-[19px] top-2 bottom-2 w-[2px] hidden md:block"
            style={{
              background: 'linear-gradient(to bottom, var(--accent-emerald), var(--accent-cyan), transparent)',
            }}
          />

          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="reveal relative flex gap-0 md:gap-8">
                <div className="hidden md:flex flex-col items-center flex-shrink-0" style={{ width: '40px' }}>
                  <div
                    className="w-5 h-5 rounded-full flex-shrink-0 mt-2"
                    style={{
                      background: `linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan))`,
                      border: '3px solid var(--bg-secondary)',
                      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)',
                    }}
                  />
                </div>

                <div
                  className="flex-1 glass-card p-6 lg:p-8"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-hover)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--glass-border)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-md"
                      style={{
                        backgroundColor: exp.badgeColor + '20',
                        color: exp.badgeColor,
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {exp.badge}
                    </span>
                    <span
                      className="text-xs uppercase tracking-wider"
                      style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
                    >
                      {exp.date}
                    </span>
                  </div>

                  <h3
                    className="font-bold text-lg mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {exp.company}
                  </h3>
                  <p
                    className="text-sm font-medium mb-4"
                    style={{ color: 'var(--accent-cyan)' }}
                  >
                    {exp.role}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-full"
                        style={{
                          background: 'rgba(16, 185, 129, 0.1)',
                          color: 'var(--accent-emerald)',
                          border: '1px solid rgba(16, 185, 129, 0.15)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
