# Njoftime Pune Connect

Krijo një website super profesional për një agjenci punësimi (employment agency) 

që lidh punëdhënës/agjenci me punëkërkues në Shqipëri/Kosovë. Emri i biznesit: 

Njoftime Pune

=== DIZAJNI I PËRGJITHSHËM ===

- Dizajn modern, i pastër, profesional (jo template gjenerik) — ngjyra kryesore 

  blu e thellë ose jeshile e errët (simbol besueshmërie), me theksime portokalli/kaltra

- Tipografi e qartë, hierarki vizuale e mirë

- Plotësisht responsive (mobile-first, sepse shumica e vizitorëve do hyjnë nga telefoni)

- Animacione të lehta, jo të tepërta

=== FAQJA KRYESORE (Public Website) ===

1. Header me logo, menu (Kryefaqja, Ofertat e Punës, Rreth Nesh, Kontakt)

2. Hero section me titull tërheqës, përshkrim të shkurtër të agjencisë, dhe 

   call-to-action "Shiko Ofertat e Punës"

3. Seksion me statistika (p.sh. numri i punëve të plotësuara, punëtorë të vendosur, 

   partnerë/kompani)

4. Faqja "Ofertat e Punës" — listë/grid me të gjitha ofertat aktive (kartela me: 

   titull pozicioni, vend, lloji i kontratës, paga nëse jepet, data e publikimit), 

   me filtra (qyteti, lloji i punës)

5. Faqja e detajeve të ofertës — përshkrim i plotë, kërkesat, dhe buton "Apliko Tani"

6. Formulari i aplikimit (pa login/regjistrim) — fusha: emër, mbiemër, telefon, 

   qytet, mesazh/eksperiencë të shkurtër. KUR PËRDORUESI DËRGON FORMULARIN, mos 

   e ruaj në databazë — në vend të kësaj, hape automatikisht WhatsApp (web ose 

   app, në varësi të pajisjes) drejt numrit +355689504445, me një mesazh të 

   para-plotësuar (pre-filled) që përmban të gjitha të dhënat e formularit + 

   titullin e ofertës për të cilën po aplikohet. Përdor linkun 

   https://wa.me/355689504445?text=MESAZHI_I_KODUAR_URL

   Formati i mesazhit duhet të jetë i qartë, p.sh.:

   "Aplikim i ri për [Titulli i Ofertës]%0AEmri: [emër mbiemër]%0ATel: [telefoni]%0AQyteti: [qyteti]%0AMesazh: [mesazhi]"

7. Seksion "Si Funksionon" (shiko ofertën → apliko → merr përgjigje direkt në WhatsApp)

8. Testimoniale/reçensione nga punëtorë të vendosur

9. Footer me kontakte, linke sociale (Instagram, Facebook, WhatsApp), informacione ligjore

=== PANELI I ADMINISTRATORIT (Admin Dashboard) ===

- Login i veçantë, i mbrojtur, vetëm për admin

- Dashboard me përmbledhje: numri i ofertave aktive

- Menaxhimi i Ofertave: Shto ofertë të re (titull, përshkrim, lloji i punës, 

  qyteti/vendndodhja, paga, kërkesat, data e skadencës), Edito, Fshi, Aktivizo/

  Çaktivizo ofertën

- (Nuk ka menaxhim aplikimesh në panel, sepse aplikimet shkojnë direkt në WhatsApp)

=== FUNKSIONALITETE TEKNIKE ===

- Përdor Supabase VETËM për: (1) ruajtjen e ofertave të punës (tabela "job_offers"), 

  dhe (2) autentikimin e adminit (Supabase Auth)

- Row Level Security: vetëm admini i loguar mund të shtojë/editojë/fshijë oferta; 

  ofertat lexohen publikisht nga të gjithë

- Formulari i aplikimit NUK shkruan në databazë — funksionon 100% client-side, 

  duke ndërtuar linkun wa.me dhe duke hapur WhatsApp automatikisht (window.open 

  ose redirect) kur përdoruesi klikon "Dërgo"

- Sigurohu që numrat/karakteret speciale të fushave të formularit të kodohen 

  saktë (encodeURIComponent) përpara se të futen në linkun e WhatsApp

=== TON DHE STIL I PËRMBAJTJES ===

- Gjuha shqipe, ton profesional por i afërt, i besueshëm

- Theksoje te butoni "Apliko Tani" që aplikimi dërgohet direkt në WhatsApp për 

  përgjigje të shpejtë

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1cb75101-c6c6-4adc-ada7-d72c41545a16).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
