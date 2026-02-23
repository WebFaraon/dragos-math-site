import type { TopicNode } from '../../types/resources'

type TopicPickerProps = {
  topics: TopicNode[]
  selectedId: string | null
  onSelect: (topic: TopicNode) => void
}

function TopicPicker({ topics, selectedId, onSelect }: TopicPickerProps) {
  if (topics.length === 0) {
    return <p className="topic-empty">No topics match this search.</p>
  }

  return (
    <div className="topic-list" role="list">
      {topics.map((topic) => {
        const isActive = selectedId === topic.id
        return (
          <button
            key={topic.id}
            type="button"
            className={`topic-pill${isActive ? ' active' : ''}`}
            onClick={() => onSelect(topic)}
            aria-pressed={isActive}
          >
            {topic.name}
          </button>
        )
      })}
    </div>
  )
}

export default TopicPicker