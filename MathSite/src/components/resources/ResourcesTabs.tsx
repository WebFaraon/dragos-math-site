export type ResourcesTab = 'library' | 'practice'

type ResourcesTabsProps = {
  value: ResourcesTab
  onChange: (value: ResourcesTab) => void
}

function ResourcesTabs({ value, onChange }: ResourcesTabsProps) {
  return (
    <div className="resources-tabs reveal" role="tablist" aria-label="Resource sections">
      <button
        type="button"
        role="tab"
        aria-selected={value === 'library'}
        className={`resources-tab${value === 'library' ? ' active' : ''}`}
        onClick={() => onChange('library')}
      >
        Library
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === 'practice'}
        className={`resources-tab${value === 'practice' ? ' active' : ''}`}
        onClick={() => onChange('practice')}
      >
        Practice
      </button>
    </div>
  )
}

export default ResourcesTabs
