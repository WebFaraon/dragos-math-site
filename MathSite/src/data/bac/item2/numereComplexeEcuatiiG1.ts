import type { BacTopicContent } from '../../types/bacContent'

export const numereComplexeEcuatiiG1: BacTopicContent = {
  topicId: 'numere-complexe-ecuatii-g1',
  title: 'Numere complexe: Ecuații de gradul 1',
  subtitle: 'Rezolvarea ecuațiilor liniare în C prin separarea părților sau izolarea directă a necunoscutei.',
  blocks: [
    { type: 'heading', id: 'ecuatii-nedefinite', level: 2, text: '1. Ecuații cu z = x + yi' },
    {
      type: 'text',
      text: 'Dacă necunoscuta este scrisă z=x+yi, separăm partea reală și partea imaginară și obținem un sistem de două ecuații.',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Exemplu rezolvat',
      text: 'Determinați z=x+yi, dacă x+2-yi=8+4i.',
    },
    {
      type: 'formula',
      latex: '\\begin{cases}x+2=8\\\\-y=4\\end{cases}\\Rightarrow\\begin{cases}x=6\\\\y=-4\\end{cases}',
    },
    {
      type: 'formula',
      latex: 'z=6-4i',
      description: 'Rezultatul final.',
    },

    { type: 'heading', id: 'ecuatii-definite', level: 2, text: '2. Ecuații cu z definit direct' },
    {
      type: 'text',
      text: 'Când z apare direct într-o ecuație liniară, îl izolăm ca la o ecuație obișnuită, apoi aducem rezultatul în forma a+bi.',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Exemplu rezolvat',
      text: 'Rezolvați (1+3i)z=10+10i.',
    },
    {
      type: 'formula',
      latex: 'z=\\frac{10+10i}{1+3i}=\\frac{(10+10i)(1-3i)}{(1+3i)(1-3i)}',
    },
    {
      type: 'formula',
      latex: 'z=\\frac{10-30i+10i-30i^2}{1-9i^2}=\\frac{40-20i}{10}=4-2i',
    },
    {
      type: 'formula',
      latex: 'z=4-2i',
      description: 'Soluția ecuației.',
    },

    { type: 'heading', id: 'exercitii-antrenament', level: 2, text: 'Exerciții de antrenament' },
    {
      type: 'exercise_list',
      levels: [
        {
          id: 'cx-eq-usor',
          title: 'Nivel UȘOR',
          accent: 'easy',
          items: [
            {
              id: 'cx-eq-usor-1',
              label: '1',
              prompt: 'Determinați z=a+bi:',
              latex: 'a+1+2bi=6-2i',
              answer: 'a=5,\\ b=-1\\Rightarrow z=5-i',
            },
            {
              id: 'cx-eq-usor-2',
              label: '2',
              prompt: 'Determinați z=a+bi:',
              latex: 'a+5-2i=9+4bi',
              answer: 'a=4,\\ b=-\\frac{1}{2}\\Rightarrow z=4-\\frac{1}{2}i',
            },
            {
              id: 'cx-eq-usor-3',
              label: '3',
              prompt: 'Determinați z=a+bi:',
              latex: '-1+2a+6i=3+bi',
              answer: 'a=2,\\ b=6\\Rightarrow z=2+6i',
            },
            {
              id: 'cx-eq-usor-4',
              label: '4',
              prompt: 'Calculați z:',
              latex: '(1+3i)z=2-i',
              answer: 'z=-\\frac{1}{10}-\\frac{7}{10}i',
            },
            {
              id: 'cx-eq-usor-5',
              label: '5',
              prompt: 'Calculați z:',
              latex: '3(z+5i)=4',
              answer: 'z=\\frac{4}{3}-5i',
            },
          ],
        },
        {
          id: 'cx-eq-mediu',
          title: 'Nivel MEDIU',
          accent: 'medium',
          items: [
            {
              id: 'cx-eq-mediu-1',
              label: '1',
              prompt: 'Calculați z:',
              latex: '(5-4i)z=(3-i)(2+i)',
              answer: 'z=\\frac{14}{41}+\\frac{9}{41}i',
            },
            {
              id: 'cx-eq-mediu-2',
              label: '2',
              prompt: 'Calculați z:',
              latex: 'z(5i-2)=2i+1',
              answer: 'z=\\frac{8}{29}-\\frac{9}{29}i',
            },
            {
              id: 'cx-eq-mediu-3',
              label: '3',
              prompt: 'Calculați z:',
              latex: '4(5i-2)-z=5i+2',
              answer: 'z=-10+15i',
            },
            {
              id: 'cx-eq-mediu-4',
              label: '4',
              prompt: 'Calculați z:',
              latex: 'z(1-i)^2=3i',
              answer: 'z=-\\frac{3}{2}-\\frac{3}{2}i',
            },
            {
              id: 'cx-eq-mediu-5',
              label: '5',
              prompt: 'Determinați z=x+yi:',
              latex: '6-x-2(3i+8)=yi',
              answer: 'x=-10,\\ y=-6\\Rightarrow z=-10-6i',
            },
          ],
        },
        {
          id: 'cx-eq-dificil',
          title: 'Nivel DIFICIL',
          accent: 'hard',
          items: [
            {
              id: 'cx-eq-dificil-1',
              label: '1',
              prompt: 'Determinați z=x+yi:',
              latex: '9x-10yi=(3+i)(2-i)',
              answer: 'x=\\frac{7}{9},\\ y=\\frac{1}{10}\\Rightarrow z=\\frac{7}{9}+\\frac{1}{10}i',
            },
            {
              id: 'cx-eq-dificil-2',
              label: '2',
              prompt: 'Determinați z=x+yi:',
              latex: 'x+3-2yi=8(2i-5)',
              answer: 'x=-43,\\ y=-8\\Rightarrow z=-43-8i',
            },
            {
              id: 'cx-eq-dificil-3',
              label: '3',
              prompt: 'Determinați z=a+bi:',
              latex: '(a+bi)(1+i)=2+i',
              answer: 'a=\\frac{3}{2},\\ b=-\\frac{1}{2}\\Rightarrow z=\\frac{3}{2}-\\frac{1}{2}i',
            },
            {
              id: 'cx-eq-dificil-4',
              label: '4',
              prompt: 'Determinați z=a+bi:',
              latex: '(a+bi)(b-i)=1-i',
              answer: 'a=0,\\ b=-1\\Rightarrow z=-i',
            },
            {
              id: 'cx-eq-dificil-5',
              label: '5',
              prompt: 'Calculați z:',
              latex: '(1-2i)z=7+i',
              answer: 'z=1+3i',
            },
          ],
        },
      ],
    },
  ],
}
