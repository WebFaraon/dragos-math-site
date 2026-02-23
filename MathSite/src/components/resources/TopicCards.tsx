import type { CategoryId, TopicNode } from '../../types/resources'

type TopicCardsProps = {
  topics: TopicNode[]
  categoryId: CategoryId
  selectedId: string | null
  onSelect: (topic: TopicNode) => void
}

function TopicCards({ topics, categoryId, selectedId, onSelect }: TopicCardsProps) {
  return (
    <div className="topic-cards" role="list">
      {topics.map((topic) => {
        const isActive = selectedId === topic.id
        return (
          <button
            key={topic.id}
            type="button"
            className={`topic-card-xl category-${categoryId}${isActive ? ' active' : ''}`}
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

export default TopicCards
