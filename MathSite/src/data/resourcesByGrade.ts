import type { BacTopicContent, BacNavItem } from '../types/bacContent'
import { bacNavItems } from './bacTopics'
import { bacContentByTopic } from './bacContent'

type Grade = 9 | 12

type GradeResourcesConfig = {
  navItems: BacNavItem[]
  contentByTopic: Map<string, BacTopicContent>
  defaultTopicId: string
}

const grade9NavItems: BacNavItem[] = [
  {
    itemId: 'g9-item1',
    title: 'Itemul 1',
    topics: [
      { id: 'g9-item1-basic-number-operations', title: 'Operații de bază cu numere' },
      { id: 'g9-item1-fractions', title: 'Fracții' },
      { id: 'g9-item1-powers-order-of-operations', title: 'Puteri. Ordinea operațiilor' },
      { id: 'g9-item1-all', title: 'Item 1 - toate tipurile de exerciții' },
    ],
  },
  {
    itemId: 'g9-item2',
    title: 'Itemul 2',
    topics: [
      { id: 'g9-item2-plane-geometry-basics', title: 'Geometrie plană - noțiuni de bază' },
      { id: 'g9-item2-all', title: 'Item 2 - toate tipurile de exerciții' },
    ],
  },
  {
    itemId: 'g9-item3',
    title: 'Itemul 3',
    topics: [
      { id: 'g9-item3-linear-function-properties', title: 'Funcția de gradul 1 - Proprietăți' },
      { id: 'g9-item3-quadratic-function-properties', title: 'Funcția de gradul 2 - Proprietăți' },
      { id: 'g9-item3-all', title: 'Item 3 - toate tipurile de exerciții' },
    ],
  },
  {
    itemId: 'g9-item4',
    title: 'Itemul 4',
    topics: [
      { id: 'g9-item4-percentages-and-ratios', title: 'Procente și rapoarte' },
      { id: 'g9-item4-ratio-expressions', title: 'Expresii cu rapoarte' },
      { id: 'g9-item4-all', title: 'Item 4 - toate tipurile de exerciții' },
    ],
  },
  {
    itemId: 'g9-item5',
    title: 'Itemul 5',
    topics: [
      { id: 'g9-item5-powers', title: 'Puteri' },
      { id: 'g9-item5-radicals', title: 'Radicali' },
      { id: 'g9-item5-all', title: 'Item 5 - toate tipurile de exerciții' },
    ],
  },
  {
    itemId: 'g9-item6',
    title: 'Itemul 6',
    topics: [
      { id: 'g9-item6-sets', title: 'Mulțimi' },
      { id: 'g9-item6-quadratic-equations', title: 'Ecuații de gr 2' },
      { id: 'g9-item6-all', title: 'Item 6 - toate tipurile de exerciții' },
    ],
  },
  {
    itemId: 'g9-item7',
    title: 'Itemul 7',
    topics: [
      { id: 'g9-item7-advanced-plane-geometry', title: 'Geometrie plană avansată' },
      { id: 'g9-item7-all', title: 'Item 7 - toate tipurile de exerciții' },
    ],
  },
  {
    itemId: 'g9-item8',
    title: 'Itemul 8',
    topics: [
      { id: 'g9-item8-linear-equations', title: 'Ecuații de gradul 1' },
      { id: 'g9-item8-equation-systems', title: 'Sistem de ecuații' },
      { id: 'g9-item8-system-building-logic', title: 'Logica Alcătuirii Sistemului de Ecuații' },
      { id: 'g9-item8-all', title: 'Item 8 - toate tipurile de exerciții' },
    ],
  },
  {
    itemId: 'g9-item9',
    title: 'Itemul 9',
    topics: [
      { id: 'g9-item9-linear-inequalities', title: 'Inecuații de gradul 1' },
      { id: 'g9-item9-inequalities-with-linear-functions', title: 'Inecuații cu funcții de gradul 1' },
      { id: 'g9-item9-domain-range-in-functions', title: 'DVA în funcții' },
      { id: 'g9-item9-all', title: 'Item 9 - toate tipurile de exerciții' },
    ],
  },
  {
    itemId: 'g9-item10',
    title: 'Itemul 10',
    topics: [
      { id: 'g9-item10-cube', title: 'Cubul' },
      { id: 'g9-item10-rectangular-parallelepiped', title: 'Paralelipiped dreptunghic (cuboid)' },
      { id: 'g9-item10-prism', title: 'Prisma' },
      { id: 'g9-item10-pyramid', title: 'Piramida' },
      { id: 'g9-item10-cylinder', title: 'Cilindrul' },
      { id: 'g9-item10-cone', title: 'Conul' },
      { id: 'g9-item10-sphere', title: 'Sfera' },
      { id: 'g9-item10-all', title: 'Item 10 - toate tipurile de exerciții' },
    ],
  },
  {
    itemId: 'g9-item11',
    title: 'Itemul 11',
    topics: [
      { id: 'g9-item11-factor-decomposition', title: 'Descompuneri în Factori' },
      { id: 'g9-item11-domain-in-algebraic-ratios', title: 'DVA în rapoarte algebrice' },
      { id: 'g9-item11-simplifying-algebraic-ratio', title: 'Simplificarea raportului algebric' },
      { id: 'g9-item11-operations-with-algebraic-ratios', title: 'Operații cu rapoarte algebrice' },
      { id: 'g9-item11-equations-with-algebraic-ratios', title: 'Ecuații cu rapoarte algebrice' },
      { id: 'g9-item11-all', title: 'Item 11 - toate tipurile de exerciții' },
    ],
  },
  {
    itemId: 'g9-item12',
    title: 'Itemul 12',
    topics: [
      { id: 'g9-item12-function-properties-degree-1-2', title: 'Proprietățile funcției de gradul 1 și 2' },
      { id: 'g9-item12-all', title: 'Item 12 - toate tipurile de exerciții' },
    ],
  },
]

const grade9Content: BacTopicContent[] = [
  {
    topicId: 'algebraic-calculations',
    title: 'Calcule algebrice',
    subtitle: 'Operatii cu expresii algebrice si reguli de simplificare.',
    blocks: [
      { type: 'heading', id: 'reguli-baza', level: 2, text: 'Reguli de baza' },
      { type: 'text', text: 'Respectam ordinea operatiilor: paranteze, puteri, inmultiri/impartiri, adunari/scaderi.' },
      { type: 'formula', latex: '2a+3a=5a' },
      { type: 'heading', id: 'factorizare', level: 2, text: 'Factorizare' },
      { type: 'text', text: 'Scoatem factorul comun pentru a simplifica expresiile si a pregati ecuatiile.' },
      { type: 'formula', latex: '6x^2+9x=3x(2x+3)' },
    ],
  },
  {
    topicId: 'basic-plane-geometry',
    title: 'Geometrie plana de baza',
    subtitle: 'Unghiuri, triunghiuri si proprietati esentiale.',
    blocks: [
      { type: 'heading', id: 'triunghi-suma', level: 2, text: 'Suma unghiurilor' },
      { type: 'formula', latex: '\\angle A+\\angle B+\\angle C=180^\\circ' },
      { type: 'heading', id: 'perimetru-aria', level: 2, text: 'Perimetru si arie' },
      { type: 'formula', latex: 'P_{\\triangle}=a+b+c' },
      { type: 'formula', latex: 'A_{\\triangle}=\\frac{a\\cdot h_a}{2}' },
    ],
  },
  {
    topicId: 'linear-and-quadratic-functions',
    title: 'Functii liniare si patratice',
    subtitle: 'Reprezentare grafica si interpretarea coeficientilor.',
    blocks: [
      { type: 'heading', id: 'functie-liniara', level: 2, text: 'Functia liniara' },
      { type: 'formula', latex: 'f(x)=mx+n' },
      { type: 'heading', id: 'functie-patratica', level: 2, text: 'Functia patratica' },
      { type: 'formula', latex: 'f(x)=ax^2+bx+c,\\ a\\ne0' },
    ],
  },
  {
    topicId: 'ratios-and-percentages',
    title: 'Rapoarte si procente',
    subtitle: 'Transformari procentuale rapide pentru probleme aplicate.',
    blocks: [
      { type: 'heading', id: 'procent-din-numar', level: 2, text: 'Procent din numar' },
      { type: 'formula', latex: 'p\\%\\text{ din }N=\\frac{p}{100}\\cdot N' },
      { type: 'heading', id: 'crestere-scadere', level: 2, text: 'Crestere si scadere procentuala' },
      { type: 'formula', latex: 'N_{nou}=N_{initial}\\cdot\\left(1\\pm\\frac{p}{100}\\right)' },
    ],
  },
  {
    topicId: 'powers-and-radicals',
    title: 'Puteri si radicali',
    subtitle: 'Proprietati de calcul folosite in simplificari.',
    blocks: [
      { type: 'heading', id: 'proprietati-puteri', level: 2, text: 'Proprietati ale puterilor' },
      { type: 'formula', latex: 'a^m\\cdot a^n=a^{m+n}' },
      { type: 'formula', latex: '\\frac{a^m}{a^n}=a^{m-n},\\ a\\ne0' },
      { type: 'heading', id: 'proprietati-radicali', level: 2, text: 'Proprietati ale radicalilor' },
      { type: 'formula', latex: '\\sqrt{ab}=\\sqrt a\\cdot\\sqrt b,\\ a,b\\ge0' },
    ],
  },
  {
    topicId: 'quadratic-equations',
    title: 'Ecuatii de gradul al doilea',
    subtitle: 'Formula discriminantului si tipuri de solutii.',
    blocks: [
      { type: 'heading', id: 'forma-generala', level: 2, text: 'Forma generala' },
      { type: 'formula', latex: 'ax^2+bx+c=0,\\ a\\ne0' },
      { type: 'heading', id: 'discriminant', level: 2, text: 'Discriminant' },
      { type: 'formula', latex: '\\Delta=b^2-4ac' },
      { type: 'formula', latex: 'x_{1,2}=\\frac{-b\\pm\\sqrt\\Delta}{2a}' },
    ],
  },
  {
    topicId: 'advanced-plane-geometry',
    title: 'Geometrie plana avansata',
    subtitle: 'Asemanare de triunghiuri, teoreme si aplicatii.',
    blocks: [
      { type: 'heading', id: 'asemanare', level: 2, text: 'Asemanarea triunghiurilor' },
      { type: 'formula', latex: '\\frac{AB}{A\\prime B\\prime}=\\frac{BC}{B\\prime C\\prime}=\\frac{CA}{C\\prime A\\prime}' },
      { type: 'heading', id: 'teorema-lui-thales', level: 2, text: 'Teorema lui Thales' },
      { type: 'text', text: 'Segmentele determinate de paralele pe doua secante sunt proportionale.' },
    ],
  },
  {
    topicId: 'systems-of-equations',
    title: 'Sisteme de ecuatii',
    subtitle: 'Metode de substitutie si reducere pentru sisteme 2x2.',
    blocks: [
      { type: 'heading', id: 'metoda-substitutiei', level: 2, text: 'Metoda substitutiei' },
      { type: 'text', text: 'Izolam o necunoscuta dintr-o ecuatie si inlocuim in cealalta.' },
      { type: 'heading', id: 'metoda-reducerii', level: 2, text: 'Metoda reducerii' },
      { type: 'text', text: 'Aducem ecuatiile la forma convenabila si eliminam una dintre necunoscute.' },
    ],
  },
  {
    topicId: 'linear-inequalities',
    title: 'Inecuatii liniare',
    subtitle: 'Rezolvare in R si reprezentare pe axa numerelor.',
    blocks: [
      { type: 'heading', id: 'reguli-transformare', level: 2, text: 'Reguli de transformare' },
      { type: 'text', text: 'Cand inmultim sau impartim cu un numar negativ, sensul inegalitatii se inverseaza.' },
      { type: 'heading', id: 'forma-standard', level: 2, text: 'Forma standard' },
      { type: 'formula', latex: 'ax+b\\le c\\Rightarrow x\\le\\frac{c-b}{a},\\ a>0' },
    ],
  },
  {
    topicId: 'solid-geometry',
    title: 'Geometrie in spatiu',
    subtitle: 'Volume si arii pentru corpuri uzuale.',
    blocks: [
      { type: 'heading', id: 'prisma', level: 2, text: 'Prisma' },
      { type: 'formula', latex: 'V_{prisma}=A_{baza}\\cdot h' },
      { type: 'heading', id: 'piramida', level: 2, text: 'Piramida' },
      { type: 'formula', latex: 'V_{piramida}=\\frac{A_{baza}\\cdot h}{3}' },
    ],
  },
  {
    topicId: 'algebraic-fractions',
    title: 'Fractii algebrice',
    subtitle: 'Domeniu de definitie, simplificare si adunare/scadere.',
    blocks: [
      { type: 'heading', id: 'domeniu', level: 2, text: 'Domeniu de definitie' },
      { type: 'text', text: 'Numitorul trebuie sa fie nenul pentru toate valorile admise ale variabilei.' },
      { type: 'heading', id: 'operatii', level: 2, text: 'Operatii de baza' },
      { type: 'formula', latex: '\\frac{a}{b}\\pm\\frac{c}{d}=\\frac{ad\\pm bc}{bd},\\ bd\\ne0' },
    ],
  },
  {
    topicId: 'functions-with-parameters',
    title: 'Functii cu parametri',
    subtitle: 'Analiza conditiilor in functie de parametru.',
    blocks: [
      { type: 'heading', id: 'strategie', level: 2, text: 'Strategie de rezolvare' },
      { type: 'text', text: 'Separati cazul general de cazurile particulare unde anumiti coeficienti devin nuli.' },
      { type: 'heading', id: 'exemplu-parametru', level: 2, text: 'Exemplu' },
      { type: 'formula', latex: 'f(x)=ax+b\\quad\\Rightarrow\\quad f(x)=0\\iff x=-\\frac{b}{a},\\ a\\ne0' },
    ],
  },
]

const grade9ContentByTopic = new Map(grade9Content.map((entry) => [entry.topicId, entry]))

const grade9TopicAliases: Array<[string, string]> = [
  ['g9-item1-basic-number-operations', 'algebraic-calculations'],
  ['g9-item1-fractions', 'algebraic-fractions'],
  ['g9-item1-powers-order-of-operations', 'powers-and-radicals'],
  ['g9-item1-all', 'algebraic-calculations'],
  ['g9-item2-plane-geometry-basics', 'basic-plane-geometry'],
  ['g9-item2-all', 'basic-plane-geometry'],
  ['g9-item3-linear-function-properties', 'linear-and-quadratic-functions'],
  ['g9-item3-quadratic-function-properties', 'linear-and-quadratic-functions'],
  ['g9-item3-all', 'linear-and-quadratic-functions'],
  ['g9-item4-percentages-and-ratios', 'ratios-and-percentages'],
  ['g9-item4-ratio-expressions', 'ratios-and-percentages'],
  ['g9-item4-all', 'ratios-and-percentages'],
  ['g9-item5-powers', 'powers-and-radicals'],
  ['g9-item5-radicals', 'powers-and-radicals'],
  ['g9-item5-all', 'powers-and-radicals'],
  ['g9-item6-sets', 'quadratic-equations'],
  ['g9-item6-quadratic-equations', 'quadratic-equations'],
  ['g9-item6-all', 'quadratic-equations'],
  ['g9-item7-advanced-plane-geometry', 'advanced-plane-geometry'],
  ['g9-item7-all', 'advanced-plane-geometry'],
  ['g9-item8-linear-equations', 'systems-of-equations'],
  ['g9-item8-equation-systems', 'systems-of-equations'],
  ['g9-item8-system-building-logic', 'systems-of-equations'],
  ['g9-item8-all', 'systems-of-equations'],
  ['g9-item9-linear-inequalities', 'linear-inequalities'],
  ['g9-item9-inequalities-with-linear-functions', 'linear-inequalities'],
  ['g9-item9-domain-range-in-functions', 'linear-and-quadratic-functions'],
  ['g9-item9-all', 'linear-inequalities'],
  ['g9-item10-cube', 'solid-geometry'],
  ['g9-item10-rectangular-parallelepiped', 'solid-geometry'],
  ['g9-item10-prism', 'solid-geometry'],
  ['g9-item10-pyramid', 'solid-geometry'],
  ['g9-item10-cylinder', 'solid-geometry'],
  ['g9-item10-cone', 'solid-geometry'],
  ['g9-item10-sphere', 'solid-geometry'],
  ['g9-item10-all', 'solid-geometry'],
  ['g9-item11-factor-decomposition', 'algebraic-calculations'],
  ['g9-item11-domain-in-algebraic-ratios', 'algebraic-fractions'],
  ['g9-item11-simplifying-algebraic-ratio', 'algebraic-fractions'],
  ['g9-item11-operations-with-algebraic-ratios', 'algebraic-fractions'],
  ['g9-item11-equations-with-algebraic-ratios', 'algebraic-fractions'],
  ['g9-item11-all', 'algebraic-fractions'],
  ['g9-item12-function-properties-degree-1-2', 'functions-with-parameters'],
  ['g9-item12-all', 'functions-with-parameters'],
]

grade9TopicAliases.forEach(([aliasId, sourceId]) => {
  const source = grade9ContentByTopic.get(sourceId)
  if (!source) return
  grade9ContentByTopic.set(aliasId, {
    ...source,
    topicId: aliasId,
  })
})

const grade12DefaultTopicId = bacNavItems[0]?.topics[0]?.id ?? 'operatii-numere'
const grade9DefaultTopicId = grade9NavItems[0]?.topics[0]?.id ?? 'g9-item1-basic-number-operations'

export const resourcesByGrade: Record<Grade, GradeResourcesConfig> = {
  9: {
    navItems: grade9NavItems,
    contentByTopic: grade9ContentByTopic,
    defaultTopicId: grade9DefaultTopicId,
  },
  12: {
    navItems: bacNavItems,
    contentByTopic: bacContentByTopic,
    defaultTopicId: grade12DefaultTopicId,
  },
}
