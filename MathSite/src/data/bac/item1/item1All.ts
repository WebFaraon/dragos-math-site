import type { BacTopicContent } from '../../types/bacContent'

export const item1All: BacTopicContent = {
  topicId: 'item1-all',
  title: 'Item 1 - toate tipurile de exerciții',
  subtitle: 'Exersează pe niveluri de dificultate, într-un format rapid și clar.',
  blocks: [
    { type: 'heading', id: 'antrenament-bac', level: 2, text: 'Antrenament BAC' },
    {
      type: 'text',
      text: 'Schimbă nivelul de dificultate și lucrează progresiv, de la exerciții de bază la variante mai dificile.',
    },
    { type: 'training_levels' },
  ],
}
