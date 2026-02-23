import TopicPicker from './TopicPicker'
import type { SubcategoryNode, TopicNode } from '../../types/resources'

type SubcategoryAccordionProps = {
  subcategories: SubcategoryNode[]
  openId: string | null
  onToggle: (id: string) => void
  search: string
  onSearchChange: (value: string) => void
  selectedTopicId: string | null
  onSelectTopic: (topic: TopicNode, subcategoryId: string) => void
}

function SubcategoryAccordion({
  subcategories,
  openId,
  onToggle,
  search,
  onSearchChange,
  selectedTopicId,
  onSelectTopic,
}: SubcategoryAccordionProps) {
  const lowerSearch = search.trim().toLowerCase()

  return (
    <div className="subcategory-accordion">
      <label className="topic-search">
        <span className="sr-only">Search topics</span>
        <input
          type="search"
          placeholder="Search topics in this category"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>
      {subcategories.map((subcategory) => {
        const topics = !lowerSearch
          ? subcategory.topics
          : subcategory.topics.filter((topic) => {
              if (topic.name.toLowerCase().includes(lowerSearch)) return true
              return topic.aliases?.some((alias) => alias.toLowerCase().includes(lowerSearch))
            })

        const isOpen = openId === subcategory.id

        return (
          <div key={subcategory.id} className="accordion-item">
            <button
              type="button"
              className="accordion-trigger"
              onClick={() => onToggle(subcategory.id)}
              aria-expanded={isOpen}
            >
              <span>{subcategory.name}</span>
              <span className={`accordion-chevron${isOpen ? ' open' : ''}`} aria-hidden="true">?</span>
            </button>
            {isOpen && (
              <div className="accordion-panel">
                <TopicPicker
                  topics={topics}
                  selectedId={selectedTopicId}
                  onSelect={(topic) => onSelectTopic(topic, subcategory.id)}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default SubcategoryAccordion
