import type { BacTopicContent } from '../../types/bacContent'

export const radicali: BacTopicContent = {
  topicId: 'radicali',
  title: 'Radicali',
  subtitle: 'Definiții, proprietăți și exemple rapide pentru BAC.',
  blocks: [
    { type: 'heading', id: 'definitie', level: 2, text: 'Definiție și notație' },
    {
      type: 'text',
      text:
        'Radicalul este operația inversă ridicării la putere. Numărul obținut, ridicat la puterea indicată, dă radicandul.',
    },
    {
      type: 'formula',
      latex: '\\sqrt[n]{a} = b \\iff b^n = a',
      description: 'a este radicandul, n este ordinul radicalului.',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Definiție',
      text: 'Radicalul simplu \\sqrt{a} are ordinul 2.',
    },
    {
      type: 'formula',
      latex: '\\sqrt{a} = \\sqrt[2]{a}',
    },
    { type: 'heading', id: 'proprietati', level: 2, text: 'Proprietăți esențiale' },
    {
      type: 'callout',
      variant: 'rule',
      title: 'Proprietate',
      text: 'Radicalul unui produs este produsul radicalilor, dacă ordinul este același.',
    },
    {
      type: 'formula',
      latex: '\\sqrt[n]{a\\cdot b} = \\sqrt[n]{a}\\cdot\\sqrt[n]{b}',
      description: 'Pentru a, b >= 0 când n este par.',
    },
    {
      type: 'callout',
      variant: 'rule',
      title: 'Proprietate',
      text: 'Radicalul unui raport este raportul radicalilor, dacă ordinul este același.',
    },
    {
      type: 'formula',
      latex: '\\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}',
      description: 'b != 0 și a, b >= 0 când n este par.',
    },
    {
      type: 'formula',
      latex: '\\sqrt[n]{a} = a^{\\frac{1}{n}}',
      description: 'Legătura dintre radical și puteri.',
    },
    { type: 'heading', id: 'patrate-perfecte', level: 3, text: 'Pătrate perfecte utile' },
    {
      type: 'text',
      text: '1, 4, 9, 16, 25, 36, 49, 64, 81, 100 sunt pătrate perfecte.',
    },
    {
      type: 'formula',
      latex: '1^2=1,\\ 2^2=4,\\ 3^2=9,\\ 4^2=16,\\ 5^2=25',
    },
    { type: 'heading', id: 'atentie', level: 3, text: 'Atenție la domeniu' },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Atenție',
      text: 'Pentru ordin par, radicandul trebuie să fie nenegativ.',
    },
    { type: 'heading', id: 'exemplu-rezolvat', level: 2, text: 'Exemplu concret rezolvat' },
    {
      type: 'text',
      text: 'Simplifică expresia următoare folosind pătrate perfecte.',
    },
    {
      type: 'formula',
      latex: '\\sqrt{72} - \\sqrt{18} + \\sqrt{8}',
    },
    {
      type: 'formula',
      latex: '\\sqrt{72}=\\sqrt{36\\cdot2}=6\\sqrt{2}',
      description: 'Scoatem pătratul perfect din radical.',
    },
    {
      type: 'formula',
      latex: '\\sqrt{18}=\\sqrt{9\\cdot2}=3\\sqrt{2}',
      description: 'Scoatem pătratul perfect din radical.',
    },
    {
      type: 'formula',
      latex: '\\sqrt{8}=\\sqrt{4\\cdot2}=2\\sqrt{2}',
      description: 'Scoatem pătratul perfect din radical.',
    },
    {
      type: 'formula',
      latex: '6\\sqrt{2}-3\\sqrt{2}+2\\sqrt{2}=5\\sqrt{2}',
      description: 'Adunăm radicalii asemănători.',
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
              id: 'usor-1',
              label: '1',
              latex: '\\sqrt{27^{\\frac{2}{3}} + \\left(\\frac{1}{4}\\right)^{-2}}',
              answer: '5',
            },
            { id: 'usor-2', label: '2', latex: '2^{-2}+\\sqrt[3]{\\frac{1}{8}}', answer: '\\frac{3}{4}' },
            { id: 'usor-3', label: '3', latex: '\\sqrt[3]{-125}+\\sqrt{81}', answer: '4' },
            { id: 'usor-4', label: '4', latex: '\\sqrt{\\frac{49}{64}}', answer: '\\frac{7}{8}' },
            { id: 'usor-5', label: '5', latex: '\\sqrt[3]{\\frac{64}{27}}', answer: '\\frac{4}{3}' },
          ],
        },
        {
          id: 'nivel-mediu',
          title: 'Nivel MEDIU',
          accent: 'medium',
          items: [
            {
              id: 'mediu-1',
              label: '1',
              latex: '\\sqrt{0,09}-\\sqrt[3]{0,008}+\\left(\\sqrt[3]{2\\sqrt{2}}\\right)^2',
              answer: '2,1',
            },
            {
              id: 'mediu-2',
              label: '2',
              latex: '\\sqrt[3]{\\frac{27}{8}}+\\frac{\\sqrt[3]{64}}{2}+\\sqrt{\\sqrt{16}}',
              answer: '\\frac{11}{2}',
            },
            {
              id: 'mediu-3',
              label: '3',
              latex: '\\sqrt{49}+\\sqrt[3]{-1000}+\\sqrt[3]{-0,008}',
              answer: '-3,2',
            },
            {
              id: 'mediu-4',
              label: '4',
              latex: '(0,027)^{\\frac{1}{3}}\\cdot\\left(\\frac{\\sqrt{3}}{10}\\right)^{-2}',
              answer: '10',
            },
            {
              id: 'mediu-5',
              label: '5',
              latex: '\\sqrt[3]{-128\\cdot 0,125^{\\frac{1}{3}}}',
              answer: '-4',
            },
          ],
        },
        {
          id: 'nivel-greu',
          title: 'Nivel GREU',
          accent: 'hard',
          items: [
            { id: 'greu-1', label: '1', latex: '\\sqrt[3]{4-5\\cdot 32^{-0,6}}', answer: '\\frac{3}{2}' },
            {
              id: 'greu-2',
              label: '2',
              latex: '\\sqrt{\\left(\\frac{27}{64}\\right)^{-\\frac{2}{3}}-\\left(\\frac{3}{\\sqrt{7}}\\right)^{-2}}',
              answer: '1',
            },
            { id: 'greu-3', label: '3', latex: '\\sqrt{(2-\\sqrt{3})^{-2}}', answer: '2+\\sqrt{3}' },
            { id: 'greu-4', label: '4', latex: '\\sqrt{48}-\\sqrt{12}+\\sqrt{27}', answer: '5\\sqrt{3}' },
            { id: 'greu-5', label: '5', latex: '\\frac{1}{\\sqrt{2}-1}-\\sqrt{2}', answer: '1' },
          ],
        },
      ],
    },
  ],
}
