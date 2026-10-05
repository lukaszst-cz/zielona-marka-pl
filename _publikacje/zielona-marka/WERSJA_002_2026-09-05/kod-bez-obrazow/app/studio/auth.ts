import { cookies } from "next/headers";
import { OWNER_EMAIL, STUDIO_COOKIE, verifyStudioSession } from "./session";

type StudioOwner = {
  email: string;
  displayName: string;
};

async function getAuthenticatedOwner(): Promise<StudioOwner | null> {
  const cookieStore = await cookies();
  if (!(await verifyStudioSession(cookieStore.get(STUDIO_COOKIE)?.value))) return null;
  return { email: OWNER_EMAIL, displayName: OWNER_EMAIL };
}

export async function requireStudioOwner() {
  return getAuthenticatedOwner();
}

export async function getStudioOwner() {
  return getAuthenticatedOwner();
}
