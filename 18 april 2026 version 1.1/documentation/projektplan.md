# Projektplan

## Metadata
- Version: 1.0
- Dato: 2026-04-24
- Ejer: Rasmus Kragh Wendelbo

---

## Status
Færdig – klar til implementering.

---

## Uafklarede punkter
- Ingen deadline – projektet gennemføres i eget tempo
- Team: Solo-projekt (kun Rasmus)

---

## Implementeringsplan

### Fase 1 – Opsætning
- Opret GitHub repository
- Opret branches: `main` (produktion/GitHub Pages) og `dev` (udvikling)
- Opret mappestruktur: `index.html`, `css/style.css`, `js/main.js`, `img/`, `tests/`, `README.md`
- Tilføj Bootstrap via CDN i `index.html`
- Al udvikling sker på `dev` – merge til `main` ved godkendte ændringer

### Fase 2 – HTML-struktur
- Byg single-page layout med sektioner: Om mig, Erfaring, Workshops, Uddannelse, Kompetencer, Referencer, Kontakt
- Tilføj navigationsmenu øverst med ankre til sektionerne
- Brug placeholder-tekst og placeholder-billede

### Fase 3 – Design
- Implementér analogt grønt farvetema i `style.css`
- Responsivt layout via Bootstrap grid
- Tilføj sort/hvid-knap med JavaScript-toggle i `main.js`

### Fase 4 – Kontaktformular
- Opret Formspree-konto og hent endpoint
- Tilslut kontaktformular til Formspree (HTTP POST til raskrawen@gmail.com)

### Fase 5 – Tests
- Skriv Playwright end-to-end tests (navigation, formular, farve-skift, responsivt)
- Skriv Jest enhedstests (JS-funktioner, fx farve-toggle)

### Fase 6 – Deployment
- Aktiver GitHub Pages i repository-indstillinger
- Push kode til main-branch og verificér siden er tilgængelig

### Fase 7 – Indhold
- Erstat alle placeholders med rigtigt indhold (tekster, billede, workshops, erfaring osv.)
