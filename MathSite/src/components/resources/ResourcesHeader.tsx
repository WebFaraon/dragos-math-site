type ResourcesHeaderProps = {
  search: string
  onSearchChange: (value: string) => void
  onOpenFilters: () => void
}

function ResourcesHeader({
  search,
  onSearchChange,
  onOpenFilters,
}: ResourcesHeaderProps) {
  return (
    <section className="resources-header reveal">
      <p className="eyebrow">RESOURCES</p>
      <h1 className="section-title">Learning Resources</h1>
      <p className="hero-subtitle">
        Curated explanations and practice sets, organized by intent instead of cluttered lists.
      </p>

      <div className="resources-search-row">
        <label className="resources-search" htmlFor="resources-search">
          <span className="sr-only">Search resources</span>
          <input
            id="resources-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search topics, titles, or tags"
          />
        </label>

        <div className="resources-search-actions">
          <button type="button" className="btn btn-secondary resources-filter-btn" aria-haspopup="dialog" onClick={onOpenFilters}>
            Filters
          </button>
        </div>
      </div>
    </section>
  )
}

export default ResourcesHeader
