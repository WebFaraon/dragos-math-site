import type { BacTopicContent } from '../types/bacContent'
import {
  item1All,
  item2All,
  numereComplexeEcuatiiG1,
  logaritmi,
  numereComplexeDefinitii,
  numereComplexeOperatii,
  operatiiCuNumere,
  polinomRadacina,
  polinomRestulImpartirii,
  puteri,
  radicali,
} from './bac'

export const bacContent: BacTopicContent[] = [
  operatiiCuNumere,
  puteri,
  radicali,
  logaritmi,
  item1All,
  polinomRestulImpartirii,
  polinomRadacina,
  numereComplexeDefinitii,
  numereComplexeOperatii,
  numereComplexeEcuatiiG1,
  item2All,
]

export const bacContentByTopic = new Map(bacContent.map((entry) => [entry.topicId, entry]))
