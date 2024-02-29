import Home from "@/outline-vpn/app/components/Home";
import { getUsers } from "../data";

export async function Page(): Promise<JSX.Element> {
  const users = await getUsers();
  return <Home users={users} />;
}

export default Page;
