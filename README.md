# SPHAIR Coach ✈️

Lern-App für die Vorbereitung auf **SPHAIR** – mit dem Ziel **Airline-Pilot/-in** (SWISS / Edelweiss). Läuft im Browser auf Handy und Laptop, ohne Installation, auch offline.

## Was drin ist

| Bereich | Inhalt |
|---|---|
| **Heute** | 3 Tagesaufgaben (Lektion, Screening-Training, Quiz), Streak 🔥, Wochenübersicht, Countdown zum Screening, Coach-Tipp |
| **Lernen** | 9 Themen mit Lektionen und Quiz: Weg ins Airline-Cockpit, Aerodynamik, Flugzeug & Instrumente, Meteorologie, Navigation, Luftrecht & Luftraum, Sprechfunk, Human Factors, Flugbetrieb. Karteikasten-System: falsche Fragen kommen schneller wieder. |
| **Training** | Trainer für alle 4 Screening-Blöcke: Kopfrechnen (sehen & hören), Englisch, Würfel kippen, Figuren drehen, Funksprüche merken, Zahlenreihen, Vergleichen, Symbole zählen, Technisches Verständnis, Instrumente lesen, Blitz-Wahrnehmung, Rechenaufgaben, Multitasking. Schwierigkeit passt sich an. |
| **Screening-Simulation** | Alle Tests am Stück, ohne Feedback – wie am echten Screening |
| **Coach** | KI-Coach (Claude) mit deinem Lernstand. Ohne API-Schlüssel gibt es einen einfachen Offline-Coach. |

## Quellen

Die Fakten zu SPHAIR stammen von [sphair.ch](https://sphair.ch/de/airlinepilot), dem offiziellen [Lernprogramm](https://lernprogramm.sphair.ch/), [berufsberatung.ch](https://www.berufsberatung.ch/de/aus-weiterbildungen/aero-club-der-schweiz-sphair/nachwuchspiloten-innen-eignungsabklaerung) und der [European Flight Academy](https://www.european-flight-academy.com/en/advantages-sphair-candidates). Alle Links stehen in der App unter *Profil → Offizielle Quellen*. Die offiziellen Übungstests gibt es nach der Registrierung auf sphair.ch (MySPHAIR) – nutze sie zusätzlich!

> Die Trainer sind eigene Übungen im Stil der Screening-Tests, keine Originaltests. Regeln, Termine und Kosten immer auf sphair.ch prüfen.

## Online stellen (GitHub Pages, gratis)

1. Auf GitHub im Repository: **Settings → Pages**
2. *Source*: „Deploy from a branch“, Branch wählen, Ordner `/ (root)`, **Save**
3. Nach ca. 1 Minute läuft die App unter `https://<dein-name>.github.io/Sphair-Lern-App/`

**Als App installieren:** iPhone (Safari) → Teilen → „Zum Home-Bildschirm“ · Android (Chrome) → ⋮ → „App installieren“ · Windows (Edge/Chrome) → Installieren-Symbol in der Adresszeile.

## KI-Coach einschalten

*Profil → KI-Coach*: Anthropic-API-Schlüssel eintragen (bleibt nur auf deinem Gerät). Modelle: Claude Opus 5.5 (Standard), Sonnet 5.5 oder Haiku 5.5 (günstig).

## Technik

Reines HTML/CSS/JavaScript ohne Build-Schritt. Fortschritt im `localStorage` (Sichern/Wiederherstellen im Profil). `js/vendor/anthropic-sdk.mjs` ist das offizielle Anthropic-TypeScript-SDK als eine Datei gebündelt. Lokal testen: `python -m http.server` und `http://localhost:8000` öffnen.
