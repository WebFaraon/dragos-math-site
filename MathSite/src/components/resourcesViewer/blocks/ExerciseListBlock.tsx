import { useState, type CSSProperties } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { normalizeMojibake } from '../../../utils/normalizeMojibake'

type ExerciseListLevel = {
  id: string
  title: string
  accent: 'easy' | 'medium' | 'hard'
  items: { id: string; label: string; latex: string; answer: string; prompt?: string; details?: string }[]
}

type ExerciseListBlockProps = {
  levels: ExerciseListLevel[]
}

function ExerciseListBlock({ levels }: ExerciseListBlockProps) {
  const [openAnswerId, setOpenAnswerId] = useState<string | null>(null)
  const [activeLevelId, setActiveLevelId] = useState<string>(levels[0]?.id ?? '')
  const activeLevelIndex = Math.max(
    levels.findIndex((level) => level.id === activeLevelId),
    0,
  )
  const activeLevel = levels[activeLevelIndex] ?? levels[0]

  const handleSelectLevel = (levelId: string) => {
    if (levelId === activeLevelId) return
    setOpenAnswerId(null)
    setActiveLevelId(levelId)
  }

  return (
    <div className="rv-exercise-list">
      {levels.length > 1 && (
        <div className="rv-level-switch" style={{ ['--rv-active-index' as const]: activeLevelIndex } as CSSProperties}>
          <div className="rv-level-switch-indicator" aria-hidden="true" />
          {levels.map((level) => (
            <button
              key={level.id}
              type="button"
              className={`rv-level-switch-btn${activeLevel?.id === level.id ? ' is-active' : ''}`}
              onClick={() => handleSelectLevel(level.id)}
              aria-pressed={activeLevel?.id === level.id}
            >
              {normalizeMojibake(level.title).replace(/^Nivel\s+/i, '')}
            </button>
          ))}
        </div>
      )}

      {activeLevel ? (
        <section key={activeLevel.id} className={`rv-exercise-level rv-exercise-level-${activeLevel.accent}`}>
          <header className="rv-exercise-level-header">
            <span className="rv-exercise-level-dot" aria-hidden="true" />
            <h3>{normalizeMojibake(activeLevel.title)}</h3>
          </header>
          <div className="rv-exercise-level-items">
            {activeLevel.items.map((item) => {
              const prompt = normalizeMojibake(item.prompt ?? 'Calculează:')
              const latex = normalizeMojibake(item.latex)
              const answer = normalizeMojibake(item.answer)
              const details = item.details ? normalizeMojibake(item.details) : null

              const compactLatex = latex
                .replace(/\\[a-zA-Z]+/g, '')
                .replace(/[{}()[\]^_]/g, '')
                .replace(/\s+/g, '')
              const isLongMath = compactLatex.length > 42

              return (
                <div key={item.id} className="rv-exercise-level-item rv-exercise-row">
                  <div className="rv-exercise-row-index">
                    <span className="rv-exercise-level-index" aria-hidden="true">
                      {item.label}
                    </span>
                  </div>
                  <div className="rv-exercise-center">
                    <div className="rv-exercise-level-label rv-exercise-prompt">{prompt}</div>
                    <div className={`rv-exercise-level-math rv-exercise-content${isLongMath ? ' is-long-math' : ''}`}>
                      <BlockMath math={latex} />
                    </div>
                    {details && <p className="rv-exercise-level-details">{details}</p>}
                  </div>
                  <div className="rv-exercise-level-actions rv-exercise-action">
                    <button
                      type="button"
                      className="btn btn-secondary rv-exercise-check"
                      onClick={() => setOpenAnswerId((prev) => (prev === item.id ? null : item.id))}
                    >
                      {openAnswerId === item.id ? 'Ascunde răspunsul' : 'Vezi răspunsul'}
                    </button>
                  </div>
                  {openAnswerId === item.id && (
                    <div className="rv-exercise-answer-row">
                      <div className="rv-exercise-answer-inline">
                        <span>Răspuns:</span>
                        <InlineMath math={answer} />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default ExerciseListBlock
