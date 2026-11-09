import test from "node:test";
import assert from "node:assert/strict";
import { looksLikeFormSpam } from "../app/inquiry-spam.mjs";

test("reklama wysyłki przez formularze kontaktowe jest odrzucana", () => {
  assert.equal(looksLikeFormSpam({
    name: "DavidPrura",
    email: "no.reply.example@gmail.com",
    company: "google",
    website: "https://www.no-site.com",
    message: "Nasza platforma pomaga firmom kontaktować się z właścicielami stron internetowych za pomocą formularzy kontaktowych. Telegram - https://t.me/Example WhatsApp - https://wa.me/000000000",
  }), true);
});

test("losowy ciąg znaków z bota jest odrzucany", () => {
  assert.equal(looksLikeFormSpam({
    name: "NARYTHY2173828NEHTYHYHTR",
    email: "test44262@notlettersmail.com",
    company: "google",
    message: "MERTHYTJTJ2173828MAYTRYR",
  }), true);
});

test("zwykłe zapytanie klienta z adresem własnej strony przechodzi", () => {
  assert.equal(looksLikeFormSpam({
    name: "Anna Kowalska",
    email: "anna@firma.pl",
    company: "Firma Kowalscy",
    website: "https://firma.pl",
    message: "Dzień dobry, potrzebuję strony dla warsztatu. Obecna strona to https://firma.pl, proszę o wycenę.",
  }), false);
});

test("zapytanie bez linków i bez komunikatorów przechodzi", () => {
  assert.equal(looksLikeFormSpam({
    name: "Marek Nowak",
    email: "marek@salon.pl",
    company: "Salon Marek",
    message: "Chciałbym odświeżyć stronę salonu i dodać formularz zapisu na wizytę.",
  }), false);
});
