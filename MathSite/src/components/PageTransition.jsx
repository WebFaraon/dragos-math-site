import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

function PageTransition({ children }) {
  const location = useLocation()

  const initial = { opacity: 0 }
  const animate = { opacity: 1 }
  const exit = { opacity: 0 }

  return (
    <motion.main
      key={location.pathname}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      style={{ display: 'block', width: '100%' }}
    >
      {children}
    </motion.main>
  )
}

export default PageTransition
