# Server-Client Instruktioner

## Metadata
- Version: 1.1
- Dato: 2026-04-18
- Ejer: Rasmus Kragh Wendelbo

## Formål
Denne guide hjælper dig med at opsætte et web-app projekt med Node.js, Express og Socket.IO, hvor fokus er på server-klient arkitektur, projektstruktur, konfiguration, samtidige klienter og test.

## 1. Projektinitialisering

- initialiser projekt med npm:
  ```sh
  npm init -y
  ```
- Installer nødvendige dependencies:
  ```sh
  npm install express socket.io uuid dotenv
  npm install --save-dev nodemon
  ```
- Opret vigtige filer i roden:
  - `package.json`
  - `Procfile` (til Heroku: `web: node server/server.js`)
  - `.gitignore` (inkluder `.env` og `node_modules/`)
  - `.env` (API-nøgler mv.)

## 2. Mappestruktur

```plaintext
project-root/
│  .env
│  .gitignore
│  package.json
│  Procfile
│
├─ config/
│    serverConfig.js
├─ server/
│    server.js
│    socketHandler.js
├─ models/
│    User.js
├─ public/
│    index.html
│    common.html
│    client.js
│    views/
│        view-a/
│            view-a.html
│            view-a.js
│        view-b/
│            view-b.html
│            view-b.js
│        view-c/
│            view-c.html
│            view-c.js
│    assets/
│        images/
│        audio/
├─ tests/
├─ documentation/
```

Flyt alle .md filer til `documentation/` for at holde projektet organiseret.

## 3. Grundlæggende kode og konfiguration

Genbrug altid kode fra kodebasen frem for at skrive ny kode, når det er muligt. 

  ```js
  const express = require('express');
  const http = require('http');
  const { Server } = require('socket.io');
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  app.use(express.static('public'));

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    // ...event handlers...
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  ```

### Identifikation af klient: socket.id og uuid

- Hver klient skal identificeres med både `socket.id` (for den aktuelle forbindelse) og en persistent `uuid` (for at kunne genkende klienten ved reconnect).
- `uuid` genereres første gang klienten tilgår applikationen og gemmes i browserens lokale storage.
- Ved hver forbindelse sender klienten sin `uuid` til serveren (fx i et `join`-event). Serveren matcher `uuid` til eksisterende klient eller opretter en ny.
- På serversiden bør klienter gemmes i et Map/objekt, hvor både `uuid` og `socket.id` kan bruges som nøgle.
- Ved disconnect og reconnect kan klienten genkendes via samme `uuid`.



Eksempel på cookie-håndtering på klienten:
```js
// Ved første besøg:
import { v4 as uuidv4 } from 'uuid';
let uuid = localStorage.getItem('uuid');
if (!uuid) {
  uuid = uuidv4();
  localStorage.setItem('uuid', uuid);
}
// Send uuid til serveren ved forbindelse
socket.emit('join', { uuid });
```

Dette sikrer, at klienter kan genkendes og genoptage deres session, selvom de mister forbindelsen midlertidigt.

## 4. Skaleringskrav

- Løsningen skal understøtte op til 30 samtidige klienter under normal drift.
- Isolér tilstand pr. klient, så data ikke blandes mellem forbindelser.
- Test kritiske flows med flere samtidige forbindelser før release.

## 5. Klient-side

- Opret `index.html` med header og `<div id="viewContainer"></div>`.
- Opret `client.js` til dynamisk view-loading.
- Opret views-mapper med .html og .js for de funktionelle skærme i applikationen.
- Opret `common.html` i /public som statisk side til fælles info.

## 6. Dynamisk view-loading

- Brug fetch og dynamic import til at loade views og deres JS-moduler.
- Hvert view-modul skal eksportere en init()-funktion, der binder event listeners.

Eksempel:
```js
async function loadView(viewName) {
  const html = await fetch(`/views/${viewName}/${viewName}.html`).then(r => r.text());
  document.getElementById('viewContainer').innerHTML = html;
  const module = await import(`/views/${viewName}/${viewName}.js`);
  if (module.init) module.init();
}
```

## 7. Socket events

- Navngiv events konsistent (fx 'client:action', 'flow:completed').
- Tilføj event-handling i client.js og socketHandler.js.

Eksempel:
```js
socket.on('view:view-a', async () => {
  await loadView('view-a');
});
```

## 8. Teststrategi

- Brug Jest til unit, integration og end-to-end tests.
- Skriv tests i tests/-mappen.
- Kør tests med `npm test`.
- Tilføj samtidighedstest for op til 30 klienter i kritiske realtidsflows.

Eksempel:
```js
const sum = require('../server/sum');
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

## 9. Kendte faldgruber

- Manglende init() i view-moduler giver fejl.
- Event listeners SKAL bindes i init().
- Husk at opdatere både client og server for nye socket events.

## 10. Dokumentation

- Opret en separat .md-fil i documentation/-mappen til projektets særlige instruktioner.
- Flyt alle .md filer til documentation/-mappen for at holde det organiseret.
