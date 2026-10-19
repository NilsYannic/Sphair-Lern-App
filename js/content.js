// Lerninhalte: Lektionen und Quizfragen für SPHAIR (Ziel: Airline-Pilot/-in)
// Offizielle Angaben stammen von sphair.ch und den unter SOURCES verlinkten Seiten.
(() => {
  const SOURCES = [
    { title: 'SPHAIR – Airlinepilot/-in werden', url: 'https://sphair.ch/de/airlinepilot' },
    { title: 'SPHAIR – Screening Pilot/-in', url: 'https://sphair.ch/de/pilot/screening' },
    { title: 'SPHAIR – Flugkurs', url: 'https://sphair.ch/de/pilot/flugkurs' },
    { title: 'SPHAIR – Lernprogramm (offiziell)', url: 'https://lernprogramm.sphair.ch/de/navigation/grundlagen-der-navigation' },
    { title: 'SPHAIR – Für BIZ, Lehrpersonen & Eltern', url: 'https://sphair.ch/de/beeinflusser' },
    { title: 'berufsberatung.ch – Nachwuchspiloten: Eignungsabklärung', url: 'https://www.berufsberatung.ch/de/aus-weiterbildungen/aero-club-der-schweiz-sphair/nachwuchspiloten-innen-eignungsabklaerung' },
    { title: 'European Flight Academy – Vorteile für SPHAIR-Kandidaten', url: 'https://www.european-flight-academy.com/en/advantages-sphair-candidates' },
    { title: 'European Flight Academy – Anforderungen Schweiz', url: 'https://www.european-flight-academy.com/en/requirements-and-selection-process-training-switzerland' },
    { title: 'SWISS – Karriere als Pilot/-in', url: 'https://www.swiss.com/corporate/de/careers/professional-fields/pilots' },
    { title: 'Sky News – Mit SPHAIR-Zertifikat einfacher ins Airline-Cockpit', url: 'https://skynews.ch/startseiten-news/36353/' },
    { title: 'Cockpit – SPHAIR-Zertifikat vereinfacht Zugang zum Assessment', url: 'https://www.cockpit.aero/rubriken/detailseite/news/pilotenausbildung-sphair-zertifikat-vereinfacht-zugang-zum-assessment' },
  ];

  // Lektion: { t: Titel, b: HTML }  – Frage: { q, a: [Antworten], c: Index richtig, e: Erklärung }
  const TOPICS = [
    {
      id: 'weg', name: 'Weg ins Airline-Cockpit', icon: '🧭', color: '#4f6bed',
      desc: 'SPHAIR-Ablauf, Voraussetzungen und der Weg zu SWISS & Edelweiss',
      lessons: [
        { t: 'Was ist SPHAIR?', b: `
<p><b>SPHAIR</b> ist die offizielle Eignungsabklärung für junge Leute in der Schweiz, die Pilot/-in werden wollen – getragen von der <b>Schweizer Luftwaffe</b> und dem <b>Aero-Club der Schweiz</b>.</p>
<p>Am Ende steht das <b>SPHAIR-Zertifikat</b>, ein vom Bund anerkanntes Zertifikat, das deine fliegerischen Fähigkeiten objektiv beurteilt.</p>
<ul><li><b>Militärpilot/-in:</b> Zertifikat ist Pflicht</li><li><b>Airlinepilot/-in:</b> Zertifikat ist ein grosser Vorteil (siehe Lektion «Der Airline-Weg»)</li></ul>
<p class="note">Quelle: sphair.ch – Stand der Infos immer dort prüfen.</p>` },
        { t: 'Voraussetzungen', b: `
<ul>
<li><b>Schweizer Bürgerrecht</b> (Schweizer Pass)</li>
<li><b>Alter:</b> Screening zwischen <b>17 und 23</b> Jahren (brevetierte Offiziere bis 24)</li>
<li><b>Gute Gesundheit</b> – Brille/Kontaktlinsen sind okay (ca. bis ±6 Dioptrien). Die endgültigen Grenzwerte legt der Fliegerarzt fest.</li>
<li><b>Guter Leumund</b></li>
<li>Deutsch, Französisch oder Italienisch</li>
</ul>
<p>Du bist jetzt 15? Perfekt: Du hast <b>zwei Jahre Zeit</b>, um in Ruhe zu trainieren. Wer früh anfängt, hat am Screening einen riesigen Vorteil.</p>
<p class="note">Auf sphair.ch gibt es einen unverbindlichen Seh-Selbsttest mit einem Formular für Augenarzt/Optiker.</p>` },
        { t: 'Der Ablauf in 3 Phasen', b: `
<ol>
<li><b>Vorbereitung zu Hause (MySPHAIR):</b> Auf sphair.ch registrieren, biografischen Fragebogen ausfüllen und mit den offiziellen Übungstests trainieren. Nach dem Fragebogen hast du <b>18 Monate</b> Zeit fürs Screening.</li>
<li><b>Screening:</b> 1 Tag am <b>Fliegerärztlichen Institut (FAI) in Dübendorf</b>. Getestet werden geistiges und psychomotorisches Potenzial (4 Testblöcke).</li>
<li><b>Flugkurs:</b> 2 Wochen bei einer SPHAIR-Partnerflugschule (meist in den Schulferien), rund <b>10 Flugstunden / 11 Flüge</b> plus Theorie, kleine Gruppen (max. 6) mit Fluglehrern.</li>
</ol>
<p>Am Schluss: <b>SPHAIR-Zertifikat</b> mit Empfehlung (z.&nbsp;B. für die Berufspilotenlaufbahn).</p>` },
        { t: 'Die 4 Screening-Blöcke', b: `
<p>Laut sphair.ch ist das Screening in vier Blöcke aufgeteilt:</p>
<ol>
<li><b>Englisch, Kopfrechnen, räumliches Vorstellungsvermögen</b></li>
<li><b>Merkfähigkeit, Konzentration, technisches Verständnis</b></li>
<li><b>Wahrnehmung und Rechenaufgaben</b></li>
<li><b>Psychomotorik und Mehrfachanforderungen</b> (Multitasking)</li>
</ol>
<p>Für jeden Block gibt es in dieser App einen <b>Trainer</b> unter «Training». Die <b>Screening-Simulation</b> spielt alles am Stück durch.</p>
<p class="note">Erfahrungsberichte: Kopfrechnen kommt visuell <i>und</i> akustisch, ohne Notizen und mit Zeitlimit. Quadrat- und Kubikzahlen helfen viel.</p>` },
        { t: 'Der Airline-Weg', b: `
<p>Mit einem SPHAIR-Zertifikat mit <b>Empfehlung für die Berufspilotenlaufbahn</b> hast du bei <b>SWISS und Edelweiss</b> einen vereinfachten Zugang zum Assessment:</p>
<ul>
<li>Seit Juni 2024 kannst du den <b>DLR-Test auslassen</b>.</li>
<li>Das Zertifikat darf beim Assessment (Step 2) <b>höchstens 5 Jahre alt</b> sein.</li>
<li>Gilt für SWISS und Edelweiss. Für andere Lufthansa-Group-Airlines brauchst du weiterhin den DLR-Test.</li>
</ul>
<p>Nach bestandenem Assessment: Ausbildung an der <b>European Flight Academy</b> (ca. 2 Jahre).</p>
<p><b>Finanzierung</b> (laut Quellen, bitte aktuell prüfen): Eigenleistung CHF 10'000 vor Beginn und CHF 14'000 während der Ausbildung, Rückzahlung später aus dem Pilotensalär möglich.</p>` },
        { t: 'Was danach kommt (ATPL-Fächer)', b: `
<p>In der Airline-Ausbildung lernst du die EASA-Theorie. Die Themen in dieser App sind die Grundlage dafür:</p>
<ul>
<li>Air Law (Luftrecht) · Communications (Funk)</li>
<li>Principles of Flight (Aerodynamik)</li>
<li>Aircraft General Knowledge & Instrumentation</li>
<li>Mass & Balance · Performance · Flight Planning</li>
<li>Meteorology · General & Radio Navigation</li>
<li>Human Performance · Operational Procedures</li>
</ul>
<p>Lizenz: Medical <b>Klasse 1</b> ist Pflicht für Berufspiloten.</p>` },
        { t: 'Tipps für den Screening-Tag', b: `
<ul>
<li>Datum mit <b>genug Vorbereitungszeit</b> wählen (Erfahrungsberichte: mind. 6–8 Wochen regelmässig üben).</li>
<li>Gut schlafen, richtig frühstücken, genug trinken.</li>
<li>Instruktionen <b>genau lesen</b> – viele Fehler entstehen, weil man zu schnell startet.</li>
<li>Nach einem schwachen Test: abhaken, nächster Test, volle Konzentration.</li>
<li>Englisch: Ziel <b>75–85 %</b> richtig.</li>
<li>Technik: <b>verstehen statt auswendig lernen</b>.</li>
</ul>` },
      ],
      questions: [
        { q: 'Wo findet das SPHAIR-Screening statt?', a: ['Fliegerärztliches Institut Dübendorf', 'Flughafen Zürich', 'Militärflugplatz Payerne', 'Bern-Belp'], c: 0, e: 'Das eintägige Screening findet am Fliegerärztlichen Institut (FAI) in Dübendorf statt.' },
        { q: 'In welchem Alter kannst du das Screening machen?', a: ['17 bis 23 Jahre', '15 bis 20 Jahre', '18 bis 30 Jahre', 'Ab 16 ohne Obergrenze'], c: 0, e: '17–23 Jahre (brevetierte Offiziere bis 24).' },
        { q: 'Wie lange dauert der SPHAIR-Flugkurs?', a: ['2 Wochen', '1 Tag', '3 Monate', '1 Wochenende'], c: 0, e: 'Zwei Wochen mit rund 10 Flugstunden (11 Flüge) und Theorie.' },
        { q: 'Welchen Vorteil bringt das Zertifikat (mit Empfehlung Berufspilot) bei SWISS/Edelweiss?', a: ['Der DLR-Test entfällt', 'Die Ausbildung ist gratis', 'Man braucht kein Medical', 'Man wird direkt Captain'], c: 0, e: 'Seit Juni 2024 können SPHAIR-Absolvent/-innen mit Empfehlung den DLR-Test auslassen.' },
        { q: 'Wie alt darf das SPHAIR-Zertifikat beim Airline-Assessment (Step 2) höchstens sein?', a: ['5 Jahre', '1 Jahr', '10 Jahre', 'Unbegrenzt'], c: 0, e: 'Maximal 5 Jahre am Tag von Step 2.' },
        { q: 'Welcher Testblock gehört zum Screening-Block 1?', a: ['Englisch, Kopfrechnen, räumliches Vorstellen', 'Psychomotorik', 'Flug im Simulator', 'Medizinische Untersuchung'], c: 0, e: 'Block 1: Englisch, Kopfrechnen und räumliches Vorstellungsvermögen.' },
        { q: 'Wie viel Zeit hast du nach dem biografischen Fragebogen für das Screening?', a: ['18 Monate', '1 Monat', '5 Jahre', '6 Wochen'], c: 0, e: '18 Monate nach dem Fragebogen.' },
        { q: 'Welche Medical-Klasse brauchen Berufspiloten?', a: ['Klasse 1', 'Klasse 2', 'LAPL', 'Keine'], c: 0, e: 'Berufspiloten (CPL/ATPL/MPL) brauchen ein Medical der Klasse 1.' },
        { q: 'Wo findet die Airline-Ausbildung von SWISS/Edelweiss statt?', a: ['European Flight Academy', 'Fliegerärztliches Institut', 'Pilotenschule der Luftwaffe', 'ETH Zürich'], c: 0, e: 'Nach bestandenem Assessment bildet die European Flight Academy aus (ca. 2 Jahre).' },
      ],
    },
    {
      id: 'aero', name: 'Aerodynamik', icon: '🪽', color: '#0ea5e9',
      desc: 'Warum ein Flugzeug fliegt: Kräfte, Auftrieb, Steuerung',
      lessons: [
        { t: 'Die 4 Kräfte', b: `
<ul><li><b>Auftrieb</b> (nach oben) – entsteht am Flügel</li><li><b>Gewichtskraft</b> (nach unten)</li><li><b>Schub</b> (nach vorne) – Propeller oder Triebwerk</li><li><b>Widerstand</b> (nach hinten)</li></ul>
<p>Im <b>stationären Horizontalflug</b> gilt: Auftrieb = Gewicht und Schub = Widerstand.</p>` },
        { t: 'Wie Auftrieb entsteht', b: `
<p>Der Flügel lenkt die Luft nach unten ab. Auf der Oberseite strömt die Luft schneller → <b>tieferer Druck</b>, auf der Unterseite höherer Druck. Der Druckunterschied ergibt den Auftrieb.</p>
<p class="formula">A = c<sub>A</sub> · ½ · ρ · v² · S</p>
<p>c<sub>A</sub> = Auftriebsbeiwert (hängt vom Anstellwinkel ab), ρ = Luftdichte, v = Geschwindigkeit, S = Flügelfläche.</p>
<p><b>Merke:</b> Doppelte Geschwindigkeit → <b>vierfacher</b> Auftrieb (v²).</p>` },
        { t: 'Anstellwinkel & Strömungsabriss', b: `
<p><b>Anstellwinkel</b> = Winkel zwischen Profilsehne und anströmender Luft. Mehr Anstellwinkel → mehr Auftrieb – aber nur bis zum <b>kritischen Anstellwinkel</b> (ca. 15–18°).</p>
<p>Darüber reisst die Strömung auf der Oberseite ab: <b>Strömungsabriss (Stall)</b>. Das passiert bei <i>jeder</i> Geschwindigkeit, wenn der kritische Anstellwinkel überschritten wird.</p>
<p><b>Ausleiten:</b> Nase senken (Anstellwinkel verkleinern), Leistung setzen, Flügel horizontal.</p>` },
        { t: 'Achsen und Ruder', b: `
<ul>
<li><b>Längsachse</b> → Rollen → <b>Querruder</b> (Steuerhorn links/rechts)</li>
<li><b>Querachse</b> → Nicken → <b>Höhenruder</b> (ziehen/drücken)</li>
<li><b>Hochachse</b> → Gieren → <b>Seitenruder</b> (Pedale)</li>
</ul>
<p>Beim Rollen entsteht ein <b>negatives Wendemoment</b> (das Flugzeug giert zuerst zur falschen Seite). Ausgleich: Seitenruder in Kurvenrichtung – koordiniert fliegen!</p>` },
        { t: 'Widerstand & Klappen', b: `
<ul>
<li><b>Induzierter Widerstand:</b> durch Randwirbel; gross bei <b>langsamem</b> Flug (grosser Anstellwinkel).</li>
<li><b>Schädlicher Widerstand</b> (Form, Reibung): wächst mit <b>v²</b>.</li>
</ul>
<p><b>Landeklappen</b> erhöhen Auftrieb <i>und</i> Widerstand → langsamer fliegen und steiler anfliegen möglich.</p>
<p><b>Bodeneffekt:</b> Nahe am Boden (ca. eine Spannweite) sinkt der induzierte Widerstand – das Flugzeug «schwebt» beim Abfangen.</p>` },
        { t: 'Kurvenflug & Lastvielfaches', b: `
<p>In der Kurve muss der Auftrieb grösser werden. <b>Lastvielfaches n = 1 / cos(Querneigung)</b>.</p>
<ul><li>30° → 1.15 g</li><li>45° → 1.41 g</li><li>60° → <b>2 g</b></li></ul>
<p>Die Überziehgeschwindigkeit steigt mit √n: bei 60° Querlage um ca. <b>41 %</b>.</p>` },
        { t: 'Stabilität, Trimmung, Gleiten', b: `
<p>Liegt der <b>Schwerpunkt vor dem Neutralpunkt</b>, ist das Flugzeug längsstabil. Schwerpunkt zu weit hinten = instabil und gefährlich.</p>
<p>Die <b>Trimmung</b> nimmt dir die Steuerkräfte ab.</p>
<p><b>Gleitzahl</b> 1:10 heisst: aus 1000 m Höhe gleitest du ca. 10 km weit (ohne Wind).</p>` },
      ],
      questions: [
        { q: 'Was gilt im stationären Horizontalflug?', a: ['Auftrieb = Gewicht, Schub = Widerstand', 'Auftrieb > Gewicht', 'Schub = Auftrieb', 'Widerstand = 0'], c: 0, e: 'Im unbeschleunigten Geradeausflug sind die Kräfte im Gleichgewicht.' },
        { q: 'Die Geschwindigkeit verdoppelt sich (alles andere gleich). Der Auftrieb wird…', a: ['4-mal so gross', '2-mal so gross', 'halb so gross', 'gleich bleiben'], c: 0, e: 'Auftrieb ∝ v² → 2² = 4.' },
        { q: 'Wann tritt ein Strömungsabriss auf?', a: ['Beim Überschreiten des kritischen Anstellwinkels', 'Nur bei sehr tiefer Geschwindigkeit', 'Nur im Sinkflug', 'Bei Vollgas'], c: 0, e: 'Der Stall hängt vom Anstellwinkel ab – er kann bei jeder Geschwindigkeit passieren.' },
        { q: 'Mit welchem Ruder steuerst du um die Querachse (Nicken)?', a: ['Höhenruder', 'Querruder', 'Seitenruder', 'Trimmruder allein'], c: 0, e: 'Querachse = Nicken = Höhenruder.' },
        { q: 'Was ist die erste Massnahme beim Strömungsabriss?', a: ['Nase senken / Anstellwinkel verkleinern', 'Kräftig ziehen', 'Leistung reduzieren', 'Klappen einfahren'], c: 0, e: 'Anstellwinkel verkleinern, dann Leistung und Flügel horizontal.' },
        { q: 'Welches Lastvielfache hast du in einer koordinierten Kurve mit 60° Querlage?', a: ['2 g', '1.15 g', '1.41 g', '3 g'], c: 0, e: 'n = 1/cos60° = 2.' },
        { q: 'Der induzierte Widerstand ist am grössten…', a: ['bei langsamem Flug', 'bei Höchstgeschwindigkeit', 'am Boden', 'bei Rückenwind'], c: 0, e: 'Langsam = grosser Anstellwinkel = starke Randwirbel.' },
        { q: 'Was bewirken ausgefahrene Landeklappen?', a: ['Mehr Auftrieb und mehr Widerstand', 'Nur weniger Widerstand', 'Höhere Überziehgeschwindigkeit', 'Weniger Auftrieb'], c: 0, e: 'Klappen erhöhen c_A und Widerstand → langsamer, steiler anfliegen.' },
        { q: 'Was ist das negative Wendemoment?', a: ['Das Flugzeug giert beim Querruderausschlag zuerst zur Gegenseite', 'Ein Motordefekt', 'Seitenwind von links', 'Ein Trimmfehler'], c: 0, e: 'Der abwärts ausschlagende Querruderflügel hat mehr Widerstand → Gieren zur Gegenseite; mit Seitenruder ausgleichen.' },
        { q: 'Gleitzahl 1:12, Höhe 600 m über Grund, kein Wind. Wie weit gleitest du?', a: ['7.2 km', '5 km', '12 km', '0.6 km'], c: 0, e: '600 m × 12 = 7200 m.' },
        { q: 'Wo muss der Schwerpunkt für Längsstabilität liegen?', a: ['Vor dem Neutralpunkt', 'Hinter dem Neutralpunkt', 'Am Heck', 'Egal'], c: 0, e: 'Schwerpunkt vor Neutralpunkt = stabil.' },
        { q: 'Was ist der Bodeneffekt?', a: ['Weniger induzierter Widerstand nahe am Boden', 'Mehr Widerstand beim Rollen', 'Thermik über Beton', 'Seitenwind am Boden'], c: 0, e: 'Der Boden stört die Randwirbel → das Flugzeug schwebt beim Abfangen länger.' },
      ],
    },
    {
      id: 'technik', name: 'Flugzeug & Instrumente', icon: '🛠️', color: '#f59e0b',
      desc: 'Motor, Instrumente, Masse & Leistung',
      lessons: [
        { t: 'Das Staudrucksystem', b: `
<p><b>Pitotrohr</b> misst den Gesamtdruck, die <b>statische Öffnung</b> den Umgebungsdruck.</p>
<ul>
<li><b>Fahrtmesser:</b> Pitot + statisch (Staudruck)</li>
<li><b>Höhenmesser:</b> nur statisch</li>
<li><b>Variometer:</b> nur statisch (Druckänderung)</li>
</ul>
<p>Statische Öffnung verstopft → Höhenmesser bleibt stehen, Variometer zeigt 0.</p>` },
        { t: 'Fahrtmesser-Farben', b: `
<ul>
<li><b>Weisser Bogen:</b> Bereich mit Landeklappen</li>
<li><b>Grüner Bogen:</b> normaler Betriebsbereich</li>
<li><b>Gelber Bogen:</b> Vorsicht – nur in ruhiger Luft</li>
<li><b>Rote Linie (V<sub>NE</sub>):</b> nie überschreiten</li>
</ul>
<p><b>IAS</b> = angezeigte Fahrt, <b>TAS</b> = wahre Fahrt. In der Höhe ist TAS grösser als IAS (ca. +2 % pro 1000 ft).</p>` },
        { t: 'Der Höhenmesser', b: `
<ul>
<li><b>QNH</b> eingestellt → Höhe über Meer</li>
<li><b>QFE</b> → Höhe über dem Flugplatz</li>
<li><b>1013.25 hPa</b> (Standard) → Flugfläche (FL)</li>
</ul>
<p><b>«Vom Hoch ins Tief, geht's schief»:</b> Fliegst du in tieferen Luftdruck, ohne neu einzustellen, zeigt der Höhenmesser zu viel an – du bist <i>tiefer</i> als angezeigt. Gleiches gilt bei Kälte.</p>` },
        { t: 'Kreiselinstrumente', b: `
<ul>
<li><b>Künstlicher Horizont:</b> Querlage und Längsneigung</li>
<li><b>Kurskreisel:</b> Steuerkurs, muss regelmässig (ca. alle 15 min) mit dem Magnetkompass abgeglichen werden</li>
<li><b>Wendezeiger:</b> Drehrate. Standardkurve = 3°/s = 360° in 2 Minuten</li>
</ul>
<p><b>Kugel (Libelle):</b> «Tritt auf die Kugel». Kugel kurveninnen = Schieben, kurvenaussen = Schmieren.</p>` },
        { t: 'Magnetkompass', b: `
<p>Der Kompass ist zuverlässig, hat aber Fehler (Nordhalbkugel):</p>
<ul>
<li><b>Beschleunigungsfehler</b> auf Ost-/Westkursen: beim Beschleunigen dreht er nach Norden (ANDS: Accelerate North, Decelerate South).</li>
<li><b>Drehfehler:</b> Kurven auf Nordkurs früher beenden, auf Südkurs später (UNOS: Undershoot North, Overshoot South).</li>
</ul>` },
        { t: 'Der Kolbenmotor', b: `
<p><b>Viertakt:</b> Ansaugen → Verdichten → Arbeiten → Ausstossen.</p>
<ul>
<li><b>Doppelzündung</b> mit zwei Magneten, unabhängig von der Batterie (Magnetcheck vor dem Start).</li>
<li><b>Gemisch</b> in der Höhe abmagern (die Luft ist dünner).</li>
<li><b>Vergaservereisung:</b> möglich bis ca. +25 °C bei feuchter Luft. Zeichen: Drehzahl sinkt. Abhilfe: <b>Vergaservorwärmung</b> (Drehzahl sinkt erst noch etwas, dann steigt sie).</li>
<li>Treibstoff <b>AVGAS 100LL</b> (blau). Vor dem Flug Probe ziehen: Wasser?</li>
</ul>` },
        { t: 'Masse, Schwerpunkt, Leistung', b: `
<ul>
<li>Maximale Masse und Schwerpunktbereich müssen immer eingehalten werden.</li>
<li>Überladen → längere Startstrecke, höhere Überziehgeschwindigkeit, schlechteres Steigen.</li>
<li><b>Dichtehöhe:</b> Höhe, Hitze und Feuchtigkeit machen die Luft dünner → längere Start- und Landestrecken.</li>
<li><b>Gegenwind</b> verkürzt Start- und Landestrecke, nasses Gras verlängert sie.</li>
</ul>` },
      ],
      questions: [
        { q: 'Welches Instrument braucht Pitot- UND statischen Druck?', a: ['Fahrtmesser', 'Höhenmesser', 'Variometer', 'Kurskreisel'], c: 0, e: 'Nur der Fahrtmesser misst den Staudruck = Gesamtdruck − statischer Druck.' },
        { q: 'Die statische Öffnung vereist. Was zeigt der Höhenmesser?', a: ['Er bleibt stehen', 'Er zeigt 0', 'Er dreht durch', 'Er zeigt die Fahrt'], c: 0, e: 'Kein Druckwechsel mehr → konstante Anzeige.' },
        { q: 'Was bedeutet die rote Linie auf dem Fahrtmesser?', a: ['V_NE – nie überschreiten', 'Mindestgeschwindigkeit', 'Klappenbereich', 'Optimale Reisegeschwindigkeit'], c: 0, e: 'Velocity Never Exceed.' },
        { q: 'Mit QNH zeigt der Höhenmesser…', a: ['die Höhe über Meer', 'die Höhe über Grund', 'die Flugfläche', 'die Dichtehöhe'], c: 0, e: 'QNH → Höhe über mittlerem Meeresniveau (AMSL).' },
        { q: 'Du fliegst in ein Tief, ohne den Höhenmesser neu einzustellen. Du bist…', a: ['tiefer als angezeigt', 'höher als angezeigt', 'genau auf der angezeigten Höhe', 'schneller als angezeigt'], c: 0, e: '«Vom Hoch ins Tief geht\'s schief» – gefährlich nahe am Gelände.' },
        { q: 'Wie lange dauert ein Vollkreis mit Standardkurve (3°/s)?', a: ['2 Minuten', '1 Minute', '3 Minuten', '30 Sekunden'], c: 0, e: '360° / 3°/s = 120 s.' },
        { q: 'Die Drehzahl sinkt langsam, es ist feucht und 15 °C. Was vermutest du zuerst?', a: ['Vergaservereisung', 'Zu viel Öl', 'Magnetausfall beider Magnete', 'Überdrehzahl'], c: 0, e: 'Typisches Zeichen für Vergaservereisung → Vergaservorwärmung ziehen.' },
        { q: 'Warum hat ein Flugmotor zwei Magnete?', a: ['Redundanz und bessere Verbrennung', 'Für die Beleuchtung', 'Für den Kompass', 'Um die Batterie zu laden'], c: 0, e: 'Doppelzündung: sicherer und effizienter, unabhängig vom Bordnetz.' },
        { q: 'Welche Reihenfolge stimmt beim Viertaktmotor?', a: ['Ansaugen, Verdichten, Arbeiten, Ausstossen', 'Verdichten, Ansaugen, Ausstossen, Arbeiten', 'Arbeiten, Ansaugen, Verdichten, Ausstossen', 'Ansaugen, Arbeiten, Verdichten, Ausstossen'], c: 0, e: 'Ansaugen → Verdichten → Arbeiten → Ausstossen.' },
        { q: 'Was passiert mit der Startstrecke an einem heissen Tag auf einem hoch gelegenen Platz?', a: ['Sie wird länger', 'Sie wird kürzer', 'Bleibt gleich', 'Hängt nur vom Piloten ab'], c: 0, e: 'Hohe Dichtehöhe = dünne Luft = weniger Leistung und Auftrieb.' },
        { q: 'Kugel im Wendezeiger liegt rechts in einer Rechtskurve (kurveninnen). Was tust du?', a: ['Mehr rechtes Seitenruder', 'Mehr linkes Seitenruder', 'Nichts', 'Gas reduzieren'], c: 0, e: '«Tritt auf die Kugel» → rechtes Pedal.' },
        { q: 'Auf Ostkurs beschleunigst du. Der Magnetkompass zeigt kurzzeitig…', a: ['eine Drehung nach Norden', 'eine Drehung nach Süden', 'keine Änderung', 'Westkurs'], c: 0, e: 'ANDS: Accelerate North.' },
      ],
    },
    {
      id: 'meteo', name: 'Meteorologie', icon: '⛅', color: '#14b8a6',
      desc: 'Atmosphäre, Wolken, Föhn, METAR & TAF',
      lessons: [
        { t: 'Die Standardatmosphäre (ISA)', b: `
<ul>
<li>Meereshöhe: <b>15 °C</b> und <b>1013.25 hPa</b></li>
<li>Temperatur nimmt ab: <b>2 °C pro 1000 ft</b> (0.65 °C pro 100 m)</li>
<li>Tropopause ca. 11 km, −56.5 °C</li>
<li>Druck nimmt in Bodennähe ca. <b>1 hPa pro 30 ft</b> (8 m) ab</li>
</ul>` },
        { t: 'Feuchtigkeit, Wolken, Nebel', b: `
<p>Kühlt Luft bis zum <b>Taupunkt</b> ab, kondensiert der Wasserdampf → Wolken oder Nebel. Kleiner Abstand zwischen Temperatur und Taupunkt = Nebelgefahr.</p>
<ul>
<li>Trockene Luft kühlt beim Aufsteigen um <b>1 °C/100 m</b> ab, gesättigte nur um ca. <b>0.6 °C/100 m</b>.</li>
<li><b>Cumulus</b> = Quellwolken (Thermik, Turbulenz), <b>Stratus</b> = Schichtwolken, <b>Cumulonimbus</b> = Gewitterwolke.</li>
<li>Im Mittelland im Winter oft <b>Hochnebel</b> unter einer Inversion.</li>
</ul>` },
        { t: 'Föhn', b: `
<p>Beim <b>Südföhn</b> steigt feuchte Luft an der Alpensüdseite auf, kühlt feuchtadiabatisch ab (Wolken, Niederschlag im Tessin). Auf der Nordseite sinkt die nun trockene Luft und erwärmt sich um 1 °C/100 m → <b>warm, trocken, sehr gute Sicht</b> im Norden.</p>
<p><b>Gefahren:</b> starke Turbulenz, Rotoren, Fallwinde. Zeichen: linsenförmige Wolken (Lenticularis), Föhnmauer.</p>` },
        { t: 'Hoch, Tief, Fronten', b: `
<ul>
<li><b>Hoch:</b> absinkende Luft, meist schönes Wetter, aber Dunst/Inversion. Nordhalbkugel: Wind dreht im Uhrzeigersinn ums Hoch.</li>
<li><b>Tief:</b> aufsteigende Luft, Wolken, Niederschlag. Gegen den Uhrzeigersinn.</li>
<li><b>Warmfront:</b> langsam, Cirrus → Altostratus → Nimbostratus, Landregen, schlechte Sicht.</li>
<li><b>Kaltfront:</b> schnell, Cumulonimbus, Schauer, Böen, danach gute Sicht.</li>
</ul>
<p><b>Bise</b> = kalter Nordostwind im Mittelland.</p>` },
        { t: 'Gewitter & Vereisung', b: `
<p><b>Cumulonimbus</b>: schwere Turbulenz, Hagel, Blitz, Vereisung, Böenfront, Fallböen (Microbursts). Immer <b>grossräumig umfliegen</b> – nie darunter oder hindurch!</p>
<p><b>Vereisung</b> durch unterkühlte Wassertropfen, vor allem zwischen 0 und −15 °C. Besonders gefährlich: gefrierender Regen.</p>` },
        { t: 'METAR & TAF lesen', b: `
<p class="formula">LSZH 191020Z 24012KT 9999 FEW030 SCT080 15/08 Q1018 NOSIG</p>
<ul>
<li>LSZH = Zürich, 19. Tag 10:20 UTC</li>
<li>Wind aus 240° mit 12 Knoten</li>
<li>Sicht 10 km oder mehr</li>
<li>FEW (1–2/8) auf 3000 ft, SCT (3–4/8) auf 8000 ft · BKN = 5–7/8 · OVC = 8/8</li>
<li>Temperatur 15 °C, Taupunkt 8 °C, QNH 1018 hPa, keine Änderung erwartet</li>
</ul>
<p><b>CAVOK:</b> Sicht ≥ 10 km, keine Wolken unter 5000 ft, keine Cb/TCU, kein signifikantes Wetter.</p>
<p><b>TAF</b> = Flugplatzvorhersage. In der Schweiz zudem <b>GAFOR</b> für Alpenrouten: O (offen), D (schwierig), M (kritisch), X (geschlossen).</p>` },
      ],
      questions: [
        { q: 'Welche Temperatur hat die ISA auf Meereshöhe?', a: ['15 °C', '0 °C', '20 °C', '10 °C'], c: 0, e: 'ISA: 15 °C, 1013.25 hPa.' },
        { q: 'Um wie viel nimmt die Temperatur in der ISA pro 1000 ft ab?', a: ['2 °C', '1 °C', '3 °C', '0.5 °C'], c: 0, e: 'Ca. 2 °C pro 1000 ft.' },
        { q: 'Temperatur 6 °C, Taupunkt 5 °C, windstille klare Nacht. Was droht?', a: ['Nebel', 'Gewitter', 'Föhn', 'Hagel'], c: 0, e: 'Kleiner Spread + Ausstrahlung = Strahlungsnebel.' },
        { q: 'Wie ist das Wetter auf der Alpennordseite bei Südföhn typischerweise?', a: ['Warm, trocken, gute Sicht, turbulent', 'Kalt und Schnee', 'Nebel und windstill', 'Dauerregen'], c: 0, e: 'Absinkende, trockene Luft erwärmt sich stark.' },
        { q: 'Was bedeutet «BKN» im METAR?', a: ['5–7 Achtel bedeckt', '1–2 Achtel', '8 Achtel', 'Keine Wolken'], c: 0, e: 'Broken = 5–7/8.' },
        { q: 'Was bedeutet «24012KT»?', a: ['Wind aus 240° mit 12 Knoten', 'Wind nach 240° mit 12 km/h', 'Sicht 240 m', 'Wolken auf 12000 ft'], c: 0, e: 'Die Richtung ist immer die, AUS der der Wind kommt.' },
        { q: 'Was gehört NICHT zu CAVOK?', a: ['Wolken auf 2000 ft', 'Sicht ≥ 10 km', 'Keine Cb', 'Kein signifikantes Wetter'], c: 0, e: 'Bei CAVOK keine Wolken unter 5000 ft.' },
        { q: 'Welche Front bringt Schauer, Böen und danach gute Sicht?', a: ['Kaltfront', 'Warmfront', 'Hochdruckbrücke', 'Inversion'], c: 0, e: 'Kaltfront: schnell, Cumulonimbus, danach klare Luft.' },
        { q: 'Wie verhältst du dich gegenüber einem Gewitter?', a: ['Grossräumig umfliegen', 'Unten durchfliegen', 'Durchfliegen, wenn es kurz ist', 'Darüber steigen mit kleinem Flugzeug'], c: 0, e: 'Cb sind lebensgefährlich – Abstand halten.' },
        { q: 'In welchem Temperaturbereich ist Vereisung besonders häufig?', a: ['0 bis −15 °C', '+10 bis +20 °C', 'unter −40 °C', 'nur über 0 °C'], c: 0, e: 'Unterkühlte Tropfen gibt es v. a. zwischen 0 und −15 °C.' },
        { q: 'Was bedeutet GAFOR-Code «X»?', a: ['Route geschlossen', 'Route offen', 'Schwierig', 'Keine Daten'], c: 0, e: 'O offen, D difficult, M marginal, X closed.' },
        { q: 'In welche Richtung dreht der Wind um ein Hoch (Nordhalbkugel)?', a: ['Im Uhrzeigersinn', 'Gegen den Uhrzeigersinn', 'Gar nicht', 'Je nach Jahreszeit'], c: 0, e: 'Hoch: Uhrzeigersinn, Tief: Gegenuhrzeigersinn.' },
      ],
    },
    {
      id: 'navi', name: 'Navigation', icon: '🧮', color: '#8b5cf6',
      desc: 'Karten, Kurse, Wind, Zeit & Treibstoff',
      lessons: [
        { t: 'Koordinaten & Einheiten', b: `
<ul>
<li><b>Breitengrade</b> 0–90° N/S, <b>Längengrade</b> 0–180° E/W</li>
<li>1° Breite = <b>60 NM</b>, 1 Bogenminute = 1 NM</li>
<li>1 NM = <b>1852 m</b> · 1 ft = <b>0.3048 m</b> · 1 kt = 1 NM/h ≈ 1.85 km/h</li>
<li>Karte ICAO <b>1:500 000</b> → 1 cm = 5 km</li>
<li>Zeit in der Luftfahrt: <b>UTC</b>. Schweiz: Winter UTC+1, Sommer UTC+2</li>
</ul>` },
        { t: 'Kurse: wahr, magnetisch, Kompass', b: `
<p><b>rwK</b> (rechtweisend, von der Karte) ± <b>Missweisung</b> = <b>mwK</b> (magnetisch) ± <b>Deviation</b> = <b>KK</b> (Kompasskurs).</p>
<p>Missweisung Ost wird abgezogen, West addiert: <i>«East is least, West is best»</i>. In der Schweiz ist die Missweisung klein (wenige Grad Ost).</p>
<p><b>Gegenkurs:</b> ±180° (z.&nbsp;B. 070° → 250°).</p>` },
        { t: 'Wind & Vorhaltewinkel', b: `
<p>Wind von rechts versetzt dich nach links → du musst nach <b>rechts vorhalten</b> (in den Wind).</p>
<ul>
<li>Gegenwind → kleinere <b>Grundgeschwindigkeit (GS)</b></li>
<li>Rückenwind → grössere GS</li>
<li>Faustregel max. Vorhaltewinkel ≈ Windgeschwindigkeit × 60 / Eigengeschwindigkeit</li>
</ul>` },
        { t: 'Zeit, Distanz, Treibstoff', b: `
<p class="formula">Zeit = Distanz / Geschwindigkeit</p>
<p>Beispiel: 30 NM bei 120 kt → 0.25 h = <b>15 min</b>. Tipp: 120 kt = 2 NM pro Minute.</p>
<p>Treibstoff = Verbrauch × Zeit + <b>Reserve</b> (VFR am Tag mindestens 30 min).</p>
<p><b>1:60-Regel:</b> 1° Kursfehler ≈ 1 NM Ablage nach 60 NM.</p>` },
        { t: 'Höhen nach Kurs (VFR)', b: `
<p>Über 3000 ft über Grund gelten <b>Halbkreisflughöhen</b> (nach magnetischem Kurs):</p>
<ul><li>000°–179°: <b>ungerade</b> Tausender + 500 (3500, 5500, 7500 ft)</li><li>180°–359°: <b>gerade</b> Tausender + 500 (4500, 6500 ft)</li></ul>` },
        { t: 'Funknavigation (Airline-Wissen)', b: `
<ul>
<li><b>VOR:</b> Radiale (magnetisch, <i>von</i> der Station weg)</li>
<li><b>DME:</b> Schrägdistanz in NM</li>
<li><b>ILS:</b> Localizer (seitlich) + Glideslope (meist <b>3°</b>)</li>
<li>3°-Gleitweg ≈ <b>300 ft pro NM</b>. Sinkrate ≈ GS × 5 (z.&nbsp;B. 140 kt → 700 ft/min)</li>
</ul>` },
      ],
      questions: [
        { q: 'Wie viele Meter hat eine nautische Meile?', a: ['1852 m', '1000 m', '1609 m', '1500 m'], c: 0, e: '1 NM = 1852 m (1 Bogenminute).' },
        { q: '45 NM bei 90 kt Grundgeschwindigkeit. Flugzeit?', a: ['30 min', '45 min', '20 min', '50 min'], c: 0, e: '90 kt = 1.5 NM/min → 45/1.5 = 30 min.' },
        { q: 'Gegenkurs von 075°?', a: ['255°', '105°', '275°', '165°'], c: 0, e: '075 + 180 = 255.' },
        { q: 'Massstab 1:500 000 – 4 cm auf der Karte sind…', a: ['20 km', '2 km', '50 km', '4 km'], c: 0, e: '1 cm = 5 km.' },
        { q: 'Wind kommt von rechts. Wohin hältst du vor?', a: ['Nach rechts', 'Nach links', 'Gar nicht', 'Nach unten'], c: 0, e: 'Immer in den Wind vorhalten.' },
        { q: '3° Kursfehler. Wie gross ist die Ablage nach 40 NM?', a: ['2 NM', '3 NM', '1 NM', '6 NM'], c: 0, e: '1:60 → 3 × 40/60 = 2 NM.' },
        { q: 'Magnetischer Kurs 220°, über 3000 ft AGL. Welche Höhe passt?', a: ['6500 ft', '5500 ft', '7500 ft', '3500 ft'], c: 0, e: '180–359° → gerade Tausender + 500.' },
        { q: 'Verbrauch 30 l/h, Flugzeit 1 h 20 min, Reserve 30 min. Mindesttreibstoff?', a: ['55 l', '40 l', '45 l', '60 l'], c: 0, e: '30 × (80+30)/60 = 55 l.' },
        { q: 'Welche Zeitzone verwendet die Luftfahrt?', a: ['UTC', 'MEZ', 'Lokale Zeit', 'MESZ'], c: 0, e: 'Alles in UTC («Zulu»).' },
        { q: 'Auf einem 3°-Gleitweg bist du 5 NM vor der Piste. Ungefähre Höhe über Pistenschwelle?', a: ['1500 ft', '500 ft', '3000 ft', '1000 ft'], c: 0, e: '≈ 300 ft pro NM × 5.' },
        { q: '1° Breite entspricht…', a: ['60 NM', '100 km', '1 NM', '111 NM'], c: 0, e: '1° = 60 Bogenminuten = 60 NM.' },
        { q: 'GS 150 kt auf 3°-Anflug. Ungefähre Sinkrate?', a: ['750 ft/min', '300 ft/min', '1500 ft/min', '450 ft/min'], c: 0, e: 'Faustregel GS × 5.' },
      ],
    },
    {
      id: 'recht', name: 'Luftrecht & Luftraum', icon: '📜', color: '#ef4444',
      desc: 'Regeln, Vortritt, Luftraum, Transponder',
      lessons: [
        { t: 'Wer regelt die Luftfahrt?', b: `
<ul>
<li><b>ICAO</b> – weltweite Standards</li>
<li><b>EASA</b> – europäische Regeln (gelten auch in der Schweiz), z.&nbsp;B. SERA</li>
<li><b>BAZL</b> – Bundesamt für Zivilluftfahrt (Aufsicht Schweiz)</li>
<li><b>Skyguide</b> – Flugsicherung der Schweiz</li>
</ul>
<p>Schweizer Flugzeuge tragen das Kennzeichen <b>HB-</b>.</p>` },
        { t: 'Luftraumklassen', b: `
<p>In der Schweiz vor allem <b>C, D, E und G</b>:</p>
<ul>
<li><b>C und D:</b> kontrolliert, VFR braucht eine <b>Freigabe</b> und Funkkontakt</li>
<li><b>E:</b> kontrolliert, aber VFR ohne Freigabe</li>
<li><b>G:</b> unkontrolliert</li>
</ul>
<p>Rund um Flughäfen: <b>CTR</b> (Kontrollzone, ab Boden) und <b>TMA</b> (Nahkontrollbezirk, darüber).</p>` },
        { t: 'Ausweichregeln', b: `
<ul>
<li><b>Gegenflug:</b> beide weichen nach <b>rechts</b> aus</li>
<li><b>Kreuzen:</b> wer den anderen <b>rechts</b> von sich hat, weicht aus</li>
<li><b>Überholen:</b> rechts überholen</li>
<li>Vortritt: Ballone → Segelflugzeuge → Luftschiffe → Motorflugzeuge (wer weniger manövrierfähig ist, hat Vortritt)</li>
<li>Landende und Flugzeuge in Not haben Vortritt</li>
</ul>
<p>Kollisionskurs erkennst du daran, dass das andere Flugzeug im Sichtfeld <b>stillsteht</b> und grösser wird.</p>` },
        { t: 'Transponder-Codes', b: `
<ul>
<li><b>7000</b> – VFR (Schweiz/Europa)</li>
<li><b>7500</b> – Entführung</li>
<li><b>7600</b> – Funkausfall</li>
<li><b>7700</b> – Notfall</li>
</ul>
<p>Merksatz: «75 – taken alive, 76 – radio fix, 77 – going to heaven».</p>` },
        { t: 'Lichtsignale vom Tower', b: `
<table>
<tr><th></th><th>In der Luft</th><th>Am Boden</th></tr>
<tr><td>🟢 dauernd</td><td>Landung frei</td><td>Start frei</td></tr>
<tr><td>🟢 blinkend</td><td>Zurückkommen zur Landung</td><td>Rollen frei</td></tr>
<tr><td>🔴 dauernd</td><td>Ausweichen, weiterkreisen</td><td>Halt</td></tr>
<tr><td>🔴 blinkend</td><td>Nicht landen, Platz unsicher</td><td>Landefläche räumen</td></tr>
<tr><td>⚪ blinkend</td><td>–</td><td>Zurück zum Ausgangspunkt</td></tr>
</table>` },
        { t: 'Mindesthöhen & Lizenzen', b: `
<ul>
<li>Über Städten und Menschenansammlungen: <b>300 m (1000 ft)</b> über dem höchsten Hindernis im Umkreis von 600 m</li>
<li>Sonst: mindestens <b>150 m (500 ft)</b> über Grund</li>
</ul>
<p><b>Lizenzen:</b> LAPL / PPL (privat) → CPL (Berufspilot) → <b>ATPL/MPL</b> (Airline). Medical Klasse 2 für privat, <b>Klasse 1</b> für Berufspiloten.</p>` },
      ],
      questions: [
        { q: 'Welcher Transpondercode bedeutet Notfall?', a: ['7700', '7600', '7500', '7000'], c: 0, e: '77 – going to heaven.' },
        { q: 'Welcher Code bei Funkausfall?', a: ['7600', '7700', '7500', '2000'], c: 0, e: '76 – radio fix.' },
        { q: 'Zwei Flugzeuge im Gegenflug. Was tun beide?', a: ['Nach rechts ausweichen', 'Nach links ausweichen', 'Das höhere steigt', 'Nichts'], c: 0, e: 'Beide nach rechts.' },
        { q: 'Kreuzende Kurse: Wer muss ausweichen?', a: ['Wer den anderen rechts von sich hat', 'Wer den anderen links hat', 'Das schnellere', 'Das grössere'], c: 0, e: 'Rechtsvortritt wie im Strassenverkehr.' },
        { q: 'Wer hat Vortritt: Segelflugzeug oder Motorflugzeug?', a: ['Segelflugzeug', 'Motorflugzeug', 'Das tiefere', 'Wer zuerst funkt'], c: 0, e: 'Das weniger manövrierfähige Luftfahrzeug hat Vortritt.' },
        { q: 'Dauerndes grünes Licht vom Tower, du bist in der Luft. Bedeutung?', a: ['Landung frei', 'Start frei', 'Weiterkreisen', 'Platz unsicher'], c: 0, e: 'Grün dauernd in der Luft = Landung frei.' },
        { q: 'Blinkendes rotes Licht in der Luft bedeutet…', a: ['Nicht landen – Platz unsicher', 'Landung frei', 'Zurückkommen', 'Rollen frei'], c: 0, e: 'Flugplatz unsicher – nicht landen.' },
        { q: 'Welche Behörde beaufsichtigt die Zivilluftfahrt in der Schweiz?', a: ['BAZL', 'Skyguide', 'ICAO', 'SBB'], c: 0, e: 'Bundesamt für Zivilluftfahrt.' },
        { q: 'In welchem Luftraum braucht VFR KEINE Freigabe, obwohl er kontrolliert ist?', a: ['E', 'C', 'D', 'CTR'], c: 0, e: 'Klasse E: kontrolliert, VFR ohne Freigabe.' },
        { q: 'Mindesthöhe über einer Stadt?', a: ['300 m über dem höchsten Hindernis (600 m Umkreis)', '150 m über Grund', '50 m', '1000 m über Meer'], c: 0, e: '1000 ft über dem höchsten Hindernis.' },
        { q: 'Mit welchem Kennzeichen beginnen Schweizer Flugzeuge?', a: ['HB-', 'CH-', 'D-', 'S-'], c: 0, e: 'HB- ist das Schweizer Nationalitätszeichen.' },
        { q: 'Wie erkennst du einen Kollisionskurs?', a: ['Das andere Flugzeug bleibt an derselben Stelle im Sichtfeld', 'Es bewegt sich schnell zur Seite', 'Es wird kleiner', 'Gar nicht'], c: 0, e: 'Konstante Peilung + grösser werdend = Kollisionskurs.' },
      ],
    },
    {
      id: 'funk', name: 'Sprechfunk & Aviation English', icon: '🎧', color: '#ec4899',
      desc: 'Alphabet, Phrasen, Readback',
      lessons: [
        { t: 'Das ICAO-Alphabet', b: `
<p class="alpha">Alfa · Bravo · Charlie · Delta · Echo · Foxtrot · Golf · Hotel · India · Juliett · Kilo · Lima · Mike · November · Oscar · Papa · Quebec · Romeo · Sierra · Tango · Uniform · Victor · Whiskey · X-ray · Yankee · Zulu</p>
<p>Zahlen: 3 = «tree», 4 = «fower», 5 = «fife», 9 = «niner». 1000 = «tousand». Komma = «decimal».</p>
<p>Beispiel: HB-KXA = «Hotel Bravo Kilo X-ray Alfa», abgekürzt «Hotel X-ray Alfa».</p>` },
        { t: 'Standardwörter', b: `
<ul>
<li><b>Affirm</b> – ja · <b>Negative</b> – nein</li>
<li><b>Roger</b> – verstanden · <b>Wilco</b> – verstanden, wird ausgeführt</li>
<li><b>Say again</b> – bitte wiederholen · <b>Standby</b> – warten</li>
<li><b>Unable</b> – kann ich nicht · <b>Correction</b> – Korrektur</li>
</ul>` },
        { t: 'Readback', b: `
<p>Diese Dinge musst du <b>immer zurücklesen</b>:</p>
<ul><li>Piste, Freigaben (Start, Landung, Rollen, Kreuzen)</li><li>Höhe, Kurs, Geschwindigkeit</li><li>Frequenz, Transpondercode, QNH</li></ul>
<p>Beispiel: «Swiss 123, climb flight level 120, turn left heading 240.» → «Climb flight level 120, left heading 240, Swiss 123.»</p>` },
        { t: 'Notfälle', b: `
<ul>
<li><b>MAYDAY MAYDAY MAYDAY</b> – Notlage, unmittelbare Gefahr</li>
<li><b>PAN PAN, PAN PAN, PAN PAN</b> – Dringlichkeit</li>
<li>Notfrequenz: <b>121.5 MHz</b></li>
</ul>
<p>Aufbau: Wer ruft – wer bist du – was ist los – was willst du tun – Position, Höhe, Kurs – Personen an Bord.</p>` },
      ],
      questions: [
        { q: 'Wie buchstabierst du «W»?', a: ['Whiskey', 'Wilco', 'Waltz', 'Wisconsin'], c: 0, e: 'W = Whiskey.' },
        { q: 'Was bedeutet «Wilco»?', a: ['Verstanden, wird ausgeführt', 'Bitte wiederholen', 'Nein', 'Warten'], c: 0, e: 'Will comply.' },
        { q: 'Wie sprichst du die Zahl 9 im Funk?', a: ['Niner', 'Nine', 'Neun', 'Nain'], c: 0, e: '«Niner», damit man es nicht mit «nein» verwechselt.' },
        { q: 'Was musst du NICHT zwingend zurücklesen?', a: ['Verkehrsinformation über ein anderes Flugzeug', 'QNH', 'Transpondercode', 'Pistenfreigabe'], c: 0, e: 'Verkehrsinfos bestätigt man, z. B. mit «traffic in sight».' },
        { q: 'Welches Wort leitet einen Notfall ein?', a: ['MAYDAY', 'PAN PAN', 'SECURITE', 'HELP'], c: 0, e: 'Mayday = Notlage.' },
        { q: 'Die internationale Notfrequenz ist…', a: ['121.5 MHz', '118.0 MHz', '123.45 MHz', '7700 MHz'], c: 0, e: '121.5 MHz (Guard).' },
        { q: 'Abkürzung des Rufzeichens HB-KXA?', a: ['Hotel X-ray Alfa', 'Kilo X-ray Alfa', 'HB Alfa', 'Bravo Kilo'], c: 0, e: 'Erstes Zeichen + die letzten zwei.' },
        { q: '«Say again» bedeutet…', a: ['Bitte wiederholen', 'Sag Ja', 'Verstanden', 'Ende'], c: 0, e: 'Wiederholen.' },
      ],
    },
    {
      id: 'hf', name: 'Human Factors', icon: '🧠', color: '#22c55e',
      desc: 'Körper, Wahrnehmung, Entscheidungen, CRM',
      lessons: [
        { t: 'Sauerstoff & Hypoxie', b: `
<p>Mit der Höhe sinkt der Sauerstoffpartialdruck. <b>Hypoxie</b> merkt man oft nicht selbst!</p>
<p>Symptome: Euphorie, Müdigkeit, Kopfweh, schlechteres Sehen, Fehler, blaue Lippen.</p>
<p>Ab ca. <b>10 000 ft</b> wird Sauerstoff wichtig. Rauchen verschlechtert die Höhentoleranz.</p>
<p><b>Hyperventilation</b> (zu schnelles Atmen, z.&nbsp;B. bei Stress): Kribbeln, Schwindel → bewusst langsam atmen.</p>` },
        { t: 'Gleichgewicht & Täuschungen', b: `
<p>Das Gleichgewichtsorgan (Bogengänge) lässt sich täuschen. Ohne Sicht nach draussen kannst du eine Kurve für Geradeausflug halten → <b>räumliche Desorientierung</b>. Lösung: <b>Instrumenten vertrauen</b>.</p>
<p>Beim Beschleunigen fühlt es sich an, als würde die Nase steigen.</p>
<p><b>Landeanflug:</b> Ansteigende Piste → du fühlst dich zu hoch → Gefahr, zu tief anzufliegen. Schmale Piste wirkt ebenfalls «zu hoch».</p>` },
        { t: 'Fit to fly? (IMSAFE)', b: `
<ul>
<li><b>I</b>llness – krank?</li>
<li><b>M</b>edication – Medikamente?</li>
<li><b>S</b>tress</li>
<li><b>A</b>lcohol – min. 8 h kein Alkohol, Grenzwert 0.2 ‰</li>
<li><b>F</b>atigue – müde?</li>
<li><b>E</b>ating / Emotion</li>
</ul>
<p>Mit Erkältung nicht fliegen: Druckausgleich der Ohren kann im Sinkflug sehr schmerzhaft werden. Nach dem Tauchen 12–24 h nicht fliegen.</p>` },
        { t: 'Entscheiden mit FORDEC', b: `
<p>Viele Airlines nutzen <b>FORDEC</b>:</p>
<ol><li><b>F</b>acts – Was ist los?</li><li><b>O</b>ptions – Welche Möglichkeiten?</li><li><b>R</b>isks & Benefits</li><li><b>D</b>ecision</li><li><b>E</b>xecution</li><li><b>C</b>heck – Hat es funktioniert?</li></ol>
<p><b>Aviate – Navigate – Communicate:</b> Zuerst das Flugzeug fliegen!</p>` },
        { t: 'CRM & Fehler', b: `
<ul>
<li><b>CRM</b> (Crew Resource Management): Kommunikation, Teamarbeit, Situationsbewusstsein, Entscheiden, Führen</li>
<li><b>Threat & Error Management:</b> Bedrohungen erkennen, Fehler auffangen, bevor sie gefährlich werden</li>
<li><b>Swiss-Cheese-Modell:</b> Ein Unfall entsteht, wenn sich Löcher in mehreren Sicherheitsebenen überlagern</li>
<li><b>Sterile Cockpit:</b> unter 10 000 ft nur flugbezogene Gespräche</li>
</ul>
<p>Stress: etwas Stress steigert die Leistung, zu viel senkt sie stark.</p>` },
      ],
      questions: [
        { q: 'Was ist typisch für Hypoxie?', a: ['Man bemerkt sie oft selbst nicht', 'Sie tritt nur am Boden auf', 'Sie macht wacher', 'Sie betrifft nur Raucher'], c: 0, e: 'Hypoxie ist heimtückisch – Euphorie statt Warnsignal.' },
        { q: 'Was hilft bei Hyperventilation?', a: ['Bewusst langsam atmen', 'Schneller atmen', 'Steigen', 'Sauerstoff abschalten'], c: 0, e: 'Atmung beruhigen bringt den CO₂-Haushalt zurück.' },
        { q: 'Du fliegst in eine Wolke und fühlst dich geradeaus. Wem vertraust du?', a: ['Den Instrumenten', 'Dem Gefühl', 'Dem Passagier', 'Dem Kompass allein'], c: 0, e: 'Das Gleichgewichtsorgan täuscht – Instrumente lügen nicht.' },
        { q: 'Wofür steht das «A» in FORDEC?', a: ['Es gibt kein A – F-O-R-D-E-C', 'Aviate', 'Altitude', 'Action'], c: 0, e: 'Facts, Options, Risks & Benefits, Decision, Execution, Check.' },
        { q: 'Wie lange mindestens zwischen Alkohol und Fliegen?', a: ['8 Stunden', '1 Stunde', '30 Minuten', 'Keine Regel'], c: 0, e: '«8 hours bottle to throttle» – und unter 0.2 ‰.' },
        { q: 'Eine ansteigende Piste verleitet dich…', a: ['zu tief anzufliegen', 'zu hoch anzufliegen', 'zu schnell zu rollen', 'zu spät zu bremsen'], c: 0, e: 'Sie wirkt, als wärst du zu hoch → du sinkst zu tief.' },
        { q: 'Was ist die Reihenfolge der Prioritäten im Cockpit?', a: ['Aviate – Navigate – Communicate', 'Communicate – Aviate – Navigate', 'Navigate – Communicate – Aviate', 'Egal'], c: 0, e: 'Immer zuerst fliegen!' },
        { q: 'Was beschreibt das Swiss-Cheese-Modell?', a: ['Unfälle entstehen durch mehrere sich überlagernde Lücken', 'Die Schweizer Luftraumstruktur', 'Ein Navigationsverfahren', 'Eine Wolkenform'], c: 0, e: 'Modell von James Reason.' },
        { q: 'Warum nicht mit Erkältung fliegen?', a: ['Druckausgleich der Ohren/Nebenhöhlen gestört', 'Man sieht schlechter', 'Der Motor läuft schlechter', 'Gesetzlich nie erlaubt'], c: 0, e: 'Besonders im Sinkflug drohen starke Schmerzen.' },
      ],
    },
    {
      id: 'betrieb', name: 'Flugbetrieb', icon: '🛫', color: '#64748b',
      desc: 'Platzrunde, Start, Landung, Notfälle',
      lessons: [
        { t: 'Die Platzrunde', b: `
<ol><li><b>Abflug</b> (Upwind)</li><li><b>Querabflug</b> (Crosswind)</li><li><b>Gegenanflug</b> (Downwind)</li><li><b>Queranflug</b> (Base)</li><li><b>Endanflug</b> (Final)</li></ol>
<p>Standard ist eine <b>Linksplatzrunde</b>, ausser es ist anders publiziert.</p>` },
        { t: 'Pisten & Wind', b: `
<p>Die <b>Pistennummer</b> ist die magnetische Richtung ÷ 10. Piste 28 → ca. 280°, Gegenrichtung = Piste 10.</p>
<p>Gestartet und gelandet wird <b>gegen den Wind</b>.</p>
<p><b>Seitenwindkomponente</b> (Faustregel): 30° → ½, 45° → ¾ (genau 0.7), 60° und mehr → fast voll.</p>` },
        { t: 'Vor dem Flug', b: `
<ul>
<li><b>Vorflugkontrolle</b> (Walk-around): Ruder frei, Reifen, Öl, Treibstoff</li>
<li>Treibstoffprobe auf <b>Wasser</b> prüfen</li>
<li>Wetter, NOTAM, Treibstoffplanung, Masse & Schwerpunkt</li>
<li><b>Checklisten</b> konsequent benutzen – auch Profis tun das!</li>
</ul>` },
        { t: 'Notfälle', b: `
<p><b>Motorausfall nach dem Start:</b> Nase runter, Geschwindigkeit halten, Landefeld <b>voraus</b> (±30°) wählen. Nicht in tiefer Höhe umkehren!</p>
<p><b>Wirbelschleppen:</b> Hinter grossen Flugzeugen. Sie sinken ab und treiben mit dem Wind. Über ihrer Flugbahn bleiben, <b>nach</b> ihrem Aufsetzpunkt landen.</p>
<p><b>Durchstarten</b> ist nie ein Fehler – wenn der Anflug nicht stabil ist: Go-around!</p>` },
        { t: 'Was Fluglehrer am Flugkurs sehen wollen', b: `
<p>Worauf typischerweise geachtet wird:</p>
<ul>
<li><b>Lernkurve:</b> Wie schnell setzt du Korrekturen um?</li>
<li><b>Genauigkeit:</b> Höhe, Kurs, Geschwindigkeit halten</li>
<li><b>Luftraumbeobachtung</b> und Situationsbewusstsein</li>
<li><b>Vorbereitung:</b> Theorie und Checklisten im Kopf</li>
<li><b>Belastbarkeit</b> und Teamfähigkeit, ehrliche Selbsteinschätzung</li>
</ul>
<p class="note">Tipp: Nach jedem Flug kurz notieren, was gut lief und was du beim nächsten Mal besser machst.</p>` },
      ],
      questions: [
        { q: 'Welcher Teil der Platzrunde verläuft parallel zur Piste, entgegen der Landerichtung?', a: ['Gegenanflug', 'Endanflug', 'Querabflug', 'Queranflug'], c: 0, e: 'Downwind = Gegenanflug.' },
        { q: 'Piste 06 – welche Richtung ungefähr?', a: ['060°', '006°', '600°', '240°'], c: 0, e: '06 × 10 = 060°.' },
        { q: 'Gegenrichtung zu Piste 14?', a: ['32', '04', '23', '41'], c: 0, e: '14 + 18 = 32.' },
        { q: 'Wind 20 kt, 30° zur Piste. Seitenwindkomponente?', a: ['10 kt', '20 kt', '5 kt', '17 kt'], c: 0, e: 'sin 30° = 0.5.' },
        { q: 'Motorausfall direkt nach dem Start in tiefer Höhe:', a: ['Geradeaus landen, Geschwindigkeit halten', 'Sofort umkehren zur Piste', 'Ziehen, um Höhe zu halten', 'Funk zuerst'], c: 0, e: 'Umkehren in tiefer Höhe führt oft zum Strömungsabriss.' },
        { q: 'Wie landest du nach einem grossen Verkehrsflugzeug?', a: ['Hinter dessen Aufsetzpunkt', 'Vor dessen Aufsetzpunkt', 'Direkt darunter', 'Egal'], c: 0, e: 'Über der Flugbahn bleiben und dahinter aufsetzen – Wirbelschleppen sinken.' },
        { q: 'Warum ziehst du vor dem Flug eine Treibstoffprobe?', a: ['Um Wasser oder Schmutz zu finden', 'Um den Ölstand zu prüfen', 'Für die Statistik', 'Um Treibstoff zu sparen'], c: 0, e: 'Wasser im Tank kann den Motor stoppen.' },
        { q: 'Der Anflug ist nicht stabil. Was tust du?', a: ['Durchstarten', 'Trotzdem landen', 'Stark nachdrücken', 'Motor abstellen'], c: 0, e: 'Go-around ist immer eine gute Entscheidung.' },
        { q: 'In welche Richtung wird gestartet?', a: ['Gegen den Wind', 'Mit dem Wind', 'Quer zum Wind', 'Egal'], c: 0, e: 'Gegenwind = kürzere Startstrecke.' },
      ],
    },
  ];

  window.Content = { TOPICS, SOURCES, topic: (id) => TOPICS.find((t) => t.id === id) };
})();
