import type { BacTopicContent } from '../../types/bacContent'

export const polinomRestulImpartirii: BacTopicContent = {
  topicId: 'polinom-restul-impartirii',
  title: 'Polinom: Restul împărțirii',
  subtitle: 'Cum afli rapid restul împărțirii la un binom de forma x - a sau x + a.',
  blocks: [
    { type: 'heading', id: 'teorema-bezout', level: 2, text: '1. Teorema lui Bézout' },
    {
      type: 'text',
      text: 'Restul împărțirii polinomului P(x) la binomul x - a este chiar valoarea P(a).',
    },
    {
      type: 'callout',
      variant: 'rule',
      title: 'Formula de bază',
      text: 'Dacă împărțim P(x) la x - a, atunci restul este R = P(a).',
    },
    {
      type: 'formula',
      latex: 'P(x) : (x-a) \\Rightarrow R = P(a)',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Cazuri uzuale',
      text: 'La împărțirea la x + 1 calculăm P(-1), iar la împărțirea la x + 2 calculăm P(-2).',
    },
    {
      type: 'formula',
      latex: 'P(x) : (x+1) \\Rightarrow R = P(-1)',
    },
    {
      type: 'formula',
      latex: 'P(x) : (x+2) \\Rightarrow R = P(-2)',
    },

    { type: 'heading', id: 'divizibilitate', level: 2, text: '2. Când polinomul se divide exact' },
    {
      type: 'text',
      text: 'Dacă un polinom este divizibil cu binomul dat, atunci restul împărțirii este zero.',
    },
    {
      type: 'formula',
      latex: 'P(x) \\text{ divizibil cu } x-a \\Rightarrow P(a) = 0',
      description: 'Aceasta este condiția folosită frecvent în exercițiile cu parametri.',
    },

    { type: 'heading', id: 'exemplu-rezolvat', level: 2, text: '3. Exemplu rezolvat' },
    {
      type: 'text',
      text: 'Considerăm următorul exercițiu:',
    },
    {
      type: 'formula',
      latex:
        'P(x)=mx^3-2x^2+5x+m-4,\\quad Q(x)=x+2,\\quad \\text{determinați } m\\in\\mathbb{R}\\text{ astfel încât } P(x) \\text{ să se dividă prin } Q(x).',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Rezolvare',
      text: 'Pentru că împărțim la x + 2, folosim P(-2). Fiind divizibil, restul trebuie să fie 0.',
    },
    {
      type: 'formula',
      latex: 'P(-2) = 0',
    },
    {
      type: 'formula',
      latex: 'm \\cdot (-2)^3 - 2 \\cdot (-2)^2 + 5 \\cdot (-2) + m - 4 = 0',
    },
    {
      type: 'formula',
      latex: '-8m - 8 - 10 + m - 4 = 0',
    },
    {
      type: 'formula',
      latex: '-7m - 22 = 0',
    },
    {
      type: 'formula',
      latex: '-7m = 22',
    },
    {
      type: 'formula',
      latex: 'm = -\\frac{22}{7}',
      description: 'Răspuns final.',
    },

    { type: 'heading', id: 'limite', level: 2, text: '4. Limitările teoremei lui Bézout' },
    {
      type: 'text',
      text: 'Metoda directă cu P(a) se aplică atunci când împărțim la un binom de gradul 1. Dacă împărțitorul are gradul 2 sau mai mare, teorema nu mai oferă singură restul.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Atenție',
      text: 'Dacă împărțitorul este de grad mai mare, restul se află prin împărțire în coloană sau prin alte metode algebrice.',
    },
    {
      type: 'formula',
      latex: 'x^2-1',
      description: 'De exemplu, pentru un împărțitor de forma de mai jos, teorema nu se aplică direct.',
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
            { id: 'usor-1', label: '1', latex: 'P(x)=x^2+3x+1,\\ Q(x)=x-2', answer: '11', prompt: 'Determină restul împărțirii pentru:' },
            { id: 'usor-2', label: '2', latex: 'P(x)=x^3-4x+6,\\ Q(x)=x+1', answer: '9', prompt: 'Determină restul împărțirii pentru:' },
            { id: 'usor-3', label: '3', latex: 'P(x)=2x^2-5x+7,\\ Q(x)=x-3', answer: '10', prompt: 'Determină restul împărțirii pentru:' },
            { id: 'usor-4', label: '4', latex: 'P(x)=x^4-1,\\ Q(x)=x-1', answer: '0', prompt: 'Determină restul împărțirii pentru:' },
            { id: 'usor-5', label: '5', latex: 'P(x)=x^3+2x^2-x+5,\\ Q(x)=x+2', answer: '7', prompt: 'Determină restul împărțirii pentru:' },
          ],
        },
        {
          id: 'nivel-mediu',
          title: 'Nivel MEDIU',
          accent: 'medium',
          items: [
            { id: 'mediu-1', label: '1', latex: 'P(x)=2x^3-3x^2+x-5,\\ Q(x)=x-1', answer: '-5', prompt: 'Determină restul împărțirii pentru:' },
            { id: 'mediu-2', label: '2', latex: 'P(x)=x^4-2x^3+5x-7,\\ Q(x)=x+3', answer: '113', prompt: 'Determină restul împărțirii pentru:' },
            { id: 'mediu-3', label: '3', latex: 'P(x)=3x^2-2\\sqrt{2}x+1,\\ Q(x)=x-\\sqrt{2}', answer: '3', prompt: 'Determină restul împărțirii pentru:' },
            { id: 'mediu-4', label: '4', latex: 'P(x)=x^5-32,\\ Q(x)=x-2', answer: '0', prompt: 'Determină restul împărțirii pentru:' },
            { id: 'mediu-5', label: '5', latex: 'P(x)=4x^3-x+6,\\ Q(x)=x+\\frac{1}{2}', answer: '6', prompt: 'Determină restul împărțirii pentru:' },
          ],
        },
        {
          id: 'nivel-greu',
          title: 'Nivel GREU',
          accent: 'hard',
          items: [
            { id: 'greu-1', label: '1', latex: 'P(x)=2x^4-5x^3+x^2+7x-9,\\ Q(x)=x-2', answer: '1', prompt: 'Determină restul împărțirii pentru:' },
            { id: 'greu-2', label: '2', latex: 'P(x)=x^5+3x^4-2x^2+x-6,\\ Q(x)=x+2', answer: '0', prompt: 'Determină restul împărțirii pentru:' },
            {
              id: 'greu-3',
              label: '3',
              latex: 'P(x)=x^3+mx^2-4x+5,\\quad Q(x)=x+1,\\quad R=6',
              answer: '-2',
              prompt: 'Determină parametrul cerut:',
              details: 'Știind că restul împărțirii este 6, determină valoarea lui m.',
            },
            {
              id: 'greu-4',
              label: '4',
              latex: 'P(x)=x^2+ax+9,\\quad Q(x)=x-3',
              answer: '-6',
              prompt: 'Determină parametrul cerut:',
              details: 'Știind că P(x) este divizibil cu Q(x), determină valoarea lui a.',
            },
            {
              id: 'greu-5',
              label: '5',
              latex: 'P(x)=x^4-6x^3+13x^2-12x+4,\\ Q(x)=x-2',
              answer: '0',
              prompt: 'Determină restul împărțirii pentru:',
            },
          ],
        },
      ],
    },
  ],
}
