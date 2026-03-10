import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import SidebarAccordion from '../components/resourcesViewer/SidebarAccordion'
import ContentRenderer from '../components/resourcesViewer/ContentRenderer'
import TocPanel, { type TocItem } from '../components/resourcesViewer/TocPanel'
import useLocalStorageState from '../hooks/useLocalStorageState'
import { resourcesByGrade } from '../data/resourcesByGrade'
import type { BacTopicContent } from '../types/bacContent'
import './ResourcesPage.css'

type Grade = 9 | 12

const parseGradeFromQuery = (value: string | null): Grade => {
  if (value === '9') return 9
  return 12
}

function ResourcesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedGrade = parseGradeFromQuery(searchParams.get('grade'))
  const gradeResources = resourcesByGrade[selectedGrade]
  const defaultTopicId = gradeResources.defaultTopicId

  const [activeTopicByGrade, setActiveTopicByGrade] = useLocalStorageState<Record<string, string>>(
    'resourcesActiveTopicByGrade',
    {},
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)

  const activeTopicId = activeTopicByGrade[String(selectedGrade)] ?? defaultTopicId

  useEffect(() => {
    if (gradeResources.contentByTopic.has(activeTopicId)) return
    setActiveTopicByGrade((prev) => ({
      ...prev,
      [String(selectedGrade)]: defaultTopicId,
    }))
  }, [activeTopicId, defaultTopicId, gradeResources.contentByTopic, selectedGrade, setActiveTopicByGrade])

  useEffect(() => {
    document.documentElement.classList.remove('route-transition-lock')
    document.body.classList.remove('route-transition-lock')
  }, [])

  const activeContent: BacTopicContent = useMemo(() => {
    const found = gradeResources.contentByTopic.get(activeTopicId)
    if (found) return found
    return {
      topicId: activeTopicId,
      title: 'Continut in pregatire',
      subtitle: `Acest subiect pentru clasa a ${selectedGrade}-a va fi actualizat in curand.`,
      blocks: [
        { type: 'heading', id: 'soon', level: 2, text: 'In curand' },
        {
          type: 'text',
          text: 'Lucram la lectii, exemple si exercitii interactive pentru aceasta tema.',
        },
      ],
    }
  }, [activeTopicId, gradeResources.contentByTopic, selectedGrade])

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

  const handleGradeChange = (grade: Grade) => {
    if (grade === selectedGrade) return
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('grade', String(grade))
    setSearchParams(nextParams)
    setSidebarOpen(false)
    setTocOpen(false)
  }

  const handleSelectTopic = (topicId: string) => {
    setActiveTopicByGrade((prev) => ({
      ...prev,
      [String(selectedGrade)]: topicId,
    }))
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
            {sidebarOpen ? 'Inchide meniul' : 'Meniu resurse'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setTocOpen((prev) => !prev)}>
            {tocOpen ? 'Inchide cuprinsul' : 'Cuprins'}
          </button>
        </div>

        <div className="rv-layout">
          <aside className={`rv-sidebar${sidebarOpen ? ' open' : ''}`}>
            <SidebarAccordion
              items={gradeResources.navItems}
              activeTopicId={activeTopicId}
              onSelectTopic={handleSelectTopic}
              selectedGrade={selectedGrade}
              onSelectGrade={handleGradeChange}
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
