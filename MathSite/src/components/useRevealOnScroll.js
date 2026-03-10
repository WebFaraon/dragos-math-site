import { useEffect } from 'react'

function useRevealOnScroll(deps = []) {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach((element) => element.classList.add('in-view'))
  }, deps)
}

export default useRevealOnScroll
