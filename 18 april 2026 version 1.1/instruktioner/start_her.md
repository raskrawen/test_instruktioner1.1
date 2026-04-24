# Instruktionsprioritet

## Metadata
- Version: 1.1
- Dato: 2026-04-18
- Ejer: Rasmus Kragh Wendelbo

Formålet med denne fil er at fjerne tvivl, hvis flere instruktioner overlapper eller konflikter.

## Prioriteringsrækkefølge
1. `grillme_krav.md`
2. `grillme_tek.md`
3. `grillme_projektplan.md`
4. `grillme_UI.md`
5. `tjek_projekt.md`

## Anvendelsesregel
- Ved konflikt skal den højest prioriterede fil følges.
- Lavere prioriterede filer må kun udfylde detaljer, som ikke strider mod højere prioritet.
- Hvis to instruktioner på samme niveau virker uklare, markeres punktet som uafklaret og afklares eksplicit, før implementering fortsætter.

## Mappeplacering
- Alle instruktionsfiler placeres i `instruktioner/`.
- Alle output-dokumenter fra krav-, teknik- og planarbejde placeres i `documentation/`.
- Agenten skal oprette mapper automatisk, hvis de mangler.

## Navngivning
- Der er fri navngivning for nye instruktionsfiler.
