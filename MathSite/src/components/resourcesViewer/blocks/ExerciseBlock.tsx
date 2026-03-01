import { useMemo, useState } from 'react'
import { CheckCircle2, Circle, Eye, Lightbulb, XCircle } from 'lucide-react'
import type { ContentBlock } from '../../../types/bacContent'

type ExerciseBlockProps = {
  block: Extract<ContentBlock, { type: 'exercise_mcq' | 'exercise_short' }>
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/,/g, '.')

function ExerciseBlock({ block }: ExerciseBlockProps) {
  if (block.type === 'exercise_mcq') {
    return <ExerciseMcq block={block} />
  }
  return <ExerciseShort block={block} />
}

function ExerciseMcq({ block }: { block: Extract<ContentBlock, { type: 'exercise_mcq' }> }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [showSteps, setShowSteps] = useState(false)
  const isCorrect = useMemo(
    () => checked && selectedIndex === block.answerIndex,
    [checked, selectedIndex, block.answerIndex],
  )

  return (
    <div className="rv-exercise">
      <p className="rv-exercise-question">{block.question}</p>
      <div className="rv-exercise-options">
        {block.options.map((option, index) => {
          const active = selectedIndex === index
          return (
            <button
              key={option}
              type="button"
              className={`rv-exercise-option${active ? ' active' : ''}`}
              onClick={() => setSelectedIndex(index)}
            >
              <span className="rv-exercise-option-icon" aria-hidden="true">
                {active ? <CheckCircle2 size={16} /> : <Circle size={16} />}
              </span>
              <span>{option}</span>
            </button>
          )
        })}
      </div>
      <div className="rv-exercise-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setChecked(true)}
          disabled={selectedIndex === null}
        >
          Verifica
        </button>
        {block.steps && (
          <button type="button" className="btn btn-secondary" onClick={() => setShowSteps((prev) => !prev)}>
            {showSteps ? 'Ascunde pasii' : 'Afiseaza pasii'}
          </button>
        )}
      </div>
      {checked && (
        <div className={`rv-exercise-result ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          <span>{isCorrect ? 'Corect!' : 'Incorect. Mai incearca.'}</span>
        </div>
      )}
      {block.explanation && checked && <p className="rv-exercise-explanation">{block.explanation}</p>}
      {showSteps && block.steps && (
        <ul className="rv-exercise-steps">
          {block.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ExerciseShort({ block }: { block: Extract<ContentBlock, { type: 'exercise_short' }> }) {
  const [input, setInput] = useState('')
  const [checked, setChecked] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showSteps, setShowSteps] = useState(false)

  const isCorrect = useMemo(() => checked && normalize(input) === normalize(block.answer), [checked, input, block.answer])

  return (
    <div className="rv-exercise">
      <p className="rv-exercise-question">{block.question}</p>
      <div className="rv-exercise-input-row">
        <input
          className="rv-exercise-input"
          type="text"
          placeholder="Raspuns"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="button" className="btn btn-primary" onClick={() => setChecked(true)}>
          Verifica
        </button>
      </div>
      <div className="rv-exercise-actions">
        {block.hint && (
          <button type="button" className="btn btn-secondary" onClick={() => setShowHint((prev) => !prev)}>
            <Lightbulb size={16} />
            {showHint ? 'Ascunde indiciul' : 'Indiciu'}
          </button>
        )}
        <button type="button" className="btn btn-secondary" onClick={() => setShowAnswer((prev) => !prev)}>
          <Eye size={16} />
          {showAnswer ? 'Ascunde raspunsul' : 'Arata raspunsul'}
        </button>
        {block.steps && (
          <button type="button" className="btn btn-secondary" onClick={() => setShowSteps((prev) => !prev)}>
            {showSteps ? 'Ascunde pasii' : 'Afiseaza pasii'}
          </button>
        )}
      </div>
      {checked && (
        <div className={`rv-exercise-result ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          <span>{isCorrect ? 'Corect!' : 'Incorect. Verifica raspunsul.'}</span>
        </div>
      )}
      {showHint && block.hint && <p className="rv-exercise-hint">{block.hint}</p>}
      {showAnswer && <p className="rv-exercise-answer">Raspuns: {block.answer}</p>}
      {block.explanation && checked && <p className="rv-exercise-explanation">{block.explanation}</p>}
      {showSteps && block.steps && (
        <ul className="rv-exercise-steps">
          {block.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExerciseBlock
