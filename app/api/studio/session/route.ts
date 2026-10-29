import { isSameSiteMutation, privateJson } from "../../../request-security.mjs";
import { authenticateStudio, createStudioSession, SESSION_MAX_AGE, STUDIO_COOKIE } from "../../../studio/session";

function cookie(value: string, maxAge: number): string {
  return `${STUDIO_COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}

export async function POST(request: Request) {
  if (!isSameSiteMutation(request)) return privateJson({ error: "Niedozwolone źródło żądania" }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 4096) return privateJson({ error: "Zbyt duże żądanie" }, { status: 413 });
  const form = await request.formData();
  if (form.get("_action") === "logout") {
    return new Response(null, { status: 303, headers: { "Cache-Control": "private, no-store", Location: "/", "Set-Cookie": cookie("", 0) } });
  }

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
