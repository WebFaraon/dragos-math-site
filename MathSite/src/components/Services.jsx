import GuideCharacter from './GuideCharacter.jsx'

const programs = [
  {
    id: 'grade9-program',
    title: 'Grade 9 - Foundations & Confidence',
    forWho: 'Students transitioning into high school who need stable fundamentals.',
    solves:
      'Confusion in algebra and geometry, low confidence in class, and inconsistent test results.',
    outcome:
      'Clear understanding, better class participation, and stronger grades through weekly structure.',
    symbol: '\u03C0',
  },
  {
    id: 'grade12-program',
    title: 'Grade 12 - Exam & BAC Preparation',
    forWho: 'Final-year students preparing for BAC and high-stakes exams.',
    solves:
      'Timing pressure, weak strategy on long exercises, and uncertainty in complex problems.',
    outcome:
      'Faster, more accurate solving with targeted exam practice and confidence under pressure.',
    symbol: '\u03A3',
  },
]

function Services() {
  return (
    <section id="programs" className="section reveal">
      <div className="section-heading">
        <p className="eyebrow">Programs</p>
        <h2 className="section-title">Two Focused Paths for Grade 9 and Grade 12</h2>
      </div>

      <GuideCharacter symbol={'x'} className="programs-guide" />

      <div className="services-grid">
        {programs.map((program) => (
          <article id={program.id} key={program.title} className="service-card">
            <span className="service-icon">{program.symbol}</span>
            <h3>{program.title}</h3>
            <p>
              <strong>Who it's for:</strong> {program.forWho}
            </p>
            <p>
              <strong>What it solves:</strong> {program.solves}
            </p>
            <p>
              <strong>Expected outcome:</strong> {program.outcome}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Services
