import type { CategoryId, SubcategoryNode } from '../../types/resources'

type SubcategoryCardsProps = {
  subcategories: SubcategoryNode[]
  categoryId: CategoryId
  selectedId: string | null
  onSelect: (id: string) => void
}

function SubcategoryCards({ subcategories, categoryId, selectedId, onSelect }: SubcategoryCardsProps) {
  return (
    <div className="subcategory-cards" role="list">
      {subcategories.map((subcategory) => {
        const isActive = selectedId === subcategory.id
        return (
          <button
            key={subcategory.id}
            type="button"
            className={`subcategory-card-xl category-${categoryId}${isActive ? ' active' : ''}`}
            onClick={() => onSelect(subcategory.id)}
            aria-pressed={isActive}
          >
            <div>
              <h4>{subcategory.name}</h4>
              <p>{subcategory.topics.length} topics</p>
            </div>
            <span className="subcategory-dot" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}

export default SubcategoryCards
