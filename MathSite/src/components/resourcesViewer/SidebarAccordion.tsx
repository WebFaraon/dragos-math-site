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
} from 'lucide-react'
import type { BacNavItem } from '../../types/bacContent'
import TopicLink from './TopicLink'

type SidebarAccordionProps = {
  items: BacNavItem[]
  activeTopicId: string
  onSelectTopic: (topicId: string) => void
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
}

function SidebarAccordion({ items, activeTopicId, onSelectTopic }: SidebarAccordionProps) {
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
      <div className="rv-sidebar-title">
        <p className="rv-sidebar-eyebrow">RESURSE BAC</p>
        <h2>Pregatire Bacalaureat - Matematica</h2>
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
