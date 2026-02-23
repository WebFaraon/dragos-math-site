import type { ResourceMode } from '../../types/resources'

type ModeCardsProps = {
  selected: ResourceMode | null
  onSelect: (mode: ResourceMode) => void
}

const modes: Array<{
  id: ResourceMode
  title: string
  subtitle: string
  detail: string
  className: string
  icon: JSX.Element
}> = [
  {
    id: 'learn',
    title: 'Learn',
    subtitle: 'Concepts, theory, and worked examples',
    detail: 'Short lessons that explain the why, with guided steps.',
    className: 'mode-card-learn',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 6.5 12 4l8 2.5v10L12 19l-8-2.5z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 4v15" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: 'practice',
    title: 'Practice',
    subtitle: 'Guided exercises with hints',
    detail: 'Build speed and accuracy with targeted drills.',
    className: 'mode-card-practice',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="m4 20 4-1 10-10-3-3L5 16z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="m14 6 3 3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: 'test',
    title: 'Test',
    subtitle: 'Timed tests and exam simulation',
    detail: 'Exam-style sets with timing and scoring focus.',
    className: 'mode-card-test',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="13" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 13V9m0 4 3 3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 4h6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
]

function ModeCards({ selected, onSelect }: ModeCardsProps) {
  const hasSelection = selected !== null

  return (
    <div className={`mode-cards${hasSelection ? ' has-selection' : ''}`} role="group" aria-label="Select mode">
      {modes.map((mode) => {
        const isActive = selected === mode.id
        return (
          <button
            key={mode.id}
            type="button"
            className={`mode-card ${mode.className}${isActive ? ' active' : ''}`}
            onClick={() => onSelect(mode.id)}
            aria-pressed={isActive}
          >
            <span className="mode-card-icon" aria-hidden="true">
              {mode.icon}
            </span>
            <div className="mode-card-body">
              <h3>{mode.title}</h3>
              <p>{mode.subtitle}</p>
              <span className="mode-card-detail">{mode.detail}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default ModeCards
