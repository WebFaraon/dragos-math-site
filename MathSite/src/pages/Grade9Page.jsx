import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import TopicCard from '../components/TopicCard.jsx'
import useRevealOnScroll from '../components/useRevealOnScroll.js'
import './Grade9Page.css'

function Grade9Page() {
  const [expandedTopic, setExpandedTopic] = useState(null)
  const { t } = useTranslation()
  useRevealOnScroll()

  const topicBlocks = [
    {
      title: t('grade9Page.blocks.algebraFoundations.title'),
      topics: [
        {
          title: t('grade9Page.blocks.algebraFoundations.topics.algebraicCalculations.title'),
          slug: 'algebraic-calculations',
          icon: '\u03A3',
          description: t(
            'grade9Page.blocks.algebraFoundations.topics.algebraicCalculations.description',
          ),
          resource: {
            label: t(
              'grade9Page.blocks.algebraFoundations.topics.algebraicCalculations.resourceLabel',
            ),
            path: '/pdfs/grade9/ex1/first-pdf.pdf',
          },
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: t('grade9Page.blocks.algebraFoundations.topics.basicPlaneGeometry.title'),
          slug: 'basic-plane-geometry',
          icon: '\u25B3',
          description: t(
            'grade9Page.blocks.algebraFoundations.topics.basicPlaneGeometry.description',
          ),
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: t('grade9Page.blocks.algebraFoundations.topics.linearQuadratic.title'),
          slug: 'linear-and-quadratic-functions',
          icon: '\u0192',
          description: t(
            'grade9Page.blocks.algebraFoundations.topics.linearQuadratic.description',
          ),
          pdfs: [],
          downloadAllPath: '',
        },
      ],
    },
    {
      title: t('grade9Page.blocks.proportionsPowers.title'),
      topics: [
        {
          title: t('grade9Page.blocks.proportionsPowers.topics.ratiosPercentages.title'),
          slug: 'ratios-and-percentages',
          icon: '%',
          description: t(
            'grade9Page.blocks.proportionsPowers.topics.ratiosPercentages.description',
          ),
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: t('grade9Page.blocks.proportionsPowers.topics.powersRadicals.title'),
          slug: 'powers-and-radicals',
          icon: '\u221A',
          description: t(
            'grade9Page.blocks.proportionsPowers.topics.powersRadicals.description',
          ),
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: t('grade9Page.blocks.proportionsPowers.topics.quadraticEquations.title'),
          slug: 'quadratic-equations',
          icon: 'x\u00B2',
          description: t(
            'grade9Page.blocks.proportionsPowers.topics.quadraticEquations.description',
          ),
          pdfs: [],
          downloadAllPath: '',
        },
      ],
    },
    {
      title: t('grade9Page.blocks.geometrySystems.title'),
      topics: [
        {
          title: t('grade9Page.blocks.geometrySystems.topics.advancedPlane.title'),
          slug: 'advanced-plane-geometry',
          icon: '\u2220',
          description: t(
            'grade9Page.blocks.geometrySystems.topics.advancedPlane.description',
          ),
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: t('grade9Page.blocks.geometrySystems.topics.systemsEquations.title'),
          slug: 'systems-of-equations',
          icon: '{x,y}',
          description: t(
            'grade9Page.blocks.geometrySystems.topics.systemsEquations.description',
          ),
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: t('grade9Page.blocks.geometrySystems.topics.linearInequalities.title'),
          slug: 'linear-inequalities',
          icon: '\u2264',
          description: t(
            'grade9Page.blocks.geometrySystems.topics.linearInequalities.description',
          ),
          pdfs: [],
          downloadAllPath: '',
        },
      ],
    },
    {
      title: t('grade9Page.blocks.solidsParameters.title'),
      topics: [
        {
          title: t('grade9Page.blocks.solidsParameters.topics.solidGeometry.title'),
          slug: 'solid-geometry',
          icon: '\u25A1',
          description: t(
            'grade9Page.blocks.solidsParameters.topics.solidGeometry.description',
          ),
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: t('grade9Page.blocks.solidsParameters.topics.algebraicFractions.title'),
          slug: 'algebraic-fractions',
          icon: '\u00F7',
          description: t(
            'grade9Page.blocks.solidsParameters.topics.algebraicFractions.description',
          ),
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: t('grade9Page.blocks.solidsParameters.topics.functionsParameters.title'),
          slug: 'functions-with-parameters',
          icon: 'f(a,x)',
          description: t(
            'grade9Page.blocks.solidsParameters.topics.functionsParameters.description',
          ),
          pdfs: [],
          downloadAllPath: '',
        },
      ],
    },
  ]

  return (
    <div className="app">
      <Navbar />
      <main className="section page-main grade9-page-main">
        <section className="grade9-header grade9-panel reveal">
          <div className="grade9-header-top">
            <p className="grade9-badge">{t('grade9Page.badge')}</p>
            <Link className="btn btn-secondary grade9-back-btn" to="/programs">
              {t('grade9Page.backPrograms')}
            </Link>
          </div>

          <h1 className="grade9-title">{t('grade9Page.title')}</h1>
          <p className="grade9-subtitle">{t('grade9Page.subtitle')}</p>
        </section>

        <section className="grade9-curriculum">
          <div className="grade9-section-head reveal">
            <h2>{t('grade9Page.curriculumTitle')}</h2>
          </div>

          <div className="grade9-topic-blocks">
            {topicBlocks.map((block) => (
              <section key={block.title} className="grade9-topic-block grade9-panel reveal">
                <h3>{block.title}</h3>
                <div className="grade9-topic-grid">
                  {block.topics.map((topic) => (
                    <TopicCard
                      key={topic.slug}
                      topic={topic}
                      isExpanded={expandedTopic === topic.slug}
                      onToggle={() =>
                        setExpandedTopic((currentTopic) =>
                          currentTopic === topic.slug ? null : topic.slug,
                        )
                      }
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Grade9Page
