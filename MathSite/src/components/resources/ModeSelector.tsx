import type { ResourceMode } from '../../types/resources'

type ModeSelectorProps = {
  selected: ResourceMode
  onSelect: (mode: ResourceMode) => void
}

const modes: Array<{ id: ResourceMode; label: string }> = [
  { id: 'learn', label: 'Learn' },
  { id: 'practice', label: 'Practice' },
  { id: 'test', label: 'Test' },
]

function ModeSelector({ selected, onSelect }: ModeSelectorProps) {
  return (
    <div className="mode-selector" role="group" aria-label="Select mode">
      {modes.map((mode) => {
        const isActive = selected === mode.id
        return (
          <button
            key={mode.id}
            type="button"
            className={`mode-pill${isActive ? ' active' : ''}`}
            onClick={() => onSelect(mode.id)}
            aria-pressed={isActive}
          >
            {mode.label}
          </button>
        )
      })}
    </div>
  )
}

export default ModeSelector
