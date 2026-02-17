import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const normalizeLanguage = (languageCode) => {
  const normalized = languageCode?.toLowerCase() || ''

  if (normalized.startsWith('ro')) return 'ro'
  if (normalized.startsWith('en')) return 'en'
  if (normalized.startsWith('ru')) return 'ru'

  return 'ro'
}

function LanguageDropdown() {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)
  const itemRefs = useRef([])

  const currentLanguage = normalizeLanguage(i18n.resolvedLanguage || i18n.language)

  const options = useMemo(
    () => [
      {
        code: 'ro',
        flagCode: 'ro',
        short: t('language.options.ro.short'),
        name: t('language.options.ro.name'),
      },
      {
        code: 'en',
        flagCode: 'gb',
        short: t('language.options.en.short'),
        name: t('language.options.en.name'),
      },
      {
        code: 'ru',
        flagCode: 'ru',
        short: t('language.options.ru.short'),
        name: t('language.options.ru.name'),
      },
    ],
    [t],
  )

  const currentOption = options.find((option) => option.code === currentLanguage) || options[0]

  useEffect(() => {
    const onPointerDown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const onEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    document.addEventListener('keydown', onEscape)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  const handleSelect = async (languageCode) => {
    await i18n.changeLanguage(languageCode)
    localStorage.setItem('lang', languageCode)
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  const focusFirstItem = () => {
    const firstItem = itemRefs.current[0]
    if (firstItem) firstItem.focus()
  }

  const handleTriggerKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsOpen((prev) => !prev)
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIsOpen(true)
      requestAnimationFrame(focusFirstItem)
    }
  }

  return (
    <div className="lang-dropdown" ref={dropdownRef}>
      <button
        ref={triggerRef}
        className={`lang-trigger ${isOpen ? 'open' : ''}`}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
        aria-label={t('language.ariaLabel')}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span className="lang-trigger-label">
          <span className={`lang-trigger-flag lang-flag-${currentOption.flagCode}`} aria-hidden="true" />{' '}
          {currentOption.short}
        </span>
        <span className="lang-chevron" aria-hidden="true">
          v
        </span>
      </button>

      <div className={`lang-menu ${isOpen ? 'open' : ''}`} role="menu" aria-label={t('language.menuAria')}>
        {options.map((option, index) => (
          <button
            key={option.code}
            ref={(element) => {
              itemRefs.current[index] = element
            }}
            type="button"
            role="menuitem"
            className={`lang-option ${currentLanguage === option.code ? 'active' : ''}`}
            onClick={() => handleSelect(option.code)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setIsOpen(false)
                triggerRef.current?.focus()
              }
            }}
          >
            <span className={`lang-option-flag lang-flag-${option.flagCode}`} aria-hidden="true" />
            <span className="lang-option-short">{option.short}</span>
            <span className="lang-option-name">{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageDropdown
