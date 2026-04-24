# UI-specifikation

## Metadata
- Version: 1.0
- Dato: 2026-04-24
- Ejer: Rasmus Kragh Wendelbo

---

## Status
Færdig – klar til implementering.

---

## Uafklarede punkter
*(Se mangelliste nederst i dokumentet)*

---

## 1. UX-mål
- Besøgende skal opleve siden som professionel og troværdig
- Siden skal skabe tillid hos skoler og undervisere, så de har lyst til at hyre Rasmus til workshops

## 2. Målgrupper og brugsscenarier
- Målgruppe: Skoler og undervisere der søger en workshop-facilitator
- Primært brugsscenarie: En lærer/underviser finder siden (fx via Google), læser om Rasmus og hans workshops, og sender en kontaktbesked via formularen

## 3. Informationsarkitektur og skærmstruktur
Single-page layout med følgende sektioner i rækkefølge:
1. **Hero** – lille profilbillede + navn + kort beskrivelse af Rasmus
2. **Om mig** – uddybende om-mig-tekst
3. **Erfaring** – undervisningsbaggrund
4. **Workshops** – 2 workshops med titel og beskrivelse
5. **Uddannelse** – uddannelseshistorik
6. **Kompetencer** – færdigheder
7. **Referencer** – referencer
8. **Kontakt** – kontaktformular

## 4. Navigation
- Sticky navigationsmenu øverst (følger med ved scroll)
- Indeholder ankre til alle sektioner: Om mig, Erfaring, Workshops, Uddannelse, Kompetencer, Referencer, Kontakt
- Sort/hvid-toggle-knap placeret i navigationsmenuen (højre side)
- På mobil: Hamburger-menu (Bootstrap navbar collapse)

## 5. Wireframes og sideopbygning
*(Ikke udfyldt endnu)*

## 6. Komponenter
- **Navbar**: Sticky, med anker-links og sort/hvid-knap
- **Hero**: Lille rundt profilbillede + navn + kort beskrivelse
- **Workshops**: Liste – én workshop pr. række, stablet under hinanden
- **Kontaktformular**: Inputfelter (navn, e-mail, besked) + send-knap

## 7. Visuelt design
- Farvetema: Analogt grønt (mørkegrøn, lysegrøn, lime, skovgrøn)
- Sort/hvid-tilstand: Skifter hele siden til gråskala via toggle-knap
- Ikoner: Ingen
- Skrifttype: Vælges af udvikler – bør understøtte professionelt udtryk (fx Roboto eller Inter via Google Fonts)

## 8. Designprincipper og designsystem
- Professionelt og troværdigt udtryk
- Konsistente afstande og størrelser via Bootstrap
- Ingen eksternt designsystem – Bootstrap som basis

## 9. Branding og tone of voice
- Tone: Professionel, imødekommende og direkte
- Tekster henvender sig til undervisere og skoleledere

## 10. States
- Kontaktformular: Succesbesked ved afsendelse, fejlbesked ved fejl
- Ingen loading-states (statisk side)
- Tomme tilstande: Ikke relevant

## 11. Interaktioner og animationer
- Standard Bootstrap-animationer (fx navbar collapse på mobil)
- Smooth scroll til ankre ved klik i navigationen
- Farve-toggle med CSS-transition for blød overgang

## 12. Responsivt design
- Mobil (< 768px): Hamburger-menu, indhold stablet lodret
- Tablet (768px–1024px): Bootstrap grid tilpasser sig
- Desktop (> 1024px): Fuld layout
- Bootstrap breakpoints anvendes

## 13. Tilgængelighed
- Ingen specifikke WCAG-krav stillet
- Grundlæggende tilgængelighed via Bootstrap (semantisk HTML, kontrast)

## 14. Lokalisering og sprog
- Kun dansk
- Datoformat: DD-MM-ÅÅÅÅ

## 15. Andre relevante aspekter
- Ingen yderligere ønsker

---

## Mangelliste – uafklarede punkter
- Skrifttype: Ikke valgt af bruger – overladt til udvikler (forslag: Roboto eller Inter)
- Wireframes: Ikke udarbejdet – siden bygges direkte fra specifikation
- Faktisk indhold (billede, tekster) mangler – erstattes af placeholders
