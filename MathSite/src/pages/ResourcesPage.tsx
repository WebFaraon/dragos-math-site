import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import useRevealOnScroll from '../components/useRevealOnScroll.js'
import ModeCards from '../components/resources/ModeCards'
import CategoryCards from '../components/resources/CategoryCards'
import SubcategoryCards from '../components/resources/SubcategoryCards'
import TopicCards from '../components/resources/TopicCards'
import ContentCards from '../components/resources/ContentCards'
import useLocalStorageState from '../hooks/useLocalStorageState'
import { grade12Resources, grade12Taxonomy } from '../data/resourcesData'
import type { CategoryId, ResourceItem, ResourceMode, TopicNode } from '../types/resources'
import './ResourcesPage.css'

function ResourcesPage() {
  const [mode, setMode] = useState<ResourceMode | null>(null)
  const [categoryId, setCategoryId] = useState<CategoryId | null>(null)
  const [subcategoryId, setSubcategoryId] = useState<string | null>(null)
  const [topicId, setTopicId] = useState<string | null>(null)
  const [savedIds, setSavedIds] = useLocalStorageState<string[]>('savedResources', [])

  useRevealOnScroll([mode, categoryId, subcategoryId, topicId])

  const selectedCategory = useMemo(
    () => grade12Taxonomy.find((category) => category.id === categoryId) ?? null,
    [categoryId],
  )

  const selectedSubcategory = useMemo(() => {
    if (!selectedCategory || !subcategoryId) return null
    return selectedCategory.subcategories.find((sub) => sub.id === subcategoryId) ?? null
  }, [selectedCategory, subcategoryId])

  const selectedTopic = useMemo(() => {
    if (!selectedSubcategory || !topicId) return null
    return selectedSubcategory.topics.find((topic) => topic.id === topicId) ?? null
  }, [selectedSubcategory, topicId])

  const resources = useMemo(() => {
    if (!mode || !topicId) return []
    return grade12Resources.filter((item) => item.mode === mode && item.topicId === topicId)
  }, [mode, topicId])

  const handleModeSelect = (next: ResourceMode) => {
    setMode(next)
    setCategoryId(null)
    setSubcategoryId(null)
    setTopicId(null)
  }

  const handleCategorySelect = (id: CategoryId) => {
    setCategoryId(id)
    setSubcategoryId(null)
    setTopicId(null)
  }

  const handleSubcategorySelect = (id: string) => {
    setSubcategoryId(id)
    setTopicId(null)
  }

  const handleTopicSelect = (topic: TopicNode) => {
    setTopicId(topic.id)
  }

  const handleOpen = (item: ResourceItem) => {
    if (item.links.view) {
      window.location.href = item.links.view
    } else if (item.links.pdf) {
      window.open(item.links.pdf, '_blank', 'noreferrer')
    }
  }

  const handleSecondary = (item: ResourceItem) => {
    if (item.links.download) {
      window.open(item.links.download, '_blank', 'noreferrer')
      return
    }

    setSavedIds((prev) => {
      if (prev.includes(item.id)) {
        return prev.filter((id) => id !== item.id)
      }
      return [...prev, item.id]
    })
  }

  return (
    <div className="app">
      <Navbar />
      <main className="section page-main resources-page resources-page-main">
        <section className="resources-header reveal">
          <p className="eyebrow">RESOURCES</p>
          <h1 className="section-title">Learning Resources</h1>
          <p className="hero-subtitle">
            Choose a mode, browse categories, and open the right material instantly.
          </p>
        </section>

        <section className="resources-section reveal">
          <div className="mode-header">
            <h2>Mode</h2>
            {mode && (
              <button type="button" className="btn btn-secondary" onClick={() => setMode(null)}>
                Change mode
              </button>
            )}
          </div>
          <ModeCards selected={mode} onSelect={handleModeSelect} />
        </section>

        {mode && (
          <section className="resources-section reveal">
            <h2>Categories</h2>
            <CategoryCards categories={grade12Taxonomy} selectedId={categoryId} onSelect={handleCategorySelect} />
          </section>
        )}

        {mode && selectedCategory && (
          <section className="resources-section reveal">
            <h2>Subcategories</h2>
            <SubcategoryCards
              subcategories={selectedCategory.subcategories}
              categoryId={selectedCategory.id}
              selectedId={subcategoryId}
              onSelect={handleSubcategorySelect}
            />
          </section>
        )}

        {mode && selectedSubcategory && (
          <section className="resources-section reveal">
            <h2>Topics</h2>
            <TopicCards
              topics={selectedSubcategory.topics}
              categoryId={selectedCategory?.id ?? 'analysis'}
              selectedId={topicId}
              onSelect={handleTopicSelect}
            />
          </section>
        )}

        {mode && selectedTopic && (
          <section className="resources-section reveal">
            <h2>Content</h2>
            <ContentCards mode={mode} items={resources} onOpen={handleOpen} onSecondary={handleSecondary} />
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default ResourcesPage
