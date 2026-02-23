import type { ResourceItem, ResourceMode, ResourceType, SortOption, ResourceFilters } from '../types/resources'

const typeOrder: Record<ResourceType, number> = {
  lesson: 1,
  guide: 2,
  worksheet: 3,
  exam_practice: 4,
  test: 5,
}

export function getModeItems(items: ResourceItem[], mode: ResourceMode) {
  if (mode === 'learn') {
    return items.filter((item) => item.mode === 'learn')
  }

  if (mode === 'practice') {
    return items.filter((item) => item.mode === 'practice')
  }

  return items.filter((item) => item.mode === 'test')
}

export function applyFilters(items: ResourceItem[], filters: ResourceFilters) {
  return items.filter((item) => {
    if (filters.grade !== 'All' && item.grade !== filters.grade) return false
    if (filters.type !== 'All' && item.type !== filters.type) return false
    if (filters.difficulty !== 'All' && item.difficulty !== filters.difficulty) return false

    if (filters.duration !== 'All') {
      if (!item.durationMin) return false
      const [min, max] = filters.duration
      if (item.durationMin < min || item.durationMin > max) return false
    }

    return true
  })
}

export function applySearch(items: ResourceItem[], query: string) {
  if (!query.trim()) return items
  const term = query.trim().toLowerCase()

  return items.filter((item) => {
    if (item.title.toLowerCase().includes(term)) return true
    if (item.description.toLowerCase().includes(term)) return true
    if (item.tags?.some((tag) => tag.toLowerCase().includes(term))) return true
    return false
  })
}

export function applySort(items: ResourceItem[], sort: SortOption, query: string) {
  const list = [...items]

  if (sort === 'relevance' && query.trim()) {
    const term = query.trim().toLowerCase()
    return list.sort((a, b) => scoreResource(b, term) - scoreResource(a, term))
  }

  if (sort === 'newest') {
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  if (sort === 'popular') {
    return list.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
  }

  if (sort === 'duration') {
    return list.sort((a, b) => (a.durationMin ?? 999) - (b.durationMin ?? 999))
  }

  return list.sort((a, b) => typeOrder[a.type] - typeOrder[b.type])
}

function scoreResource(item: ResourceItem, term: string) {
  let score = 0
  if (item.title.toLowerCase().includes(term)) score += 6
  if (item.description.toLowerCase().includes(term)) score += 3
  if (item.tags?.some((tag) => tag.toLowerCase().includes(term))) score += 2
  return score
}

export function mapActiveFilters(filters: ResourceFilters) {
  const active: { key: keyof ResourceFilters; label: string }[] = []

  if (filters.grade !== 'All') active.push({ key: 'grade', label: `Grade ${filters.grade}` })
  if (filters.type !== 'All') active.push({ key: 'type', label: labelForType(filters.type) })
  if (filters.difficulty !== 'All') active.push({ key: 'difficulty', label: filters.difficulty })
  if (filters.duration !== 'All') {
    active.push({ key: 'duration', label: `${filters.duration[0]}-${filters.duration[1]} min` })
  }

  return active
}

function labelForType(type: ResourceType) {
  if (type === 'exam_practice') return 'Exam Practice'
  return type.charAt(0).toUpperCase() + type.slice(1)
}
