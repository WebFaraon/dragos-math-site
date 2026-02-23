import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import useRevealOnScroll from '../components/useRevealOnScroll.js'
import {
  gradeFilters,
  resourcesData,
  topicFilters,
  typeFilters,
} from '../data/resourcesData.js'
import './ResourcesPage.css'

function FilterGroup({ label, options, selected, onChange, ariaLabel }) {
  return (
    <div className="resource-filter-group">
      <p className="resource-filter-label">{label}</p>
      <div className="resource-filter-options" role="group" aria-label={ariaLabel}>
        {options.map((option) => {
          const isActive = option.value === selected

          return (
            <button
              key={`${label}-${option.value}`}
              type="button"
              className={`resource-filter-pill${isActive ? ' active' : ''}`}
              onClick={() => onChange(option.value)}
              aria-pressed={isActive}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ResourceCard({ resource, t }) {
  return (
    <article className="resource-card reveal">
      <div className="resource-meta-badges">
        <span className="resource-tag">{t(`resources.filters.grade.${resource.grade}`)}</span>
        <span className="resource-tag">{t(`resources.filters.topic.${resource.topic}`)}</span>
        <span className="resource-tag">{t(`resources.filters.type.${resource.type}`)}</span>
      </div>

      <h2 className="resource-title">{t(resource.titleKey)}</h2>
      <p className="resource-description">{t(resource.descriptionKey)}</p>

      <div className="resource-actions">
        <a
          className="resource-action-link"
          href={resource.pdf}
          target="_blank"
          rel="noreferrer"
        >
          {t('resources.actions.viewPdf')}
        </a>
        <a className="resource-action-link" href={resource.pdf} download>
          {t('resources.actions.download')}
        </a>
      </div>
    </article>
  )
}

function ResourcesPage() {
  const { t } = useTranslation()
  const [gradeFilter, setGradeFilter] = useState('all')
  const [topicFilter, setTopicFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  useRevealOnScroll()

  const gradeOptions = useMemo(
    () =>
      gradeFilters.map((value) => ({
        value,
        label: t(`resources.filters.grade.${value}`),
      })),
    [t],
  )
  const topicOptions = useMemo(
    () =>
      topicFilters.map((value) => ({
        value,
        label: t(`resources.filters.topic.${value}`),
      })),
    [t],
  )
  const typeOptions = useMemo(
    () =>
      typeFilters.map((value) => ({
        value,
        label: t(`resources.filters.type.${value}`),
      })),
    [t],
  )

  const visibleResources = useMemo(
    () =>
      resourcesData.filter((resource) => {
        const matchesGrade = gradeFilter === 'all' || resource.grade === gradeFilter
        const matchesTopic = topicFilter === 'all' || resource.topic === topicFilter
        const matchesType = typeFilter === 'all' || resource.type === typeFilter

        return matchesGrade && matchesTopic && matchesType
      }),
    [gradeFilter, topicFilter, typeFilter],
  )

  return (
    <div className="app">
      <Navbar />
      <main className="section page-main resources-page-main">
        <header className="section-heading resources-heading reveal">
          <p className="eyebrow">{t('resources.eyebrow')}</p>
          <h1 className="section-title">{t('resources.title')}</h1>
          <p className="hero-subtitle">{t('resources.subtitle')}</p>
          <span className="resources-access-badge">{t('resources.badge')}</span>
        </header>

        <section className="resources-filter-bar reveal" aria-label={t('resources.filters.aria')}>
          <FilterGroup
            label={t('resources.filters.labels.grade')}
            options={gradeOptions}
            selected={gradeFilter}
            onChange={setGradeFilter}
            ariaLabel={t('resources.filters.groupAria', {
              label: t('resources.filters.labels.grade'),
            })}
          />
          <FilterGroup
            label={t('resources.filters.labels.topic')}
            options={topicOptions}
            selected={topicFilter}
            onChange={setTopicFilter}
            ariaLabel={t('resources.filters.groupAria', {
              label: t('resources.filters.labels.topic'),
            })}
          />
          <FilterGroup
            label={t('resources.filters.labels.type')}
            options={typeOptions}
            selected={typeFilter}
            onChange={setTypeFilter}
            ariaLabel={t('resources.filters.groupAria', {
              label: t('resources.filters.labels.type'),
            })}
          />
        </section>

        <section className="resources-grid reveal" aria-live="polite">
          {visibleResources.length > 0 ? (
            visibleResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} t={t} />
            ))
          ) : (
            <div className="resources-empty-state reveal">{t('resources.empty')}</div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ResourcesPage
