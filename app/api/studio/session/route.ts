import { checkEdgeRateLimit } from "../../../edge-rate-limit.mjs";
import { isSameSiteMutation, privateJson, limitedFormData } from "../../../request-security.mjs";
import { authenticateStudio, createStudioSession, SESSION_MAX_AGE, STUDIO_COOKIE } from "../../../studio/session";

function cookie(value: string, maxAge: number): string {
  return `${STUDIO_COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}

export async function POST(request: Request) {
  if (!isSameSiteMutation(request)) return privateJson({ error: "Niedozwolone źródło żądania" }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 4096) return privateJson({ error: "Zbyt duże żądanie" }, { status: 413 });
  let form: FormData;
  try { form = await limitedFormData(request); }
  catch (error) { return privateJson({ error: error instanceof RangeError ? "Zbyt duże żądanie" : "Nieprawidłowy formularz" }, { status: error instanceof RangeError ? 413 : 400 }); }
  if (form.get("_action") === "logout") {
    return new Response(null, { status: 303, headers: { "Cache-Control": "private, no-store", Location: "/", "Set-Cookie": cookie("", 0) } });
  }

  const { env } = await import("cloudflare:workers");
  const rate = await checkEdgeRateLimit(env, "ZM_LOGIN_RATE_LIMITER", request);
  if (!rate.available) return privateJson({ error: "Logowanie chwilowo niedostępne. Spróbuj ponownie za minutę." }, { status: 503 });
  if (!rate.allowed) return privateJson({ error: "Zbyt wiele prób logowania. Spróbuj ponownie za minutę." }, { status: 429, headers: { "Retry-After": "60" } });
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");
  if (email.length > 254 || password.length > 1024 || !(await authenticateStudio(email, password))) {
    return new Response(null, { status: 303, headers: { "Cache-Control": "private, no-store", Location: "/studio?error=1" } });
  }

  return new Response(null, {
    status: 303,
    headers: { "Cache-Control": "private, no-store", Location: "/studio", "Set-Cookie": cookie(await createStudioSession(), SESSION_MAX_AGE) },
  });
}
