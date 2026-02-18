import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function PlaceholderPage({ eyebrow, title, copy }) {
  return (
    <div className="app">
      <Navbar />
      <main className="section page-main placeholder-main">
        <div className="section-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="section-title">{title}</h1>
          <p className="hero-subtitle">{copy}</p>
        </div>

        <p className="page-back-link">
          <Link className="btn btn-secondary" to="/">
            Back to Home
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default PlaceholderPage
