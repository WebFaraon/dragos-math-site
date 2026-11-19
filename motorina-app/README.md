# DieselLog

Jurnal de bord pentru mașină: consum de motorină, kilometraj, trasee, costuri și scadențe.
Aplicație web instalabilă (PWA), HTML + CSS + JS simplu, fără build și fără dependențe.
Datele se salvează local în browser (localStorage) și funcționează fără internet.

## Rulare locală
```bash
cd motorina-app
python3 -m http.server 8080
# deschide http://localhost:8080
```
Instalarea pe telefon cere HTTPS (sau localhost), deci aplicația trebuie publicată (ex. GitHub Pages, Vercel, Netlify).

## Ce poți introduce
- **Alimentări**: data, kilometraj de pe bord, litri, preț/litru, benzinărie (NOW, Rompetrol, Bemol, Lukoil, Petrom sau altă stație), rezervor plin sau parțial
- **Trasee**: de la, până la, distanță, durată, data și ora; opțional se adaugă la kilometrajul total
- **Mașina**: marcă, motorizare, putere, an, număr, rezervor, consum de referință, kilometraj curent
- **Scadențe**: la kilometraj (ulei, plăcuțe) sau la dată (ITP, RCA, rovinietă)
- Înregistrările se pot șterge; datele se pot exporta (JSON)

## Cum se calculează
- Consumul se calculează între două alimentări pline; până atunci se folosește consumul de referință.
- Nivelul din rezervor este o estimare: ultima alimentare plină, minus kilometrii parcurși × consum mediu.
- Costul pe kilometru = consum mediu × prețul mediu din ultimele alimentări.

## Fișiere
`index.html` · `styles.css` · `app.js` · `sw.js` (offline) · `manifest.webmanifest` · `icons/` · `fonts/`
