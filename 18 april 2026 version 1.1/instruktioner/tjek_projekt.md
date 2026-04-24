# Tjek projekt – Agent-instruktion

## Formål

Denne fil indeholder instruktioner til en agent om at gennemgå projektet systematisk og sikre høj kvalitet på tværs af kode og specifikationer.

---

## Trin 1 – Læs specifikationer og plan

Læs følgende filer grundigt, før du begynder gennemgangen:

- `documentation/kravspecifikation.md`
- `documentation/teknikspecifikation.md`
- `documentation/uispecifikation.md`
- `documentation/projektplan.md`

---

## Trin 2 – Tjek at alle krav, ønsker og mål er opfyldt

Gennemgå kravspecifikation, teknikspecifikation, uispecifikation og projektplan.

For hvert krav, ønske og mål: kontrollér at der findes tilsvarende implementering i kodebasen.

Hvis noget mangler:
- Læs den relevante specifikation igen
- Implementér det manglende
- Gentag kontrollen

---

## Trin 3 – Tjek for gentagelser og ubrugt kode

Gennemgå kodebasen og identificér:

- Dubleret logik eller funktioner der gør det samme
- Kode der aldrig kaldes eller importeres
- Variabler, konstanter eller klasser der ikke bruges

Fjern eller konsolidér det der er overflødigt.

---

## Trin 4 – Tjek for modsigelser og inkonsistens

Gennemgå kodebasen og identificér:

- Steder hvor samme koncept håndteres forskelligt uden grund
- Inkonsistente navnekonventioner (variabler, funktioner, filer)
- Modstridende logik eller adfærd på tværs af moduler
- Inkonsistens mellem kode og specifikation

Ret det der er inkonsistent, så kodebasen er sammenhængende.

---

## Trin 5 – Tjek at koden er letlæselig

**Letlæselighed er vigtigere end kompakthed og effektivitet.**

Kontrollér at:

- Variabel- og funktionsnavne er beskrivende og selvforklarende
- Funktioner er korte og gør én ting
- Kompleks logik er opdelt i mindre, navngivne dele
- Der ikke bruges unødvendige forkortelser eller kryptiske udtryk
- Koden kan forstås uden at kende hele systemet

Omskriv kode der er svær at læse, så den bliver klar og tydelig.

---

## Trin 6 – Tjek god praksis for høj kvalitet

Kontrollér at følgende principper er overholdt:

- **Kommentarer:** Kompleks logik er forklaret med kommentarer. Kommentarer beskriver *hvorfor*, ikke *hvad*.
- **Modularisering:** Koden er opdelt i moduler med klart ansvar. Ingen modul gør for meget.
- **SOLID:** Enkeltansvarsprincippet er overholdt. Afhængigheder er injiceret, ikke hardkodet.
- **KISS:** Løsninger er så simple som muligt. Kompleksitet er kun tilføjet når det er nødvendigt.
- **REST (hvis relevant):** API-endepunkter følger REST-konventioner for navngivning og HTTP-metoder.
- **Fejlhåndtering:** Fejl håndteres eksplicit og giver meningsfulde beskeder.
- **Testbarhed:** Funktioner er skrevet så de kan testes isoleret.

Ret det der ikke lever op til god praksis.

---

## Trin 7 – Gentag hvis nødvendigt

Når alle rettelser er foretaget: kør denne fil (tjek_projekt.md) igen fra Trin 2.

Fortsæt indtil alle trin er gennemgået uden fund af problemer.
