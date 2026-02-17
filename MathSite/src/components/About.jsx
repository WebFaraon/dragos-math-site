const mentorName = 'Drago\u0219'

function About() {
  return (
    <section id="about" className="section reveal">
      <div className="section-heading">
        <p className="eyebrow">{`About ${mentorName}`}</p>
        <h2 className="section-title">A Calm Mentor for Serious Academic Progress</h2>
      </div>

      <div className="about-grid">
        <div className="about-copy">
          {/* Personal language keeps this section mentor-first, not company-first */}
          <p>
            {`${mentorName} is a mathematics mentor focused on helping Grade 9 and Grade 12 students build real understanding, not just memorize formulas.`}{' '}
            Lessons are clear, step-by-step, and adapted to each student's pace.
          </p>
          <p>
            Parents choose this mentoring approach for structure, consistency, and transparency.
            Every week includes focused objectives, practical feedback, and a clear path toward
            exam confidence.
          </p>
        </div>

        <aside className="about-panel">
          <h3>Mentoring Principles</h3>
          <ul>
            <li>Clarity first: each concept explained in simple, logical steps.</li>
            <li>Structured practice: weekly plan with increasing difficulty.</li>
            <li>Results focus: exam strategy, error analysis, and measurable progress.</li>
          </ul>
          <p className="about-panel-meta">10+ years of experience with Grades 9-12</p>
        </aside>
      </div>
    </section>
  )
}

export default About
