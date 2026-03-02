import type { BacTopicContent } from '../../types/bacContent'

export const puteri: BacTopicContent = {
  topicId: 'puteri',
  title: 'Puteri',
  subtitle: 'Definiții, proprietăți și exemple rapide pentru BAC.',
  blocks: [
    { type: 'heading', id: 'definitie', level: 2, text: 'Definiție și notație' },
    {
      type: 'text',
      text:
        'Puterea unui număr arată rezultatul înmulțirii acelui număr cu el însuși de mai multe ori.',
    },
    {
      type: 'formula',
      latex: 'a^n = \\underbrace{a \\cdot a \\cdot \\ldots \\cdot a}_{n\\ \\text{ori}}',
      description: 'a este baza, n este exponentul.',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Definiție',
      text: 'Baza este numărul care se înmulțește, exponentul arată de câte ori.',
    },
    { type: 'heading', id: 'proprietati', level: 2, text: 'Proprietăți esențiale' },
    {
      type: 'callout',
      variant: 'rule',
      title: 'Proprietate',
      text: 'La înmulțirea puterilor cu aceeași bază se adună exponenții.',
    },
    {
      type: 'formula',
      latex: 'a^m \\cdot a^n = a^{m+n}',
      description: 'Produsul puterilor cu aceeași bază.',
    },
    {
      type: 'callout',
      variant: 'rule',
      title: 'Proprietate',
      text: 'La împărțirea puterilor cu aceeași bază se scad exponenții.',
    },
    {
      type: 'formula',
      latex: '\\frac{a^m}{a^n} = a^{m-n}',
      description: 'Câtul puterilor cu aceeași bază.',
    },
    {
      type: 'formula',
      latex: '(a^m)^n = a^{m\\cdot n}',
      description: 'Puterea unei puteri.',
    },
    {
      type: 'formula',
      latex: '(a\\cdot b)^n = a^n \\cdot b^n',
      description: 'Puterea unui produs.',
    },
    {
      type: 'formula',
      latex: '\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}',
      description: 'Puterea unui raport.',
    },
    {
      type: 'callout',
      variant: 'note',
      title: 'Proprietate',
      text: 'Orice bază nenulă la puterea 0 este 1, iar la puterea 1 rămâne neschimbată.',
    },
    {
      type: 'formula',
      latex: 'a^0 = 1,\\quad a^1 = a\\ (a \\neq 0)',
    },
    { type: 'heading', id: 'atentie', level: 3, text: 'Atenție la paranteze' },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Atenție',
      text: '(-2)^2 este 4, dar -2^2 este -4. Parantezele schimbă semnul.',
    },
    { type: 'heading', id: 'exemplu-rezolvat', level: 2, text: 'Exemplu concret rezolvat' },
    {
      type: 'text',
      text: 'Simplifică expresia de mai jos folosind proprietățile puterilor.',
    },
    {
      type: 'formula',
      latex: '\\frac{3^4 \\cdot 3^{-2}}{(3^2)^2} = ?',
    },
    {
      type: 'formula',
      latex: '3^4 \\cdot 3^{-2} = 3^{4-2} = 3^2',
      description: 'Adunăm exponenții la înmulțire.',
    },
    {
      type: 'formula',
      latex: '(3^2)^2 = 3^{2\\cdot2} = 3^4',
      description: 'Înmulțim exponenții la puterea unei puteri.',
    },
    {
      type: 'formula',
      latex: '\\frac{3^2}{3^4} = 3^{2-4} = 3^{-2} = \\frac{1}{3^2} = \\frac{1}{9}',
      description: 'Scădem exponenții și transformăm exponentul negativ.',
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
            { id: 'usor-1', label: '1', latex: '2^4', answer: '16' },
            { id: 'usor-2', label: '2', latex: '5^0', answer: '1' },
            { id: 'usor-3', label: '3', latex: '(-3)^2', answer: '9' },
            { id: 'usor-4', label: '4', latex: '4^1', answer: '4' },
            { id: 'usor-5', label: '5', latex: '\\left(\\frac{2}{3}\\right)^2', answer: '\\frac{4}{9}' },
          ],
        },
        {
          id: 'nivel-mediu',
          title: 'Nivel MEDIU',
          accent: 'medium',
          items: [
            { id: 'mediu-1', label: '1', latex: '3^2 \\cdot 3^5', answer: '3^7' },
            { id: 'mediu-2', label: '2', latex: '\\frac{7^6}{7^2}', answer: '7^4' },
            { id: 'mediu-3', label: '3', latex: '(2^3)^2', answer: '2^6' },
            { id: 'mediu-4', label: '4', latex: '(3\\cdot5)^2', answer: '3^2\\cdot5^2' },
            { id: 'mediu-5', label: '5', latex: '\\left(\\frac{4}{5}\\right)^3', answer: '\\frac{64}{125}' },
          ],
        },
        {
          id: 'nivel-greu',
          title: 'Nivel GREU',
          accent: 'hard',
          items: [
            { id: 'greu-1', label: '1', latex: '\\frac{2^5 \\cdot 2^{-3}}{2^1}', answer: '2^1' },
            { id: 'greu-2', label: '2', latex: '\\left(\\frac{3}{2}\\right)^{-2}', answer: '\\left(\\frac{2}{3}\\right)^2' },
            { id: 'greu-3', label: '3', latex: '\\frac{5^3 \\cdot 5^2}{(5^2)^2}', answer: '5^1' },
            { id: 'greu-4', label: '4', latex: '2^3 \\cdot 4^2', answer: '2^7' },
            { id: 'greu-5', label: '5', latex: '\\frac{(6^2)^3}{6^4}', answer: '6^2' },
          ],
        },
      ],
    },
  ],
}
