import type { BacTopicContent } from '../../types/bacContent'

export const polinomRadacina: BacTopicContent = {
  topicId: 'polinom-radacina',
  title: 'Polinom: Rădăcina',
  subtitle: 'Cum recunoști o rădăcină, cum verifici condiția P(a)=0 și ce înseamnă rădăcină dublă.',
  blocks: [
    { type: 'heading', id: 'radacina-polinomului', level: 2, text: '1. Rădăcina polinomului' },
    {
      type: 'text',
      text: 'Rădăcinile unui polinom se obțin rezolvând ecuația P(x)=0. Dacă x=a este rădăcină, atunci valoarea polinomului în acel punct este zero.',
    },
    {
      type: 'callout',
      variant: 'rule',
      title: 'Condiția de bază',
      text: 'x=a este rădăcină a lui P(x) dacă și numai dacă P(a)=0.',
    },
    {
      type: 'formula',
      latex: 'x=a\\text{ este rădăcină }\\Longleftrightarrow P(a)=0',
    },
    {
      type: 'text',
      text: 'Exemple rapide de interpretare:',
    },
    {
      type: 'formula',
      latex: 'x=3\\text{ rădăcină }\\Rightarrow P(3)=0',
    },
    {
      type: 'formula',
      latex: 'x=-27\\text{ rădăcină }\\Rightarrow P(-27)=0',
    },

    { type: 'heading', id: 'exemplu-rezolvat', level: 2, text: '2. Exemplu rezolvat' },
    {
      type: 'formula',
      latex: 'P(x)=x^4+ax^3-x-1,\\quad a\\in\\mathbb{Z},\\quad x=1\\text{ rădăcină}',
      description: 'Determinați valoarea lui a.',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Rezolvare',
      text: 'Pentru că x=1 este rădăcină, înlocuim în polinom și impunem P(1)=0.',
    },
    { type: 'formula', latex: 'P(1)=0' },
    { type: 'formula', latex: '1^4+a\\cdot1^3-1-1=0' },
    { type: 'formula', latex: '1+a-1-1=0' },
    { type: 'formula', latex: 'a-1=0' },
    { type: 'formula', latex: 'a=1', description: 'Răspuns final.' },

    { type: 'heading', id: 'radacina-dubla', level: 2, text: '3. Rădăcina dublă a polinomului' },
    {
      type: 'callout',
      variant: 'rule',
      text: "Rădăcina x=a se numește rădăcină dublă dacă satisface simultan P(a)=0 și P'(a)=0.",
    },
    {
      type: 'formula',
      latex: '\\text{rădăcină dublă în }a\\Longleftrightarrow\\begin{cases}P(a)=0\\\\P\'(a)=0\\end{cases}',
    },
    {
      type: 'text',
      text: 'În practică, poți verifica și prin împărțire succesivă la x-a: dacă restul este zero de două ori, ai o rădăcină de multiplicitate cel puțin 2.',
    },

    { type: 'heading', id: 'exercitii-antrenament', level: 2, text: 'Exerciții de antrenament' },
    {
      type: 'exercise_list',
      levels: [
        {
          id: 'nivel-usor',
          title: 'Nivel UȘOR',
          accent: 'easy',
          items: [
            {
              id: 'rad-usor-1',
              label: '1',
              prompt: 'Aflați parametrul:',
              latex: 'x=1\\text{ rădăcină pentru }P(x)=x^4+ax^3-x-1',
              answer: 'a=1',
            },
            {
              id: 'rad-usor-2',
              label: '2',
              prompt: 'Verificați rădăcina:',
              latex: 'P(x)=x^2-5x+6,\\quad x=2',
              answer: 'P(2)=0\\Rightarrow x=2\\text{ este rădăcină}',
            },
            {
              id: 'rad-usor-3',
              label: '3',
              prompt: 'Verificați rădăcina:',
              latex: 'P(x)=x^3-4x,\\quad x=-2',
              answer: 'P(-2)=0\\Rightarrow x=-2\\text{ este rădăcină}',
            },
            {
              id: 'rad-usor-4',
              label: '4',
              prompt: 'Determinați m:',
              latex: 'x=2\\text{ rădăcină pentru }P(x)=x^3+mx^2-5x+6',
              answer: 'm=0',
            },
            {
              id: 'rad-usor-5',
              label: '5',
              prompt: 'Aflați parametrul:',
              latex: 'x=-1\\text{ rădăcină pentru }P(x)=x^2+ax+3',
              answer: 'a=4',
            },
          ],
        },
        {
          id: 'nivel-mediu',
          title: 'Nivel MEDIU',
          accent: 'medium',
          items: [
            {
              id: 'rad-mediu-1',
              label: '1',
              prompt: 'Determinați m:',
              latex: 'x=-2\\text{ rădăcină pentru }P(x)=-x^4+2mx^3+(m^2+3)x^2-5mx+6',
              answer: 'm\\in\\{1,\\,3\\}',
            },
            {
              id: 'rad-mediu-2',
              label: '2',
              prompt: 'Determinați a:',
              latex: 'x=\\sqrt{3}\\text{ rădăcină pentru }P(x)=x^3-x^2-ax+3',
              answer: 'a=2\\sqrt{3}-1',
            },
            {
              id: 'rad-mediu-3',
              label: '3',
              prompt: 'Determinați m:',
              latex: 'x=3\\text{ rădăcină pentru }P(x)=2x^3-mx^2+x-6',
              answer: 'm=5',
            },
            {
              id: 'rad-mediu-4',
              label: '4',
              prompt: 'Determinați a:',
              latex: 'x=\\frac{1}{2}\\text{ rădăcină pentru }P(x)=4x^3-2x^2+ax-1',
              answer: 'a=4',
            },
            {
              id: 'rad-mediu-5',
              label: '5',
              prompt: 'Determinați b:',
              latex: 'x=-3\\text{ rădăcină pentru }P(x)=x^3+bx^2-7x+21',
              answer: 'b=2',
            },
          ],
        },
        {
          id: 'nivel-dificil',
          title: 'Nivel DIFICIL',
          accent: 'hard',
          items: [
            {
              id: 'rad-dificil-1',
              label: '1',
              prompt: 'Determinați m:',
              latex: 'x=1\\text{ rădăcină dublă pentru }P(x)=x^3+mx^2-5x+3',
              answer: 'm=2',
            },
            {
              id: 'rad-dificil-2',
              label: '2',
              prompt: 'Determinați a și b:',
              latex: 'x=2\\text{ rădăcină dublă pentru }P(x)=x^3+ax^2+bx+4',
              answer: 'a=-4,\\ b=0',
            },
            {
              id: 'rad-dificil-3',
              label: '3',
              prompt: 'Determinați m:',
              latex: 'x=-1\\text{ rădăcină dublă pentru }P(x)=x^3+mx^2+(m-2)x+2',
              answer: 'm=1',
            },
            {
              id: 'rad-dificil-4',
              label: '4',
              prompt: 'Determinați a:',
              latex: 'x=1\\text{ și }x=2\\text{ rădăcini pentru }P(x)=x^3-3x^2+ax+2',
              answer: 'a=-2',
            },
            {
              id: 'rad-dificil-5',
              label: '5',
              prompt: 'Determinați m:',
              latex: 'x=2\\text{ rădăcină dublă pentru }P(x)=x^4-6x^3+mx^2+8x-8',
              answer: 'm=12',
            },
          ],
        },
      ],
    },
  ],
}
