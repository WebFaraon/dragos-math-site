import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import {
  gradeFilters,
  resourcesData,
  topicFilters,
  typeFilters,
} from '../data/resourcesData.js'
import './ResourcesPage.css'

function FilterGroup({ label, options, selected, onChange }) {
  return (
    <div className="resource-filter-group">
      <p className="resource-filter-label">{label}</p>
      <div className="resource-filter-options" role="group" aria-label={`${label} filter`}>
        {options.map((option) => {
          const isActive = option === selected

          return (
            <button
              key={`${label}-${option}`}
              type="button"
              className={`resource-filter-pill${isActive ? ' active' : ''}`}
              onClick={() => onChange(option)}
              aria-pressed={isActive}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ResourceCard({ resource }) {
  return (
    <article className="resource-card">
      <div className="resource-meta-badges">
        <span className="resource-tag">{resource.grade}</span>
        <span className="resource-tag">{resource.topic}</span>
        <span className="resource-tag">{resource.type}</span>
      </div>

      <h2 className="resource-title">{resource.title}</h2>
      <p className="resource-description">{resource.description}</p>

      <div className="resource-actions">
        <a
          className="resource-action-link"
          href={resource.pdf}
          target="_blank"
          rel="noreferrer"
        >
          View PDF
        </a>
        <a className="resource-action-link" href={resource.pdf} download>
          Download
        </a>
      </div>
    </article>
  )
}

function ResourcesPage() {
  const [gradeFilter, setGradeFilter] = useState('All')
  const [topicFilter, setTopicFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const visibleResources = useMemo(
    () =>
      resourcesData.filter((resource) => {
        const matchesGrade = gradeFilter === 'All' || resource.grade === gradeFilter
        const matchesTopic = topicFilter === 'All' || resource.topic === topicFilter
        const matchesType = typeFilter === 'All' || resource.type === typeFilter

        return matchesGrade && matchesTopic && matchesType
      }),
    [gradeFilter, topicFilter, typeFilter],
  )

  return (
    <div className="app">
      <Navbar />
      <main className="section page-main resources-page-main">
        <header className="section-heading resources-heading">
          <p className="eyebrow">Resources</p>
          <h1 className="section-title">Learning Resources</h1>
          <p className="hero-subtitle">
            Browse structured materials, guides, and practice worksheets.
          </p>
          <span className="resources-access-badge">Open Access Library</span>
        </header>

        <section className="resources-filter-bar" aria-label="Resource filters">
          <FilterGroup
            label="Grade"
            options={gradeFilters}
            selected={gradeFilter}
            onChange={setGradeFilter}
          />
          <FilterGroup
            label="Topic"
            options={topicFilters}
            selected={topicFilter}
            onChange={setTopicFilter}
          />
          <FilterGroup
            label="Type"
            options={typeFilters}
            selected={typeFilter}
            onChange={setTypeFilter}
          />
        </section>

        <section className="resources-grid" aria-live="polite">
          {visibleResources.length > 0 ? (
            visibleResources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)
          ) : (
            <div className="resources-empty-state">
              No resources found for this filter combination.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ResourcesPage