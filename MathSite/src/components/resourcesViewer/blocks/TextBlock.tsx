import InlineLatexText from './InlineLatexText'

type TextBlockProps = {
  text: string
}

function TextBlock({ text }: TextBlockProps) {
  return (
    <p className="rv-text">
      <InlineLatexText text={text} />
    </p>
  )
}

export default TextBlock
