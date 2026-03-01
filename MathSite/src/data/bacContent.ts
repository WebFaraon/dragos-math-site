import type { BacTopicContent } from '../types/bacContent'

export const bacContent: BacTopicContent[] = [
  {
    topicId: 'operatii-numere',
    title: 'Operatii cu numere',
    subtitle: 'Fractii, operatii cu intregi, puteri si ordinea operatiilor explicate rapid.',
    blocks: [
      { type: 'heading', id: 'fractii', level: 2, text: 'Fractiile' },
      {
        type: 'text',
        text:
          'O fractie reprezinta o parte dintr-un intreg. Este formata din numarator (sus) si numitor (jos).',
      },
      {
        type: 'callout',
        variant: 'note',
        title: 'Numarator',
        text: 'Numarul de sus arata cate parti avem.',
      },
      {
        type: 'callout',
        variant: 'note',
        title: 'Numitor',
        text: 'Numarul de jos arata in cate parti este impartit intregul.',
      },
      {
        type: 'formula',
        latex: '\\frac{3}{4}',
        description: 'Exemplu: fractia 3/4 inseamna 3 parti din 4.',
      },
      {
        type: 'callout',
        variant: 'rule',
        title: 'Legatura cu impartirea',
        text: 'O fractie poate fi vazuta ca o impartire: 15/3 = 15 : 3 = 5.',
      },

      { type: 'heading', id: 'operatii-fractii', level: 2, text: 'Operatii cu fractii' },
      { type: 'heading', id: 'adunare-scadere-fractii', level: 3, text: 'Adunare si scadere' },
      {
        type: 'text',
        text:
          'Daca fractiile au acelasi numitor, adunam/scadem numaratorii, iar numitorul ramane acelasi.',
      },
      {
        type: 'formula',
        latex: '\\frac{2}{5} + \\frac{3}{5} = \\frac{2+3}{5} = \\frac{5}{5} = 1',
      },
      {
        type: 'text',
        text:
          'Daca fractiile au numitori diferiti, gasim un numitor comun, transformam fractiile si apoi efectuam operatia.',
      },
      {
        type: 'formula',
        latex: '\\frac{1}{3} + \\frac{1}{4} = \\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}',
        description: 'Prima fractie a fost amplificata cu 4, a doua cu 3, pentru numitor comun 12.',
      },
      { type: 'heading', id: 'inmultire-fractii', level: 3, text: 'Inmultire' },
      {
        type: 'text',
        text: 'Inmultim numaratorii intre ei si numitorii intre ei.',
      },
      {
        type: 'formula',
        latex: '\\frac{2}{3} \\cdot \\frac{4}{5} = \\frac{2\\cdot4}{3\\cdot5} = \\frac{8}{15}',
      },
      { type: 'heading', id: 'impartire-fractii', level: 3, text: 'Impartire' },
      {
        type: 'text',
        text: 'Intoarcem a doua fractie (o inversam) si efectuam o inmultire.',
      },
      {
        type: 'formula',
        latex: '\\frac{2}{3} : \\frac{7}{5} = \\frac{2}{3} \\cdot \\frac{5}{7} = \\frac{10}{21}',
      },
      { type: 'heading', id: 'simplificare', level: 3, text: 'Simplificarea' },
      {
        type: 'text',
        text:
          'Cand obtinem o fractie, verificam daca se poate simplifica prin impartirea numaratorului si numitorului la acelasi numar.',
      },
      {
        type: 'formula',
        latex: '\\frac{6}{15} = \\frac{2}{5}',
        description: '6 si 15 se impart la 3: 6:3=2, 15:3=5.',
      },

      { type: 'heading', id: 'intreg-in-fractie', level: 2, text: 'Introducerea intregului in fractie' },
      {
        type: 'text',
        text:
          'Numarul intreg se inmulteste cu numitorul fractiei, iar rezultatul se aduna cu numaratorul. Numitorul ramane neschimbat.',
      },
      {
        type: 'formula',
        latex: '2\\frac{3}{5} = \\frac{2\\cdot5 + 3}{5} = \\frac{13}{5}',
      },
      {
        type: 'text',
        text: 'Un numar intreg poate fi scris ca fractie cu numitor 1.',
      },
      {
        type: 'formula',
        latex: '3 = \\frac{3}{1}',
      },

      { type: 'heading', id: 'fractie-compusa', level: 2, text: 'Fractie compusa' },
      {
        type: 'text',
        text:
          'O fractie poate contine alte fractii in numarator sau numitor. Simplificam transformand fractiile in impartire.',
      },
      {
        type: 'formula',
        latex: '\\frac{\\frac{1}{2}}{\\frac{3}{4}} = \\frac{1}{2} : \\frac{3}{4} = \\frac{1}{2} \\cdot \\frac{4}{3} = \\frac{4}{6} = \\frac{2}{3}',
      },
      {
        type: 'formula',
        latex: '\\frac{5}{\\frac{25}{3}} = 5 : \\frac{25}{3} = \\frac{5}{1} \\cdot \\frac{3}{25} = \\frac{3}{5}',
      },

      { type: 'heading', id: 'adunare-scadere-intregi', level: 2, text: 'Adunarea si scaderea numerelor' },
      {
        type: 'callout',
        variant: 'rule',
        title: 'Acelasi semn',
        text: 'Daca numerele au acelasi semn, le adunam ca pe numere obisnuite si pastram semnul.',
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
          'Daca numerele au semne diferite, scadem valoarea mai mica din valoarea mai mare si pastram semnul numarului mai mare.',
      },
      {
        type: 'formula',
        latex: '-5 + 8 = 3',
      },
      {
        type: 'formula',
        latex: '6 - 9 = -3',
      },

      { type: 'heading', id: 'inmultire-impartire-intregi', level: 2, text: 'Inmultirea si impartirea numerelor intregi' },
      {
        type: 'text',
        text:
          'Inmultirea este adunarea repetata a aceluiasi numar. De exemplu 4 + 4 + 4 = 3 * 4.',
      },
      {
        type: 'callout',
        variant: 'rule',
        title: 'Semne la inmultire si impartire',
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
      { type: 'heading', id: 'impartire-intregi', level: 3, text: 'Impartirea' },
      {
        type: 'text',
        text:
          'Impartirea este operatia inversa a inmultirii: daca 3 * 5 = 15, atunci 15 : 3 = 5 sau 15 : 5 = 3.',
      },
      {
        type: 'text',
        text:
          'Putem vedea impartirea ca scadere repetata: 15 : 5 = 3 deoarece scadem 5 de trei ori pana ajungem la 0.',
      },

      { type: 'heading', id: 'puteri', level: 2, text: 'Ridicarea la putere a numerelor' },
      {
        type: 'text',
        text:
          'Ridicarea unui numar la putere inseamna inmultirea acelui numar de mai multe ori cu el insusi.',
      },
      {
        type: 'formula',
        latex: '2^3 = 2\\cdot2\\cdot2 = 8',
      },
      {
        type: 'formula',
        latex: '(-3)^2 = (-3)\\cdot(-3) = 9',
      },
      { type: 'heading', id: 'puteri-fractii', level: 3, text: 'Ridicarea la putere a fractiilor' },
      {
        type: 'text',
        text: 'Ridicam separat numaratorul si numitorul la puterea indicata.',
      },
      {
        type: 'formula',
        latex: '\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}',
      },
      { type: 'heading', id: 'puteri-negative', level: 3, text: 'Numere negative la puteri pare/impare' },
      {
        type: 'text',
        text: 'Putere para: rezultatul este pozitiv. Putere impara: rezultatul este negativ.',
      },
      {
        type: 'formula',
        latex: '(-2)^4 = 16',
      },
      {
        type: 'formula',
        latex: '(-2)^3 = -8',
      },

      { type: 'heading', id: 'ordine-operatii', level: 2, text: 'Ordinea operatiilor' },
      {
        type: 'callout',
        variant: 'rule',
        title: 'Ordine',
        text: 'Paranteze, apoi puteri, apoi inmultiri si impartiri, apoi adunari si scaderi.',
      },
      {
        type: 'formula',
        latex: '3 + 2\\cdot(4-1)^2',
        description: 'Exemplu de aplicare a ordinii operatiilor.',
      },
      {
        type: 'formula',
        latex: '4 - 1 = 3',
        description: '1. Rezolvam paranteza.',
      },
      {
        type: 'formula',
        latex: '3^2 = 9',
        description: '2. Ridicam la putere.',
      },
      {
        type: 'formula',
        latex: '2 \\cdot 9 = 18',
        description: '3. Inmultim.',
      },
      {
        type: 'formula',
        latex: '3 + 18 = 21',
        description: '4. Adunam.',
      },
      { type: 'heading', id: 'exercitii-antrenament', level: 2, text: 'Exercitii de antrenament' },
      {
        type: 'exercise_list',
        levels: [
          {
            id: 'nivel-usor',
            title: 'Nivel USOR',
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
  },
  {
    topicId: 'puteri',
    title: 'Puteri',
    subtitle: 'Reguli de calcul si aplicatii rapide pentru bac.',
    blocks: [
      { type: 'heading', id: 'proprietati', level: 2, text: 'Proprietati' },
      {
        type: 'text',
        text: 'Puterea cu exponent natural descrie inmultirea repetata a unei baze cu ea insasi.',
      },
      {
        type: 'callout',
        variant: 'rule',
        title: 'Regula',
        text: 'La inmultirea puterilor cu aceeasi baza se aduna exponentii.',
      },
      {
        type: 'formula',
        latex: 'a^m \\cdot a^n = a^{m+n}',
        description: 'Produsul puterilor cu aceeasi baza.',
      },
      {
        type: 'formula',
        latex: '\\frac{a^m}{a^n} = a^{m-n}',
        description: 'Catul puterilor cu aceeasi baza.',
      },
      { type: 'heading', id: 'exercitii-antrenament', level: 2, text: 'Exercitii de antrenament' },
      {
        type: 'exercise_mcq',
        question: 'Simplifica: 2^3 · 2^4 = ?',
        options: ['2^7', '2^12', '2^1', '2^9'],
        answerIndex: 0,
      },
      {
        type: 'exercise_short',
        question: 'Calculeaza: 5^0 = ?',
        answer: '1',
      },
      { type: 'heading', id: 'atentie', level: 3, text: 'Atentie la semne' },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Atentie',
        text: '(-2)^2 este 4, dar -2^2 este -4. Parantezele conteaza.',
      },
    ],
  },
]

export const bacContentByTopic = new Map(bacContent.map((entry) => [entry.topicId, entry]))
