import { useEffect } from 'react'

function useRevealOnScroll() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')
    if (!revealElements.length) return

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
}

export default useRevealOnScroll
