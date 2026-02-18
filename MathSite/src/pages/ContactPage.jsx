import { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'

function ContactPage() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    revealElements.forEach((element) => revealObserver.observe(element))

    return () => revealObserver.disconnect()
  }, [])

  return (
    <div className="app">
      <Navbar />
      <main className="page-main contact-page-main">
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default ContactPage
