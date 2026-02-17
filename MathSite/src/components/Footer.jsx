import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()
  const brandName = t('brand.name')

  return (
    <footer className="footer">
      <div className="footer-inner">
        <a className="footer-brand" href="#home">
          <span className="logo-mark">{'\u03A3'}</span>
          <span className="logo-text">{brandName}</span>
        </a>

        <div className="social-links" aria-label={t('footer.socialAria')}>
          <a href="#" aria-label={t('footer.social.facebookAria')}>
            Fb
          </a>
          <a href="#" aria-label={t('footer.social.instagramAria')}>
            Ig
          </a>
          <a href="#" aria-label={t('footer.social.linkedinAria')}>
            In
          </a>
        </div>

        <p>
          &copy; {new Date().getFullYear()} {brandName}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}

export default Footer
