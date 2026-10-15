import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const paths = [
  "docs/qms/README.md",
  "docs/qms/01-polityka-i-cele.md",
  "docs/qms/02-proces-i-bramki.md",
  "docs/qms/03-ryzyka-i-szanse.md",
  "docs/qms/04-niezgodnosci-i-doskonalenie.md",
  "docs/qms/05-przeglady-i-audyt.md",
  "docs/qms/06-mapa-wdrozeniowa.md",
  "docs/qms/szablony/brief.md",
  "docs/qms/szablony/raport-qa.md",
  "docs/qms/szablony/niezgodnosc.md",
  "docs/qms/szablony/odbior.md",
  "docs/qms/szablony/przeglad.md",
  "docs/qms/przyklady/2026-10-15-wlasna-witryna.md",
];
for (const path of paths) {
  assert.ok(existsSync(join(root, path)), "Brakuje dokumentu QMS: " + path);
  const text = readFileSync(join(root, path), "utf8");
  assert.ok(text.length > 400, "Pusty lub niekompletny dokument: " + path);
  assert.match(text, /wersja|Wersja|Wydanie|wydanie|Data|data/, path + " nie ma danych kontrolnych");
}
const README = readFileSync(join(root, "docs/qms/README.md"), "utf8");
const map = readFileSync(join(root, "docs/qms/06-mapa-wdrozeniowa.md"), "utf8");
assert.match(README, /nie są certyfikatem/i, "Brak rozróżnienia certyfikacji w instrukcji");
assert.match(map, /NIE audyt zgodności/i, "Mapa luk nie jest certyfikacją");
for (const path of paths.filter(p => p.includes("/szablony/"))) {
  const text = readFileSync(join(root, path), "utf8");
  assert.match(text, /NIEWYPEŁNIONY SZABLON/i, path + " musi pozostać szablonem");
  assert.match(text, /NIE SPRAWDZONO|DO UZUPEŁNIENIA|NIEUSTALONA/, path + " nie może domyślnie stwierdzać PASS");
}
const gitignore = readFileSync(join(root, ".gitignore"), "utf8");
assert.ok(gitignore.includes("/docs/qms/records/"), "Prywatne zapisy QMS muszą być ignorowane");
assert.ok(gitignore.includes("/docs/qms/private/"), "Prywatne dowody QMS muszą być ignorowane");
console.log("QMS: 13 dokumentów zweryfikowanych, szablony bez fikcyjnych wyników, prywatne rejestry ignorowane.");
