export type BacNavItem = {
  itemId: string
  title: string
  topics: { id: string; title: string }[]
}

export type ContentBlock =
  | { type: 'heading'; id: string; level: 2 | 3; text: string }
  | { type: 'text'; text: string }
  | { type: 'callout'; variant: 'rule' | 'note' | 'warning'; title?: string; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'formula'; latex: string; inline?: boolean; description?: string }
  | {
      type: 'exercise_list'
      levels: {
        id: string
        title: string
        accent: 'easy' | 'medium' | 'hard'
        items: { id: string; label: string; latex: string; answer: string }[]
      }[]
    }
  | {
      type: 'exercise_mcq'
      question: string
      options: string[]
      answerIndex: number
      explanation?: string
      steps?: string[]
    }
  | {
      type: 'exercise_short'
      question: string
      answer: string
      hint?: string
      explanation?: string
      steps?: string[]
    }
  | { type: 'training_levels' }
  | { type: 'worksheet'; title: string; pdfUrl: string }

export type BacTopicContent = {
  topicId: string
  title: string
  subtitle?: string
  blocks: ContentBlock[]
}
