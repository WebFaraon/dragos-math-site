import type { BacTopicContent, ContentBlock } from '../../types/bacContent'
import TextBlock from './blocks/TextBlock'
import ImageBlock from './blocks/ImageBlock'
import CalloutBlock from './blocks/CalloutBlock'
import FormulaBlock from './blocks/FormulaBlock'
import ExerciseBlock from './blocks/ExerciseBlock'
import ExerciseListBlock from './blocks/ExerciseListBlock'
import TrainingLevelsBlock from './blocks/TrainingLevelsBlock'
import { normalizeMojibake } from '../../utils/normalizeMojibake'

type ContentRendererProps = {
  content: BacTopicContent
}

type LessonSectionKind = 'definition' | 'properties' | 'examples' | 'notes' | 'practice'

type LessonSection = {
  id: string
  title: string
  kind: LessonSectionKind
  blocks: ContentBlock[]
}

type SectionMeta = {
  icon: string
  label: string
}

const sectionMetaMap: Record<LessonSectionKind, SectionMeta> = {
  definition: { icon: '📘', label: 'Definiții' },
  properties: { icon: '🧠', label: 'Proprietăți' },
  examples: { icon: '✏️', label: 'Exemple' },
  notes: { icon: '⚠️', label: 'Observații' },
  practice: { icon: '📌', label: 'Antrenament' },
}

const normalizeForMatch = (value: string) =>
  normalizeMojibake(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const includesAny = (source: string, words: string[]) => words.some((word) => source.includes(word))

function detectSectionKind(title: string): LessonSectionKind {
  const normalized = normalizeForMatch(title)

  if (includesAny(normalized, ['exerciti', 'antrenament'])) return 'practice'
  if (includesAny(normalized, ['propriet', 'regul', 'identit'])) return 'properties'
  if (includesAny(normalized, ['exempl', 'aplicat', 'rezolvat', 'calcul'])) return 'examples'
  if (includesAny(normalized, ['observ', 'important', 'atentie', 'domeniu', 'nota'])) return 'notes'
  return 'definition'
}

function buildLessonSections(blocks: ContentBlock[]): LessonSection[] {
  const sections: LessonSection[] = []
  let currentSection: LessonSection | null = null
  let fallbackIndex = 1

  const createFallbackSection = () => {
    const title = 'Introducere'
    return {
      id: `intro-${fallbackIndex++}`,
      title,
      kind: detectSectionKind(title),
      blocks: [],
    }
  }

  blocks.forEach((block) => {
    if (block.type === 'heading' && block.level === 2) {
      if (currentSection) sections.push(currentSection)

      const title = normalizeMojibake(block.text)
      currentSection = {
        id: block.id,
        title,
        kind: detectSectionKind(title),
        blocks: [],
      }
      return
    }

    if (!currentSection) currentSection = createFallbackSection()
    currentSection.blocks.push(block)
  })

  if (currentSection) sections.push(currentSection)
  return sections
}

function ContentRenderer({ content }: ContentRendererProps) {
  const normalizedTitle = normalizeMojibake(content.title)
  const normalizedSubtitle = content.subtitle ? normalizeMojibake(content.subtitle) : null
  const lessonSections = buildLessonSections(content.blocks)

  return (
    <div className="rv-content">
      <header className="rv-content-header">
        <p className="rv-content-eyebrow">LECȚIE & PRACTICĂ</p>
        <h1>{normalizedTitle}</h1>
        {normalizedSubtitle && <p className="rv-content-subtitle">{normalizedSubtitle}</p>}
      </header>
      <div className="rv-content-blocks">
        {lessonSections.map((section) => (
          <LessonSectionCard key={section.id} section={section} />
        ))}
      </div>
    </div>
  )
}

function LessonSectionCard({ section }: { section: LessonSection }) {
  const sectionMeta = sectionMetaMap[section.kind]

  return (
    <section className={`rv-lesson-card rv-lesson-card-${section.kind}`} aria-labelledby={`section-title-${section.id}`}>
      <header className="rv-lesson-card-header" id={section.id}>
        <span className="rv-lesson-card-icon" aria-hidden="true">
          {sectionMeta.icon}
        </span>
        <div className="rv-lesson-card-heading-wrap">
          <p className="rv-lesson-card-label">{sectionMeta.label}</p>
          <h2 id={`section-title-${section.id}`}>{section.title}</h2>
        </div>
      </header>
      <div className="rv-lesson-card-body">
        {section.blocks.map((block, index) => (
          <ContentBlockRenderer
            key={`${section.id}-${block.type}-${index}`}
            block={block}
            sectionKind={section.kind}
          />
        ))}
      </div>
    </section>
  )
}

function ContentBlockRenderer({ block, sectionKind }: { block: ContentBlock; sectionKind: LessonSectionKind }) {
  switch (block.type) {
    case 'heading': {
      const Tag = block.level === 2 ? 'h2' : 'h3'
      return (
        <div className={`rv-heading ${block.level === 3 ? 'rv-subheading' : ''}`} id={block.id}>
          <Tag>{normalizeMojibake(block.text)}</Tag>
        </div>
      )
    }
    case 'text':
      return <TextBlock text={normalizeMojibake(block.text)} />
    case 'callout':
      return (
        <CalloutBlock
          variant={block.variant}
          title={block.title ? normalizeMojibake(block.title) : undefined}
          text={normalizeMojibake(block.text)}
        />
      )
    case 'image':
      return <ImageBlock src={block.src} alt={block.alt} caption={block.caption} />
    case 'formula': {
      const highlight = sectionKind === 'properties' || Boolean(block.description)
      return (
        <div className={`rv-key-formula${highlight ? ' highlighted' : ''}`}>
          <FormulaBlock latex={block.latex} inline={block.inline} description={block.description} />
        </div>
      )
    }
    case 'exercise_list':
      return <ExerciseListBlock levels={block.levels} />
    case 'exercise_mcq':
    case 'exercise_short':
      return <ExerciseBlock block={block} />
    case 'training_levels':
      return <TrainingLevelsBlock />
    case 'worksheet':
      return (
        <div className="rv-worksheet">
          <div>
            <h4>{normalizeMojibake(block.title)}</h4>
            <p>Descarcă fișa PDF pentru exercițiu suplimentar.</p>
          </div>
          <a className="btn btn-secondary" href={block.pdfUrl} target="_blank" rel="noreferrer">
            Deschide PDF
          </a>
        </div>
      )
    default:
      return null
  }
}

export default ContentRenderer
