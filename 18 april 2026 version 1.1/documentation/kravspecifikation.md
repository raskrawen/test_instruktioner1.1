# Kravspecifikation

## Metadata
- Version: 1.0
- Dato: 2026-04-24
- Ejer: Rasmus Kragh Wendelbo

---

## Status
Færdig – klar til design og udvikling.

---

## 1. Systembeskrivelse
En simpel, responsiv CV-webside for Rasmus Kragh Wendelbo, rettet mod skoler og undervisere der søger en workshop-facilitator.

## 2. Formål
At præsentere Rasmus som workshop-facilitator over for potentielle arbejdsgivere – primært skoler og undervisere – og give dem mulighed for at kontakte ham direkte.

## 3. Brugere
- Målgruppe: Arbejdsgivere (primært skoler og undervisere) der ønsker at hyre Rasmus til workshops.
- Antal samtidige brugere: Ikke afklaret – ikke et krav på nuværende tidspunkt.

## 4. Funktionelle krav
- Visning af navn (Rasmus Kragh Wendelbo)
- Profilbillede (placeholder)
- Om-mig-tekst (placeholder)
- Erfaring – baggrund inden for undervisning (placeholder)
- To workshops med titler og beskrivelser (placeholder)
- Uddannelse (placeholder)
- Kompetencer/færdigheder (placeholder)
- Kontaktoplysninger (placeholder)
- Referencer (placeholder)
- Navigationsmenu øverst med ankre til sektionerne (fx "Om mig", "Erfaring", "Workshops", "Kontakt")
- Knap til at skifte siden mellem farvet tilstand (grønt tema) og sort/hvid-tilstand
- Kontaktformular der sender e-mail til raskrawen@gmail.com

## 5. Ikke-funktionelle krav
- Sprog: Kun dansk
- Design: Vildt og iøjnefaldende – analogt grønt farvetema (mørkegrøn, lysegrøn, lime, skovgrøn)
- Layout: Én lang scrollbar side (single page)
- Responsivt design – fungerer på både laptop og mobil

## 6. Platform
- Webside (ikke app)
- Hostes på GitHub Pages

## 7. Performance
- Ingen særlige performancekrav

## 8. Sikkerhed
- Ingen særlige sikkerhedskrav

## 9. Integration
- Ingen integrationer på nuværende tidspunkt (åbent punkt til fremtiden)

## 10. Andre relevante aspekter
- Indhold er pladsholdertekst – skal erstattes med rigtigt indhold af Rasmus senere

---

## Mangelliste – uafklarede punkter
- Antal samtidige brugere er ikke afklaret (ikke vurderet som kritisk)
- Faktisk indhold (om-mig-tekst, workshop-titler, erfaring, uddannelse, kompetencer, referencer) mangler – erstattes af placeholders i første version
- E-mailsending fra kontaktformular kræver en tredjeparts e-mailtjeneste (fx Formspree) da GitHub Pages kun serverer statiske filer – dette skal afklares ved implementering
