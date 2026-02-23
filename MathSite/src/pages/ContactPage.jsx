import Navbar from '../components/Navbar.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'
import useRevealOnScroll from '../components/useRevealOnScroll.js'

function ContactPage() {
  useRevealOnScroll()

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
