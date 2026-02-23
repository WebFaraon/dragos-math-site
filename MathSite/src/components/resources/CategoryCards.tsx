import type { CategoryId, CategoryNode } from '../../types/resources'

type CategoryCardsProps = {
  categories: CategoryNode[]
  selectedId: CategoryId | null
  onSelect: (id: CategoryId) => void
}

const categoryMeta: Record<CategoryId, { color: string; icon: JSX.Element }> = {
  analysis: {
    color: 'analysis',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 18h16M6 16l4-6 4 4 4-8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  'equations-inequalities': {
    color: 'equations',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 8h6M5 12h14M5 16h10" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  'combinatorics-probability': {
    color: 'combinatorics',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 5h4v4H6zM14 5h4v4h-4zM6 13h4v4H6zM14 13h4v4h-4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 9v4m8-4v4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  'algebra-complex': {
    color: 'algebra',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 6h14M7 10h10M9 14h6M11 18h2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  geometry: {
    color: 'geometry',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 18l8-12 8 12z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 18h8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
}

function CategoryCards({ categories, selectedId, onSelect }: CategoryCardsProps) {
  return (
    <div className="category-cards" role="list">
      {categories.map((category) => {
        const meta = categoryMeta[category.id]
        const isActive = selectedId === category.id
        return (
          <button
            key={category.id}
            type="button"
            className={`category-card-xl category-${meta.color}${isActive ? ' active' : ''}`}
            onClick={() => onSelect(category.id)}
            aria-pressed={isActive}
          >
            <span className="category-icon" aria-hidden="true">
              {meta.icon}
            </span>
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

export default CategoryCards
