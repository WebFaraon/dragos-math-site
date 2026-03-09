import { memo, useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

type ExerciseCardProps = {
  index: number
  expression: string
  answer: string
}

function ExerciseCardComponent({ index, expression, answer }: ExerciseCardProps) {
  const [showAnswer, setShowAnswer] = useState(false)
  const compactLatex = expression
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[{}()[\]^_]/g, '')
    .replace(/\s+/g, '')
  const isLongMath = compactLatex.length > 42

  return (
    <div className="rv-exercise-level-item rv-exercise-row">
      <div className="rv-exercise-row-index">
        <span className="rv-exercise-level-index" aria-hidden="true">
          {index}
        </span>
      </div>
      <div className="rv-exercise-center">
        <div className="rv-exercise-level-label rv-exercise-prompt">Calculează:</div>
        <div className={`rv-exercise-level-math rv-exercise-content${isLongMath ? ' is-long-math' : ''}`}>
          <BlockMath math={expression} />
        </div>
      </div>
      <div className="rv-exercise-level-actions rv-exercise-action">
        <button
          type="button"
          className="btn btn-secondary rv-exercise-check"
          onClick={() => setShowAnswer((current) => !current)}
        >
          {showAnswer ? 'Ascunde răspunsul' : 'Vezi răspunsul'}
        </button>
      </div>
      {showAnswer ? (
        <div className="rv-exercise-answer-row">
          <div className="rv-exercise-answer-inline">
            <span>Răspuns:</span>
            <InlineMath math={answer} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export const ExerciseCard = memo(ExerciseCardComponent)
