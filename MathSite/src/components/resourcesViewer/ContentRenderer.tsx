import type { BacTopicContent, ContentBlock } from '../../types/bacContent'
import TextBlock from './blocks/TextBlock'
import ImageBlock from './blocks/ImageBlock'
import CalloutBlock from './blocks/CalloutBlock'
import FormulaBlock from './blocks/FormulaBlock'
import ExerciseBlock from './blocks/ExerciseBlock'
import ExerciseListBlock from './blocks/ExerciseListBlock'
import TrainingLevelsBlock from './blocks/TrainingLevelsBlock'

type ContentRendererProps = {
  content: BacTopicContent
}

function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div className="rv-content">
      <header className="rv-content-header">
        <p className="rv-content-eyebrow">LECȚIE & PRACTICĂ</p>
        <h1>{content.title}</h1>
        {content.subtitle && <p className="rv-content-subtitle">{content.subtitle}</p>}
      </header>
      <div className="rv-content-blocks">
        {content.blocks.map((block, index) => (
          <ContentBlockRenderer key={`${block.type}-${index}`} block={block} />
        ))}
      </div>
    </div>
  )
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'heading': {
      const Tag = block.level === 2 ? 'h2' : 'h3'
      return (
        <div className="rv-heading" id={block.id}>
          <Tag>{block.text}</Tag>
        </div>
      )
    }
    case 'text':
      return <TextBlock text={block.text} />
    case 'callout':
      return <CalloutBlock variant={block.variant} title={block.title} text={block.text} />
    case 'image':
      return <ImageBlock src={block.src} alt={block.alt} caption={block.caption} />
    case 'formula':
      return <FormulaBlock latex={block.latex} inline={block.inline} description={block.description} />
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
            <h4>{block.title}</h4>
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
