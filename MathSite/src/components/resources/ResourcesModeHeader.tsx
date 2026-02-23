import type { ResourceMode } from '../../types/resources'

type ResourcesModeHeaderProps = {
  mode: ResourceMode
}

const copyMap: Record<ResourceMode, { title: string; description: string }> = {
  learn: {
    title: 'Learn with clarity',
    description: 'Pick a topic and follow explanations with examples you can review anytime.',
  },
  practice: {
    title: 'Practice with guidance',
    description: 'Sharpen skills using guided drills with feedback and repetition.',
  },
  test: {
    title: 'Test your readiness',
    description: 'Run timed sets with scoring to simulate real exam pressure.',
  },
}

function ResourcesModeHeader({ mode }: ResourcesModeHeaderProps) {
  const copy = copyMap[mode]
  return (
    <div className="resources-mode-header">
      <div>
        <h2>{copy.title}</h2>
        <p>{copy.description}</p>
      </div>
    </div>
  )
}

export default ResourcesModeHeader
