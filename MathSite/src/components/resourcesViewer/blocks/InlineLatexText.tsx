import { InlineMath } from 'react-katex'

type InlineLatexTextProps = {
  text: string
}

const INLINE_LATEX_PATTERN = /(\$[^$]+\$)/g

function InlineLatexText({ text }: InlineLatexTextProps) {
  return (
    <>
      {text.split(INLINE_LATEX_PATTERN).map((part, index) => {
        if (!part) return null
        if (part.startsWith('$') && part.endsWith('$')) {
          return <InlineMath key={`math-${index}`} math={part.slice(1, -1)} />
        }
        return <span key={`text-${index}`}>{part}</span>
      })}
    </>
  )
}

export default InlineLatexText
