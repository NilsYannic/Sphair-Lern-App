// Lerninhalte: Lektionen und Quizfragen für SPHAIR (Ziel: Airline-Pilot/-in)
// Offizielle Angaben stammen von sphair.ch und den unter SOURCES verlinkten Seiten.
(() => {
  const SOURCES = [
    { title: 'SPHAIR – Airlinepilot/-in werden', url: 'https://sphair.ch/de/airlinepilot' },
    { title: 'SPHAIR – Screening Pilot/-in', url: 'https://sphair.ch/de/pilot/screening' },
    { title: 'SPHAIR – Flugkurs', url: 'https://sphair.ch/de/pilot/flugkurs' },
    { title: 'SPHAIR – Vorbereitung Pilot/-in (alle Unterlagen)', url: 'https://sphair.ch/de/pilot/vorbereitung' },
    { title: 'SPHAIR – Grundlagen & Verfahren 2026 (PDF)', url: 'https://storagesphairprod.blob.core.windows.net/strapimedia-abn/assets/2026_GUV_d_401edd35e6.pdf' },
    { title: 'SPHAIR – Need to have / need to know (PDF)', url: 'https://storagesphairprod.blob.core.windows.net/strapimedia-abn/assets/need_to_have_need_to_know_d_e54dcab1da.pdf' },
    { title: 'SPHAIR – Are you ready for departure? (PDF)', url: 'https://storagesphairprod.blob.core.windows.net/strapimedia-abn/assets/2026_Are_you_ready_de_eb3e7dcd2b.pdf' },
    { title: 'SPHAIR – Checklists & Procedures aller Flugschulen (ZIP)', url: 'https://storagesphairprod.blob.core.windows.net/strapimedia-abn/assets/Checklists_and_Procedures_5e2d3e430a.zip' },
    { title: 'SPHAIR – Brief Augenarzt / Optiker (PDF)', url: 'https://storagesphairprod.blob.core.windows.net/strapimedia/assets/Brief_Augenarzt_Optiker_DE_f1e71b384f.pdf' },
    { title: 'SPHAIR – Karriereweg Airline (PDF)', url: 'https://storagesphairprod.blob.core.windows.net/strapimedia/assets/Karrieregrafik_Airline_c30af13295.pdf' },
    { title: 'SPHAIR – Lernprogramm (offiziell)', url: 'https://lernprogramm.sphair.ch/de/' },
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
<li><b>Flugkurs:</b> 2 Wochen bei einer SPHAIR-Partnerflugschule (in den Schulferien im Frühling, Sommer und Herbst), <b>11 Flüge à ca. 45 Minuten</b> (rund 10 Flugstunden) plus Theorie. Ab Tag 1 steuerst du selbst.</li>
</ol>
<p>Am Schluss: <b>SPHAIR-Zertifikat</b> mit Empfehlung (z.&nbsp;B. für die Berufspilotenlaufbahn).</p>` },
        { t: 'Der Screening-Tag', b: `
<p>So sieht der Tag laut sphair.ch aus:</p>
<ul>
<li><b>09:00</b> Check-in: biografischer Fragebogen und Brillen-/Linsenpass</li>
<li><b>10:00</b> Block 1: <b>Englisch, Kopfrechnen, räumliches Vorstellungsvermögen</b></li>
<li><b>11:00</b> Block 2: <b>Merkfähigkeit, Konzentrationsvermögen, technisches Verständnis</b></li>
<li><b>12:00</b> Mittagspause</li>
<li><b>13:00</b> Block 3: <b>Wahrnehmung und Rechenaufgaben</b></li>
<li><b>14:00</b> Block 4: <b>Psychomotorik und Mehrfachanordnungen</b> (Multitasking)</li>
<li><b>15:00</b> Block 5: <b>Persönlichkeits- und Refraktometertest</b></li>
</ul>
<p>Offizieller Tipp: Mit den Übungsaufgaben auf sphair.ch üben, <b>bis du keine wesentlichen Fortschritte mehr machst</b>.</p>
<p><b>Brille?</b> Lade auf sphair.ch den «Brief Augenarzt / Optiker» herunter, lass ihn ausfüllen und gib die Werte in den Sehstärken-Rechner ein. Die Ergebnisse brauchst du für die Anmeldung zum Screening.</p>
<p>Für jeden Block gibt es in dieser App einen <b>Trainer</b> unter «Training». Die <b>Screening-Simulation</b> spielt alles am Stück durch.</p>
<p class="note">Erfahrungsberichte: Kopfrechnen kommt visuell <i>und</i> akustisch, ohne Notizen und mit Zeitlimit. Quadrat- und Kubikzahlen helfen viel.</p>` },
        { t: 'Der Airline-Weg', b: `
<p>Mit einem SPHAIR-Zertifikat mit <b>Empfehlung für die Berufspilotenlaufbahn</b> hast du bei <b>SWISS und Edelweiss</b> einen vereinfachten Zugang zum Assessment:</p>
<ul>
<li>Du steigst direkt bei <b>Step 2 des «Lufthansa Group Assessments»</b> ein – der obligatorische <b>DLR-Test (Step 1) entfällt</b> (seit Juni 2024).</li>
<li>Das Zertifikat darf beim Assessment (Step 2) <b>höchstens 5 Jahre alt</b> sein.</li>
<li>Gilt für SWISS und Edelweiss. Für andere Lufthansa-Group-Airlines brauchst du weiterhin den DLR-Test.</li>
</ul>
<p>Weitere Voraussetzungen laut sphair.ch: <b>sehr gute Englischkenntnisse</b> bei Ausbildungsbeginn, bestandene medizinische Checks (Brille erlaubt) und die Anforderungen deines Arbeitgebers.</p>
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
        { q: 'Wie lange dauert der SPHAIR-Flugkurs?', a: ['2 Wochen', '1 Tag', '3 Monate', '1 Wochenende'], c: 0, e: 'Zwei Wochen mit 11 Flügen à ca. 45 Minuten und Theorie.' },
        { q: 'Welchen Vorteil bringt das Zertifikat (mit Empfehlung Berufspilot) bei SWISS/Edelweiss?', a: ['Der DLR-Test entfällt', 'Die Ausbildung ist gratis', 'Man braucht kein Medical', 'Man wird direkt Captain'], c: 0, e: 'Seit Juni 2024 können SPHAIR-Absolvent/-innen mit Empfehlung den DLR-Test auslassen.' },
        { q: 'Wie alt darf das SPHAIR-Zertifikat beim Airline-Assessment (Step 2) höchstens sein?', a: ['5 Jahre', '1 Jahr', '10 Jahre', 'Unbegrenzt'], c: 0, e: 'Maximal 5 Jahre am Tag von Step 2.' },
        { q: 'Was wird im Screening-Block 5 getestet?', a: ['Persönlichkeit und Refraktometer (Augen)', 'Englisch', 'Psychomotorik', 'Simulatorflug'], c: 0, e: 'Block 5 um 15:00: Persönlichkeits- und Refraktometertest.' },
        { q: 'Welcher Testblock gehört zum Screening-Block 1?', a: ['Englisch, Kopfrechnen, räumliches Vorstellen', 'Psychomotorik', 'Flug im Simulator', 'Medizinische Untersuchung'], c: 0, e: 'Block 1: Englisch, Kopfrechnen und räumliches Vorstellungsvermögen.' },
        { q: 'Wie viel Zeit hast du nach dem biografischen Fragebogen für das Screening?', a: ['18 Monate', '1 Monat', '5 Jahre', '6 Wochen'], c: 0, e: '18 Monate nach dem Fragebogen.' },
        { q: 'Welche Medical-Klasse brauchen Berufspiloten?', a: ['Klasse 1', 'Klasse 2', 'LAPL', 'Keine'], c: 0, e: 'Berufspiloten (CPL/ATPL/MPL) brauchen ein Medical der Klasse 1.' },
        { q: 'Wo findet die Airline-Ausbildung von SWISS/Edelweiss statt?', a: ['European Flight Academy', 'Fliegerärztliches Institut', 'Pilotenschule der Luftwaffe', 'ETH Zürich'], c: 0, e: 'Nach bestandenem Assessment bildet die European Flight Academy aus (ca. 2 Jahre).' },
      ],
    },
    {
      id: 'flugkurs', name: 'Flugkurs: Need to know', icon: '🛩️', color: '#0f766e',
      desc: 'Offizieller Lernstoff aus «Grundlagen & Verfahren» – wird am 1. Kurstag getestet',
      lessons: [
        { t: 'So läuft der Flugkurs ab', b: `
<p>Aus der offiziellen Broschüre <b>«Are you ready for departure?»</b>:</p>
<ul>
<li><b>11 Flüge</b> à 40–50 Minuten, dazu Theorie. Jeder Flug wird vorbesprochen (Briefing) und nachbesprochen (Debriefing).</li>
<li>Flüge 1–5 mit einem Fluglehrer, Flüge 6–10 mit dem anderen. Ein <b>P&S-Fluglehrer</b> der Luftwaffe fliegt mindestens einmal mit dir.</li>
<li>Am <b>1. Tag</b> wird dein «Need to know» in einem <b>Eintrittstest</b> geprüft.</li>
<li>Nach der ersten Woche: mündliche <b>Standortbestimmung</b>. Am Ende: <b>Schlussbeurteilung</b>.</li>
<li>Beurteilt werden <b>Persönlichkeit, fliegerische Begabung, Lernfähigkeit und Motivation</b>. Es zählt das Gesamtbild.</li>
</ul>
<p><b>Flugsicherheit:</b> mindestens <b>7 Stunden Schlaf</b>, <b>0 Promille</b>, genug essen und mindestens <b>1.5 Liter</b> trinken (am besten Wasser ohne Kohlensäure).</p>
<p class="note">Quelle: SPHAIR «Are you ready for departure?» (2025) und sphair.ch/de/pilot/flugkurs</p>` },
        { t: 'Was du lernen musst (Need to know)', b: `
<p>SPHAIR verlangt, dass du vor dem Kurs bestimmte Kapitel aus <b>«Grundlagen und Verfahren» (GuV)</b> lernst. Es gibt zwei Stufen:</p>
<ul><li><b>Sinngemäss:</b> verstehen und in eigenen Worten wiedergeben</li><li><b>Exakt (Prio 1):</b> <b>wörtlich</b> auswendig können</li></ul>
<p><b>Am wichtigsten</b> sind die <b>Checklist und Procedures deiner Flugschule</b> (Prio 1). Wenn sie dem GuV widersprechen, gilt immer die Checkliste deines Schulflugzeugs.</p>
<p>Ausserdem: die Umgebung des Flugplatzes (Ortschaften, Seen, markante Erhebungen). Tipp: Google Earth.</p>
<p>In dieser App sind alle «exakt»-Kästen <span class="exact-tag">EXAKT</span> markiert. Trainiere sie im Trainer <b>«Verfahren auswendig»</b>, die Checklisten im Trainer <b>«Checkliste»</b>.</p>
<p class="note">Quelle: SPHAIR «Need to have – need to know» (12.11.2025)</p>` },
        { t: 'Flugüberwachungsinstrumente (1.2.3)', b: `
<div class="exact"><span class="exact-tag">EXAKT · 1.2.3.1</span>
<p><b>Anzeige für die Lage / ATTITUDE</b></p>
<p>AI – ATTITUDE INDICATOR – Lage-Anzeige-Instrument</p>
<p><b>Anzeigen für die Flugleistung / PERFORMANCE</b></p>
<p>ASI – AIR SPEED INDICATOR – Fluggeschwindigkeits-Anzeige<br>ALT – ALTIMETER – Flughöhe-Anzeige<br>T / S – TURN AND SLIP INDICATOR – Wendezeiger<br>T / C – TURN COORDINATOR – Kurvenkoordinator<br>DG – DIRECTIONAL GYRO – Kurskreisel<br>VSI – VERTICAL SPEED INDICATOR – Vertikale Geschwindigkeits-Anzeige<br>MC – MAGNETIC COMPASS – Magnet-Kompass<br>STOP WATCH – Stoppuhr</p></div>
<p>Die Instrumente sind in <b>T-Form</b> angeordnet – wichtig für das systematische Ablesen (SCANNING). Farben: <b>grün</b> = normaler Betriebsbereich, <b>gelb</b> = Vorsichtsbereich, <b>rote Marke</b> = Grenzwert.</p>
<div class="exact"><span class="exact-tag">EXAKT · 1.2.3.4 Kasten</span>
<p>Farbsegmente auf dem ASI:</p>
<p>V<sub>SO</sub> – Stall Speed in Landing Configuration (Beginn weisser Bogen)<br>V<sub>S1</sub> – Stall Speed Clean (Beginn grüner Bogen)<br>V<sub>FE</sub> – Max. Flaps Extended Speed (Ende weisser Bogen)<br>V<sub>NO</sub> – Normal Operation Speed (Ende grüner Bogen)<br>V<sub>NE</sub> – Never Exceed Speed (rote Linie)<br>GREEN ARC – Normal Range · YELLOW ARC – Caution Range</p></div>
<p>Nicht auf dem ASI: aktuelle Stall Speed V<sub>S</sub> (ändert mit Masse, Konfiguration, Lastvielfachem), Manövergeschwindigkeit V<sub>A</sub> (masseabhängig), V<sub>LE</sub> (Fahrwerk).</p>
<p class="note">© Schweizerische Eidgenossenschaft, vertreten durch die Luftwaffe – SPHAIR Grundlagen & Verfahren 2026, Kap. 1.2</p>` },
        { t: 'Checks und Procedures (2.9)', b: `
<ul>
<li><b>PROCEDURE</b> = Tätigkeit, die zu einem bestimmten Zeitpunkt zwingend ausgeführt werden muss (z.&nbsp;B. Klappen aus-/einfahren). Steht nicht auf der Checkliste, muss auswendig gelernt werden.</li>
<li><b>CHECK</b> = Kontrolle, ob die Procedures vollständig und korrekt erledigt sind. Alle Checks stehen auf der CHECKLIST.</li>
<li>Jeder Check hat einen Namen. Beginn und Ende werden <b>laut angesagt</b>: «CLIMB CHECK … CLIMB CHECK COMPLETED».</li>
<li>Alle Punkte und Werte werden <b>laut</b> ausgesprochen. Es wird <b>nie «AS REQUIRED»</b> gemeldet – du sagst, was aktuell verlangt ist.</li>
<li>Zwischen den Punkten immer wieder kurz nach aussen schauen. <b>Das Steuern des Flugzeuges hat immer Priorität.</b></li>
<li>Ein senkrechter Strich am linken Rand bedeutet: <b>auswendig</b> durchführen.</li>
<li>Ruhig, überlegt, bestimmt. Eine Hand bleibt am Steuer. Keine Hektik, nicht herumzeigen, nicht an Instrumentengläser klopfen.</li>
</ul>
<p>Die Reihenfolge der Punkte ist zwingend. Nur die immer gleiche Ausführung garantiert, dass du dich im Notfall auch unter Zeitdruck richtig verhältst.</p>
<p class="note">Zusammenfassung von GuV 2026, Kap. 2.9.1–2.9.8 (sinngemäss)</p>` },
        { t: 'Horizont, Fluglage, Steuerübergabe (3)', b: `
<p><b>Scheinhorizont:</b> verläuft parallel zum realen Horizont und ist die Referenz für die Lage. In den Bergen muss man ihn sich vorstellen (Skyline, Wolkenschicht). Im Zweifel: Blick auf den AI.</p>
<p><b>Flug ohne Horizont ist nicht möglich:</b> In Wolken ohne künstlichen Horizont ist man spätestens nach <b>170 Sekunden</b> in einer unkontrollierbaren Lage (räumliche Desorientierung, VERTIGO).</p>
<div class="exact"><span class="exact-tag">EXAKT · 3.3.1 Attitude</span>
<p>Flugbahn / FLIGHT PATH – Bewegungsrichtung des Flugzeuges<br>Fluglage / ATTITUDE – Winkel der Flugzeuglängsachse gegenüber dem Horizont</p></div>
<div class="exact"><span class="exact-tag">EXAKT · 3.5 Kasten</span>
<p>Übergabe der Steuer:<br>PF: <b>«YOU HAVE CONTROLS»</b><br>PM: <b>«I HAVE CONTROLS»</b></p>
<p>Der PF hält die Steuer so lange, bis der andere übernommen und quittiert hat.</p></div>
<p>Der <b>PIC</b> (Pilot in Command) entscheidet in letzter Instanz. <b>Steuerübergabe ist keine Kommandoübergabe!</b> PF = Pilot Flying, PM = Pilot Monitoring.</p>
<div class="exact"><span class="exact-tag">EXAKT · 3.6.1 Traffic Report</span>
<p>Richtung nach dem Uhrzifferblatt, dazu HIGH / SAME ALTITUDE / LOW:<br><b>«TRAFFIC, THREE O'CLOCK, HIGH»</b> – Bestätigung: <b>«IN SIGHT»</b></p></div>
<p>Grundsatz: Wer ein Luftfahrzeug zuerst sieht, merkt es sich und meldet es.</p>
<p><b>Scanning:</b> Immer von der Referenz für die Fluglage (Horizont) ausgehen, Luftraum und Leistungsanzeigen prüfen, dann zurück zur Referenz. <b>Die Kontrolle der Fluglage hat immer Priorität.</b></p>
<p class="note">© Schweizerische Eidgenossenschaft, vertreten durch die Luftwaffe – GuV 2026, Kap. 3</p>` },
        { t: 'Fit für den Flugdienst (3.11)', b: `
<ul>
<li>Nicht fliegen bei Übermüdung, Stress, Gereiztheit oder starken Emotionen.</li>
<li>Gesund, ausgeschlafen; verordnete Brille tragen und <b>Ersatzbrille</b> mitführen.</li>
<li>Nicht rauchen vor und während des Flugdienstes.</li>
<li>Nach Tiefseetauchen: <b>24 h</b> ohne, <b>48 h</b> mit Dekompressionsstopp nicht fliegen.</li>
<li>Kein Fliegen unter Alkohol, Drogen, Medikamenten, bei <b>Erkältung</b> oder Stirnhöhlenproblemen (Druckausgleich!).</li>
<li>Viel trinken (wenig Zucker, keine Kohlensäure).</li>
<li>Sauerstoff: Crew ab <b>10'000 ft</b> (länger als 30 min bis 13'000 ft), <b>alle</b> über <b>13'000 ft</b>.</li>
<li>Kleidung aus <b>Naturfasern</b> (Baumwolle, Wolle …) – Kunststoff schmilzt bei Feuer auf der Haut.</li>
</ul>
<p class="note">Zusammenfassung von GuV 2026, Kap. 3.11 (sinngemäss)</p>` },
        { t: 'Wirkung der Steuer (4.1)', b: `
<p><b>Primäre Steuer:</b> Knüppel/Horn und Seitensteuerpedale mit den Rudern – Drehung um die drei Achsen. Sie sind <b>RATE CONTROLS</b>: Solange ausgeschlagen, dreht das Flugzeug weiter; nach Erreichen der Lage neutralisieren.</p>
<p><b>Sekundäre Steuer:</b> Änderung der Triebwerkleistung und der Widerstände (z.&nbsp;B. Klappen).</p>
<div class="exact"><span class="exact-tag">EXAKT · 4.1.3 Kasten</span>
<p>Höhenruder / ELEVATOR – Querachse / PITCH AXIS<br>Querruder / AILERON – Längsachse / LONGITUDINAL AXIS<br>Seitenruder / RUDDER – Hochachse / VERTICAL AXIS</p></div>
<ul>
<li>Ziehen → Nase hebt sich → PITCH UP (ANU) · Stossen → PITCH DOWN (AND)</li>
<li>Knüppel links/rechts → Flügel senkt sich → ROLL / BANK</li>
<li>Pedal links/rechts → Nase dreht → YAW</li>
</ul>
<p><b>Kugel:</b> Seitensteuerdruck auf die Seite, wo die Kugel ist – <b>«auf die Kugel treten»</b>.</p>
<p><b>Trimmen (4.2.3):</b> Steuerdruck zuerst mit Gegendruck halten, nach der Stabilisierung <b>wegtrimmen</b>. Nie die Fluglage mit der Trimmung ändern! Nach jeder Leistungs- oder Konfigurationsänderung nachtrimmen.</p>
<p class="note">© Schweizerische Eidgenossenschaft, vertreten durch die Luftwaffe – GuV 2026, Kap. 4.1–4.2</p>` },
        { t: 'Flügelklappen & Leistungshebel (4.4–4.6)', b: `
<p>Ausfahren der Klappen bewirkt: <b>tiefere V<sub>STALL</sub></b>, <b>kürzere Startrollstrecke</b>, <b>kürzere Landerollstrecke</b> (mehr Auftrieb und mehr Widerstand).</p>
<div class="exact"><span class="exact-tag">EXAKT · 4.4.7 Kasten</span>
<p>Vor jeder Betätigung: Geschwindigkeit im zulässigen Bereich (weisser Bereich)?</p>
<p>SPEED ……… <b>WHITE ARC</b><br>FLAPS ……… <b>… DEGREE / POSITION</b></p></div>
<p>Dabei entstehen zwei Effekte: Profiländerung (Anstellwinkel) und Steigen durch mehr Auftrieb – <b>BALLOONING</b>. Ausgleich mit dem Höhensteuer.</p>
<p><b>Leistungshebel:</b> vorne = FULL POWER, hinten = IDLE. Von Leerlauf bis Vollgas mindestens <b>2–3 Sekunden</b>, am Anfang langsam. Leistung flüssig, nie brüsk zurücknehmen.</p>
<p class="note">© Schweizerische Eidgenossenschaft, vertreten durch die Luftwaffe – GuV 2026, Kap. 4.4–4.6</p>` },
        { t: 'Rollen (4.13 & 5)', b: `
<ul>
<li>Knüppel/Horn: Wind und Unebenheiten ausgleichen · Pedale: Bugradsteuerung · Leistungshebel: Rollgeschwindigkeit · Fussbremsen: bremsen · Parkbremse: blockieren.</li>
<li>Nicht mit Leistung <i>und</i> Bremse gleichzeitig rollen. Geschwindigkeit schätzt man besser seitlich hinaus.</li>
<li>Bei jedem Anhalten Pedale in Neutralstellung.</li>
</ul>
<p><b>Rollwegmarkierungen:</b> Leitlinien <b>gelb</b> (verbindlich!), seitliche Begrenzung <b>weiss</b>, Randlichter <b>blau</b>. Abstand zur aktiven Piste: <b>30 m</b> (Piste unter 900 m), <b>50 m</b> (900 m und länger). Bei einer Kollision trägt der Kommandant die alleinige Verantwortung.</p>
<div class="exact"><span class="exact-tag">EXAKT · 5.3.3 Kasten</span>
<p><b>MOVE</b> – vor jedem Anrollen:<br>Taxi Area – CLEAR<br>Taxi Light – ON<br>Power – … SET<br>Parking Brake – RELEASED</p>
<p><b>BRAKE CHECK</b> – sofort nach dem Anrollen:<br>Brakes – CHECKED</p>
<p><b>STOP</b> – nach jedem Anhalten:<br>Parking Brake – SET<br>Power – … SET<br>Taxi Light – OFF</p></div>
<p>Bremsprüfung nur so stark, dass du die Wirkung beurteilen kannst – nicht bis zum Stillstand.</p>
<p class="note">© Schweizerische Eidgenossenschaft, vertreten durch die Luftwaffe – GuV 2026, Kap. 4.13, 5.2–5.3</p>` },
        { t: 'Horizontalflug & Steigen (6–7)', b: `
<p><b>Horizontalflug:</b> konstante Höhe (ALT), konstante Geschwindigkeit (ASI), VSI auf Null. Austrimmen: Steuerdruck halten bis stabil, dann wegtrimmen.</p>
<p><b>V<sub>X</sub></b> = bester Steigwinkel (grösste Höhe pro Distanz) · <b>V<sub>Y</sub></b> = beste Steigrate (grösste Höhe pro Zeit) · <b>V<sub>CRUISE CLIMB</sub></b> = Reisesteigflug (z.&nbsp;B. bessere Motorkühlung).</p>
<div class="exact"><span class="exact-tag">EXAKT · 7.2.4 Kasten – Übergang in den Steigflug (P-A-T)</span>
<p>LOOKOUT<br>Mixture – RICH (OR ACC AFM)<br>Climb Power – SET (REQUIRED) FULL POWER <b>P</b><br>Climb Attitude – ADJUST FOR TYPE OF CLIMB <b>A</b><br>Trim – REDUCE LOAD ON CONTROLS <b>T</b></p></div>
<div class="exact"><span class="exact-tag">EXAKT · 7.4.2 Kasten – Level off Cruise (A-P-T)</span>
<p>Attitude – SET <b>A</b><br>Power – SET <b>P</b><br>Trim – SET <b>T</b><br>Landing Light – AS REQUIRED<br>CRUISE CHECK</p></div>
<p><b>Merksatz «First Push»:</b> Bei jedem Übergang wird zuerst gestossen – Höhensteuer oder Leistungshebel. (Steigen: zuerst Gas → PAT. Level off: zuerst Nase runter → APT.)</p>
<p><b>Faustregel:</b> Übergang beginnen bei <b>1/10 der Steigrate</b> unter der Zielhöhe. Beispiel: 1000 ft/min → 100 ft vorher. Erst nach der Leistungsreduktion fertig wegtrimmen.</p>
<p class="note">© Schweizerische Eidgenossenschaft, vertreten durch die Luftwaffe – GuV 2026, Kap. 6–7</p>` },
        { t: 'Sinkflug (8)', b: `
<div class="exact"><span class="exact-tag">EXAKT · 8.2.4 Kasten – Starting Descent (A-P-T)</span>
<p>LOOKOUT<br>Mixture – SET<br>Attitude – FOR DESCENT <b>A</b><br>Power – ADJUST <b>P</b><br>Trim – ADJUST <b>T</b></p></div>
<p>Priorität beim Stabilisieren: <b>Lage halten</b>. Erst nach der Stabilisierung der Geschwindigkeit austrimmen – sonst geht das Flugzeug durch den zunehmenden Auftrieb wieder in den Horizontalflug (8.3.3).</p>
<div class="exact"><span class="exact-tag">EXAKT · 8.4.1 Bild + Kasten – Level off (P-A-T)</span>
<p>Power – SET <b>P</b><br>Attitude – SET <b>A</b><br>Trim – SET <b>T</b><br>Mixture – SET FOR ALTITUDE<br>CRUISE CHECK</p>
<p>Ablauf: Vorbereitung → Übergang → Geschwindigkeitsabbau → Stabilisierung. Beginn bei <b>Rate of Descent / 10</b> über der neuen Höhe (z.&nbsp;B. 500 ft/min → 50 ft vorher).</p></div>
<p><b>Gleitflug</b> = Sinkflug ohne Triebwerkleistung. <b>V<sub>BEST GLIDE</sub></b> = weiteste Distanz (auswendig wissen!), V<sub>BEST ENDURANCE</sub> = geringste Sinkrate, längste Zeit.</p>
<p class="note">© Schweizerische Eidgenossenschaft, vertreten durch die Luftwaffe – GuV 2026, Kap. 8</p>` },
        { t: 'Kurven (9)', b: `
<p><b>Referenz:</b> Ein Punkt auf der Frontscheibe wird dem Scheinhorizont entlang geführt – nicht dem Gelände entlang. Bei nebeneinander liegenden Sitzen sieht das in Links- und Rechtskurve unterschiedlich aus.</p>
<p><b>LOOKOUT (9.2.1):</b> Kopf in Kurvenrichtung, horizontal bis zur Gegenseite absuchen, dann Kopf anheben und den Luftraum über dem Flugzeug zurück absuchen. Call out: <b>«left side clear»</b> / <b>«right side clear»</b>. Danach die Kurve sofort einleiten.</p>
<p><b>Einleiten:</b> flüssig und koordiniert, mit Querruder in Kurvenrichtung.</p>
<p><b>Negatives Wendemoment / ADVERSE YAW:</b> Das Flugzeug giert zur Kurvenaussenseite (Querruder unten = mehr Auftrieb <i>und</i> mehr Widerstand). Ausgleich mit Seitensteuer in Kurvenrichtung – bei Schulflugzeugen immer!</p>
<p><b>In der Kurve:</b> Leicht am Höhensteuer ziehen (mehr Auftrieb nötig). Bei 30° Querlage steigt V<sub>STALL</sub> um ca. 7 %.</p>
<p><b>Ausleiten:</b> LOOKOUT zur Kurvenaussenseite, bei mittleren Kurven ca. <b>10° vor dem neuen Kurs</b> aufrichten und Höhensteuer nachlassen/leicht nachdrücken – sonst steigt das Flugzeug.</p>
<p class="note">Zusammenfassung von GuV 2026, Kap. 9</p>` },
        { t: 'Start (12)', b: `
<div class="exact"><span class="exact-tag">EXAKT · 12.4.1 Static Take-off</span>
<p>THROTTLE – T/O POWER<br>POWER – MIN … RPM<br>BRAKES – RELEASED AND FREE</p></div>
<div class="exact"><span class="exact-tag">EXAKT · 12.4.1 Rolling Take-off</span>
<p>BRAKES – RELEASED AND FREE<br>THROTTLE – T/O POWER<br>POWER – MIN … RPM</p></div>
<p>Absätze auf den Kabinenboden (keine ungewollte Bremse). Leistungshebel in 2–3 Sekunden nach vorne.</p>
<div class="exact"><span class="exact-tag">EXAKT · 12.4.2 Acceleration Check</span>
<p>AIRSPEED – RISING</p></div>
<ul>
<li><b>50/70-Regel:</b> 70 % der Abhebegeschwindigkeit bis zur Pistenmitte – sonst Start abbrechen.</li>
<li><b>HOTAS:</b> Hands On Throttle And Stick. Beim Steuerhorn: Rotieren mit beiden Händen, dann zurück an den Leistungshebel; frei ab 300 ft AAL.</li>
<li>Rechtsdrehender Propeller → starke <b>Ausbrechtendenz nach links</b> (Slipstream). Mit dem Seitensteuer die Centerline verteidigen, Flügel mit Querruder horizontal. Im Zweifel: Start abbrechen.</li>
<li>Rotieren ca. <b>10 kt vor V<sub>X</sub></b>. Nie vom Boden wegreissen. Mit V<sub>X</sub> über Hindernisse, dann V<sub>Y</sub>.</li>
</ul>
<div class="exact"><span class="exact-tag">EXAKT · 12.5.2 Flaps Retraction</span>
<p>CLEAR OF OBSTACLES – SPEED CHECKED, FLAPS UP</p></div>
<p>Klappen einfahren, wenn: Steiggeschwindigkeit clean erreicht, Hindernisse überflogen, Steigfluglage stabil. <b>Aux Fuel Pump</b> frühestens <b>500 ft AAL</b> aus (Benzindruck prüfen!). Möglichst die ganze Pistenlänge nutzen.</p>
<p class="note">© Schweizerische Eidgenossenschaft, vertreten durch die Luftwaffe – GuV 2026, Kap. 12</p>` },
        { t: 'Platzrunde & Landung (13)', b: `
<p><b>Standardplatzrunde:</b> Abflug → Querabflug (CROSSWIND) → Gegenanflug (DOWNWIND, ca. <b>1000 ft AAL</b>) → Queranflug (BASE) → Endanflug (FINAL), Anflugwinkel ca. 3°. Für jedes Segment sind Position, Länge, Höhe und Abstand zur Piste festgelegt.</p>
<p><b>Pistenbild:</b> Hoher Anflug → früh Leistung reduzieren, Tendenz kurze Landung. Tiefer Anflug → viel Leistung, schlechte Sicht nach vorne, Tendenz lange Landung.</p>
<p><b>Stabilisierter Endanflug</b> (spätestens im letzten Drittel):</p>
<ul><li>Endanflug-Konfiguration erstellt, Klappen nicht mehr verändern, Geschwindigkeit stabil</li><li>ausgetrimmt, LANDING CHECK erledigt</li><li><b>ON CENTERLINE AND GLIDE PATH</b>: Gleitweg mit <b>Pitch</b>, Geschwindigkeit mit <b>Power</b> korrigieren</li></ul>
<p>Aufsetzen mit dem Hauptfahrwerk in der Landezone. Zehen weg von den Bremsen. Im Gate: Power idle, Hand bleibt am Leistungshebel – bereit für ein Go-around.</p>
<p class="note">Zusammenfassung von GuV 2026, Kap. 13</p>` },
        { t: 'Notfälle: F-N-C-E-E-D (11)', b: `
<p>Gegen den Schreckeffekt (STARTLE EFFECT) gibt es ein Grundverfahren, das <b>immer in dieser Reihenfolge</b> abgearbeitet wird:</p>
<ol>
<li><b>FLY</b> – Fluglage stabilisieren, Leistung setzen, Geschwindigkeit (z.&nbsp;B. V<sub>BEST GLIDE</sub>), Konfiguration, trimmen</li>
<li><b>NAVIGATE</b> – Flugweg sicher vor Gelände, Hindernissen, Wetter, Luftraum</li>
<li><b>COMMUNICATE</b> – ATC, Crew, Passagiere; allenfalls PAN PAN (3×) oder MAYDAY (3×), Transponder 7700</li>
<li><b>EVALUATE</b> – Situation prüfen, passendes Verfahren festlegen</li>
<li><b>EXECUTE</b> – Verfahren umsetzen (z.&nbsp;B. EMERGENCY CHECKLIST)</li>
<li><b>DECISION MAKING</b> – weiteres Vorgehen entscheiden und kommunizieren</li>
</ol>
<p>Erst wenn FLY, NAVIGATE und COMMUNICATE erledigt sind, mit EVALUATE beginnen. Die Punkte laut ausrufen hilft.</p>
<p class="note">Zusammenfassung von GuV 2026, Kap. 11.1</p>` },
      ],
      questions: [
        { q: 'Wofür steht «VSI»?', a: ['Vertical Speed Indicator', 'Visual Speed Indicator', 'Vertical Stall Indicator', 'Velocity System Indicator'], c: 0, e: 'VSI – VERTICAL SPEED INDICATOR – Vertikale Geschwindigkeits-Anzeige (GuV 1.2.3.1).' },
        { q: 'Welches Instrument zeigt die Lage (ATTITUDE)?', a: ['AI – Attitude Indicator', 'ASI', 'DG', 'VSI'], c: 0, e: 'Einziges Instrument für die Lage ist der AI. Die anderen sind Leistungsanzeigen.' },
        { q: 'Was bezeichnet V_NE?', a: ['Never Exceed Speed', 'Normal Operation Speed', 'Stall Speed Clean', 'Max. Flaps Extended Speed'], c: 0, e: 'V_NE – rote Linie auf dem ASI.' },
        { q: 'Wo beginnt der weisse Bogen auf dem ASI?', a: ['Bei V_SO', 'Bei V_S1', 'Bei V_NO', 'Bei V_FE'], c: 0, e: 'V_SO = Stall Speed in Landing Configuration. Ende des weissen Bogens = V_FE.' },
        { q: 'Was meldest du bei einem Checklisten-Punkt «AS REQUIRED»?', a: ['Den aktuell verlangten Wert', '«As required»', 'Nichts', '«Checked»'], c: 0, e: 'Es wird nie «AS REQUIRED» gemeldet (GuV 2.9.3).' },
        { q: 'Was sagt der Pilot Flying, wenn er die Steuer übergibt?', a: ['«YOU HAVE CONTROLS»', '«I HAVE CONTROLS»', '«TAKE OVER»', '«CONTROLS FREE»'], c: 0, e: 'PF: YOU HAVE CONTROLS – PM: I HAVE CONTROLS (GuV 3.5).' },
        { q: 'Ist eine Steuerübergabe auch eine Kommandoübergabe?', a: ['Nein, niemals', 'Ja, immer', 'Nur im Notfall', 'Nur am Boden'], c: 0, e: 'Die Steuerübergabe ist keine Kommandoübergabe (GuV 3.5).' },
        { q: 'Wie meldest du Verkehr rechts von dir, etwas höher?', a: ['«TRAFFIC, THREE O\'CLOCK, HIGH»', '«TRAFFIC RIGHT ABOVE»', '«PLANE AT NINE, HIGH»', '«TRAFFIC, THREE O\'CLOCK, LOW»'], c: 0, e: 'Uhrzifferblatt: 3 Uhr = rechts. Bestätigung: «IN SIGHT».' },
        { q: 'Nach wie vielen Sekunden ist man ohne Horizont spätestens in einer unkontrollierbaren Lage?', a: ['170', '30', '600', '1000'], c: 0, e: 'Untersuchungen: spätestens nach 170 Sekunden (GuV 3.1.5).' },
        { q: 'Welches Ruder dreht das Flugzeug um die Längsachse?', a: ['Querruder / AILERON', 'Höhenruder / ELEVATOR', 'Seitenruder / RUDDER', 'Trimmruder'], c: 0, e: 'AILERON – LONGITUDINAL AXIS (GuV 4.1.3).' },
        { q: 'Die Kugel ist rechts. Was tust du?', a: ['Rechtes Pedal drücken', 'Linkes Pedal drücken', 'Querruder rechts', 'Gas geben'], c: 0, e: '«Auf die Kugel treten» (GuV 4.1.8).' },
        { q: 'Darfst du die Fluglage mit der Trimmung ändern?', a: ['Nein – nur Steuerdruck wegtrimmen', 'Ja, das ist bequemer', 'Nur im Steigflug', 'Nur mit Fluglehrer'], c: 0, e: 'Erst Lage mit dem Steuer stabilisieren, dann wegtrimmen (GuV 4.2.3).' },
        { q: 'Was prüfst du vor jeder Betätigung der Klappen?', a: ['SPEED – WHITE ARC', 'Fuel – CHECKED', 'Trim – SET', 'Mixture – RICH'], c: 0, e: 'SPEED – WHITE ARC, FLAPS – … DEGREE/POSITION (GuV 4.4.7).' },
        { q: 'Wie heisst das Steigen beim Ausfahren der Klappen?', a: ['BALLOONING', 'FLARE', 'ADVERSE YAW', 'P-FACTOR'], c: 0, e: 'Auftriebserhöhung → BALLOONING, mit Höhensteuer kompensieren.' },
        { q: 'Was meldest du beim MOVE als Erstes?', a: ['Taxi Area – CLEAR', 'Parking Brake – RELEASED', 'Power – SET', 'Brakes – CHECKED'], c: 0, e: 'Taxi Area CLEAR, Taxi Light ON, Power SET, Parking Brake RELEASED (GuV 5.3.3).' },
        { q: 'Welche Farbe haben Rollwegleitlinien?', a: ['Gelb', 'Weiss', 'Blau', 'Grün'], c: 0, e: 'Leitlinien gelb, seitliche Begrenzung weiss, Randlichter blau (GuV 5.2.1).' },
        { q: 'Mindestabstand zur aktiven Piste (900 m oder länger)?', a: ['50 m', '30 m', '10 m', '100 m'], c: 0, e: 'Unter 900 m Länge: 30 m, ab 900 m: 50 m (GuV 5.2.4).' },
        { q: 'Was ist V_Y?', a: ['Geschwindigkeit für die beste Steigrate', 'Geschwindigkeit für den besten Steigwinkel', 'Reisesteiggeschwindigkeit', 'Abhebegeschwindigkeit'], c: 0, e: 'V_Y = grösste Höhe pro Zeit; V_X = grösste Höhe pro Distanz.' },
        { q: 'Reihenfolge beim Übergang in den Steigflug?', a: ['Power – Attitude – Trim', 'Attitude – Power – Trim', 'Trim – Power – Attitude', 'Attitude – Trim – Power'], c: 0, e: 'PAT – «First Push»: zuerst den Leistungshebel stossen (GuV 7.2.4).' },
        { q: 'Steigrate 800 ft/min. Wann beginnst du den Level off?', a: ['80 ft vor der Zielhöhe', '800 ft vorher', '8 ft vorher', 'Erst auf der Zielhöhe'], c: 0, e: 'Faustregel: 1/10 der Steigrate (GuV 7.4.3).' },
        { q: 'Reihenfolge beim Einleiten des Sinkflugs?', a: ['Attitude – Power – Trim', 'Power – Attitude – Trim', 'Trim – Attitude – Power', 'Power – Trim – Attitude'], c: 0, e: 'APT – «First Push»: zuerst Nase runter (GuV 8.2.4).' },
        { q: 'Reihenfolge beim Level off aus dem Sinkflug?', a: ['Power – Attitude – Trim', 'Attitude – Power – Trim', 'Trim – Power – Attitude', 'Attitude – Trim – Power'], c: 0, e: 'PAT: zuerst Leistung erhöhen (GuV 8.4.1).' },
        { q: 'Call out vor einer Linkskurve?', a: ['«left side clear»', '«turning left»', '«clear left and right»', '«lookout complete»'], c: 0, e: 'GuV 9.2.1.' },
        { q: 'Wann beginnst du bei einer mittleren Kurve mit dem Ausleiten?', a: ['Ca. 10° vor dem neuen Kurs', 'Genau auf dem neuen Kurs', '45° vorher', '1° vorher'], c: 0, e: 'GuV 9.4.2.' },
        { q: 'Was meldest du beim Acceleration Check?', a: ['AIRSPEED – RISING', 'POWER – SET', 'ENGINE – GREEN', 'SPEED – CHECKED'], c: 0, e: 'GuV 12.4.2.' },
        { q: 'Was bedeutet die 50/70-Regel beim Start?', a: ['70 % der Abhebegeschwindigkeit bis zur Pistenmitte', '50 kt bei 70 % der Piste', '50 % Leistung, 70 % Klappen', '70 m Rollstrecke pro 50 kt'], c: 0, e: 'Sonst Start abbrechen (GuV 12.4.2).' },
        { q: 'In welche Richtung bricht ein Flugzeug mit rechtsdrehendem Propeller beim Startlauf aus?', a: ['Nach links', 'Nach rechts', 'Gar nicht', 'Nach oben'], c: 0, e: 'Slipstream-Effekt → Seitensteuer rechts (GuV 12.4.4).' },
        { q: 'Frühestens ab welcher Höhe schaltest du die elektrische Hilfspumpe aus?', a: ['500 ft AAL', '50 ft AAL', '1000 ft AAL', 'Direkt nach dem Abheben'], c: 0, e: 'Steigflug stabil, Benzindruck im grünen Bereich (GuV 12.5.3).' },
        { q: 'Was ist das erste «F» in F-N-C-E-E-D?', a: ['FLY', 'FIRE', 'FUEL', 'FLAPS'], c: 0, e: 'FLY – NAVIGATE – COMMUNICATE – EVALUATE – EXECUTE – DECISION MAKING.' },
        { q: 'Womit korrigierst du im stabilisierten Endanflug den Gleitweg?', a: ['Mit der Lage (Pitch)', 'Mit der Leistung', 'Mit den Klappen', 'Mit der Trimmung'], c: 0, e: 'Gleitweg mit Pitch, Geschwindigkeit mit Power (GuV 13.7.1).' },
        { q: 'Wie viele Flüge umfasst der SPHAIR-Flugkurs?', a: ['11', '5', '20', '3'], c: 0, e: '11 Flüge à 40–50 Minuten.' },
        { q: 'Wann wird dein «Need to know» geprüft?', a: ['Am 1. Kurstag im Eintrittstest', 'Am Screening', 'Am letzten Tag', 'Gar nicht'], c: 0, e: '«Are you ready for departure?»: Eintrittstest bei Kursbeginn.' },
      ],
    },
    {
      id: 'guv2', name: 'Heft: Kapitel 10–21', icon: '📕', color: '#b45309',
      desc: 'Langsamflug, Notlandung, Navigation, Instrumentenflug, Luftraum, Funk – aus «Grundlagen & Verfahren»',
      lessons: [
        { t: 'Langsamflug, Stall, Trudeln (10)', b: `
<ul>
<li><b>V<sub>A</sub></b> (Manövergeschwindigkeit): höchste Geschwindigkeit für vollen Steuerausschlag ohne Überlastung. Nicht auf dem ASI markiert, sie nimmt mit abnehmender Masse ab.</li>
<li><b>V<sub>S0</sub></b> = unteres Ende weisser Bogen, <b>V<sub>S1</sub></b> = unteres Ende grüner Bogen, <b>V<sub>NO</sub></b> = oberes Ende grün, <b>V<sub>FE</sub></b> = oberes Ende weiss, <b>V<sub>NE</sub></b> = rote Linie.</li>
<li>Kategorien nach CS-23: <b>Normal</b> (bis 60° Querlage, kein Kunstflug), <b>Utility</b> (beschränkter Kunstflug, Trudeln falls zugelassen), <b>Acrobatic</b>.</li>
<li>Lastvielfaches n = 1 / cos(Querlage). V<sub>S</sub> in der Kurve = V<sub>S</sub> × √n → bei 60°: 50 kt × 1.414 ≈ 71 kt.</li>
<li><b>Langsamflug</b> = langsamer als V<sub>BEST GLIDE</sub>. Dort ist das Flugzeug <b>nicht geschwindigkeitsstabil</b>, darüber schon.</li>
<li>Die Stall-Warnung kommt ca. <b>10 % über V<sub>S</sub></b> (5–10 kt).</li>
<li>Stall ausleiten: <b>Nase senken</b> (das ist entscheidend!), Leistung zügig, aber nicht brüsk, Flügel mit Seitenruder gerade halten, nicht am Höhensteuer reissen (sonst <b>SECONDARY STALL</b>), danach Climb Check.</li>
<li>Im Stall das <b>Querruder neutral</b> halten, sonst droht Trudeln.</li>
<li><b>Spiralsturz:</b> Strömung liegt an, Geschwindigkeit steigt schnell → Leistung idle, Flügel gerade, vorsichtig abfangen.</li>
<li><b>Trudeln:</b> Strömung abgelöst (Autorotation) → Leistung idle, Querruder neutral, Seitenruder voll gegen die Drehung, Höhenruder nach vorne (AFM beachten).</li>
</ul>` },
        { t: 'Erster Alleinflug (14)', b: `
<ul>
<li>Du bist jetzt <b>PIC</b>. Der Fluglehrer lässt dich nur fliegen, wenn er sicher ist, dass er nicht über Funk helfen muss.</li>
<li>Das Flugzeug ist <b>leichter</b> (ohne Fluglehrer): Es steigt besser und schwebt bei der Landung länger aus.</li>
<li>Bist du unsicher? <b>GO AROUND</b> und nochmals von vorne – es gibt keine Eile.</li>
<li>Wetter: keine Niederschläge, kein starker Wind, keine Turbulenzen, Seitenwind nach Ausbildungsstand, keine Verschlechterung absehbar.</li>
<li>Treibstoff: Flug + Reserve für Orbits, Go-arounds und den Flug zum Ausweichflugplatz (ALTN).</li>
<li><b>ADM</b> (Aeronautical Decision Making): Der PIC entscheidet selbstständig auf Basis aller Fakten.</li>
</ul>` },
        { t: 'Steilkurven (15)', b: `
<ul>
<li><b>Steilkurve</b> = mehr als 30° Querlage (Key Words: mehr als 45°). Trainiert wird mit 45° oder 60° in CLEAN CONFIGURATION.</li>
<li>Mit Leichtflugzeugen sind Kurven über <b>45°</b> instationär: Selbst mit voller Leistung lässt sich die Geschwindigkeit nicht halten.</li>
<li>Bei Steilkurven auf <b>FULL POWER</b> erhöhen.</li>
<li>Vorher die <b>Lufttüchtigkeitskategorie</b> und die Masse prüfen (AFM, Placard).</li>
</ul>` },
        { t: 'Notlandung ohne Motor (16)', b: `
<ul>
<li>Basis-Schulflugzeuge haben eine Gleitzahl von ca. <b>1:10</b>: Aus 1000 ft kommst du ca. 10'000 ft (≈ 3 km) weit. Segelflugzeuge schaffen 1:30 bis 1:60.</li>
<li><b>V<sub>BEST GLIDE</sub></b> = weiteste Distanz, meist ungefähr V<sub>Y</sub>. <b>Auswendig wissen!</b> V<sub>BEST ENDURANCE</sub> = längste Zeit, ca. 15 % tiefer.</li>
<li>Den Gleitflug unbedingt <b>austrimmen</b>.</li>
<li>Die Sinkrate im Gleitflug ist etwa <b>doppelt</b> so gross wie im normalen Anflug. Für Kreise ist <b>45° Querlage</b> der beste Kompromiss.</li>
<li><b>KEY POSITION</b>: querab der Schwelle, ca. <b>1000 ft</b> über Grund. Dort Klappen auf Stufe 1, weiter mit V<sub>BEST GLIDE</sub>.</li>
<li>Gelände: am besten eine <b>gemähte Wiese</b>. Hohes Getreide meiden (Überschlaggefahr). Bei Gefälle <b>hangaufwärts</b> landen, auch mit leichtem Rückenwind.</li>
<li>Wind am Boden erkennst du an Rauch, wogenden Feldern, Wellen auf dem Wasser. Kühe stehen mit dem Hinterteil im Wind.</li>
<li>Schweiz: Im Mittelland Achtung auf Hochspannungsleitungen und Zäune, in den Alpen gibt es kaum Landemöglichkeiten.</li>
<li>Vor dem Aufsetzen: Treibstoff zu, Zündung aus, Master aus (nach den Klappen), Türe entriegeln, Brille ab, <b>BRACE</b>-Position.</li>
<li>Funk: <b>MAYDAY</b> (3×), Transponder <b>7700</b>.</li>
</ul>` },
        { t: 'Vorsorgliche Landung (17)', b: `
<ul>
<li>Gründe: Orientierungsverlust, Wetterverschlechterung, einbrechende Nacht, Treibstoffmangel, technisches Problem, Unwohlsein.</li>
<li>In der Schweiz ist im Mittelland meist innert <b>5–10 Minuten</b> ein Flugplatz erreichbar – zuerst daran denken!</li>
<li>Gelände immer <b>tief und seitlich versetzt überfliegen</b> (Low Flying Check), z.&nbsp;B. 500 ft und 200 ft AGL. <b>«Sicht geht vor Höhe»</b>.</li>
<li>Früh die <b>PRECAUTIONARY CONFIGURATION</b> setzen (Klappen, reduzierte Geschwindigkeit): kleinere Kurvenradien, tiefere V<sub>STALL</sub>, bessere Sicht.</li>
<li>Absicht über Funk melden (Kennzeichen, Position, Absicht), notfalls über ein anderes Flugzeug als <b>Relais</b>.</li>
<li>Trainingsminima: Wolken über 1000 ft, Sicht über 3 km, mehr als 60 min bis zur Dämmerung.</li>
</ul>` },
        { t: 'Navigation & Notlagen im Reiseflug (18)', b: `
<ul>
<li><b>Pilotage</b> = nach Geländemerkmalen. <b>Koppelnavigation (DR)</b> = Kurs, Zeit, Geschwindigkeit und Wind berechnen – die Grundlage aller Navigation.</li>
<li>Flugvorbereitung: Karten, NOTAM, DABS, Wetter (METAR, TAF, SIGMET, GAFOR), Navigationsflugplan (Steuerkurse, Zeiten, Treibstoff), Masse & Schwerpunkt, Leistung, ALTN.</li>
<li><b>Funkausfall:</b> Transponder <b>7600</b>, weiter nach Flugplan, Anflug zur ETA beginnen, auf Licht- und Sichtzeichen achten.</li>
<li><b>Orientierungsverlust:</b> nicht ins Unbekannte weiterfliegen. Umkehrkurs zur letzten bekannten Position, oder ATC sofort ehrlich sagen, dass du deine Position nicht kennst (ev. höher steigen für besseren Funk). Sonst früh genug vorsorglich landen.</li>
<li><b>Vereisung:</b> «LOOK TWICE FOR ICE». Bei unbeabsichtigtem Einflug: 180°-Kurve, Vollgas, Vergaservorwärmung, Pitot Heat und Cabin Heat ein.</li>
<li>Radionavigation: <b>QDM</b> = magnetischer Kurs <i>zur</i> Station, <b>QDR</b> = magnetisches Radial <i>von</i> der Station.</li>
</ul>` },
        { t: 'Instrumentenflug (19)', b: `
<ul>
<li>Ziel der Basisausbildung: z.&nbsp;B. eine <b>180°-Umkehrkurve</b> ohne natürlichen Horizont fliegen können.</li>
<li>Nie auf das innere <b>Lagegefühl</b> verlassen – das Gleichgewichtsorgan wird durch Scheinkräfte getäuscht (VERTIGO).</li>
<li><b>Control Instruments:</b> AI (Lage) und Leistungsanzeige (RPM/MP). <b>Performance Instruments:</b> ASI, ALT, VSI, DG, T/C.</li>
<li><b>Attitude Flying</b> = bewusste Kombination aus Lage, Leistung und Konfiguration.</li>
<li><b>Scanning:</b> Abfrageschlaufen, die immer zum <b>AI</b> zurückkehren (Selective Radial Scan).</li>
<li><b>Partial Panel</b>: Fluglage halten ohne AI, mit den übrigen Anzeigen.</li>
</ul>` },
        { t: 'Luftraum Schweiz (20)', b: `
<ul>
<li>Die FIR Schweiz ist in die Kontrollbezirke <b>Zürich und Genf</b> geteilt (Trennlinie westlich von Bern).</li>
<li><b>CTR</b> = Kontrollzone um den Flugplatz (ab Boden), <b>TMA</b> = Nahkontrollbezirk für An- und Abflüge, <b>AWY</b> = Luftstrasse (z.&nbsp;B. A9 Zürich–Mailand).</li>
<li>Militärische CTR/TMA sind nur zu bestimmten Zeiten aktiv (HX), <b>Payerne</b> kann jederzeit aktiv sein. Aktuelle Infos im <b>DABS</b> (publiziert um 09:00, 13:00 und 16:00 LT).</li>
<li><b>VMC:</b> Wolkenabstand <b>1000 ft vertikal, 1.5 km horizontal</b>. Sicht <b>5 km</b> unter FL100, <b>8 km</b> darüber. In Klasse G bis 1.5 km Sicht möglich (mit Bedingungen).</li>
<li><b>Transponderpflicht:</b> in C und D, in E über 7000 ft AMSL, nachts überall. Standard-Code <b>7000</b>.</li>
<li><b>Special VFR</b> in der CTR: frei von Wolken mit Bodensicht, mindestens 1.5 km Sicht, max. 140 kt, Wolkenbasis ab 600 ft AGL.</li>
<li>Nacht-VFR: 8 km Sicht, Wolkenabstand 1.5 km / 1000 ft.</li>
</ul>` },
        { t: 'Kommunikation (21)', b: `
<ul>
<li>Sprache im internationalen Funk: <b>Englisch</b> (regional zusätzlich die Landessprache).</li>
<li>Höchstens ca. <b>100 Wörter pro Minute</b>. Vor dem Senden zuhören, ob die Frequenz frei ist. Nach einem erfolglosen Anruf <b>10 Sekunden</b> warten.</li>
<li>Taste ganz drücken, bevor du sprichst, erst nach der Meldung loslassen.</li>
<li>Bodenstationen: <b>Ground</b> (Bodenverkehr), <b>Tower</b> (Platzverkehr), <b>Apron</b> (Vorfeld), <b>Information</b> (FIS/AFIS), <b>Approach/Arrival/Departure</b>, <b>Delivery</b> (Freigaben).</li>
<li>Rufzeichen abkürzen: erstes Zeichen + mindestens die letzten zwei: <b>HB-KGF → H-GF</b>. Mit Flugnummer (SWISS 014) nicht abkürzbar.</li>
<li>Wichtige Wörter: AFFIRM (ja), NEGATIVE, ROGER, WILCO, CONFIRM, CORRECTION, STANDBY, SAY AGAIN, CLEARED, CONTACT.</li>
</ul>` },
      ],
      questions: [
        { q: 'Was ist V_A?', a: ['Höchste Geschwindigkeit für vollen Steuerausschlag ohne Überlastung', 'Abhebegeschwindigkeit', 'Anfluggeschwindigkeit', 'Höchstgeschwindigkeit mit Klappen'], c: 0, e: 'Manoeuvering Speed – nicht auf dem ASI markiert, sie nimmt mit der Masse ab (GuV 10.1.1).' },
        { q: 'Wie verändert sich V_A, wenn das Flugzeug leichter ist?', a: ['Sie wird kleiner', 'Sie wird grösser', 'Sie bleibt gleich', 'Sie fällt weg'], c: 0, e: 'GuV 10.1.1.' },
        { q: 'Was markiert das untere Ende des grünen Bogens?', a: ['V_S1', 'V_S0', 'V_NO', 'V_FE'], c: 0, e: 'V_S1 (Stall clean, max. Startmasse). Weisser Bogen unten = V_S0.' },
        { q: 'V_S ist 50 kt. Wie gross ist V_S in einer 60°-Kurve ungefähr?', a: ['71 kt', '50 kt', '100 kt', '58 kt'], c: 0, e: 'n = 2 → 50 × √2 ≈ 70.7 kt (GuV 10.1.6).' },
        { q: 'Unter welcher Geschwindigkeit ist ein Flugzeug nicht mehr geschwindigkeitsstabil?', a: ['Unter V_BEST GLIDE', 'Unter V_NE', 'Unter V_NO', 'Unter V_FE'], c: 0, e: 'Unter V_BEST GLIDE steigt der induzierte Widerstand, die Geschwindigkeit baut sich nicht selbst wieder auf.' },
        { q: 'Wann spricht die Stall-Warnung normalerweise an?', a: ['Ca. 10 % über V_S', 'Genau bei V_S', 'Erst nach dem Stall', '50 % über V_S'], c: 0, e: '5–10 kt vorher (GuV 10.3.3).' },
        { q: 'Was ist beim Ausleiten eines Stalls entscheidend?', a: ['Die Lageänderung (Nase senken)', 'Die Leistungserhöhung', 'Die Klappen', 'Der Funkspruch'], c: 0, e: 'Der Lagewechsel, nicht die Leistung, stellt den normalen Flugzustand wieder her (GuV 10.3.7).' },
        { q: 'Wie heisst ein erneuter Stall durch zu starkes Ziehen beim Abfangen?', a: ['Secondary Stall', 'Deep Stall', 'Spiral Dive', 'Ballooning'], c: 0, e: 'GuV 10.3.6.' },
        { q: 'Was tust du im Stall mit dem Querruder?', a: ['Neutral halten', 'Voll gegen das Abkippen', 'Voll in Kurvenrichtung', 'Schnell hin und her'], c: 0, e: 'Querruder im Stall kann die Strömung ganz ablösen → Trudelgefahr (GuV 10.3.8).' },
        { q: 'Was unterscheidet einen Spiralsturz vom Trudeln?', a: ['Beim Spiralsturz liegt die Strömung an, die Geschwindigkeit steigt', 'Beim Spiralsturz ist die Strömung abgelöst', 'Es gibt keinen Unterschied', 'Trudeln ist schneller'], c: 0, e: 'Trudeln = Autorotation im Stall, Spiralsturz = steile Abwärtskurve mit hoher Geschwindigkeit (GuV 10.4.2).' },
        { q: 'Beim Trudeln: Was machst du mit dem Seitenruder?', a: ['Voll gegen die Drehung', 'Voll mit der Drehung', 'Neutral', 'Gar nichts'], c: 0, e: 'Leistung idle, Querruder neutral, Seitenruder voll gegen die Drehung, Höhenruder nach vorne (sofern AFM nichts anderes sagt).' },
        { q: 'In welcher Kategorie sind Steilkurven über 60° erlaubt?', a: ['Utility (und Acrobatic)', 'Nur Normal', 'In keiner', 'Nur mit Fluglehrer in Normal'], c: 0, e: 'Normal: bis 60°. Utility: beschränkter Kunstflug mit Steilkurven über 60° (GuV 10.1.2).' },
        { q: 'Was ändert sich beim ersten Alleinflug am Flugzeug?', a: ['Es ist leichter: steigt besser, schwebt länger', 'Es ist schwerer', 'Es fliegt langsamer', 'Nichts'], c: 0, e: 'Ohne Fluglehrer fehlt dessen Gewicht (GuV 14.0.1).' },
        { q: 'Du fühlst dich beim Alleinflug im Anflug unsicher. Was tust du?', a: ['Go-around und nochmals von vorne', 'Trotzdem landen', 'Den Fluglehrer anrufen', 'Den Motor abstellen'], c: 0, e: '«Es gibt keine Eile» (GuV 14.0.1).' },
        { q: 'Was bedeutet ADM?', a: ['Aeronautical Decision Making', 'Airport Data Message', 'Altitude Display Mode', 'Air Defence Mission'], c: 0, e: 'Eigenständige, luftfahrtbezogene Entscheidungsfindung des PIC.' },
        { q: 'Ab wie viel Grad Querlage sind Kurven mit Leichtflugzeugen instationär?', a: ['Über 45°', 'Über 15°', 'Über 90°', 'Nie'], c: 0, e: 'Selbst mit voller Leistung lässt sich die Geschwindigkeit nicht halten (GuV 15.2.1).' },
        { q: 'Gleitzahl 1:10, Höhe 2000 ft über Grund. Wie weit kommst du ungefähr?', a: ['20\'000 ft (≈ 6 km)', '2000 ft', '10 km', '1 km'], c: 0, e: '2000 × 10 = 20\'000 ft ≈ 6.1 km.' },
        { q: 'Welche Geschwindigkeit gibt die weiteste Gleitstrecke?', a: ['V_BEST GLIDE', 'V_BEST ENDURANCE', 'V_NE', 'V_S0'], c: 0, e: 'V_BEST ENDURANCE gibt die längste Zeit (ca. 15 % tiefer).' },
        { q: 'Mit welcher Querlage verlierst du pro Vollkreis im Gleitflug am wenigsten Höhe?', a: ['45°', '15°', '60°', '5°'], c: 0, e: 'Bester Kompromiss zwischen Drehgeschwindigkeit und Sinkrate (GuV 16.1.4).' },
        { q: 'Auf welcher Höhe sollte die KEY POSITION bei einer Notlandung ungefähr sein?', a: ['Ca. 1000 ft über Grund', 'Ca. 100 ft', 'Ca. 5000 ft', 'Egal'], c: 0, e: 'Querab der Schwelle, ca. 1000 ft GND (GuV 16.2.2).' },
        { q: 'Welches Feld ist für eine Notlandung am besten?', a: ['Gemähte Wiese', 'Hohes Getreidefeld', 'Frisch gepflügter Acker', 'Wald'], c: 0, e: 'Hoher Bewuchs → Überschlaggefahr (GuV 16.4.3).' },
        { q: 'Notlandung auf einem geneigten Feld:', a: ['Hangaufwärts landen, auch mit leichtem Rückenwind', 'Immer hangabwärts', 'Quer zum Hang', 'Gegen den Wind hangabwärts'], c: 0, e: 'GuV 16.4.3 und 16.5.1.' },
        { q: 'Woran erkennst du die Windrichtung am Boden?', a: ['Rauchfahnen, wogende Felder, Wellen auf dem Wasser', 'Am Kompass', 'An der Sonne', 'Gar nicht'], c: 0, e: 'Auch Kühe stehen meist mit dem Hinterteil im Wind (GuV 16.5.1).' },
        { q: 'Was gehört kurz vor dem Aufsetzen einer Notlandung dazu?', a: ['Treibstoff zu, Zündung aus, Türe entriegeln, Brille ab', 'Vollgas geben', 'Klappen einfahren', 'Transponder aus'], c: 0, e: 'Plus BRACE-Position für die Passagiere (GuV 16.5.3).' },
        { q: 'Wie überprüfst du ein Feld vor einer vorsorglichen Landung?', a: ['Tief und seitlich versetzt überfliegen', 'Direkt hineinlanden', 'Von 5000 ft beurteilen', 'Gar nicht'], c: 0, e: 'Low Flying Check, «Sicht geht vor Höhe» (GuV 17.2.2).' },
        { q: 'Was bringt die PRECAUTIONARY CONFIGURATION?', a: ['Kleinere Kurvenradien, tiefere V_STALL, bessere Sicht', 'Mehr Geschwindigkeit', 'Weniger Treibstoffverbrauch', 'Besseren Funk'], c: 0, e: 'Klappen ausgefahren, reduzierte Geschwindigkeit (GuV 17.3.1).' },
        { q: 'Was tust du zuerst bei einem Funkausfall?', a: ['Transponder 7600 setzen', 'Transponder 7700', 'Sofort landen', 'Den Tower anrufen'], c: 0, e: 'Danach weiter nach Flugplan, Anflug zur ETA, auf Lichtzeichen achten (GuV 18.7.1).' },
        { q: 'Du hast die Orientierung verloren. Was ist richtig?', a: ['ATC ehrlich sagen, dass du die Position nicht kennst', 'Weiterfliegen und hoffen', 'Tiefer sinken', 'Funk ausschalten'], c: 0, e: 'Oder Umkehrkurs zur letzten bekannten Position, rechtzeitig vorsorglich landen (GuV 18.7.2).' },
        { q: 'Was bedeutet ein QDM von 315?', a: ['Magnetischer Kurs 315° zur Station', 'Radial 315 von der Station', 'Höhe 315 ft', 'Distanz 315 NM'], c: 0, e: 'QDM = magnetischer Kurs zur Station, QDR = von der Station weg.' },
        { q: 'Unbeabsichtigt in Vereisung: Was gehört zum Verfahren (Beispiel AFM)?', a: ['180°-Kurve, Vollgas, Vergaservorwärmung, Pitot Heat ein', 'Weiter steigen', 'Leistung reduzieren', 'Klappen voll ausfahren'], c: 0, e: '«LOOK TWICE FOR ICE» (GuV 18.7.5).' },
        { q: 'Was sind die «Control Instruments» im Instrumentenflug?', a: ['AI und Leistungsanzeige', 'ASI und ALT', 'VSI und DG', 'Kompass und Uhr'], c: 0, e: 'Die Performance Instruments zeigen das Resultat (GuV 19.2.6).' },
        { q: 'Wohin kehrt der Blick beim Instrumenten-Scanning immer zurück?', a: ['Zum AI', 'Zum Kompass', 'Zur Uhr', 'Zum Funkgerät'], c: 0, e: 'Selective Radial Scan um den Attitude Indicator.' },
        { q: 'Welche Mindestsicht gilt für VFR unter FL100 (ausser Klasse G)?', a: ['5 km', '1.5 km', '8 km', '10 km'], c: 0, e: 'Über FL100: 8 km (GuV 20.2.4).' },
        { q: 'Welcher Wolkenabstand gilt grundsätzlich für VFR?', a: ['1000 ft vertikal, 1.5 km horizontal', '500 ft und 1 km', 'Frei von Wolken', '3000 ft und 5 km'], c: 0, e: 'GuV 20.2.4.' },
        { q: 'Wann wird das DABS für den aktuellen Tag publiziert?', a: ['09:00, 13:00 und 16:00 LT', 'Nur um Mitternacht', 'Jede Stunde', 'Nur auf Anfrage'], c: 0, e: 'Das für den Folgetag um 16:00 LT (GuV 20.3).' },
        { q: 'Welches Militärgebiet kann jederzeit aktiv sein?', a: ['CTR/TMA Payerne', 'CTR Zürich', 'TMA Genf', 'Keines'], c: 0, e: 'GuV 20.1.4.' },
        { q: 'Wo gilt Transponderpflicht?', a: ['In C und D, in E über 7000 ft AMSL, nachts überall', 'Nur in G', 'Nur über FL195', 'Nirgends für VFR'], c: 0, e: 'GuV 20.2.4.' },
        { q: 'Was ist die Mindestsicht bei Special VFR in einer CTR?', a: ['1.5 km', '5 km', '500 m', '8 km'], c: 0, e: 'Plus frei von Wolken, Bodensicht, max. 140 kt, Wolkenbasis ab 600 ft AGL.' },
        { q: 'Wie lange wartest du nach einem erfolglosen Funkanruf?', a: ['10 Sekunden', '1 Sekunde', '1 Minute', '5 Minuten'], c: 0, e: 'GuV 21.1.2.' },
        { q: 'Wie kürzt man das Rufzeichen HB-KGF ab?', a: ['H-GF', 'KGF', 'HB-K', 'GF'], c: 0, e: 'Erstes Zeichen + mindestens die zwei letzten Buchstaben (GuV 21.1.7).' },
        { q: 'Welche Stelle ist für den Bodenverkehr auf dem Rollweg zuständig?', a: ['Ground', 'Tower', 'Approach', 'Delivery'], c: 0, e: 'Tower = Platzverkehr, Apron = Vorfeld, Delivery = Freigaben.' },
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
<p>Mit Erkältung nicht fliegen: Druckausgleich der Ohren kann im Sinkflug sehr schmerzhaft werden. Nach Tiefseetauchen 24 h (mit Dekompressionsstopp 48 h) nicht fliegen.</p>` },
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
