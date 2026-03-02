import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

type ExerciseListLevel = {
  id: string
  title: string
  accent: 'easy' | 'medium' | 'hard'
  items: { id: string; label: string; latex: string; answer: string }[]
}

type ExerciseListBlockProps = {
  levels: ExerciseListLevel[]
}

function ExerciseListBlock({ levels }: ExerciseListBlockProps) {
  const [openAnswerId, setOpenAnswerId] = useState<string | null>(null)

  return (
    <div className="rv-exercise-list">
      {levels.map((level) => (
        <section key={level.id} className={`rv-exercise-level rv-exercise-level-${level.accent}`}>
          <header className="rv-exercise-level-header">
            <span className="rv-exercise-level-dot" aria-hidden="true" />
            <h3>{level.title}</h3>
          </header>
          <div className="rv-exercise-level-items">
            {level.items.map((item) => (
              <div key={item.id} className="rv-exercise-level-item">
                <div className="rv-exercise-level-left">
                  <span className="rv-exercise-level-index" aria-hidden="true">
                    {item.label}
                  </span>
                  <span className="rv-exercise-level-label">Calculează:</span>
                </div>
                <div className="rv-exercise-level-math">
                  <BlockMath math={item.latex} />
                </div>
                <div className="rv-exercise-level-actions">
                  <button
                    type="button"
                    className="btn btn-secondary rv-exercise-check"
                    onClick={() => setOpenAnswerId((prev) => (prev === item.id ? null : item.id))}
                  >
                    {openAnswerId === item.id ? 'Ascunde răspunsul' : 'Vezi răspunsul'}
                  </button>
                  {openAnswerId === item.id && (
                    <div className="rv-exercise-answer-inline">
                      <span>Răspuns:</span>
                      <InlineMath math={item.answer} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default ExerciseListBlock
