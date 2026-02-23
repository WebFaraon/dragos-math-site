import type { ResourceItem } from '../../types/resources'

type ResourceCardProps = {
  item: ResourceItem
  saved: boolean
  onOpen: (item: ResourceItem) => void
  onSecondary: (item: ResourceItem) => void
  compact?: boolean
}

function ResourceCard({ item, saved, onOpen, onSecondary, compact }: ResourceCardProps) {
  const primaryLabel = item.links.view ? 'Open' : item.links.pdf ? 'View PDF' : 'Open'
  const secondaryLabel = item.links.download ? 'Download' : saved ? 'Saved' : 'Save'
  const category = item.categoryId

  return (
    <article className={`resource-card-new${compact ? ' compact' : ''}`}>
      <div className="resource-card-top">
        <div className="resource-card-top-left">
          <span className="resource-type-badge">{formatType(item.type)}</span>
          <span className={`resource-grade-badge grade-${item.grade}`} aria-label={`Grade ${item.grade}`}>
            {item.grade}
          </span>
        </div>
        <span className={`resource-corner resource-corner-${category}`} aria-hidden="true">
          {renderCategoryIcon(category)}
        </span>
      </div>
      <h3 className="resource-title" title={item.title}>
        {item.title}
      </h3>
      <p className="resource-description" title={item.description}>
        {item.description}
      </p>

      <div className="resource-meta">
        {item.durationMin && <span>{item.durationMin} min</span>}
        {item.difficulty && <span>{item.difficulty}</span>}
        {typeof item.popularity === 'number' && <span>{item.popularity}% popular</span>}
      </div>

      <div className="resource-actions">
        <button type="button" className="btn btn-primary" onClick={() => onOpen(item)}>
          {primaryLabel}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onSecondary(item)}
          aria-pressed={saved}
        >
          {secondaryLabel}
        </button>
      </div>
    </article>
  )
}

function formatType(type: ResourceItem['type']) {
  if (type === 'exam_practice') return 'Exam Practice'
  if (type === 'test') return 'Test'
  return type.charAt(0).toUpperCase() + type.slice(1)
}

function renderCategoryIcon(category: ResourceItem['categoryId']) {
  if (category === 'analysis') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 18h16M6 16l4-6 4 4 4-8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      </svg>
    )
  }

  if (category === 'equations-inequalities') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 8h6M5 12h14M5 16h10" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }

  if (category === 'combinatorics-probability') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 5h4v4H6zM14 5h4v4h-4zM6 13h4v4H6zM14 13h4v4h-4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 9v4m8-4v4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }

  if (category === 'algebra-complex') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 6h14M7 10h10M9 14h6M11 18h2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 18l8-12 8 12z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 18h8" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export default ResourceCard
