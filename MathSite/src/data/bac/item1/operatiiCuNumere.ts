import type { BacTopicContent } from '../../types/bacContent'

export const operatiiCuNumere: BacTopicContent = {
  topicId: 'operatii-numere',
  title: 'Operații cu numere',
  subtitle: 'Fracții, operații cu întregi, puteri și ordinea operațiilor explicate rapid.',
  blocks: [
    { type: 'heading', id: 'fractii', level: 2, text: 'Fracțiile' },
    {
      type: 'text',
      text:
        'O fracție reprezintă o parte dintr-un întreg. Este formată din numărător (sus) și numitor (jos).',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Numărător',
      text: 'Numărul de sus arată câte părți avem.',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Numitor',
      text: 'Numărul de jos arată în câte părți este împărțit întregul.',
    },
    {
      type: 'formula',
      latex: '\\frac{3}{4}',
      description: 'Exemplu: fracția 3/4 înseamnă 3 părți din 4.',
    },
    {
      type: 'callout',
      variant: 'rule',
      title: 'Legătura cu împărțirea',
      text: 'O fracție poate fi văzută ca o împărțire: 15/3 = 15 : 3 = 5.',
    },

    { type: 'heading', id: 'operatii-fractii', level: 2, text: 'Operații cu fracții' },
    { type: 'heading', id: 'adunare-scadere-fractii', level: 3, text: 'Adunare și scădere' },
    {
      type: 'text',
      text:
        'Dacă fracțiile au același numitor, adunăm/scădem numărătorii, iar numitorul rămâne același.',
    },
    {
      type: 'formula',
      latex: '\\frac{2}{5} + \\frac{3}{5} = \\frac{2+3}{5} = \\frac{5}{5} = 1',
    },
    {
      type: 'text',
      text:
        'Dacă fracțiile au numitori diferiți, găsim un numitor comun, transformăm fracțiile și apoi efectuăm operația.',
    },
    {
      type: 'formula',
      latex: '\\frac{1}{3} + \\frac{1}{4} = \\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}',
      description: 'Prima fracție a fost amplificată cu 4, a doua cu 3, pentru numitor comun 12.',
    },
    { type: 'heading', id: 'inmultire-fractii', level: 3, text: 'Înmulțire' },
    {
      type: 'text',
      text: 'Înmulțim numărătorii între ei și numitorii între ei.',
    },
    {
      type: 'formula',
      latex: '\\frac{2}{3} \\cdot \\frac{4}{5} = \\frac{2\\cdot4}{3\\cdot5} = \\frac{8}{15}',
    },
    { type: 'heading', id: 'impartire-fractii', level: 3, text: 'Împărțire' },
    {
      type: 'text',
      text: 'Întoarcem a doua fracție (o inversăm) și efectuăm o înmulțire.',
    },
    {
      type: 'formula',
      latex: '\\frac{2}{3} : \\frac{7}{5} = \\frac{2}{3} \\cdot \\frac{5}{7} = \\frac{10}{21}',
    },
    { type: 'heading', id: 'simplificare', level: 3, text: 'Simplificarea' },
    {
      type: 'text',
      text:
        'Când obținem o fracție, verificăm dacă se poate simplifica prin împărțirea numărătorului și numitorului la același număr.',
    },
    {
      type: 'formula',
      latex: '\\frac{6}{15} = \\frac{2}{5}',
      description: '6 și 15 se împart la 3: 6:3=2, 15:3=5.',
    },

    { type: 'heading', id: 'intreg-in-fractie', level: 2, text: 'Introducerea întregului în fracție' },
    {
      type: 'text',
      text:
        'Numărul întreg se înmulțește cu numitorul fracției, iar rezultatul se adună cu numărătorul. Numitorul rămâne neschimbat.',
    },
    {
      type: 'formula',
      latex: '2\\frac{3}{5} = \\frac{2\\cdot5 + 3}{5} = \\frac{13}{5}',
    },
    {
      type: 'text',
      text: 'Un număr întreg poate fi scris ca fracție cu numitor 1.',
    },
    {
      type: 'formula',
      latex: '3 = \\frac{3}{1}',
    },

    { type: 'heading', id: 'fractie-compusa', level: 2, text: 'Fracție compusă' },
    {
      type: 'text',
      text:
        'O fracție poate conține alte fracții în numărător sau numitor. Simplificăm transformând fracțiile în împărțire.',
    },
    {
      type: 'formula',
      latex: '\\frac{\\frac{1}{2}}{\\frac{3}{4}} = \\frac{1}{2} : \\frac{3}{4} = \\frac{1}{2} \\cdot \\frac{4}{3} = \\frac{4}{6} = \\frac{2}{3}',
    },
    {
      type: 'formula',
      latex: '\\frac{5}{\\frac{25}{3}} = 5 : \\frac{25}{3} = \\frac{5}{1} \\cdot \\frac{3}{25} = \\frac{3}{5}',
    },

    { type: 'heading', id: 'adunare-scadere-intregi', level: 2, text: 'Adunarea și scăderea numerelor' },
    {
      type: 'callout',
      variant: 'rule',
      title: 'Același semn',
      text: 'Dacă numerele au același semn, le adunăm ca pe numere obișnuite și păstrăm semnul.',
    },
    {
      type: 'formula',
      latex: '3 + 5 = 8',
    },
    {
      type: 'formula',
      latex: '-3 + (-5) = -8',
    },
    {
      type: 'callout',
      variant: 'rule',
      title: 'Semne diferite',
      text:
        'Dacă numerele au semne diferite, scădem valoarea mai mică din valoarea mai mare și păstrăm semnul numărului mai mare.',
    },
    {
      type: 'formula',
      latex: '-5 + 8 = 3',
    },
    {
      type: 'formula',
      latex: '6 - 9 = -3',
    },

    { type: 'heading', id: 'inmultire-impartire-intregi', level: 2, text: 'Înmulțirea și împărțirea numerelor întregi' },
    {
      type: 'text',
      text:
        'Înmulțirea este adunarea repetată a aceluiași număr. De exemplu 4 + 4 + 4 = 3 * 4.',
    },
    {
      type: 'callout',
      variant: 'rule',
      title: 'Semne la înmulțire și împărțire',
      text: 'Pozitiv x pozitiv = pozitiv. Negativ x negativ = pozitiv. Pozitiv x negativ = negativ.',
    },
    {
      type: 'formula',
      latex: '3 \\cdot 5 = 15',
    },
    {
      type: 'formula',
      latex: '(-3) \\cdot (-5) = 15',
    },
    {
      type: 'formula',
      latex: '3 \\cdot (-5) = -15',
    },
    {
      type: 'formula',
      latex: '(-3) \\cdot 5 = -15',
    },
    { type: 'heading', id: 'impartire-intregi', level: 3, text: 'Împărțirea' },
    {
      type: 'text',
      text:
        'Împărțirea este operația inversă a înmulțirii: dacă 3 * 5 = 15, atunci 15 : 3 = 5 sau 15 : 5 = 3.',
    },
    {
      type: 'text',
      text:
        'Putem vedea împărțirea ca scădere repetată: 15 : 5 = 3 deoarece scădem 5 de trei ori până ajungem la 0.',
    },

    { type: 'heading', id: 'puteri', level: 2, text: 'Ridicarea la putere a numerelor' },
    {
      type: 'text',
      text:
        'Ridicarea unui număr la putere înseamnă înmulțirea acelui număr de mai multe ori cu el însuși.',
    },
    {
      type: 'formula',
      latex: '2^3 = 2\\cdot2\\cdot2 = 8',
    },
    {
      type: 'formula',
      latex: '(-3)^2 = (-3)\\cdot(-3) = 9',
    },
    { type: 'heading', id: 'puteri-fractii', level: 3, text: 'Ridicarea la putere a fracțiilor' },
    {
      type: 'text',
      text: 'Ridicăm separat numărătorul și numitorul la puterea indicată.',
    },
    {
      type: 'formula',
      latex: '\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}',
    },
    { type: 'heading', id: 'puteri-negative', level: 3, text: 'Numere negative la puteri pare/impare' },
    {
      type: 'text',
      text: 'Putere pară: rezultatul este pozitiv. Putere impară: rezultatul este negativ.',
    },
    {
      type: 'formula',
      latex: '(-2)^4 = 16',
    },
    {
      type: 'formula',
      latex: '(-2)^3 = -8',
    },

    { type: 'heading', id: 'ordine-operatii', level: 2, text: 'Ordinea operațiilor' },
    {
      type: 'callout',
      variant: 'rule',
      title: 'Ordine',
      text: 'Paranteze, apoi puteri, apoi înmulțiri și împărțiri, apoi adunări și scăderi.',
    },
    {
      type: 'formula',
      latex: '3 + 2\\cdot(4-1)^2',
      description: 'Exemplu de aplicare a ordinii operațiilor.',
    },
    {
      type: 'formula',
      latex: '4 - 1 = 3',
      description: '1. Rezolvăm paranteza.',
    },
    {
      type: 'formula',
      latex: '3^2 = 9',
      description: '2. Ridicăm la putere.',
    },
    {
      type: 'formula',
      latex: '2 \\cdot 9 = 18',
      description: '3. Înmulțim.',
    },
    {
      type: 'formula',
      latex: '3 + 18 = 21',
      description: '4. Adunăm.',
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
            { id: 'usor-1', label: '1', latex: '6 - 11', answer: '-5' },
            { id: 'usor-2', label: '2', latex: '-4 + 9', answer: '5' },
            { id: 'usor-3', label: '3', latex: '-7 + (-5)', answer: '-12' },
            { id: 'usor-4', label: '4', latex: '3 - (-8)', answer: '11' },
            { id: 'usor-5', label: '5', latex: '(-2) \\cdot 6', answer: '-12' },
          ],
        },
        {
          id: 'nivel-mediu',
          title: 'Nivel MEDIU',
          accent: 'medium',
          items: [
            { id: 'mediu-1', label: '1', latex: '(-8) \\cdot (-5)', answer: '40' },
            { id: 'mediu-2', label: '2', latex: '-36 : 6', answer: '-6' },
            { id: 'mediu-3', label: '3', latex: '-4 \\cdot 3 + 10', answer: '-2' },
            { id: 'mediu-4', label: '4', latex: '12 - 5 \\cdot 4', answer: '-8' },
            { id: 'mediu-5', label: '5', latex: '(-3) \\cdot 7 - (-9)', answer: '-12' },
          ],
        },
        {
          id: 'nivel-greu',
          title: 'Nivel GREU',
          accent: 'hard',
          items: [
            { id: 'greu-1', label: '1', latex: '-5 + 3 \\cdot (-4) - 7', answer: '-24' },
            { id: 'greu-2', label: '2', latex: '(-2) \\cdot \\left[6 - (-3)\\right]', answer: '-18' },
            { id: 'greu-3', label: '3', latex: '\\frac{-24 + 12}{-4}', answer: '3' },
            { id: 'greu-4', label: '4', latex: '-3 - (-8 + 2 \\cdot 5)', answer: '-5' },
            { id: 'greu-5', label: '5', latex: '(-4)^2 - 2 \\cdot (-6)', answer: '28' },
          ],
        },
      ],
    },
  ],
}
