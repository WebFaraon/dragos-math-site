import ResourceCardsGrid from './ResourceCardsGrid'
import type { ResourceItem, ResourceMode, TopicNode } from '../../types/resources'

type ContentPanelProps = {
  mode: ResourceMode
  topic: TopicNode | null
  items: ResourceItem[]
  savedIds: string[]
  onOpen: (item: ResourceItem) => void
  onSecondary: (item: ResourceItem) => void
}

function ContentPanel({ mode, topic, items, savedIds, onOpen, onSecondary }: ContentPanelProps) {
  if (!topic) return null

  return (
    <section className="content-panel">
      <div className="content-panel-header">
        <div>
          <p className="content-eyebrow">{mode.toUpperCase()}</p>
          <h2>{topic.name}</h2>
          <p className="content-subtitle">
            {mode === 'learn'
              ? 'Lessons and explanations for this topic.'
              : mode === 'practice'
                ? 'Guided exercises to build speed and accuracy.'
                : 'Timed tests to check exam readiness.'}
          </p>
        </div>
      </div>
      <ResourceCardsGrid
        items={items}
        mode={mode}
        savedIds={savedIds}
        onOpen={onOpen}
        onSecondary={onSecondary}
        onRequest={() => {
          window.location.href = '/contact'
        }}
      />
    </section>
  )
}

export default ContentPanel
