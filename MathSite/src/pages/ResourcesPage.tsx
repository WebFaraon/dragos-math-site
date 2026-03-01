import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import SidebarAccordion from '../components/resourcesViewer/SidebarAccordion'
import ContentRenderer from '../components/resourcesViewer/ContentRenderer'
import TocPanel, { type TocItem } from '../components/resourcesViewer/TocPanel'
import useLocalStorageState from '../hooks/useLocalStorageState'
import { bacNavItems } from '../data/bacTopics'
import { bacContentByTopic } from '../data/bacContent'
import type { BacTopicContent } from '../types/bacContent'
import './ResourcesPage.css'

const defaultTopicId = bacNavItems[0]?.topics[0]?.id ?? 'operatii-numere'

function ResourcesPage() {
  const [activeTopicId, setActiveTopicId] = useLocalStorageState<string>('bacActiveTopicId', defaultTopicId)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)

  const activeContent: BacTopicContent = useMemo(() => {
    const found = bacContentByTopic.get(activeTopicId)
    if (found) return found
    return {
      topicId: activeTopicId,
      title: 'Continut in pregatire',
      subtitle: 'Acest subiect va fi actualizat in curand.',
      blocks: [
        { type: 'heading', id: 'soon', level: 2, text: 'In curand' },
        {
          type: 'text',
          text: 'Lucram la lectii, exemple si exercitii interactive pentru aceasta tema.',
        },
      ],
    }
  }, [activeTopicId])

  const tocItems: TocItem[] = useMemo(
    () =>
      activeContent.blocks
        .filter((block) => block.type === 'heading')
        .map((block) => ({
          id: block.id,
          text: block.text,
          level: block.level,
        })),
    [activeContent.blocks],
  )

  const handleSelectTopic = (topicId: string) => {
    setActiveTopicId(topicId)
    setSidebarOpen(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const header = document.querySelector('.rv-content-header')
        if (header) {
          const rootStyles = getComputedStyle(document.documentElement)
          const navHeight = parseFloat(rootStyles.getPropertyValue('--nav-height')) || 84
          const offset = navHeight + 16
          const y = header.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      })
    })
  }

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const rootStyles = getComputedStyle(document.documentElement)
      const navHeight = parseFloat(rootStyles.getPropertyValue('--nav-height')) || 84
      const offset = navHeight + 16
      const y = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setTocOpen(false)
  }

  return (
    <div className="app">
      <Navbar />
      <main className="section page-main resources-page resources-viewer-page">
        <div className="rv-toolbar">
          <button type="button" className="btn btn-secondary" onClick={() => setSidebarOpen((prev) => !prev)}>
            {sidebarOpen ? 'Inchide meniul' : 'Meniu bac'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setTocOpen((prev) => !prev)}>
            {tocOpen ? 'Inchide cuprinsul' : 'Cuprins'}
          </button>
        </div>

        <div className="rv-layout">
          <aside className={`rv-sidebar${sidebarOpen ? ' open' : ''}`}>
            <SidebarAccordion
              items={bacNavItems}
              activeTopicId={activeTopicId}
              onSelectTopic={handleSelectTopic}
            />
          </aside>

          <section className="rv-main">
            <ContentRenderer content={activeContent} />
          </section>

          <aside className={`rv-toc${tocOpen ? ' open' : ''}`}>
            <TocPanel items={tocItems} onNavigate={handleNavigate} />
          </aside>
        </div>
        {(sidebarOpen || tocOpen) && (
          <button
            type="button"
            aria-label="Inchide meniurile"
            className="rv-overlay"
            onClick={() => {
              setSidebarOpen(false)
              setTocOpen(false)
            }}
          />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default ResourcesPage
