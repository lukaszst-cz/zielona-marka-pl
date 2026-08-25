import { getChatGPTUser, requireChatGPTUser } from "../chatgpt-auth";

const OWNER_EMAIL = "lukasz.staniewicz@gmail.com";

export async function requireStudioOwner() {
  const user = await requireChatGPTUser("/studio");
  if (user.email.toLowerCase() !== OWNER_EMAIL) return null;
  return user;
}

export async function getStudioOwner() {
  const user = await getChatGPTUser();
  if (!user || user.email.toLowerCase() !== OWNER_EMAIL) return null;
  return user;
}
