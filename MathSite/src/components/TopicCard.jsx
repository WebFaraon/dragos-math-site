function TopicCard({ topic, isExpanded, onToggle }) {
  const basePath = `/pdfs/grade-9/${topic.slug}/`
  const hasPdfs = topic.pdfs.length > 0
  const downloadAllHref =
    topic.downloadAllPath || (topic.pdfs.length === 1 ? topic.pdfs[0].path : null)

  return (
    <article className="grade9-topic-card">
      <div className="grade9-topic-header">
        <span className="grade9-icon" aria-hidden="true">
          {topic.icon}
        </span>
        <h3>{topic.title}</h3>
      </div>

      <p className="grade9-topic-description">{topic.description}</p>

      <div className="grade9-topic-actions">
        <button
          type="button"
          className="btn btn-primary grade9-topic-btn"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={`topic-pdfs-${topic.slug}`}
        >
          View PDFs
        </button>

        {downloadAllHref ? (
          <a className="btn btn-secondary grade9-topic-btn" href={downloadAllHref} download>
            Download All
          </a>
        ) : (
          <button type="button" className="btn btn-secondary grade9-topic-btn" disabled>
            Download All
          </button>
        )}
      </div>

      {isExpanded && (
        <div id={`topic-pdfs-${topic.slug}`} className="grade9-topic-pdfs">
          {hasPdfs ? (
            <ul className="grade9-topic-pdf-list">
              {topic.pdfs.map((pdf) => (
                <li key={pdf.path}>
                  <a href={pdf.path} target="_blank" rel="noreferrer">
                    {pdf.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="grade9-topic-empty">
              PDF links for this topic will be added in `{basePath}`.
            </p>
          )}
        </div>
      )}
    </article>
  )
}

export default TopicCard
