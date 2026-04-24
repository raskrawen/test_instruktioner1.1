# Rasmus Kragh Wendelbo - CV Webside

En professionel CV-webside designet til at præsentere Rasmus som workshop-facilitator for skoler og undervisere.

## 🎨 Features

- **Responsivt design** – funktionerer på mobil, tablet og desktop
- **Grønt analogt farvetema** – vildt og professionelt udtryk
- **Sort/hvid-toggle** – skifte mellem farvet og gråskala tilstand
- **Sticky navigation** – nemt at navigere rundt på siden
- **Kontaktformular** – integrer med Formspree for e-mail-modtagelse
- **Bootstrap 5** – moderne og tilgængelig
- **Ingen afhængigheder** – køres direkte i browser

## 📋 Indhold

Siden indeholder følgende sektioner:

1. **Hero** – Profilbillede + navn + kort beskrivelse
2. **Om mig** – Mere dybdegående information
3. **Erfaring** – Undervisningsbaggrund
4. **Workshops** – 2 workshops med beskrivelse
5. **Uddannelse** – Uddannelseshistorik
6. **Kompetencer** – Færdigheder og styrker
7. **Referencer** – Anbefalinger
8. **Kontakt** – Kontaktformular

## 🚀 Installation & Opsætning

### 1. Clone eller download projektet

```bash
git clone <repository-url>
cd cv-project
```

### 2. Opsætning af Formspree (for kontaktformular)

Siden bruger **Formspree** til at håndtere kontaktformular-indsendelser uden backend-server.

#### Trin:

1. Gå til [formspree.io](https://formspree.io) og opret en gratis konto
2. Opret et nyt form og tilknyt det til din e-mail: `raskrawen@gmail.com`
3. Kopiér dit **Form-ID** (fx: `f_abc123xyz`)
4. Åbn `js/main.js` og find denne linje:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```
5. Erstat `YOUR_FORM_ID` med dit eget Form-ID:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/f_abc123xyz';
   ```
6. Gem filen

**Formspree vil nu sende alle formularbemedinger til dine e-mail!**

### 3. Kør siden lokalt

Siden kræver en lokal server (file:// protokol tillader ikke nogle features).

#### Mulighed A: Python
```bash
python -m http.server 8000
# Besøg http://localhost:8000
```

#### Mulighed B: Node.js (http-server)
```bash
npm install -g http-server
http-server
# Besøg http://localhost:8080
```

#### Mulighed C: VS Code Live Server
Installer **Live Server** extension og højreklik `index.html` → "Open with Live Server"

## 📝 Personaliser siden

### Profilbillede
Erstat `img/profile.jpg` med dit eget billede (anbefalet størrelse: 150x150px)

### Tekst og indhold
Åbn `index.html` og rediger placeholder-tekst under hver sektion:
- Erstat "Rasmus Kragh Wendelbo" med dit navn
- Rediger "Om mig" sektionen
- Tilføj dine faktiske workshops
- Udfyld uddannelse, erfaring og kompetencer
- Tilføj henviser der kan bekræfte dine færdigheder
- Opdater telefonnummer

### Farver
Hvis du vil ændre farverne, åbn `css/style.css` og rediger CSS-variablerne øverst:
```css
:root {
    --green-dark: #1a5f2a;
    --green-medium: #2d8f3e;
    --green-light: #6bc34a;
    /* etc */
}
```

### Skrifttype
Bootstrap bruger "Roboto" som standard. For at ændre, rediger denne linje i `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Din-Skrifttype&display=swap" rel="stylesheet">
```

## 🧪 Tests

Projektet bruger **Playwright** til end-to-end tests og **Jest** til enhedstests.

### Installation

```bash
npm install --save-dev playwright jest babel-jest @babel/preset-env
```

### Kør tests

```bash
# End-to-end tests (Playwright)
npx playwright test

# Enhedstests (Jest)
npm test

# Begge
npm run test:all
```

Se `tests/` mappen for test-scripts.

## 🌐 Deployment til GitHub Pages

### Trin:

1. Opret et nyt GitHub repository: `cv-project`
2. Initialiser git lokalt:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CV webside"
   git branch -M main
   git remote add origin https://github.com/USERNAME/cv-project.git
   git push -u origin main
   ```

3. Aktivér GitHub Pages:
   - Gå til repository → **Settings** → **Pages**
   - Vælg **Source**: `main` branch
   - Gem

4. Siden vil være live på: `https://USERNAME.github.io/cv-project/`

## 📦 Struktur

```
cv-project/
├── index.html           # Hovedfil
├── css/
│   └── style.css        # Styling med grønt tema & dark mode
├── js/
│   └── main.js          # Tema-toggle, smooth scroll, formular
├── img/
│   └── profile.jpg      # Dit profilbillede
├── tests/
│   ├── e2e.spec.js      # Playwright tests
│   └── unit.test.js     # Jest tests
├── package.json         # NPM konfiguration
└── README.md            # Denne fil
```

## 🎯 Features & Funktionalitet

### Tema-Toggle (Farver ↔ Sort/Hvid)
- Knap i navigationsmenuen: "🎨 Farver" eller "⚫ S/H"
- Tilstand gemmes i browser localStorage
- Smidigt CSS-transition

### Smooth Scroll
- Klik på navigationslinkene → side scroller smooth ned
- Funktionerer også med anchor-links (#sektioner)

### Responsivt Design
- **Desktop**: Fuld layout
- **Tablet** (768px–1024px): Tilpasset grid
- **Mobil** (<768px): Hamburger-menu, stablet layout

### Kontaktformular
- Integreret med Formspree
- E-mails går til `raskrawen@gmail.com`
- Succesbesked efter indsendelse
- Fejlhåndtering hvis noget går galt

## 🔒 Sikkerhed & Privathed

- **Ingen cookies** (undtagen localStorage til tema-gem)
- **Ingen server-side data** (statisk webside)
- **Formspree** bruger HTTPS for sikker form-submission
- **Personlig data**: Dit profilbillede og tekster gemmes ikke nogen andre steder end dit repository

## 🐛 Troubleshooting

### Kontaktformularen virker ikke
1. Kontroller at `FORMSPREE_ENDPOINT` i `js/main.js` er korrekt
2. Åbn browser console (F12) og søg efter fejl
3. Verificér at du har godkendt email-adressen på Formspree.io

### Billede vises ikke
1. Sikr at billede-filen ligger i `img/` mappen
2. Sikr at filnavnet matcher `index.html` (case-sensitive på Linux/Mac)

### Siden ser mærkelig ud på mobil
1. Sjek at `<meta name="viewport">` findes i `<head>`
2. Prøv at clear browser cache (Ctrl+Shift+Delete)

## 📚 Ressourcer

- [Bootstrap 5 dokumentation](https://getbootstrap.com/docs/5.0/)
- [Formspree dokumentation](https://formspree.io/)
- [Playwright dokumentation](https://playwright.dev/)
- [Jest dokumentation](https://jestjs.io/)

## 📄 Licens

Denne kode er Open Source. Du må bruge, ændre og dele det frit.

## 👤 Forfatter

Rasmus Kragh Wendelbo
- E-mail: raskrawen@gmail.com
- Website: Dette projekt!

---

**Sidste opdateret**: 2026-04-24  
**Version**: 1.0
