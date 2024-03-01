import Dashboard from "@/outline-vpn/app/components/Dashboard";
import { getUsers, getHeaderProps } from "@/outline-vpn/app/data";
import { logoutUser } from "../utils";

export async function Page(): Promise<JSX.Element | null> {
  const users = await getUsers();
  const header = await getHeaderProps();

  if (!header) {
    return null;
  }
  return <Dashboard users={users} header={header} />;
}

export default Page;
