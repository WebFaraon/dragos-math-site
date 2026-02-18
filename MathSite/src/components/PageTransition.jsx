import { motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

function PageTransition({ children }) {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 10, filter: 'blur(6px)' }

  const animate = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: 'blur(0px)' }

  const exit = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: -10, filter: 'blur(6px)' }

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
