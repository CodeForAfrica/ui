import { cookies } from "next/headers";

export default function logoutUser() {
  cookies().delete("token");
}
