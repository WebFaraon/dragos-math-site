import type { CategoryNode } from '../../types/resources'

type CategoryGridProps = {
  categories: CategoryNode[]
  selectedId: string | null
  onSelect: (id: CategoryNode['id']) => void
}

function CategoryGrid({ categories, selectedId, onSelect }: CategoryGridProps) {
  return (
    <div className="category-grid" role="list">
      {categories.map((category) => {
        const isActive = category.id === selectedId
        return (
          <button
            key={category.id}
            type="button"
            className={`category-card${isActive ? ' active' : ''}`}
            onClick={() => onSelect(category.id)}
            aria-pressed={isActive}
          >
            <div className={`category-icon category-icon-${category.id}`} aria-hidden="true">
              {renderCategoryIcon(category.id)}
            </div>
            <div className="category-body">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

function renderCategoryIcon(id: CategoryNode['id']) {
  if (id === 'analysis') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 18h16M6 16l4-6 4 4 4-8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      </svg>
    )
  }
  if (id === 'equations-inequalities') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 8h6M5 12h14M5 16h10" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }
  if (id === 'combinatorics-probability') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 5h4v4H6zM14 5h4v4h-4zM6 13h4v4H6zM14 13h4v4h-4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 9v4m8-4v4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }
  if (id === 'algebra-complex') {
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

export default CategoryGrid
