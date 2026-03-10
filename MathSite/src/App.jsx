import { useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ProgramsPage from './pages/ProgramsPage.jsx'
import Grade9Page from './pages/Grade9Page.jsx'
import Grade12Page from './pages/Grade12Page.jsx'
import ContactPage from './pages/ContactPage.jsx'
import ResourcesPage from './pages/ResourcesPage.tsx'
import FeedbackPage from './pages/Feedback.jsx'

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

function App() {
  const location = useLocation()

  return (
    <>
      <RouteScrollManager />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/grade-9" element={<Grade9Page />} />
        <Route path="/programs/grade-12" element={<Grade12Page />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/results" element={<Navigate to="/feedback" replace />} />
        <Route path="/testimonials" element={<Navigate to="/feedback" replace />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default App
