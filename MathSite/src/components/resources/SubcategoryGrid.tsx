import type { SubcategoryNode } from '../../types/resources'

type SubcategoryGridProps = {
  subcategories: SubcategoryNode[]
  selectedId: string | null
  onSelect: (id: string) => void
}

function SubcategoryGrid({ subcategories, selectedId, onSelect }: SubcategoryGridProps) {
  return (
    <div className="subcategory-grid">
      {subcategories.map((subcategory) => {
        const isActive = subcategory.id === selectedId
        return (
          <button
            key={subcategory.id}
            type="button"
            className={`subcategory-card${isActive ? ' active' : ''}`}
            onClick={() => onSelect(subcategory.id)}
            aria-pressed={isActive}
          >
            <span className="subcategory-title">{subcategory.name}</span>
            <span className="subcategory-meta">{subcategory.topics.length} topics</span>
          </button>
        )
      })}
    </div>
  )
}

export default SubcategoryGrid
