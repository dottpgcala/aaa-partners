# AAA Partners

Sito di consulenza assicurativa, previdenziale e patrimoniale, con modulo contatti ed editor visuale riservato.

- Sito pubblico: https://aaa-partners.dottpgcala.chatgpt.site/
- Editor: https://aaa-partners.dottpgcala.chatgpt.site/editor

## Architettura
React, TypeScript e Vinext; esecuzione server su Cloudflare Workers tramite Sites. Database D1 per richieste di contatto e contenuti modificabili.

## Sviluppo
Richiede Node.js >= 22.13 e pnpm. Installare con `pnpm install --frozen-lockfile`, generare eventuali nuove migrazioni con `pnpm db:generate` e compilare con `pnpm build`. Il deployment esistente è gestito da Sites. GitHub Pages non esegue il backend necessario a editor e modulo contatti.

## Dati e accesso
Questo repository contiene sorgenti, risorse grafiche e schema/migrazioni del database. Non contiene i contatti raccolti, credenziali, token, sessioni o database. I contenuti salvati tramite editor risiedono nel database del sito e non vengono sincronizzati automaticamente nei commit. L’editor richiede identità verificata dall’infrastruttura Sites e autorizzazione server-side; non esporre il backend con header di identità non verificati.

## Stato
Compilazione e verifiche statiche completate. La pubblicazione su GitHub non attiva una pipeline automatica verso il sito.

## Ultima versione esportata
Sorgenti Sites: `97416b6fb92799b8ba69cc101059988d3616cc2b` (versione 4). Lo snapshot `content/site-content.snapshot.json` conserva i testi attualmente pubblicati, inclusi «CONSULENZA SVIZZERA · VISIONE GLOBALE» e «LUXURY», salvati dall’editor. È un backup dei contenuti; il database attivo continua a essere gestito da Sites.
