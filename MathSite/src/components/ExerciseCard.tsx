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

  return (
    <div className="rv-exercise-level-item">
      <div className="rv-exercise-level-left">
        <span className="rv-exercise-level-index" aria-hidden="true">
          {index}
        </span>
        <span className="rv-exercise-level-label">Calculează:</span>
      </div>
      <div className="rv-exercise-level-math">
        <BlockMath math={expression} />
      </div>
      <div className="rv-exercise-level-actions">
        <button
          type="button"
          className="btn btn-secondary rv-exercise-check"
          onClick={() => setShowAnswer((current) => !current)}
        >
          {showAnswer ? 'Ascunde răspunsul' : 'Vezi răspunsul'}
        </button>
        {showAnswer ? (
          <div className="rv-exercise-answer-inline">
            <span>Răspuns:</span>
            <InlineMath math={answer} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export const ExerciseCard = memo(ExerciseCardComponent)
