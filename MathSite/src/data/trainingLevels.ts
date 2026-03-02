export type TrainingExercise = {
  id: number
  expression: string
  answer: string
}

export const trainingLevels = {
  usor: [
    { id: 1, expression: '\\sqrt{27^{\\frac{2}{3}} + \\left(\\frac{1}{4}\\right)^{-2}}', answer: '5' },
    { id: 2, expression: '(0,4)^{-2} \\cdot \\left(\\frac{125}{8}\\right)^{-\\frac{2}{3}}', answer: '1' },
    { id: 3, expression: '(0,027)^{\\frac{1}{3}} \\cdot \\left(\\frac{\\sqrt{3}}{10}\\right)^{-2}', answer: '10' },
    { id: 4, expression: '32^{\\frac{3}{5}} - 8', answer: '0' },
    { id: 5, expression: '2^{-2} + \\sqrt[3]{\\frac{3}{64}} - 2', answer: '\\frac{\\sqrt[3]{3} - 7}{4}' },
    { id: 6, expression: '\\sqrt{9^{1,5} - 2}', answer: '5' },
    { id: 7, expression: '\\frac{\\sqrt[3]{81}}{9^{\\frac{1}{6}}}', answer: '3' },
    {
      id: 8,
      expression: '\\sqrt{\\left(\\frac{1}{10}\\right)^{-2} + \\left(16^{\\frac{3}{4}}\\right)^2 \\cdot 81^{\\frac{1}{2}}}',
      answer: '26',
    },
    {
      id: 9,
      expression: '\\sqrt{\\left(\\frac{27}{64}\\right)^{-\\frac{2}{3}} - \\left(\\frac{3}{\\sqrt{7}}\\right)^{-2}}',
      answer: '1',
    },
    { id: 10, expression: '3^{\\log_{27} 8} - \\sqrt[3]{0,027}', answer: '2,7' },
    { id: 11, expression: '\\log_{\\sqrt{2}} 4 - 4', answer: '0' },
    { id: 12, expression: '\\log_5 50 + \\log_{\\frac{1}{5}} 2', answer: '2' },
    { id: 13, expression: '\\log_3 54 - \\log_{\\frac{1}{3}} 0,5', answer: '3' },
    { id: 14, expression: '1,5 + \\log_2 \\sqrt{8}', answer: '3' },
    { id: 15, expression: '\\log_3 36 - 2\\log_3 2', answer: '2' },
    { id: 16, expression: '\\log_{\\frac{1}{2}} \\frac{4}{5} - \\log_2 5', answer: '-2' },
    { id: 17, expression: '\\log_{81} 27 + 4^{-1}', answer: '1' },
    { id: 18, expression: '\\left(4^{\\log_2 3}\\right)^{\\frac{3}{2}} - \\log_4 64', answer: '24' },
    { id: 19, expression: '2\\log_9 4 + \\log_{\\frac{1}{9}} 48', answer: '-\\frac{1}{2}' },
    {
      id: 20,
      expression: '\\sqrt{\\log_2(\\sqrt{23} - \\sqrt{7}) + \\log_2(\\sqrt{23} + \\sqrt{7})}',
      answer: '2',
    },
  ],
  mediu: [
    { id: 21, expression: '2^{\\log_2 7 + \\log_3 \\frac{1}{9}}', answer: '\\frac{7}{4}' },
    { id: 22, expression: '36^{\\frac{1}{\\log_5 6}} - 32^{\\frac{2}{5}}', answer: '21' },
    { id: 23, expression: '9^{\\log_3 7} - \\log_4 64', answer: '46' },
    { id: 24, expression: '49^{1-\\log_7 2} + 5^{-\\log_5 4}', answer: '\\frac{25}{2}' },
    { id: 25, expression: '36^{\\log_6 5} + 10^{1-\\lg 2} - 3^{\\log_9 36}', answer: '24' },
    { id: 26, expression: '\\log_{\\frac{1}{4}}(\\log_2 3 \\cdot \\log_3 4)', answer: '-\\frac{1}{2}' },
    { id: 27, expression: '25^{\\log_5 3\\sqrt{5}-\\log_5 \\sqrt{3}}', answer: '15' },
    { id: 28, expression: '\\log_3 27 + \\log_8 2 + \\log_{\\sqrt{5}} 5 + \\log_{\\frac{1}{7}} \\sqrt{7}', answer: '\\frac{29}{6}' },
    { id: 29, expression: '\\left(\\frac{8}{27}\\right)^{-\\frac{1}{3}} + \\log_3 36 - \\log_3 4', answer: '\\frac{7}{2}' },
    { id: 30, expression: '\\frac{4}{5}\\left[1 + \\left(\\frac{1}{4}\\right)^{-3}\\right]^{\\log_{65} 5}', answer: '4' },
    { id: 31, expression: '9^{\\log_3 5} - \\log_5 25', answer: '23' },
    {
      id: 32,
      expression: '\\log_3 27 - \\sqrt{6^{\\frac{1}{4}} + 3^{\\log_{\\sqrt{3}} \\frac{\\sqrt{2}}{2}}}',
      answer: '3 - \\sqrt{\\sqrt[4]{6} + \\frac{1}{2}}',
    },
    { id: 33, expression: '9^{1+\\log_3 2}', answer: '36' },
    { id: 34, expression: '\\log_3(3\\log_3 27) + \\log_{\\frac{1}{2}}(\\log_2 \\sqrt{2})', answer: '3' },
    { id: 35, expression: '\\log_3 18 + \\log_9 \\frac{1}{4}', answer: '2' },
    { id: 36, expression: '\\sqrt{10^{2+\\frac{1}{2}\\lg 16}}', answer: '20' },
    { id: 37, expression: '\\sqrt{25^{\\frac{1}{\\log_6 5}} + 49^{\\frac{1}{\\log_6 7}}}', answer: '6\\sqrt{2}' },
    { id: 38, expression: '\\frac{1}{2}\\lg 36 + \\log_{0,1} 60', answer: '-1' },
    { id: 39, expression: '5^{\\log_{\\sqrt{5}} 4 + 2\\log_5 3}', answer: '144' },
    { id: 40, expression: '2^{\\log_2 \\frac{1}{8}} + \\sqrt[3]{27}', answer: '\\frac{25}{8}' },
  ],
  dificil: [
    {
      id: 1,
      expression:
        '\\sqrt{10^{2+\\frac{1}{2}\\lg 16}}-\\log_{\\frac{1}{4}}\\left(\\log_2 3\\cdot \\log_3 4\\right)',
      answer: '\\frac{41}{2}',
    },
    {
      id: 2,
      expression:
        '\\sqrt{25^{\\frac{1}{\\log_6 5}}+49^{\\frac{1}{\\log_6 7}}}-\\left(\\frac{8}{27}\\right)^{-\\frac{1}{3}}',
      answer: '6\\sqrt{2}-\\frac{3}{2}',
    },
    {
      id: 3,
      expression: '36^{\\log_6 5}+10^{1-\\lg 2}-3^{\\log_9 36}-32^{\\frac{2}{5}}',
      answer: '20',
    },
    {
      id: 4,
      expression: '\\log_3\\left(3\\log_3 27\\right)+\\log_{\\frac{1}{2}}\\left(\\log_2 \\sqrt{2}\\right)',
      answer: '3',
    },
    {
      id: 5,
      expression:
        '\\sqrt{\\log_2\\left(\\sqrt{23}-\\sqrt{7}\\right)+\\log_2\\left(\\sqrt{23}+\\sqrt{7}\\right)+\\log_{81}27-\\frac{1}{4}}',
      answer: '\\frac{3\\sqrt{2}}{2}',
    },
    {
      id: 6,
      expression: '\\sqrt[3]{0,008}\\cdot \\left(\\frac{125}{8}\\right)^{-\\frac{2}{3}}+(0,04)^{-\\frac{1}{2}}',
      answer: '\\frac{629}{125}',
    },
    {
      id: 7,
      expression:
        '\\sqrt{\\left(\\frac{1}{10}\\right)^{-2}+\\left(16^{\\frac{3}{4}}\\right)^2\\cdot 81^{\\frac{1}{2}}}-\\sqrt{9^{1,5}-2}',
      answer: '21',
    },
    {
      id: 8,
      expression: '3^{\\log_{27}8}-\\sqrt[3]{0,027}+\\log_{\\sqrt{2}}4-4',
      answer: '\\frac{17}{10}',
    },
    {
      id: 9,
      expression: '\\left(\\frac{4}{5}\\right)\\left[1+\\left(\\frac{1}{4}\\right)^{-3}\\right]^{\\log_{65}5}-\\log_5 25',
      answer: '2',
    },
    {
      id: 10,
      expression: '\\log_3 54-\\log_{\\frac{1}{3}}0,5+\\log_5 50+\\log_{\\frac{1}{5}}2',
      answer: '5',
    },
    {
      id: 11,
      expression:
        '\\sqrt{\\left(2^{\\log_2 7+\\log_2 4}\\right)\\left(3^{\\log_3 5+\\log_3 9}\\right)}-2\\cdot 3^2\\cdot 7',
      answer: '6\\sqrt{35}-126',
    },
    {
      id: 12,
      expression: '\\sqrt{\\left(49^{1-\\log_7 2}\\right)\\left(25^{1-\\log_5 4}\\right)}-\\frac{35}{2}',
      answer: '-\\frac{105}{8}',
    },
    {
      id: 13,
      expression: '\\sqrt{2^{2\\log_2 9}\\cdot 3^{2\\log_3 4}}-\\left(2^2\\cdot 3^2\\right)^2',
      answer: '-1260',
    },
    {
      id: 14,
      expression: '\\sqrt{9^{\\log_3 8}\\cdot 4^{\\log_2 27}}-6^{\\log_6 1728}',
      answer: '-1512',
    },
    {
      id: 15,
      expression: '\\sqrt{16^{\\log_4 27}\\cdot 27^{\\log_3 16}}-\\left(2^4\\cdot 3^3\\right)^2',
      answer: '-184896',
    },
    {
      id: 16,
      expression:
        '\\log_2\\left(\\frac{\\sqrt{3}-1}{\\sqrt{3}+1}\\right)+\\log_2\\left(\\sqrt{3}+1\\right)+\\log_2\\left(\\sqrt{3}-1\\right)',
      answer: '\\log_2\\left(4-2\\sqrt{3}\\right)',
    },
    {
      id: 17,
      expression:
        '\\log_3\\left(\\frac{26-15\\sqrt{3}}{2}\\right)+\\log_3\\left(\\frac{26+15\\sqrt{3}}{2}\\right)',
      answer: '-\\log_3 4',
    },
    {
      id: 18,
      expression:
        '\\sqrt{\\log_2\\left(\\frac{1}{8}\\right)\\cdot \\log_8 2}+\\sqrt{\\log_3\\left(\\frac{1}{27}\\right)\\cdot \\log_{27} 3}',
      answer: '\\text{nedefinit in }\\mathbb{R}',
    },
    {
      id: 19,
      expression:
        '\\left(2^{\\log_2 3}\\right)^{\\log_3 5}\\cdot \\left(5^{\\log_5 2}\\right)^{\\log_2 7}-3\\cdot 7',
      answer: '14',
    },
    {
      id: 20,
      expression:
        '\\sqrt{\\left(\\log_2 18\\right)\\left(\\log_3 8\\right)\\left(\\lg 9\\right)\\left(\\log_9 6\\right)}',
      answer: '\\sqrt{3\\log_3 18\\cdot \\lg 6}',
    },
  ],
} as const

export type TrainingLevelKey = keyof typeof trainingLevels
