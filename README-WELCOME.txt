DNX Receiver Welcome-Tool v1.1 (Modul v4)
=========================================

Was es tut:
- Begruessungsfenster ~1,2 s nach dem Laden, einmal pro Browser.
- Oben vier Sprachbloecke gleichzeitig: DE / EN / RU / NL, je mit echter
  SVG-Flagge (keine Emoji-Flaggen, funktioniert auch auf Windows).
- Unten eigener Bereich "Weitere Sprachen" mit Flaggen-Buttons:
  UA, ES, ZH, JA, KO, VI, TH - Klick blendet den Sprachblock ein/aus,
  Auswahl bleibt im Browser gespeichert.
- Inhalt pro Sprache: freiwillige Registrierung (warum), wie und warum
  sicher, was Registrierte duerfen, was Unregistrierte weiterhin duerfen
  (zuhoeren, umschalten, downloaden, Scanner ansehen - Bedienung nur registriert).
- Buttons: Registrieren / Anmelden (:8096/register bzw. /login), Schliessen.

Einbau auf dem Server:
  unzip DNX-Receiver-Welcome-Tool-v1.1.zip -d dnx-welcome
  bash dnx-welcome/install_welcome.sh            # Standardpfad
  bash dnx-welcome/install_welcome.sh /pfad/zur/init.js   # eigener Pfad
Ersetzt vorhandene v2/v3-Module automatisch, legt sonst neu an.
Danach im Browser Strg+Shift+R.

Verhalten/Test:
- Erneut zeigen: Konsole: localStorage.removeItem('dnx_welcome_seen')
  oder dnxWelcomeShow()
- Jedes Mal zeigen: in dnx_welcome.js SHOW_EVERY_TIME = true setzen.
- Backup init.js.bak-<Zeitstempel> automatisch, Rollback bei Syntaxfehler.
