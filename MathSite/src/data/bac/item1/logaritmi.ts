import type { BacTopicContent } from '../../types/bacContent'

export const logaritmi: BacTopicContent = {
  topicId: 'logaritmi',
  title: 'Logaritmi',
  subtitle: 'Definiții, proprietăți și exemple esențiale pentru BAC.',
  blocks: [
    { type: 'heading', id: 'definitii', level: 2, text: 'Definiții ale logaritmilor' },
    {
      type: 'text',
      text:
        'Logaritmul arată puterea la care trebuie ridicată baza pentru a obține numărul din argument.',
    },
    {
      type: 'formula',
      latex: '\\log_a b = c \\iff a^c = b',
      description: 'a > 0, a \\neq 1, b > 0.',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Citire',
      text: 'Se citește „logaritm în baza a din b”.',
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Domeniu',
      text: 'Baza a este pozitivă și diferită de 1, iar argumentul b este pozitiv.',
    },

    { type: 'heading', id: 'proprietati', level: 2, text: 'Proprietăți ale logaritmilor' },
    {
      type: 'formula',
      latex: '\\log_a 1 = 0,\\quad \\log_a a = 1',
    },
    {
      type: 'formula',
      latex: '\\log_a (b\\cdot c) = \\log_a b + \\log_a c',
      description: 'Produsul devine suma logaritmilor.',
    },
    {
      type: 'formula',
      latex: '\\log_a \\left(\\frac{b}{c}\\right) = \\log_a b - \\log_a c',
      description: 'Raportul devine diferența logaritmilor.',
    },
    {
      type: 'formula',
      latex: '\\log_a (b^n) = n\\cdot\\log_a b',
      description: 'Exponentul iese în față ca factor.',
    },
    {
      type: 'formula',
      latex: '\\log_{a^m} b = \\frac{1}{m}\\cdot\\log_a b',
      description: 'Schimbare de bază pentru o bază ridicată la putere.',
    },
    {
      type: 'formula',
      latex: 'a^{\\log_a b} = b',
    },
    {
      type: 'formula',
      latex: '\\frac{1}{\\log_a b} = \\log_b a',
    },
    {
      type: 'formula',
      latex: '\\ln a = \\log_e a,\\quad e \\approx 2.71',
    },
    {
      type: 'formula',
      latex: '\\log_{10} a',
      description: 'Logaritm zecimal.',
    },

    { type: 'heading', id: 'exemple-simple', level: 2, text: 'Exemple simple rezolvate' },
    {
      type: 'formula',
      latex: '\\log_{16} 1 = 0,\\quad \\log_{15} 1 = 0',
      description: 'Logaritmul lui 1 este 0 pentru orice bază validă.',
    },
    {
      type: 'formula',
      latex: '\\log_9 9 = 1,\\quad \\log_4 4 = 1,\\quad \\log_{30} 30 = 1',
      description: 'Logaritmul bazei din baza sa este 1.',
    },
    {
      type: 'formula',
      latex: '\\log_2 32 = 5',
      description: 'Fiindcă 2^5 = 32.',
    },
    {
      type: 'formula',
      latex: '\\log_{11} 11^6 = 6',
      description: 'Aplicăm regula \\log_a (a^n) = n.',
    },
    {
      type: 'formula',
      latex: '\\log_{36} 6 + \\log_{36} 6 = \\log_{36} 36 = 1',
      description: 'Suma devine logaritm de produs.',
    },
    {
      type: 'formula',
      latex: '\\log_9 18 - \\log_9 2 = \\log_9 9 = 1',
      description: 'Diferența devine logaritm de raport.',
    },
    {
      type: 'formula',
      latex: '\\log_7 7^2 = 2',
    },
    {
      type: 'formula',
      latex: '\\log_4 8 = \\log_{2^2} 2^3 = \\frac{3}{2}',
    },
    {
      type: 'formula',
      latex: '\\frac{1}{\\log_5 4} = \\log_4 5,\\quad \\frac{1}{\\log_7 9} = \\log_9 7',
    },

    { type: 'heading', id: 'exemplu-complex', level: 2, text: 'Exemplu complex rezolvat' },
    {
      type: 'text',
      text: 'Calculați expresia următoare:',
    },
    {
      type: 'formula',
      latex: '\\log_3 \\frac{2}{3} + \\log_3 18 - \\log_{\\sqrt{3}} 2',
    },
    {
      type: 'formula',
      latex: '\\log_3 \\frac{2}{3} + \\log_3 18 = \\log_3 \\left(\\frac{2}{3}\\cdot 18\\right) = \\log_3 12',
    },
    {
      type: 'formula',
      latex: '\\log_{\\sqrt{3}} 2 = \\log_{3^{1/2}} 2 = \\frac{1}{1/2}\\log_3 2 = 2\\log_3 2',
    },
    {
      type: 'formula',
      latex: '\\log_3 12 - 2\\log_3 2 = \\log_3 12 - \\log_3 4 = \\log_3 3 = 1',
      description: 'Folosim din nou regulile pentru produs și raport.',
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
            { id: 'usor-1', label: '1', latex: '\\log_2 \\frac{1}{32}', answer: '-5' },
            { id: 'usor-2', label: '2', latex: '\\log_5 \\left(\\frac{1}{125}\\right)', answer: '-3' },
            { id: 'usor-3', label: '3', latex: '\\lg 0,0001', answer: '-4' },
            { id: 'usor-4', label: '4', latex: '\\log_{\\frac{1}{3}} 27', answer: '-3' },
            { id: 'usor-5', label: '5', latex: '\\log_{9} \\frac{1}{81}', answer: '-2' },
          ],
        },
        {
          id: 'nivel-mediu',
          title: 'Nivel MEDIU',
          accent: 'medium',
          items: [
            { id: 'mediu-1', label: '1', latex: '\\log_4 \\sqrt[6]{32}', answer: '\\frac{5}{6}' },
            { id: 'mediu-2', label: '2', latex: '\\log_{\\frac{1}{2}} \\frac{1}{32}', answer: '5' },
            { id: 'mediu-3', label: '3', latex: '\\log_3 \\frac{1}{243}', answer: '-5' },
            { id: 'mediu-4', label: '4', latex: '\\log_9 81\\sqrt{3}', answer: '\\frac{9}{4}' },
            { id: 'mediu-5', label: '5', latex: '\\log_2 \\sqrt[3]{32}', answer: '\\frac{5}{3}' },
          ],
        },
        {
          id: 'nivel-greu',
          title: 'Nivel GREU',
          accent: 'hard',
          items: [
            { id: 'greu-1', label: '1', latex: '\\log_6 216 - \\log_6 6 + \\log_6 \\frac{1}{36}', answer: '1' },
            { id: 'greu-2', label: '2', latex: '\\log_7 343 + \\log_7 \\frac{1}{49} - 2\\log_7 7', answer: '-1' },
            { id: 'greu-3', label: '3', latex: '\\log_{12} 3 + \\log_{12} 16 + \\log_{12} 27', answer: '2' },
            { id: 'greu-4', label: '4', latex: '2^{1+\\log_2 5} + \\log_5 \\frac{1}{125}', answer: '7' },
            { id: 'greu-5', label: '5', latex: '\\log_{\\frac{1}{3}} 81 + \\log_{\\frac{1}{3}} \\frac{1}{27}', answer: '-1' },
          ],
        },
      ],
    },
  ],
}
