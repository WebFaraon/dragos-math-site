import { BookText } from 'lucide-react'

type TocItem = {
  id: string
  text: string
  level: 2 | 3
}

type TocPanelProps = {
  items: TocItem[]
  onNavigate: (id: string) => void
}

function TocPanel({ items, onNavigate }: TocPanelProps) {
  return (
    <div className="rv-toc-panel">
      <div className="rv-toc-header">
        <BookText size={18} />
        <h3>Cuprins</h3>
      </div>
      <div className="rv-toc-items">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`rv-toc-item level-${item.level}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.text}
          </button>
        ))}
        {items.length === 0 && <p className="rv-toc-empty">Nu exista sectiuni in acest moment.</p>}
      </div>
    </div>
  )
}

export default TocPanel
export type { TocItem }
