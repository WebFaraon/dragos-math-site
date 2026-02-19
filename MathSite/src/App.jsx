import { useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import HomePage from './pages/HomePage.jsx'
import ProgramsPage from './pages/ProgramsPage.jsx'
import Grade9Page from './pages/Grade9Page.jsx'
import Grade12Page from './pages/Grade12Page.jsx'
import ContactPage from './pages/ContactPage.jsx'
import ResourcesPage from './pages/ResourcesPage.jsx'
import FeedbackPage from './pages/Feedback.jsx'
import PageTransition from './components/PageTransition.jsx'

function RouteScrollManager() {
  const location = useLocation()

  useLayoutEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const targetId = decodeURIComponent(location.hash.slice(1))
    let attempts = 0
    const maxAttempts = 24

    const scrollToSection = () => {
      const target = document.getElementById(targetId)
      if (!target) {
        if (attempts < maxAttempts) {
          attempts += 1
          window.setTimeout(scrollToSection, 40)
        }
        return
      }

      const navbar = document.querySelector('.navbar')
      const navHeight = navbar instanceof HTMLElement ? navbar.offsetHeight : 0
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 14

      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
    }

    scrollToSection()
  }, [location.pathname, location.hash])

  return null
}

function RouteTransitionOverflowLock() {
  const location = useLocation()

  useLayoutEffect(() => {
    const html = document.documentElement
    const body = document.body

    html.classList.add('route-transition-lock')
    body.classList.add('route-transition-lock')

    const unlockTimer = window.setTimeout(() => {
      html.classList.remove('route-transition-lock')
      body.classList.remove('route-transition-lock')
    }, 340)

    return () => {
      window.clearTimeout(unlockTimer)
      html.classList.remove('route-transition-lock')
      body.classList.remove('route-transition-lock')
    }
  }, [location.pathname])

  return null
}

function App() {
  const location = useLocation()

  return (
    <>
      <RouteTransitionOverflowLock />
      <RouteScrollManager />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/programs"
            element={
              <PageTransition>
                <ProgramsPage />
              </PageTransition>
            }
          />
          <Route
            path="/programs/grade-9"
            element={
              <PageTransition>
                <Grade9Page />
              </PageTransition>
            }
          />
          <Route
            path="/programs/grade-12"
            element={
              <PageTransition>
                <Grade12Page />
              </PageTransition>
            }
          />
          <Route
            path="/resources"
            element={
              <PageTransition>
                <ResourcesPage />
              </PageTransition>
            }
          />
          <Route
            path="/feedback"
            element={
              <PageTransition>
                <FeedbackPage />
              </PageTransition>
            }
          />
          <Route path="/results" element={<Navigate to="/feedback" replace />} />
          <Route path="/testimonials" element={<Navigate to="/feedback" replace />} />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
