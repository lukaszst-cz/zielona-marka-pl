import { env } from "cloudflare:workers";

export const OWNER_EMAIL = "lukasz.staniewicz@gmail.com";
export const STUDIO_COOKIE = "zielona_marka_studio";
export const SESSION_MAX_AGE = 60 * 60 * 12;

type StudioSecrets = {
  STUDIO_PASSWORD?: string;
  STUDIO_SESSION_SECRET?: string;
};

function getSecrets(): Required<StudioSecrets> | null {
  const secrets = env as unknown as StudioSecrets;
  if (!secrets.STUDIO_PASSWORD || !secrets.STUDIO_SESSION_SECRET) return null;
  return {
    STUDIO_PASSWORD: secrets.STUDIO_PASSWORD,
    STUDIO_SESSION_SECRET: secrets.STUDIO_SESSION_SECRET,
  };
}

function encodeBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function digest(value: string): Promise<Uint8Array> {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
}

async function sameValue(left: string, right: string): Promise<boolean> {
  const [a, b] = await Promise.all([digest(left), digest(right)]);
  let difference = a.length ^ b.length;
  for (let index = 0; index < Math.max(a.length, b.length); index++) {
    difference |= (a[index] ?? 0) ^ (b[index] ?? 0);
  }
  return difference === 0;
}

async function signature(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload)));
  return encodeBase64Url(bytes);
}

export async function authenticateStudio(email: string, password: string): Promise<boolean> {
  const secrets = getSecrets();
  if (!secrets || email.trim().toLowerCase() !== OWNER_EMAIL) return false;
  return sameValue(password, secrets.STUDIO_PASSWORD);
}

export async function createStudioSession(): Promise<string> {
  const secrets = getSecrets();
  if (!secrets) throw new Error("Brakuje sekretów logowania do studia.");
  const expires = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = `${OWNER_EMAIL}|${expires}`;
  return `${expires}.${await signature(payload, secrets.STUDIO_SESSION_SECRET)}`;
}

export async function verifyStudioSession(token: string | undefined): Promise<boolean> {
  const secrets = getSecrets();
  if (!secrets || !token) return false;
  const [expiresRaw, suppliedSignature, ...extra] = token.split(".");
  if (!expiresRaw || !suppliedSignature || extra.length) return false;
  const expires = Number(expiresRaw);
  if (!Number.isSafeInteger(expires) || expires <= Math.floor(Date.now() / 1000)) return false;
  const expected = await signature(`${OWNER_EMAIL}|${expires}`, secrets.STUDIO_SESSION_SECRET);
  return sameValue(suppliedSignature, expected);
}
