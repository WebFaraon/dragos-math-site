import { useEffect, useMemo, useState, type ComponentType } from 'react'
import {
  BookOpen,
  ChevronDown,
  Calculator,
  Sigma,
  Triangle,
  Pyramid,
  Hash,
  Activity,
  Dice5,
  Binary,
  Layers,
  ListChecks,
  Percent,
} from 'lucide-react'
import type { BacNavItem } from '../../types/bacContent'
import TopicLink from './TopicLink'

type SidebarAccordionProps = {
  items: BacNavItem[]
  activeTopicId: string
  onSelectTopic: (topicId: string) => void
  selectedGrade: 9 | 12
  onSelectGrade: (grade: 9 | 12) => void
}

const iconMap: Record<string, ComponentType<{ size?: number }>> = {
  item1: Calculator,
  item2: Hash,
  item3: ListChecks,
  item4: Sigma,
  item5: Activity,
  item6: Triangle,
  item7: BookOpen,
  item8: Pyramid,
  item9: Layers,
  item10: Activity,
  item11: Dice5,
  item12: Binary,
  'g9-item1': Calculator,
  'g9-item2': Hash,
  'g9-item3': Activity,
  'g9-item4': Percent,
  'g9-item5': Sigma,
  'g9-item6': ListChecks,
  'g9-item7': Triangle,
  'g9-item8': ListChecks,
  'g9-item9': Layers,
  'g9-item10': Pyramid,
  'g9-item11': Hash,
  'g9-item12': Activity,
}

function SidebarAccordion({
  items,
  activeTopicId,
  onSelectTopic,
  selectedGrade,
  onSelectGrade,
}: SidebarAccordionProps) {
  const initialOpen = useMemo(() => {
    const match = items.find((item) => item.topics.some((topic) => topic.id === activeTopicId))
    return match?.itemId ?? items[0]?.itemId
  }, [activeTopicId, items])

  const [openItems, setOpenItems] = useState<string[]>(() => (initialOpen ? [initialOpen] : []))

  useEffect(() => {
    if (!initialOpen) return
    setOpenItems((prev) => (prev.includes(initialOpen) ? prev : [...prev, initialOpen]))
  }, [initialOpen])

  const handleToggle = (itemId: string) => {
    setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  return (
    <div className="rv-sidebar-accordion">
      <div className="rv-sidebar-grade-card">
        <p className="rv-sidebar-grade-label">Selectează clasa</p>
        <div className="rv-grade-switch rv-grade-switch-integrated">
          <div className="rv-grade-switch-control" role="radiogroup" aria-label="Selecteaza clasa">
            <button
              type="button"
              role="radio"
              aria-checked={selectedGrade === 9}
              className={`rv-grade-switch-btn${selectedGrade === 9 ? ' is-active' : ''}`}
              onClick={() => onSelectGrade(9)}
            >
              a IX-a
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={selectedGrade === 12}
              className={`rv-grade-switch-btn${selectedGrade === 12 ? ' is-active' : ''}`}
              onClick={() => onSelectGrade(12)}
            >
              a XII-a
            </button>
          </div>
        </div>
      </div>
      <div className="rv-accordion">
        {items.map((item) => {
          const Icon = iconMap[item.itemId] ?? BookOpen
          const isOpen = openItems.includes(item.itemId)
          return (
            <div key={item.itemId} className={`rv-accordion-item${isOpen ? ' open' : ''}`}>
              <button type="button" className="rv-accordion-trigger" onClick={() => handleToggle(item.itemId)}>
                <span className="rv-accordion-icon">
                  <Icon size={18} />
                </span>
                <span className="rv-accordion-title">{item.title}</span>
                <ChevronDown size={18} className="rv-accordion-chevron" />
              </button>
              <div className="rv-accordion-panel" aria-hidden={!isOpen}>
                <div className="rv-topic-list">
                  {item.topics.map((topic) => (
                    <TopicLink
                      key={topic.id}
                      title={topic.title}
                      active={topic.id === activeTopicId}
                      onClick={() => onSelectTopic(topic.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SidebarAccordion
