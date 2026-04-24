# Tekniske instruktioner til agent

## Metadata
- Version: 1.1
- Dato: 2026-04-18
- Ejer: Rasmus Kragh Wendelbo

## Formål
Denne fil er den tekniske baseline for agenter, der arbejder i projektet. Brug den som styrende specifikation for kodeændringer, fejlfinding, test og dokumentation.

## Afgrænsning
- Denne instruktion dækker server-klient arkitektur, data, test og drift.
- Denne instruktion er domæne-neutral og kan bruges på tværs af projekttyper.

## Prioritet mellem instruktioner
- Ved konflikt mellem instruktioner gælder følgende prioriteringsrækkefølge:
1. `grillme_krav.md`
2. `grillme_tek.md`
3. `grillme_projektplan.md`
4. `tjek_projekt.md`
- Den fulde prioriteringsregel vedligeholdes i [start_her.md](start_her.md).
- Mappeplacering for instruktioner og output-dokumenter følger også [start_her.md](start_her.md).

## Teknologistak
- Runtime: Node.js (CommonJS moduler).
- Backend: Express 5 + Node HTTP server.
- Realtidskommunikation: Socket.IO.
- Frontend: Vanilla HTML, CSS og JavaScript.
- Konfiguration: JSON og miljøvariabler (.env).
- Miljøkonfiguration: dotenv + .env.
- Unit/integration test: Jest.
- E2E test: Playwright.

## Afhængigheder i brug
### Runtime dependencies
- express
- socket.io
- dotenv
- uuid

### Dev dependencies
- jest
- @playwright/test
- nodemon

## Overordnet arkitektur
### Lag
- Præsentationslag: [public/index.html](public/index.html), [public/admin.html](public/admin.html), [public/client.js](public/client.js).
- Transportlag: Socket.IO events mellem klient og server.
- Serverlag: [server/server.js](server/server.js).
- Konfigurationslag: filer i [config](config).

### Serveransvar
- [server/server.js](server/server.js) opretter Express-app, HTTP-server og Socket.IO server.
- [server/server.js](server/server.js) server statiske filer fra public-mappen.
- [server/server.js](server/server.js) håndterer serveropstart, middleware og overordnet routing.

### Klientidentitet og forbindelser
- Forbindelsesspecifik identitet håndteres via socket.id.
- Ved ændringer i realtidsfunktionalitet skal klienttilstand holdes isoleret pr. forbindelse.
- Løsningen skal dimensioneres til op til 30 samtidige klienter.

## Datatyper og datastrukturer
### Primitive typer
- string: statusbeskeder, eventnavne og konfigurationsværdier.
- number: tidsmåling, timeout-varighed, sekvensering.
- boolean: flags for proces-tilstand.

### Sammensatte typer
- Object: payloads for socket-events og konfiguration.
- Array: lister af konfigurations- eller UI-data.
- Map: forbindelse- eller sessionsnære opslag når realtidsfunktioner kræver det.

### Centrale datamodeller

#### AppConfig
- Konfiguration lagres i JSON-filer under [config](config).
- Miljøspecifikke værdier lagres i .env.

## Eventkontrakter
### Generelle regler
- Hold eventnavne konsistente og versionsstabile.
- Definér payload-format eksplicit, før eventet bruges på tværs af klient og server.
- Valider payloads ved modtagelse på serversiden.

## Persistens og filhåndtering
- Runtime-konfiguration gemmes i [config](config).
- Ændringer i konfigurationsschema skal være bagudkompatible eller ledsages af migration.
- Ved filskrivning skal I/O-fejl håndteres eksplicit.

## Testspecifikation
### Kommandoer
- Unit/integration: npm test
- Watch: npm run test:watch
- E2E: npm run test:e2e

### Testrammer
- Jest bruges til servernære tests i [tests](tests).
- Playwright bruges til browserflow i [tests/e2e](tests/e2e).

### Minimumskrav ved ændringer
- Kør relevante Jest-tests ved server- eller event-ændringer.
- Kør relevante Playwright-tests ved UI- eller integrationsændringer.
- Hvis du ændrer event-navn eller payload-felter, opdater både server, klient og tests i samme ændring.

## Drift og deployment
- Startkommando: npm start.
- Devkommando: npm run dev.
- Port styres via miljøvariabel PORT (fallback 3000).
- [Procfile](Procfile) bruges til platforme, der kræver proc-definition.

## Dokumentationskilder i projektet
- Krav: [documentation/kravspecifikation.md](../documentation/kravspecifikation.md)
- Projektplan: [documentation/projektplan.md](../documentation/projektplan.md)
- Teknisk baggrund: [grillme_tek.md](grillme_tek.md)
- Server-klient guide: [server-client.md](server-client.md)
- Testnote: [test_instruktioner.md](test_instruktioner.md)

## Arbejdsregler for agenten
- Genbrug eksisterende patterns før ny abstraktion introduceres.
- Hold event-navne og payloads konsistente på tværs af server og klient.
- Undgå breaking changes i konfigurationsformater uden samtidig migrering/compat.
- Ved tvivl: opdater tests først eller parallelt med kodeændringer.
- Opdater denne fil, hvis stack, dataformat eller arkitektur ændres.
