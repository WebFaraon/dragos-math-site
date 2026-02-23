import { useMemo, useState } from 'react'
import type { CategoryNode, TopicNode } from '../../types/resources'

type TopicExplorerProps = {
  taxonomy: CategoryNode[]
  search: string
  onSearchChange: (value: string) => void
  selectedTopicId: string | null
  onSelectTopic: (topic: TopicNode) => void
}

function TopicExplorer({ taxonomy, search, onSearchChange, selectedTopicId, onSelectTopic }: TopicExplorerProps) {
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(taxonomy[0]?.id ?? null)
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, string | null>>({})

  const searchTerm = search.trim().toLowerCase()
  const matchMap = useMemo(() => buildMatchMap(taxonomy, searchTerm), [taxonomy, searchTerm])

  const handleCategoryToggle = (id: string) => {
    setExpandedCategoryId((prev) => (prev === id ? null : id))
  }

  const handleSubcategoryToggle = (categoryId: string, id: string) => {
    setExpandedSubcategories((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === id ? null : id,
    }))
  }

  return (
    <section className="topic-explorer">
      <label className="topic-search">
        <span className="sr-only">Search topics</span>
        <input
          type="search"
          placeholder="Search topics"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="topic-explorer-list">
        {taxonomy.map((category, index) => {
          const isExpanded = searchTerm
            ? matchMap.categoryIds.has(category.id)
            : expandedCategoryId
              ? expandedCategoryId === category.id
              : index === 0

          return (
            <div key={category.id} className="category-accordion">
              <button
                type="button"
                className="category-header"
                onClick={() => {
                  if (!searchTerm) handleCategoryToggle(category.id)
                }}
                aria-expanded={isExpanded}
              >
                <span>{category.name}</span>
                <span
                  className={`category-chevron${isExpanded ? ' open' : ''}`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>
              {isExpanded && (
                <div className="category-body">
                  {category.subcategories.map((subcategory) => {
                    const subHasMatch = searchTerm ? matchMap.subcategoryIds.has(subcategory.id) : true
                    if (searchTerm && !subHasMatch) return null

                    const isSubExpanded = searchTerm
                      ? subHasMatch
                      : expandedSubcategories[category.id]
                        ? expandedSubcategories[category.id] === subcategory.id
                        : true

                    return (
                      <div key={subcategory.id} className="subcategory-accordion">
                        <button
                          type="button"
                          className="subcategory-header"
                          onClick={() => {
                            if (!searchTerm) handleSubcategoryToggle(category.id, subcategory.id)
                          }}
                          aria-expanded={isSubExpanded}
                        >
                          <span>{subcategory.name}</span>
                          <span
                            className={`subcategory-chevron${isSubExpanded ? ' open' : ''}`}
                            aria-hidden="true"
                          >
                            ▾
                          </span>
                        </button>
                        {isSubExpanded && (
                          <ul className="topic-list" role="list">
                            {subcategory.topics.map((topic) => {
                              const isActive = selectedTopicId === topic.id
                              const label = highlightMatch(topic.name, searchTerm)
                              return (
                                <li key={topic.id}>
                                  <button
                                    type="button"
                                    className={`topic-item${isActive ? ' active' : ''}`}
                                    onClick={() => onSelectTopic(topic)}
                                    aria-pressed={isActive}
                                  >
                                    {label}
                                  </button>
                                </li>
                              )
                            })}
                          </ul>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function highlightMatch(label: string, term: string) {
  if (!term) return label
  const lower = label.toLowerCase()
  const index = lower.indexOf(term)
  if (index === -1) return label
  const before = label.slice(0, index)
  const match = label.slice(index, index + term.length)
  const after = label.slice(index + term.length)
  return (
    <span>
      {before}
      <mark className="topic-highlight">{match}</mark>
      {after}
    </span>
  )
}

function buildMatchMap(taxonomy: CategoryNode[], term: string) {
  const categoryIds = new Set<string>()
  const subcategoryIds = new Set<string>()

  if (term) {
    taxonomy.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        const hasMatch = subcategory.topics.some((topic) => topic.name.toLowerCase().includes(term))
        if (hasMatch) {
          categoryIds.add(category.id)
          subcategoryIds.add(subcategory.id)
        }
      })
    })
  }

  return { categoryIds, subcategoryIds }
}

export default TopicExplorer
