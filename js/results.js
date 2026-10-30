/*
  Wettkampfliste Jana Julia Kramer
  Quelle: «2026-Plan» (Excel des Auftraggebers, Oktober 2026)

  So wird gepflegt:
  - Pro Rennen eine Zeile. Neue Rennen einfach ergänzen (Reihenfolge egal, sortiert wird automatisch).
  - type: "bahn" | "strasse" | "cross" | "triathlon"
  - rank: Zahl. Ohne rank + Datum in der Zukunft → erscheint unter «Next Races».
  - link: offizieller Resultat-Link (leer lassen, falls keiner vorhanden).
  - Die Zuordnung Bahn/Strasse ist ein Vorschlag (im Excel steht nur «Lauf») → bitte prüfen.
*/
window.RESULTS = [
  { date: "2026-01-17", name: "Swiss Athletics Cross Cup – Kantonalfinal", place: "Welschenrohr", type: "cross", distance: "1'200 m", category: "U12", rank: 1, link: "https://my.raceresult.com/373129/results" },
  { date: "2026-03-08", name: "Schweizer Meisterschaften Cross", place: "Langenthal", type: "cross", distance: "1'200 m", category: "U12", rank: 7, link: "https://trackmaxx.ch/results/?race=csm26&c=17a8d202-a042-41c4-8b38-49a560fd2910" },
  { date: "2026-04-12", name: "Frühlingslauf Wiedlisbach", place: "Wiedlisbach", type: "strasse", distance: "1'050 m", category: "U12", rank: 1, link: "https://trackmaxx.ch/results/?race=flw26&c=f51424a5-f2cc-4a3b-88d4-9761515c77f0" },
  { date: "2026-04-24", name: "Tüfelschluchtlauf", place: "Hägendorf", type: "strasse", distance: "1'200 m", category: "U12", rank: 1, link: "https://my.raceresult.com/375620/" },
  { date: "2026-05-02", name: "Buchsilauf", place: "Herzogenbuchsee", type: "strasse", distance: "1'100 m", category: "U12", rank: 1, link: "https://my.raceresult.com/375634/results" },
  { date: "2026-05-03", name: "Die schnällschte Oberaargauer (Qualifikation BE-Final)", place: "Langenthal", type: "bahn", distance: "1'000 m", category: "W10", rank: 1, link: "https://www.mille-gruyere.ch/fuer-teilnehmer/ergebnisse/live-resultate/" },
  { date: "2026-05-09", name: "Grand-Prix von Bern (Bären GP)", place: "Bern", type: "strasse", distance: "1'600 m", category: "W11", rank: 1, link: "https://trackmaxx.ch/results/?race=gp26&c=f766d363-fe3e-42ba-ad61-a08c5accf9cd" },
  { date: "2026-05-16", name: "Spezialisten-Meeting (Schwimmen)", place: "Aarau", type: "triathlon", distance: "50 m Schwimmen", category: "–", rank: 3, link: "" },
  { date: "2026-05-23", name: "Mille Gruyère Regionalfinal Zürich", place: "Regensdorf", type: "bahn", distance: "1'000 m", category: "W10", rank: 1, link: "https://www.mille-gruyere.ch/fuer-teilnehmer/ergebnisse/live-resultate/" },
  { date: "2026-05-25", name: "Pfingstlauf", place: "Niederbipp", type: "strasse", distance: "1'000 m", category: "U12", rank: 1, link: "https://my.raceresult.com/375071/results" },
  { date: "2026-06-07", name: "Berner Meisterschaften Nachwuchs", place: "Thun", type: "bahn", distance: "1'000 m", category: "U12", rank: 1, link: "https://www.swiss-athletics.ch/wettkaempfe/resultate/bestenliste/bestenliste-wettkampf/?&mobile=false&blyear=2026&evt=a21aa-umhntv-mn7axdyn-1-mnwqwxnl-7flu&blcat=5c4o3k5m-d686mo-j986g2ie-1-j986g45m-bh&disci=5c4o3k5m-d686mo-j986g2ie-1-j986gc86-1oz&top=30" },
  { date: "2026-06-21", name: "Aarauer Altstadtlauf", place: "Aarau", type: "strasse", distance: "1'200 m", category: "U12", rank: 1, link: "https://my.raceresult.com/348721/" },
  { date: "2026-06-26", name: "Mille Gruyère BE-Final (Swiss Qualifiers)", place: "Langnau i.E.", type: "bahn", distance: "1'000 m", category: "W10", rank: 1, link: "https://www.mille-gruyere.ch/fuer-teilnehmer/ergebnisse/live-resultate/" },
  { date: "2026-07-18", name: "Torrent Run", place: "Leukerbad", type: "strasse", distance: "1'800 m", category: "U12", rank: 1, link: "https://datasport.com/de/anlass/torrent-run-walk-2026/ranking/list/u12-maedchen" },
  { date: "2026-07-18", name: "Trompeterlauf Bad Säckingen", place: "Bad Säckingen (DE)", type: "strasse", distance: "1'180 m", category: "U12", rank: 1, link: "https://datasport.com/de/anlass/trompeterlauf-bad-saeckingen-2026/ranking/list/weibliche-kinder-u12" },
  { date: "2026-08-07", name: "Bleienbacher", place: "Bleienbach", type: "strasse", distance: "800 m", category: "U12", rank: 1, link: "https://my.raceresult.com/378390/results" },
  { date: "2026-08-08", name: "Nachwuchsmeeting Zofingen", place: "Zofingen", type: "bahn", distance: "600 m", category: "U12", rank: 1, link: "https://slv.laportal.net/Competitions/CurrentList/1038382/20184" },
  { date: "2026-08-14", name: "Born to Run", place: "Olten", type: "strasse", distance: "1'200 m", category: "U12", rank: 1, link: "https://my.raceresult.com/375624/results" },
  { date: "2026-08-16", name: "Triathlon Tägerhard", place: "Tägerhard", type: "triathlon", distance: "Triathlon", category: "U14", rank: 3, link: "https://datasport.com/de/anlass/taegitri-2026/ranking/list/schueler-maedchen--85" },
  { date: "2026-08-23", name: "Grosses Meeting für die Kleinen", place: "Bern", type: "bahn", distance: "1'000 m", category: "U12", rank: 1, link: "https://www.swiss-athletics.ch/wettkaempfe/resultate/bestenliste/bestenliste-wettkampf/?&mobile=false&blyear=2026&evt=a21aa-8zzu0-mqetbbtb-1-mqgcvdzn-4em7&blcat=5c4o3k5m-d686mo-j986g2ie-1-j986g45m-bh&disci=5c4o3k5m-d686mo-j986g2ie-1-j986gc86-1oz&top=30" },
  { date: "2026-09-05", name: "Burgdorfer Stadtlauf", place: "Burgdorf", type: "strasse", distance: "1'480 m", category: "U12", rank: 1, link: "https://datasport.com/de/anlass/burgdorfer-stadtlauf-2026/ranking/list/runnerinnen--69" },
  { date: "2026-09-12", name: "Mille Gruyère Schweizer Final", place: "Muttenz", type: "bahn", distance: "1'000 m", category: "W10", rank: 1, link: "https://www.mille-gruyere.ch/fuer-teilnehmer/ergebnisse/live-resultate/" },
  { date: "2026-09-26", name: "Meeting Jeunesse", place: "Sierre", type: "bahn", distance: "1'000 m", category: "U12", rank: 1, link: "https://www.swiss-athletics.ch/wettkaempfe/resultate/bestenliste/bestenliste-wettkampf/?&mobile=false&blyear=2026&evt=a21aa-9y4ifn-msnafjt7-1-mspneg4f-89am&blcat=5c4o3k5m-d686mo-j986g2ie-1-j986g45m-bh&disci=5c4o3k5m-d686mo-j986g2ie-1-j986gc86-1oz&top=30" },

  // Angemeldet (noch ohne Resultat)
  { date: "2026-11-07", name: "Langenthaler Stadtlauf", place: "Langenthal", type: "strasse", distance: "900 m", category: "U12" },
  { date: "2026-11-21", name: "Basler Stadtlauf", place: "Basel", type: "strasse", distance: "1'000 m", category: "U13" },
  { date: "2026-12-13", name: "Zürcher Silvesterlauf", place: "Zürich", type: "strasse", distance: "1'600 m", category: "U14" }
];
