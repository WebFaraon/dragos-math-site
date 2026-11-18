# DieselLog — macheta

Aplicație web instalabilă (PWA) pentru consumul de motorină, kilometraj, trasee și costuri.
HTML + CSS + JS simplu, fără build și fără dependențe. Datele sunt demonstrative și se salvează local (localStorage).

## Rulare locală
```bash
cd motorina-app
python3 -m http.server 8080
# deschide http://localhost:8080
```
Instalarea pe telefon cere HTTPS (sau localhost), deci aplicația trebuie publicată (ex. GitHub Pages, Vercel, Netlify).

## Ce conține macheta
- **Acasă**: kilometraj total (odometru animat), rezervor estimat, consum mediu, cost/km, grafice km/zi și consum
- **Alimentări**: istoric, preț/litru, cheltuieli pe lună, formular „Alimentare nouă" (funcțional)
- **Trasee**: hartă schematică a locurilor, destinații frecvente, jurnal, formular „Traseu nou" (funcțional)
- **Mașina**: date tehnice, scadențe (ulei, plăcuțe, rovinietă, RCA, ITP), preferințe, instalare, export date
- Temă automată / întunecată / luminoasă, dropdownuri și switchuri personalizate, animații (se pot opri din Preferințe)

## Fișiere
`index.html` · `styles.css` · `app.js` · `sw.js` (offline) · `manifest.webmanifest` · `icons/` · `fonts/`
