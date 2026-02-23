import type { Grade } from '../../types/resources'

type GradeSelectorProps = {
  grades: Grade[]
  selected: Grade | null
  onSelect: (grade: Grade) => void
}

function GradeSelector({ grades, selected, onSelect }: GradeSelectorProps) {
  return (
    <div className="grade-gate">
      <div>
        <h2>Select grade</h2>
        <p>Start by choosing the grade to unlock the correct taxonomy.</p>
      </div>
      <div className="grade-cards">
        {grades.map((grade) => (
          <button
            key={grade}
            type="button"
            className={`grade-card${selected === grade ? ' active' : ''}`}
            onClick={() => onSelect(grade)}
            aria-pressed={selected === grade}
          >
            <span className="grade-card-title">Grade {grade}</span>
            <span className="grade-card-meta">
              {grade === 12 ? 'BAC focus and exam readiness' : 'Foundations and confidence'}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default GradeSelector
