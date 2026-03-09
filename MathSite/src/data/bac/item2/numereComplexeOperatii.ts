import type { BacTopicContent } from '../../types/bacContent'

export const numereComplexeOperatii: BacTopicContent = {
  topicId: 'numere-complexe-operatii',
  title: 'Operații cu numere complexe',
  subtitle: 'Reguli de calcul pentru adunare, scădere, înmulțire, împărțire și puteri ale lui i.',
  blocks: [
    { type: 'heading', id: 'adunare-scadere', level: 2, text: '1. Adunarea și scăderea' },
    {
      type: 'text',
      text: 'Se adună/scad separat părțile reale și părțile imaginare.',
    },
    {
      type: 'formula',
      latex: '(a+bi)\\pm(c+di)=(a\\pm c)+(b\\pm d)i',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Exemple',
      text: '(2+3i)+(4-2i)=6+i, iar (5+7i)-(3+2i)=2+5i.',
    },

    { type: 'heading', id: 'inmultire', level: 2, text: '2. Înmulțirea' },
    {
      type: 'text',
      text: 'Se aplică distributivitatea, apoi se folosește relația i la pătrat egal cu minus 1 și se reduc termenii asemenea.',
    },
    {
      type: 'formula',
      latex: '(a+bi)(c+di)=(ac-bd)+(ad+bc)i',
      description: 'Forma finală utilă în calcule rapide.',
    },
    {
      type: 'formula',
      latex: '(2+3i)(4-i)=8-2i+12i-3i^2=11+10i',
      description: 'Exemplu complet.',
    },

    { type: 'heading', id: 'impartire', level: 2, text: '3. Împărțirea (fracție)' },
    {
      type: 'text',
      text: 'Se amplifică cu conjugatul numitorului, pentru a obține numitor real.',
    },
    {
      type: 'formula',
      latex: '\\frac{a+bi}{c+di}=\\frac{(a+bi)(c-di)}{c^2+d^2}',
    },
    {
      type: 'formula',
      latex: '\\frac{5+2i}{3-i}=\\frac{(5+2i)(3+i)}{(3-i)(3+i)}=\\frac{13+11i}{10}=\\frac{13}{10}+\\frac{11}{10}i',
      description: 'Exemplu complet.',
    },

    { type: 'heading', id: 'puteri', level: 2, text: '4. Ridicarea la putere' },
    {
      type: 'callout',
      variant: 'rule',
      text: 'Puterile lui i se repetă periodic la 4 termeni: i, -1, -i, 1.',
    },
    {
      type: 'formula',
      latex: 'i^0=1,\\quad i^1=i,\\quad i^2=-1,\\quad i^3=-i,\\quad i^4=1',
    },
    {
      type: 'formula',
      latex: 'i^{4k}=1,\\ i^{4k+1}=i,\\ i^{4k+2}=-1,\\ i^{4k+3}=-i',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Exemple',
      text: 'Aplicăm periodicitatea puterilor lui i.',
    },
    {
      type: 'formula',
      latex: 'i^{10}=i^8\\cdot i^2=(i^4)^2\\cdot(-1)=-1',
    },
    {
      type: 'formula',
      latex: 'i^7=i^4\\cdot i^3=1\\cdot(-i)=-i',
    },

    { type: 'heading', id: 'exercitii-antrenament', level: 2, text: 'Exerciții de antrenament' },
    {
      type: 'exercise_list',
      levels: [
        {
          id: 'cx-op-usor',
          title: 'Nivel UȘOR',
          accent: 'easy',
          items: [
            {
              id: 'cx-op-usor-1',
              label: '1',
              prompt: 'Aflați partea reală, partea imaginară și conjugatul pentru:',
              latex: 'z=(1+3i)-(4+i)',
              answer: '\\operatorname{Re}(z)=-3,\\ \\operatorname{Im}(z)=2,\\ \\overline{z}=-3-2i',
            },
            {
              id: 'cx-op-usor-2',
              label: '2',
              prompt: 'Aflați partea reală, partea imaginară și conjugatul pentru:',
              latex: 'z=7-8i-(2-3i)',
              answer: '\\operatorname{Re}(z)=5,\\ \\operatorname{Im}(z)=-5,\\ \\overline{z}=5+5i',
            },
            {
              id: 'cx-op-usor-3',
              label: '3',
              prompt: 'Aflați partea reală, partea imaginară și conjugatul pentru:',
              latex: 'z=1-2i-6i-5',
              answer: '\\operatorname{Re}(z)=-4,\\ \\operatorname{Im}(z)=-8,\\ \\overline{z}=-4+8i',
            },
            {
              id: 'cx-op-usor-4',
              label: '4',
              prompt: 'Calculați în C:',
              latex: '(2+3i)(4-i)',
              answer: '11+10i',
            },
            {
              id: 'cx-op-usor-5',
              label: '5',
              prompt: 'Calculați în C:',
              latex: '(3-2i)(1+5i)',
              answer: '13+13i',
            },
          ],
        },
        {
          id: 'cx-op-mediu',
          title: 'Nivel MEDIU',
          accent: 'medium',
          items: [
            {
              id: 'cx-op-mediu-1',
              label: '1',
              prompt: 'Aflați Re(z), Im(z) și conjugatul pentru:',
              latex: 'z=(3+7i)+(2+9i)(1-i)',
              answer: '\\operatorname{Re}(z)=14,\\ \\operatorname{Im}(z)=14,\\ \\overline{z}=14-14i',
            },
            {
              id: 'cx-op-mediu-2',
              label: '2',
              prompt: 'Aflați Re(z), Im(z) și conjugatul pentru:',
              latex: 'z=(10-8i)-(-1+3i)(4-i)',
              answer: '\\operatorname{Re}(z)=3,\\ \\operatorname{Im}(z)=-21,\\ \\overline{z}=3+21i',
            },
            {
              id: 'cx-op-mediu-3',
              label: '3',
              prompt: 'Calculați în C:',
              latex: '\\frac{2-i}{3-4i}',
              answer: '\\frac{10+5i}{25}=\\frac{2}{5}+\\frac{1}{5}i',
            },
            {
              id: 'cx-op-mediu-4',
              label: '4',
              prompt: 'Calculați în C:',
              latex: '\\frac{12+3i}{3-4i}',
              answer: '\\frac{24+57i}{25}=\\frac{24}{25}+\\frac{57}{25}i',
            },
            {
              id: 'cx-op-mediu-5',
              label: '5',
              prompt: 'Calculați în C:',
              latex: '\\frac{3-3i}{3+3i}',
              answer: '-i',
            },
          ],
        },
        {
          id: 'cx-op-dificil',
          title: 'Nivel DIFICIL',
          accent: 'hard',
          items: [
            {
              id: 'cx-op-dificil-1',
              label: '1',
              prompt: 'Calculați în C:',
              latex: '\\left(\\frac{1+i}{1-i}\\right)^{18}',
              answer: '-1',
            },
            {
              id: 'cx-op-dificil-2',
              label: '2',
              prompt: 'Calculați în C:',
              latex: '\\frac{5}{1+2i}-\\frac{1-2i}{2-i}',
              answer: '-1-i',
            },
            {
              id: 'cx-op-dificil-3',
              label: '3',
              prompt: 'Calculați în C:',
              latex: '\\left(\\frac{1}{1-i}-\\frac{1}{1+i}\\right)^2',
              answer: '-1',
            },
            {
              id: 'cx-op-dificil-4',
              label: '4',
              prompt: 'Calculați în C:',
              latex: '\\frac{1}{1+2i}+\\frac{1}{1-2i}',
              answer: '\\frac{2}{5}',
            },
            {
              id: 'cx-op-dificil-5',
              label: '5',
              prompt: 'Calculați conjugatul expresiei:',
              latex: 'z=\\frac{2+3i}{5-6i}',
              answer: '\\overline{z}=\\frac{-8+27i}{61}',
            },
          ],
        },
      ],
    },
  ],
}
