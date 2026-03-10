import InlineLatexText from './InlineLatexText'

type CalloutBlockProps = {
  variant: 'rule' | 'note' | 'warning'
  title?: string
  text: string
}

function CalloutBlock({ variant, title, text }: CalloutBlockProps) {
  return (
    <div className={`rv-callout rv-callout-${variant}`}>
      {title && <h4>{title}</h4>}
      <p>
        <InlineLatexText text={text} />
      </p>
    </div>
  )
}

export default CalloutBlock
