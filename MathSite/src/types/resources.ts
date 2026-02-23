export type ResourceType = 'lesson' | 'guide' | 'worksheet' | 'exam_practice' | 'test'
export type Grade = 9 | 12
export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type ResourceMode = 'learn' | 'practice' | 'test'
export type DurationFilter = 'All' | [number, number]

export type CategoryId =
  | 'analysis'
  | 'equations-inequalities'
  | 'combinatorics-probability'
  | 'algebra-complex'
  | 'geometry'

export type TopicNode = {
  id: string
  name: string
  aliases?: string[]
}

export type SubcategoryNode = {
  id: string
  name: string
  topics: TopicNode[]
}

export type CategoryNode = {
  id: CategoryId
  name: string
  description?: string
  subcategories: SubcategoryNode[]
}

export type ResourceLinks = {
  view?: string
  pdf?: string
  download?: string
}

export type ResourceItem = {
  id: string
  title: string
  description: string
  grade: Grade
  mode: ResourceMode
  topicId: string
  categoryId: CategoryId
  subcategoryId: string
  type: ResourceType
  difficulty?: Difficulty
  durationMin?: number
  popularity?: number
  tags?: string[]
  createdAt: string
  links: ResourceLinks
}

export type ResourceFilters = {
  grade: 'All' | 9 | 12
  type: 'All' | ResourceType
  difficulty: 'All' | Difficulty
  duration: DurationFilter
}

export type SortOption = 'relevance' | 'newest' | 'popular' | 'duration'
