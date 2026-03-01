type TextBlockProps = {
  text: string
}

function TextBlock({ text }: TextBlockProps) {
  return <p className="rv-text">{text}</p>
}

export default TextBlock
