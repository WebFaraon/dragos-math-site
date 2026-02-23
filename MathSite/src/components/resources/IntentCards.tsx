import type { ResourceMode } from '../../types/resources'

type IntentCardsProps = {
  mode: ResourceMode
  onChange: (mode: ResourceMode) => void
}

const cards = [
  {
    id: 'learn',
    title: 'Learn',
    description: 'Explanations, examples, and clear walkthroughs.',
    meta: 'Concepts and examples',
    color: 'learn',
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
    description: 'Guided drills with feedback and hints.',
    meta: 'Hints and feedback',
    color: 'practice',
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
    description: 'Timed sets with scoring for exam readiness.',
    meta: 'Timed scoring',
    color: 'test',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="13" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 13V9m0 4 3 3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 4h6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
] as const

function IntentCards({ mode, onChange }: IntentCardsProps) {
  return (
    <div className="intent-cards" role="group" aria-label="Choose intent">
      {cards.map((card) => {
        const isActive = mode === card.id
        return (
          <button
            key={card.id}
            type="button"
            className={`intent-card${isActive ? ' active' : ''}`}
            onClick={() => onChange(card.id)}
            aria-pressed={isActive}
          >
            <div className={`intent-icon intent-icon-${card.color}`} aria-hidden="true">
              {card.icon}
            </div>
            <div className="intent-body">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="intent-meta">{card.meta}</span>
            </div>
            <span className="intent-cta">Start</span>
          </button>
        )
      })}
    </div>
  )
}

export default IntentCards
