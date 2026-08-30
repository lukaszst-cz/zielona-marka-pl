import { authenticateStudio, createStudioSession, SESSION_MAX_AGE, STUDIO_COOKIE } from "../../../studio/session";

const attempts = new Map<string, { count: number; startedAt: number }>();

function cookie(value: string, maxAge: number): string {
  return `${STUDIO_COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}

export async function POST(request: Request) {
  const form = await request.formData();
  if (form.get("_action") === "logout") {
    return new Response(null, { status: 303, headers: { Location: "/", "Set-Cookie": cookie("", 0) } });
  }

  const client = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const now = Date.now();
  const current = attempts.get(client);
  if (current && now - current.startedAt <= 15 * 60_000 && current.count >= 5) {
    return new Response(null, { status: 303, headers: { Location: "/studio?error=limit" } });
  }
  if (!current || now - current.startedAt > 15 * 60_000) attempts.set(client, { count: 0, startedAt: now });
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");
  if (!(await authenticateStudio(email, password))) {
    const failed = attempts.get(client);
    if (failed) failed.count += 1;
    return new Response(null, { status: 303, headers: { Location: "/studio?error=1" } });
  }

  attempts.delete(client);

  return new Response(null, {
    status: 303,
    headers: { Location: "/studio", "Set-Cookie": cookie(await createStudioSession(), SESSION_MAX_AGE) },
  });
}
