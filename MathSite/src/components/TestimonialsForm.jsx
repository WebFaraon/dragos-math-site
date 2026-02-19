import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const ratingOptions = [1, 2, 3, 4, 5]
const feedbackTypeOptions = [
  {
    value: 'lesson_experience',
    key: 'feedback.form.feedbackTypes.lessonExperience',
    defaultValue: 'Lesson Experience',
  },
  {
    value: 'materials_quality',
    key: 'feedback.form.feedbackTypes.materialsQuality',
    defaultValue: 'Materials Quality',
  },
  {
    value: 'exam_preparation',
    key: 'feedback.form.feedbackTypes.examPreparation',
    defaultValue: 'Exam Preparation',
  },
  {
    value: 'overall_experience',
    key: 'feedback.form.feedbackTypes.overallExperience',
    defaultValue: 'Overall Experience',
  },
]
const improvementOptions = [
  {
    value: 'confidence',
    key: 'feedback.form.improvements.confidence',
    defaultValue: 'Confidence',
  },
  {
    value: 'grades',
    key: 'feedback.form.improvements.grades',
    defaultValue: 'Grades',
  },
  {
    value: 'understanding',
    key: 'feedback.form.improvements.understanding',
    defaultValue: 'Understanding',
  },
  {
    value: 'speed_in_solving',
    key: 'feedback.form.improvements.speedInSolving',
    defaultValue: 'Speed in solving',
  },
  {
    value: 'exam_strategy',
    key: 'feedback.form.improvements.examStrategy',
    defaultValue: 'Exam strategy',
  },
]

const initialFormState = {
  name: '',
  role: '',
  feedbackType: 'overall_experience',
  rating: 0,
  improvements: [],
  consentPublic: false,
  message: '',
  botcheck: '',
}

function TestimonialsForm() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState(initialFormState)
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('idle')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleFeedbackTypeChange = (feedbackType) => {
    setFormData((prev) => ({ ...prev, feedbackType }))
  }

  const handleImprovementToggle = (value) => {
    setFormData((prev) => {
      const isSelected = prev.improvements.includes(value)
      const improvements = isSelected
        ? prev.improvements.filter((item) => item !== value)
        : [...prev.improvements, value]

      return { ...prev, improvements }
    })
  }

  const handleConsentToggle = (event) => {
    setFormData((prev) => ({ ...prev, consentPublic: event.target.checked }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formData.botcheck.trim()) {
      return
    }

    if (formData.rating < 1) {
      setStatusType('error')
      setStatus(t('feedback.form.ratingRequired', { defaultValue: 'Selecteaza un rating intre 1 si 5 stele.' }))
      return
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_TESTIMONIALS_KEY
    if (!accessKey) {
      console.warn('Missing VITE_WEB3FORMS_TESTIMONIALS_KEY. Feedback form submission is disabled.')
      setStatusType('error')
      setStatus(t('contact.form.status.error'))
      return
    }

    setStatusType('sending')
    setStatus(t('contact.form.status.sending'))

    const payload = {
      access_key: accessKey,
      name: formData.name,
      role: formData.role,
      feedback_type: formData.feedbackType,
      rating: formData.rating,
      improved_areas:
        formData.improvements.length > 0 ? formData.improvements.join(', ') : 'None selected',
      consent_public_display: formData.consentPublic ? 'Yes' : 'No',
      message: formData.message,
      subject: 'New Feedback \u2013 Mathorizon',
      from_name: 'Mathorizon Website',
      page: 'Feedback Page',
      botcheck: formData.botcheck,
      page_url: typeof window !== 'undefined' ? window.location.href : '',
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      let result = null
      try {
        result = await response.json()
      } catch {
        throw new Error('Invalid JSON response from Web3Forms.')
      }

      if (result?.success === true) {
        setStatusType('success')
        setStatus(t('feedback.form.success'))
        setFormData(initialFormState)
        return
      }

      throw new Error(result?.message || 'Web3Forms submission failed.')
    } catch (error) {
      console.error('Feedback form submission failed:', error)
      setStatusType('error')
      setStatus(t('contact.form.status.error'))
    }
  }

  useEffect(() => {
    if (!status || statusType === 'sending') return
    const timer = setTimeout(() => {
      setStatus('')
      setStatusType('idle')
    }, 4500)
    return () => clearTimeout(timer)
  }, [status, statusType])

  return (
    <form className="contact-form feedback-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="botcheck"
        value={formData.botcheck}
        onChange={handleChange}
        className="hp-field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input type="hidden" name="subject" value="New Feedback \u2013 Mathorizon" />
      <input type="hidden" name="from_name" value="Mathorizon Website" />
      <input type="hidden" name="page" value="Feedback Page" />

      <label htmlFor="feedback-name">{t('feedback.form.name')}</label>
      <input
        id="feedback-name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="feedback-role">{t('feedback.form.role')}</label>
      <select
        id="feedback-role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          {t('feedback.form.rolePlaceholder', { defaultValue: 'Alege rolul' })}
        </option>
        <option value="student">{t('feedback.form.roleStudent')}</option>
        <option value="parent">{t('feedback.form.roleParent')}</option>
      </select>

      <fieldset className="feedback-choice-group">
        <legend>{t('feedback.form.feedbackType', { defaultValue: 'Feedback Type' })}</legend>
        <div className="feedback-choice-grid" role="radiogroup" aria-label={t('feedback.form.feedbackType', { defaultValue: 'Feedback Type' })}>
          {feedbackTypeOptions.map((option) => {
            const isActive = formData.feedbackType === option.value
            return (
              <label
                key={option.value}
                className={`feedback-choice-chip${isActive ? ' active' : ''}`}
              >
                <input
                  type="radio"
                  name="feedbackType"
                  value={option.value}
                  checked={isActive}
                  onChange={() => handleFeedbackTypeChange(option.value)}
                />
                <span>{t(option.key, { defaultValue: option.defaultValue })}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="feedback-rating-group">
        <legend>{t('feedback.form.rating', { defaultValue: 'Rating' })}</legend>
        <div
          className="feedback-rating-stars"
          role="radiogroup"
          aria-label={t('feedback.form.ratingAria', { defaultValue: 'Alege ratingul intre 1 si 5 stele' })}
        >
          {ratingOptions.map((ratingOption) => {
            const isActive = ratingOption <= formData.rating

            return (
              <button
                key={ratingOption}
                type="button"
                className={`feedback-rating-star${isActive ? ' active' : ''}`}
                onClick={() => handleRatingChange(ratingOption)}
                aria-label={t('feedback.form.starValue', {
                  defaultValue: `${ratingOption} stele`,
                  count: ratingOption,
                })}
                aria-pressed={formData.rating === ratingOption}
              >
                {String.fromCharCode(9733)}
              </button>
            )
          })}
        </div>
        <p className="feedback-rating-value" aria-live="polite">
          {formData.rating > 0
            ? `${formData.rating}/5`
            : t('feedback.form.ratingHint', { defaultValue: 'Selecteaza intre 1 si 5 stele.' })}
        </p>
      </fieldset>

      <fieldset className="feedback-choice-group">
        <legend>{t('feedback.form.improvedMost', { defaultValue: 'What improved the most?' })}</legend>
        <div className="feedback-choice-grid" aria-label={t('feedback.form.improvedMost', { defaultValue: 'What improved the most?' })}>
          {improvementOptions.map((option) => {
            const isActive = formData.improvements.includes(option.value)
            return (
              <label
                key={option.value}
                className={`feedback-choice-chip feedback-choice-check${isActive ? ' active' : ''}`}
              >
                <input
                  type="checkbox"
                  name="improvements"
                  value={option.value}
                  checked={isActive}
                  onChange={() => handleImprovementToggle(option.value)}
                />
                <span>{t(option.key, { defaultValue: option.defaultValue })}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <label htmlFor="feedback-message">{t('feedback.form.message')}</label>
      <textarea
        id="feedback-message"
        name="message"
        rows="5"
        value={formData.message}
        onChange={handleChange}
        required
      />

      <label className="feedback-consent">
        <input
          type="checkbox"
          name="consentPublic"
          checked={formData.consentPublic}
          onChange={handleConsentToggle}
        />
        <span>
          {t('feedback.form.consentPublic', {
            defaultValue: 'I agree to display my feedback publicly (first name only)',
          })}
        </span>
      </label>

      <button
        type="submit"
        className="btn btn-primary contact-submit"
        disabled={statusType === 'sending'}
      >
        {statusType === 'sending'
          ? t('contact.form.sending')
          : t('feedback.form.submit')}
      </button>

      {status && (
        <p className={`form-status form-status-${statusType}`} aria-live="polite">
          {status}
        </p>
      )}
    </form>
  )
}

export default TestimonialsForm
