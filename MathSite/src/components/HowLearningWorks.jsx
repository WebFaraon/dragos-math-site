import GuideCharacter from './GuideCharacter.jsx'

const steps = [
  {
    title: 'Assessment & Level Check',
    text: 'We identify current strengths, gaps, and exam priorities for a realistic starting plan.',
  },
  {
    title: 'Weekly Structured Lessons',
    text: 'Each week combines concept clarity, guided exercises, and targeted homework review.',
  },
  {
    title: 'Exam Practice & Feedback',
    text: 'Students train with exam-style tasks, timing strategy, and focused correction loops.',
  },
]

function HowLearningWorks() {
  return (
    <section id="method" className="section reveal">
      <div className="section-heading">
        <p className="eyebrow">How Learning Works</p>
        <h2 className="section-title">A Simple 3-Step Process for Reliable Results</h2>
      </div>

      <div className="method-layout">
        <GuideCharacter symbol={'f(x)'} className="method-guide" />

        <div className="method-steps">
          {steps.map((step, index) => (
            <article key={step.title} className="method-step">
              <span className="step-index">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowLearningWorks
