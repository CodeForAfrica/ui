import { cookies } from "next/headers";
import { verifyToken } from "@/outline-vpn/app/utils";
import { GoogleUser } from "@/outline-vpn/app/types";

export async function getHeaderProps(): Promise<GoogleUser | null> {
  const { value: token } = cookies().get("token") as any;
  if (!token) {
    return null;
  }
  const user = await verifyToken(token);
  if (!user) {
    return null;
  }
  return {
    avatarUrl: user?.picture ?? null,
    name: `${user?.given_name} ${user?.family_name}`,
    email: user?.email ?? null,
  };
}
