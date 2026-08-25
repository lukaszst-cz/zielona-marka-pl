import { authenticateStudio, createStudioSession, SESSION_MAX_AGE, STUDIO_COOKIE } from "../../../studio/session";

function cookie(value: string, maxAge: number): string {
  return `${STUDIO_COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}

export async function POST(request: Request) {
  const form = await request.formData();
  if (form.get("_action") === "logout") {
    return new Response(null, { status: 303, headers: { Location: "/", "Set-Cookie": cookie("", 0) } });
  }

  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");
  if (!(await authenticateStudio(email, password))) {
    return new Response(null, { status: 303, headers: { Location: "/studio?error=1" } });
  }

  return new Response(null, {
    status: 303,
    headers: { Location: "/studio", "Set-Cookie": cookie(await createStudioSession(), SESSION_MAX_AGE) },
  });
}
