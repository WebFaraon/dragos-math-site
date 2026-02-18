import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import TopicCard from '../components/TopicCard.jsx'
import './Grade9Page.css'

function Grade9Page() {
  const [expandedTopic, setExpandedTopic] = useState(null)

  const topicBlocks = [
    {
      title: 'Algebra and Function Foundations',
      topics: [
        {
          title: 'Algebraic Calculations',
          slug: 'algebraic-calculations',
          icon: '\u03A3',
          description: 'Operations with expressions, factorization, and simplification methods.',
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: 'Basic Plane Geometry',
          slug: 'basic-plane-geometry',
          icon: '\u25B3',
          description:
            'Core properties of points, lines, angles, and fundamental plane figures.',
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: 'Linear and Quadratic Functions',
          slug: 'linear-and-quadratic-functions',
          icon: '\u0192',
          description: 'Representation and analysis of first-degree and second-degree functions.',
          pdfs: [],
          downloadAllPath: '',
        },
      ],
    },
    {
      title: 'Proportions, Powers, and Quadratics',
      topics: [
        {
          title: 'Ratios and Percentages',
          slug: 'ratios-and-percentages',
          icon: '%',
          description: 'Applications of proportional reasoning, ratios, and percentage change.',
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: 'Powers and Radicals',
          slug: 'powers-and-radicals',
          icon: '\u221A',
          description: 'Rules for exponents and operations with roots and radical expressions.',
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: 'Quadratic Equations',
          slug: 'quadratic-equations',
          icon: 'x\u00B2',
          description: 'Methods for solving and verifying equations of second degree.',
          pdfs: [],
          downloadAllPath: '',
        },
      ],
    },
    {
      title: 'Geometry and Equation Systems',
      topics: [
        {
          title: 'Advanced Plane Geometry',
          slug: 'advanced-plane-geometry',
          icon: '\u2220',
          description: 'Geometric relations involving triangles, polygons, and circle elements.',
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: 'Systems of Equations',
          slug: 'systems-of-equations',
          icon: '{x,y}',
          description: 'Solving two-variable systems using algebraic and graphical approaches.',
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: 'Linear Inequalities',
          slug: 'linear-inequalities',
          icon: '\u2264',
          description: 'Formulation and solution of first-degree inequalities and intervals.',
          pdfs: [],
          downloadAllPath: '',
        },
      ],
    },
    {
      title: 'Solid and Parameterized Topics',
      topics: [
        {
          title: 'Solid Geometry',
          slug: 'solid-geometry',
          icon: '\u25A1',
          description: 'Study of three-dimensional figures, surface area, and volume relations.',
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: 'Algebraic Fractions',
          slug: 'algebraic-fractions',
          icon: '\u00F7',
          description: 'Simplification and operations with rational algebraic expressions.',
          pdfs: [],
          downloadAllPath: '',
        },
        {
          title: 'Functions with Parameters',
          slug: 'functions-with-parameters',
          icon: 'f(a,x)',
          description: 'Behavior of function families defined by variable parameter values.',
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
        <section className="grade9-header grade9-panel">
          <div className="grade9-header-top">
            <p className="grade9-badge">{'Curriculum-aligned \u2022 PDFs available'}</p>
            <Link className="btn btn-secondary grade9-back-btn" to="/programs">
              Back to Programs
            </Link>
          </div>

          <h1 className="grade9-title">{'Grade 9 \u2013 Mathematics Program'}</h1>
          <p className="grade9-subtitle">Structured materials aligned with the Grade 9 curriculum.</p>
        </section>

        <section className="grade9-curriculum">
          <div className="grade9-section-head">
            <h2>Curriculum Topics</h2>
          </div>

          <div className="grade9-topic-blocks">
            {topicBlocks.map((block) => (
              <section key={block.title} className="grade9-topic-block grade9-panel">
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
