import type { BacTopicContent } from '../types/bacContent'
import { item1All, logaritmi, operatiiCuNumere, puteri, radicali } from './bac'

export const bacContent: BacTopicContent[] = [operatiiCuNumere, puteri, radicali, logaritmi, item1All]

export const bacContentByTopic = new Map(bacContent.map((entry) => [entry.topicId, entry]))
