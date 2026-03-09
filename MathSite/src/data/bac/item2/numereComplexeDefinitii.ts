import type { BacTopicContent } from '../../types/bacContent'

export const numereComplexeDefinitii: BacTopicContent = {
  topicId: 'numere-complexe-definitii',
  title: 'Numere complexe: Definiții',
  subtitle: 'Forma algebrică, partea reală/imaginară, modulul, conjugatul și condiția de egalitate.',
  blocks: [
    { type: 'heading', id: 'forma-generala', level: 2, text: '1. Forma unui număr complex' },
    {
      type: 'text',
      text: 'Un număr complex are forma z=a+bi, unde a,b sunt numere reale, iar i este unitatea imaginară.',
    },
    {
      type: 'formula',
      latex: 'z=a+bi,\\quad a,b\\in\\mathbb{R},\\quad i^2=-1',
    },
    {
      type: 'callout',
      variant: 'note',
      text: 'Mulțimea numerelor complexe este C. Numerele reale sunt incluse în C ca numere de forma a+0i.',
    },

    { type: 'heading', id: 'parte-reala-imaginara', level: 2, text: '2. Partea reală și partea imaginară' },
    {
      type: 'callout',
      variant: 'rule',
      text: 'Dacă z=a+bi, atunci Re(z)=a și Im(z)=b.',
    },
    { type: 'formula', latex: '\\operatorname{Re}(z)=a,\\quad \\operatorname{Im}(z)=b' },
    { type: 'text', text: 'Exemple:' },
    { type: 'formula', latex: 'z=2-i\\Rightarrow \\operatorname{Re}(z)=2,\\ \\operatorname{Im}(z)=-1' },
    { type: 'formula', latex: 'z=4i\\Rightarrow \\operatorname{Re}(z)=0,\\ \\operatorname{Im}(z)=4' },
    { type: 'formula', latex: 'z=-5\\Rightarrow \\operatorname{Re}(z)=-5,\\ \\operatorname{Im}(z)=0' },

    { type: 'heading', id: 'modul', level: 2, text: '3. Modulul unui număr complex' },
    {
      type: 'callout',
      variant: 'rule',
      text: 'Pentru z=a+bi, modulul este rădăcina pătrată a sumei pătratelor părților reală și imaginară.',
    },
    {
      type: 'formula',
      latex: '|z|=\\sqrt{\\operatorname{Re}(z)^2+\\operatorname{Im}(z)^2}=\\sqrt{a^2+b^2}',
    },
    { type: 'text', text: 'Exemple:' },
    { type: 'formula', latex: 'z=-12+5i\\Rightarrow |z|=\\sqrt{(-12)^2+5^2}=\\sqrt{169}=13' },
    { type: 'formula', latex: 'z=8-6i\\Rightarrow |z|=\\sqrt{8^2+(-6)^2}=\\sqrt{100}=10' },

    { type: 'heading', id: 'conjugat', level: 2, text: '4. Conjugatul unui număr complex' },
    {
      type: 'callout',
      variant: 'rule',
      text: 'Conjugatul lui z=a+bi se obține schimbând semnul părții imaginare.',
    },
    { type: 'formula', latex: '\\overline{z}=a-bi' },
    { type: 'text', text: 'Exemple:' },
    { type: 'formula', latex: 'z=-10+i\\Rightarrow \\overline{z}=-10-i' },
    { type: 'formula', latex: 'z=4i-1\\Rightarrow \\overline{z}=-1-4i' },
    { type: 'formula', latex: 'z=1-i\\Rightarrow \\overline{z}=1+i' },

    { type: 'heading', id: 'egalitate', level: 2, text: '5. Egalitatea a două numere complexe' },
    {
      type: 'callout',
      variant: 'rule',
      text: 'Două numere complexe sunt egale dacă au aceeași parte reală și aceeași parte imaginară.',
    },
    {
      type: 'formula',
      latex: 'z_1=z_2\\Longleftrightarrow \\operatorname{Re}(z_1)=\\operatorname{Re}(z_2)\\ \\text{și}\\ \\operatorname{Im}(z_1)=\\operatorname{Im}(z_2)',
    },

    { type: 'heading', id: 'proprietati', level: 2, text: '6. Proprietăți utile' },
    { type: 'formula', latex: 'b=0\\Rightarrow z\\in\\mathbb{R}' },
    { type: 'formula', latex: 'a=0\\Rightarrow z\\ \\text{este pur imaginar}' },

    { type: 'heading', id: 'exercitii-antrenament', level: 2, text: 'Exerciții de antrenament' },
    {
      type: 'exercise_list',
      levels: [
        {
          id: 'cx-usor',
          title: 'Nivel UȘOR',
          accent: 'easy',
          items: [
            {
              id: 'cx-usor-1',
              label: '1',
              prompt: 'Calculați conjugatul și modulul pentru:',
              latex: 'z=3+4i',
              answer: '\\overline{z}=3-4i,\\quad |z|=5',
            },
            {
              id: 'cx-usor-2',
              label: '2',
              prompt: 'Calculați dublul părții reale și modulul pentru:',
              latex: 'z=-2+5i',
              answer: '2\\operatorname{Re}(z)=-4,\\quad |z|=\\sqrt{29}',
            },
            {
              id: 'cx-usor-3',
              label: '3',
              prompt: 'Calculați conjugatul și dublul părții imaginare pentru:',
              latex: 'z=7-3i',
              answer: '\\overline{z}=7+3i,\\quad 2\\operatorname{Im}(z)=-6',
            },
            {
              id: 'cx-usor-4',
              label: '4',
              prompt: 'Determinați partea reală, partea imaginară și modulul pentru:',
              latex: 'z=-4i',
              answer: '\\operatorname{Re}(z)=0,\\ \\operatorname{Im}(z)=-4,\\ |z|=4',
            },
            {
              id: 'cx-usor-5',
              label: '5',
              prompt: 'Calculați modulul, conjugatul și suma părților pentru:',
              latex: 'z=1+2i',
              answer: '|z|=\\sqrt{5},\\ \\overline{z}=1-2i,\\ \\operatorname{Re}(z)+\\operatorname{Im}(z)=3',
            },
          ],
        },
        {
          id: 'cx-mediu',
          title: 'Nivel MEDIU',
          accent: 'medium',
          items: [
            {
              id: 'cx-mediu-1',
              label: '1',
              prompt: 'Determinați dublul părții reale și modulul pentru:',
              latex: 'z=-6+8i',
              answer: '2\\operatorname{Re}(z)=-12,\\quad |z|=10',
            },
            {
              id: 'cx-mediu-2',
              label: '2',
              prompt: 'Calculați modulul și conjugatul pentru:',
              latex: 'z=\\frac{5}{2}+\\frac{3}{2}i',
              answer: '|z|=\\frac{\\sqrt{34}}{2},\\quad \\overline{z}=\\frac{5}{2}-\\frac{3}{2}i',
            },
            {
              id: 'cx-mediu-3',
              label: '3',
              prompt: 'După ce calculați conjugatul, determinați părțile pentru:',
              latex: 'z=-10-4i',
              answer: '\\overline{z}=-10+4i,\\ \\operatorname{Re}(\\overline{z})=-10,\\ \\operatorname{Im}(\\overline{z})=4',
            },
            {
              id: 'cx-mediu-4',
              label: '4',
              prompt: 'Calculați modulul și dublul părții imaginare pentru:',
              latex: 'z=\\sqrt{3}+\\sqrt{2}i',
              answer: '|z|=\\sqrt{5},\\quad 2\\operatorname{Im}(z)=2\\sqrt{2}',
            },
            {
              id: 'cx-mediu-5',
              label: '5',
              prompt: 'Determinați partea reală, partea imaginară, modulul și conjugatul pentru:',
              latex: 'z=-\\frac{12}{7}-\\frac{5}{7}i',
              answer:
                '\\operatorname{Re}(z)=-\\frac{12}{7},\\ \\operatorname{Im}(z)=-\\frac{5}{7},\\ |z|=\\frac{13}{7},\\ \\overline{z}=-\\frac{12}{7}+\\frac{5}{7}i',
            },
          ],
        },
        {
          id: 'cx-dificil',
          title: 'Nivel DIFICIL',
          accent: 'hard',
          items: [
            {
              id: 'cx-dificil-1',
              label: '1',
              prompt: 'Determinați a și b știind că numerele sunt egale:',
              latex: '(a-2)+(b+1)i=5-3i',
              answer: 'a=7,\\ b=-4',
            },
            {
              id: 'cx-dificil-2',
              label: '2',
              prompt: 'Determinați m astfel încât modulul să fie 13:',
              latex: 'z=m-12i,\\quad |z|=13',
              answer: 'm\\in\\{-5,\\ 5\\}',
            },
            {
              id: 'cx-dificil-3',
              label: '3',
              prompt: 'Determinați parametrii din condiția de conjugare:',
              latex: 'z=(2a-1)+(b-4)i,\\quad \\overline{z}=3+2i',
              answer: 'a=2,\\ b=2',
            },
            {
              id: 'cx-dificil-4',
              label: '4',
              prompt: 'Determinați m și n dacă numărul este pur imaginar:',
              latex: 'z=(m^2-9)+(2n-6)i',
              answer: 'm\\in\\{-3,\\ 3\\},\\ n\\in\\mathbb{R}',
              details: 'Condiția de număr pur imaginar este Re(z)=0.',
            },
            {
              id: 'cx-dificil-5',
              label: '5',
              prompt: 'Determinați a din condiția de modul:',
              latex: 'z=(a-1)+(a+2)i,\\quad |z|=5',
              answer: 'a\\in\\{2,\\ -5\\}',
            },
          ],
        },
      ],
    },
  ],
}
