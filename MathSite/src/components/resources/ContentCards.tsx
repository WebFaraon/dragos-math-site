import type { ResourceItem, ResourceMode } from '../../types/resources'

type ContentCardsProps = {
  mode: ResourceMode
  items: ResourceItem[]
  onOpen: (item: ResourceItem) => void
  onSecondary: (item: ResourceItem) => void
}

function ContentCards({ mode, items, onOpen, onSecondary }: ContentCardsProps) {
  if (items.length === 0) {
    return (
      <div className="content-empty">
        <p>No {mode} resources yet for this topic.</p>
        <button type="button" className="btn btn-secondary" onClick={() => (window.location.href = '/contact')}>
          Request / Add
        </button>
      </div>
    )
  }

  return (
    <div className="content-cards">
      {items.map((item) => {
        const primaryLabel = item.links.view ? 'Open' : item.links.pdf ? 'View PDF' : 'Open'
        const secondaryLabel = item.links.download ? 'Download' : 'Save'
        return (
          <article key={item.id} className={`content-card mode-${mode}`}>
            <div className="content-card-top">
              <span className={`mode-badge mode-${mode}`}>{mode}</span>
              {item.durationMin && <span className="content-meta">{item.durationMin} min</span>}
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="content-meta-row">
              {item.difficulty && <span>{item.difficulty}</span>}
            </div>
            <div className="content-actions">
              <button type="button" className="btn btn-primary" onClick={() => onOpen(item)}>
                {primaryLabel}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => onSecondary(item)}>
                {secondaryLabel}
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default ContentCards
