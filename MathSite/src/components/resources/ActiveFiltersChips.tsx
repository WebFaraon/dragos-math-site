import type { ResourceFilters } from '../../types/resources'

type ActiveFilter = {
  key: keyof ResourceFilters
  label: string
}

type ActiveFiltersChipsProps = {
  filters: ActiveFilter[]
  onRemove: (key: keyof ResourceFilters) => void
  onClear: () => void
}

const MAX_VISIBLE = 4

function ActiveFiltersChips({ filters, onRemove, onClear }: ActiveFiltersChipsProps) {
  if (filters.length === 0) return null

  const visible = filters.slice(0, MAX_VISIBLE)
  const remaining = filters.length - visible.length

  return (
    <div className="active-filters reveal">
      <div className="active-filters-list" aria-label="Active filters">
        {visible.map((filter) => (
          <button
            key={filter.key}
            type="button"
            className="active-filter-chip"
            onClick={() => onRemove(filter.key)}
            aria-label={`Remove filter ${filter.label}`}
          >
            {filter.label}
            <span aria-hidden="true">x</span>
          </button>
        ))}
        {remaining > 0 && <span className="active-filter-more">+{remaining} more</span>}
      </div>
      <button type="button" className="active-filter-clear" onClick={onClear}>
        Clear filters
      </button>
    </div>
  )
}

export default ActiveFiltersChips
