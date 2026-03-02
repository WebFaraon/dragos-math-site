import { memo, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ExerciseCard } from '../../ExerciseCard'
import { trainingLevels, type TrainingLevelKey } from '../../../data/trainingLevels'

const difficultyOptions: Array<{ key: TrainingLevelKey; label: string }> = [
  { key: 'usor', label: 'UȘOR' },
  { key: 'mediu', label: 'MEDIU' },
  { key: 'dificil', label: 'DIFICIL' },
]

const accentByLevel: Record<TrainingLevelKey, 'easy' | 'medium' | 'hard'> = {
  usor: 'easy',
  mediu: 'medium',
  dificil: 'hard',
}

function TrainingLevelsBlockComponent() {
  const [activeLevel, setActiveLevel] = useState<TrainingLevelKey>('usor')
  const exerciseContainerRef = useRef<HTMLDivElement>(null)

  const allExercises = trainingLevels[activeLevel]
  const visibleCount = allExercises.length
  const visibleExercises = allExercises
  const activeIndex = difficultyOptions.findIndex((option) => option.key === activeLevel)
  const activeAccent = accentByLevel[activeLevel]

  useEffect(() => {
    if (exerciseContainerRef.current) {
      exerciseContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activeLevel])

  const handleLevelChange = (level: TrainingLevelKey) => {
    if (level !== activeLevel) {
      setActiveLevel(level)
    }
  }

  return (
    <>
      <style>
        {`
          @keyframes training-levels-fade-in {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .training-levels {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }

          .training-levels-segmented {
            position: relative;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.35rem;
            padding: 0.35rem;
            border-radius: 999px;
            background: var(--bg-surface-soft);
            border: 1px solid var(--border);
            box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.06);
            margin-bottom: 0.15rem;
          }

          .training-levels-indicator {
            position: absolute;
            top: 0.35rem;
            bottom: 0.35rem;
            left: 0.35rem;
            width: calc((100% - 0.7rem) / 3);
            border-radius: 999px;
            background: var(--bg-surface);
            border: 1px solid var(--border);
            box-shadow: var(--shadow-soft);
            transform: translateX(calc(100% * var(--training-active-index)));
            transition: transform 240ms ease;
          }

          .training-levels-button {
            position: relative;
            z-index: 1;
            border: 0;
            border-radius: 999px;
            background: transparent;
            color: var(--text-muted);
            padding: 0.8rem 1rem;
            font: inherit;
            font-size: 0.92rem;
            font-weight: 700;
            cursor: pointer;
            transition: color var(--theme-duration) var(--theme-ease);
          }

          .training-levels-button.is-active {
            color: var(--text-primary);
          }

          .training-levels-header {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 1rem;
            flex-wrap: wrap;
            width: 100%;
          }

          .training-levels-header > div {
            flex: 1;
            min-width: 0;
            text-align: left;
          }

          .training-levels-title {
            margin: 0;
          }

          .training-levels-progress {
            margin: 0.25rem 0 0;
            color: var(--text-muted);
            font-size: 0.92rem;
          }

          .training-levels-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 2rem;
            padding: 0.35rem 0.75rem;
            border-radius: 999px;
            background: color-mix(in srgb, var(--accent) 14%, var(--bg-surface));
            border: 1px solid color-mix(in srgb, var(--accent) 35%, var(--border));
            color: var(--text-strong-accent);
            font-size: 0.85rem;
            font-weight: 700;
            white-space: nowrap;
            margin-left: auto;
          }

          .training-levels-list-shell {
            overflow: visible;
          }

          .training-levels-list {
            display: grid;
            gap: 10px;
            animation: training-levels-fade-in 220ms ease;
          }

          .training-levels-list .katex,
          .training-levels-list .katex-display {
            color: var(--text-primary);
          }

          .training-levels-list .katex-display {
            margin: 0;
          }

          @media (max-width: 640px) {
            .training-levels-button {
              padding: 0.8rem 0.5rem;
              font-size: 0.8rem;
            }
          }
        `}
      </style>

      <section className="training-levels" aria-label="Antrenament pe niveluri">
        <div
          className="training-levels-segmented"
          style={{ ['--training-active-index' as const]: activeIndex } as CSSProperties}
        >
          <div className="training-levels-indicator" aria-hidden="true" />
          {difficultyOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              className={`training-levels-button${option.key === activeLevel ? ' is-active' : ''}`}
              onClick={() => handleLevelChange(option.key)}
              aria-pressed={option.key === activeLevel}
            >
              {option.label}
            </button>
          ))}
        </div>

        <section className={`rv-exercise-level rv-exercise-level-${activeAccent}`}>
          <header className="rv-exercise-level-header training-levels-header">
            <span className="rv-exercise-level-dot" aria-hidden="true" />
            <div>
              <h3 className="training-levels-title">Nivel {difficultyOptions[activeIndex].label}</h3>
              <p className="training-levels-progress">
                Exerciții afișate: {visibleCount} / {allExercises.length}
              </p>
            </div>
            <span className="training-levels-badge">{allExercises.length} exerciții</span>
          </header>

          <div ref={exerciseContainerRef} className="training-levels-list-shell">
            <div key={activeLevel} className="training-levels-list rv-exercise-level-items">
              {visibleExercises.map((exercise) => (
                <ExerciseCard
                  key={`${activeLevel}-${exercise.id}`}
                  index={exercise.id}
                  expression={exercise.expression}
                  answer={exercise.answer}
                />
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

const TrainingLevelsBlock = memo(TrainingLevelsBlockComponent)

export default TrainingLevelsBlock
