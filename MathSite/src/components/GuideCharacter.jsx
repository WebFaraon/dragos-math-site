function GuideCharacter({ symbol = 'pi', className = '' }) {
  return (
    <div className={`guide-character ${className}`.trim()} aria-hidden="true">
      <div className="guide-shadow" />
      <div className="guide-figure">
        <span className="guide-head" />
        <span className="guide-body" />
        <span className="guide-arm guide-arm-left" />
        <span className="guide-arm guide-arm-right" />
      </div>
      <span className="guide-token">{symbol}</span>
    </div>
  )
}

export default GuideCharacter
