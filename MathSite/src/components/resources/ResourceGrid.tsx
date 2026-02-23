import ResourceCard from './ResourceCard'
import type { ResourceItem } from '../../types/resources'

type ResourceGridProps = {
  items: ResourceItem[]
  savedIds: string[]
  onOpen: (item: ResourceItem) => void
  onSecondary: (item: ResourceItem) => void
  emptyMessage?: string
  onClearFilters?: () => void
  compact?: boolean
}

function ResourceGrid({
  items,
  savedIds,
  onOpen,
  onSecondary,
  emptyMessage,
  onClearFilters,
  compact,
}: ResourceGridProps) {
  if (items.length === 0 && emptyMessage) {
    return (
      <div className="resources-empty">
        <p>{emptyMessage}</p>
        {onClearFilters && (
          <button type="button" className="btn btn-secondary" onClick={onClearFilters}>
            Clear filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={`resource-grid${compact ? ' compact' : ''}`}>
      {items.map((item) => (
        <ResourceCard
          key={item.id}
          item={item}
          saved={savedIds.includes(item.id)}
          onOpen={onOpen}
          onSecondary={onSecondary}
          compact={compact}
        />
      ))}
    </div>
  )
}

export default ResourceGrid
