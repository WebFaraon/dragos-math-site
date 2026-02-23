import type { CategoryNode, ResourceMode, TopicNode } from '../../types/resources'

type BreadcrumbProps = {
  grade: number | null
  mode: ResourceMode | null
  category: CategoryNode | null
  topic: TopicNode | null
  onResetTo: (step: 'grade' | 'mode' | 'category' | 'topic') => void
}

function SelectedPathBreadcrumb({ grade, mode, category, topic, onResetTo }: BreadcrumbProps) {
  return (
    <div className="resources-stepper" aria-label="Selection path">
      <button
        type="button"
        className={`step-chip${grade ? ' active' : ''}`}
        onClick={() => onResetTo('grade')}
        aria-pressed={!!grade}
      >
        Grade {grade ?? '—'}
      </button>
      <span className="step-sep" aria-hidden="true">&gt;</span>
      <button
        type="button"
        className={`step-chip${mode ? ' active' : ''}`}
        onClick={() => onResetTo('mode')}
        aria-pressed={!!mode}
        disabled={!grade}
      >
        {mode ? mode.charAt(0).toUpperCase() + mode.slice(1) : 'Mode'}
      </button>
      <span className="step-sep" aria-hidden="true">&gt;</span>
      <button
        type="button"
        className={`step-chip${category ? ' active' : ''}`}
        onClick={() => onResetTo('category')}
        aria-pressed={!!category}
        disabled={!mode}
      >
        {category?.name ?? 'Category'}
      </button>
      <span className="step-sep" aria-hidden="true">&gt;</span>
      <button
        type="button"
        className={`step-chip${topic ? ' active' : ''}`}
        onClick={() => onResetTo('topic')}
        aria-pressed={!!topic}
        disabled={!category}
      >
        {topic?.name ?? 'Topic'}
      </button>
    </div>
  )
}

export default SelectedPathBreadcrumb
