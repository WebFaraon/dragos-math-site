import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

type FormulaBlockProps = {
  latex: string
  inline?: boolean
  description?: string
}

function FormulaBlock({ latex, inline, description }: FormulaBlockProps) {
  return (
    <div className={`rv-formula${inline ? ' inline' : ''}${description ? ' has-desc' : ''}`}>
      {description && <p className="rv-formula-desc">{description}</p>}
      {inline ? <InlineMath math={latex} /> : <BlockMath math={latex} />}
    </div>
  )
}

export default FormulaBlock
