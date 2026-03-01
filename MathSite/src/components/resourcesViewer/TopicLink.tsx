type TopicLinkProps = {
  title: string
  active?: boolean
  onClick: () => void
}

function TopicLink({ title, active, onClick }: TopicLinkProps) {
  return (
    <button
      type="button"
      className={`rv-topic-link${active ? ' active' : ''}`}
      onClick={onClick}
    >
      <span className="rv-topic-dot" aria-hidden="true" />
      <span>{title}</span>
    </button>
  )
}

export default TopicLink
