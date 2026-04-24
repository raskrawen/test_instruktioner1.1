# LLM.md – Integration af OpenAI LLM

## Metadata
- Version: 1.1
- Dato: 2026-04-18
- Ejer: Rasmus Kragh Wendelbo

## Formål
Denne instruktion guider dig til at integrere adgang til en Large Language Model (LLM) via OpenAI API i dit Node.js-projekt.

## 1. Tjek altid OpenAI dokumentation
- Før du starter, besøg altid den officielle OpenAI API-dokumentation:  
  https://platform.openai.com/docs/api-reference
- Tjek for opdateringer, ændringer i endpoints, parametre og best practices.

## 2. Installer nødvendige dependencies
```sh
npm install openai dotenv
```

## 3. Skjul din API-nøgle
- Opret en .env-fil i projektets rodmappe (hvis ikke allerede oprettet).
- Tilføj din OpenAI API-nøgle som miljøvariabel:
  ```env
  OPENAI_API_KEY=din_api_nøgle_her
  ```
- Tilføj .env til .gitignore, så nøglen ikke kommer i versionkontrol.


## 4. Eksempel på integration i llm.js

Opret filen `server/llm.js` med følgende indhold:
```js
require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getLLMResponse(prompt) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'Du er en hjælpsom assistent.' },
      { role: 'user', content: prompt }
    ]
  });
  return completion.choices[0].message.content;
}

module.exports = { getLLMResponse };
```

## 5. Brug sammen med server.js og socketHandler.js

- Importér og brug `getLLMResponse` i `server.js` eller `socketHandler.js` for at håndtere LLM-forespørgsler fra klienten.
- Eksempel på brug i en socket-event:
```js
// I server/socketHandler.js
const { getLLMResponse } = require('./llm');

socket.on('llm:prompt', async (data) => {
  try {
    const svar = await getLLMResponse(data.prompt);
    socket.emit('llm:response', { text: svar });
  } catch (err) {
    socket.emit('llm:error', { message: 'LLM-fejl: ' + err.message });
  }
});
```

## 6. Samtidige klienter og session-isolation

- Systemet skal understøtte, at flere klienter kan være aktive samtidigt og arbejde i hver sin LLM-session.
- Sessioner må ikke blandes sammen mellem klienter.
- Hver session skal bindes til en entydig klient-identitet, fx `uuid` eller `socketId`.
- Ved hver indkommende prompt skal serveren slå den korrekte sessionstilstand op ud fra klientens ID.
- Ved disconnect/reconnect skal der tages stilling til, om sessionstilstand genoptages via `uuid` eller nulstilles ved nyt `socketId`.
- Løsningen skal kunne håndtere op til 30 samtidige klienter uden at blande sessionsdata.

## 7. Fejlhåndtering

- Brug altid try/catch omkring kald til LLM, så serveren ikke crasher ved fejl fra OpenAI API.
- Returnér en fejlbesked til klienten via fx en `llm:error` event.
- Log evt. fejl på serveren for fejlsøgning.

Eksempel på fejlhåndtering er vist i socket-event ovenfor.

## 8. Best practices
- Gem aldrig API-nøgler direkte i kode eller offentlige repos.
- Begræns adgang til API-nøglen og roter den jævnligt.
- Læs og følg altid OpenAI’s rate limits og brugsvilkår.
- Log aldrig hele prompt eller svar, hvis de kan indeholde følsomme data.

---

**Husk:** Tjek altid OpenAI’s dokumentation for den nyeste og korrekte opsætning!
