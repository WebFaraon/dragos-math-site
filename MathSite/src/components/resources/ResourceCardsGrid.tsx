import ResourceCard from './ResourceCard'
import type { ResourceItem, ResourceMode } from '../../types/resources'

type ResourceCardsGridProps = {
  items: ResourceItem[]
  mode: ResourceMode
  savedIds: string[]
  onOpen: (item: ResourceItem) => void
  onSecondary: (item: ResourceItem) => void
  onRequest: () => void
}

function ResourceCardsGrid({ items, mode, savedIds, onOpen, onSecondary, onRequest }: ResourceCardsGridProps) {
  if (items.length === 0) {
    return (
      <div className="resources-empty">
        <p>No {mode} resources yet for this topic.</p>
        <button type="button" className="btn btn-secondary" onClick={onRequest}>
          Request / Add
        </button>
      </div>
    )
  }

  return (
    <div className="resource-grid">
      {items.map((item) => (
        <ResourceCard
          key={item.id}
          item={item}
          saved={savedIds.includes(item.id)}
          onOpen={onOpen}
          onSecondary={onSecondary}
        />
      ))}
    </div>
  )
}

export default ResourceCardsGrid
