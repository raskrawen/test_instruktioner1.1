# Teknikspecifikation

## Metadata
- Version: 0.1 (under udarbejdelse)
- Dato: 2026-04-24
- Ejer: Rasmus Kragh Wendelbo

---

## Status
Dokument under opbygning. Opdateres løbende under interview.

---

## Uafklarede punkter
*(Ingen på nuværende tidspunkt)*

---

## 1. Arkitektur
- Statisk webside – ingen server-side logik
- Én HTML-fil med sektioner, Bootstrap til layout, custom CSS til design, JS til interaktivitet
- Kontaktformular håndteres via Formspree (ekstern tjeneste)

## 2. Stack (teknologier)
- Sprog: HTML, CSS, JavaScript
- CSS-framework: Bootstrap (gratis, responsivt, junior-venligt)
- E-mailformular: Formspree (gratis tredjeparts tjeneste – sender formulardata som e-mail)

## 3. Datamodel
- Ingen datamodel – siden er statisk og gemmer ingen data lokalt
- Formulardata sendes direkte til Formspree og videresendes som e-mail

## 4. Lagring
- Ingen lokal lagring
- Al kode hostes som statiske filer på GitHub Pages

## 5. Platform og hosting
- GitHub Pages (statisk hosting)
- Standard mappestruktur:
  ```
  /
  ├── index.html
  ├── css/
  │   └── style.css
  ├── js/
  │   └── main.js
  ├── img/
  │   └── (profilbillede m.m.)
  ├── tests/
  │   └── (Playwright og Jest tests)
  └── README.md
  ```

## 6. Sikkerhed
- Ingen særlige sikkerhedskrav
- Formspree håndterer form-submission sikkert via HTTPS

## 7. Integration og API'er
- Formspree API: Kontaktformular poster til Formspree endpoint (HTTP POST)
- Ingen øvrige integrationer på nuværende tidspunkt

## 8. Logning
- Ingen logning – siden er statisk
- Fejl i kontaktformular vises som brugervenlig fejlbesked i browseren

## 9. Afhængigheder
- Bootstrap (CDN eller lokal)
- Formspree (ekstern tjeneste via HTTP POST)
- Playwright (dev-afhængighed til tests)
- Jest (dev-afhængighed til tests)

## 10. Tests
- End-to-end tests: Playwright (browsersimulering)
- Enhedstests og integrationstests: Jest
- Dækker: Positive flows, fejlflows og reconnect-scenarier
- Belastningstest: Systemet skal kunne håndtere op til 30 samtidige klienter i kritiske realtidsflows

## 11. Deployment
- Manuel deployment – Rasmus pusher selv til GitHub
- Hosting: GitHub Pages (serverer statiske filer direkte fra repository)
- GitHub repository: Ikke oprettet endnu – skal oprettes som første trin i udviklingen

## 12. Dokumentation
- README.md i projektroden med instruktioner til lokal kørsel og deployment til GitHub Pages

## 13. Andre relevante aspekter
- JavaScript: Kun standard animationer og interaktivitet (Bootstrap's indbyggede JS + farve-skift-knap)
