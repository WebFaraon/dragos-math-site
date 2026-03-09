const mojibakeMap: Record<string, string> = {
  'И›': 'ț',
  'И™': 'ș',
  'И': 'Ș',
  'Иљ': 'Ț',
  'Г®': 'î',
  'Гў': 'â',
  'Дѓ': 'ă',
  'ГЋ': 'Î',
  'Г‚': 'Â',
}

export const normalizeMojibake = (value: string) =>
  Object.entries(mojibakeMap).reduce((current, [bad, good]) => current.replaceAll(bad, good), value)

