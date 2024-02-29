import { User } from "../types";

export async function getUsers() {
  const users: User[] = [
    {
      name: "Nicole Rodriguez",
      email: "edward05@yahoo.com",
      lastVpnKeySentDate: "2007-02-26",
      status: "Inactive",
    },
    {
      name: "Brian Santiago",
      email: "matthew04@hotmail.com",
      lastVpnKeySentDate: "1982-08-15",
      status: "Inactive",
    },
    {
      name: "Matthew Miller",
      email: "conleybrendan@woods-grant.org",
      lastVpnKeySentDate: "2008-05-24",
      status: "Inactive",
    },
    {
      name: "Kayla Turner",
      email: "egood@williams-reed.info",
      lastVpnKeySentDate: "1983-03-26",
      status: "Active",
    },
    {
      name: "Mark Gomez",
      email: "tyler35@gmail.com",
      lastVpnKeySentDate: "2020-01-19",
      status: "Inactive",
    },
    {
      name: "Jeffrey Webb",
      email: "johnfarrell@yahoo.com",
      lastVpnKeySentDate: "2018-03-19",
      status: "Active",
    },
    {
      name: "Sandra Hickman",
      email: "ipreston@shea.net",
      lastVpnKeySentDate: "2022-10-13",
      status: "Active",
    },
    {
      name: "Natalie Gray",
      email: "xblake@chambers-warner.com",
      lastVpnKeySentDate: "1980-08-29",
      status: "Inactive",
    },
    {
      name: "Michelle Young",
      email: "michelle44@snyder-sullivan.info",
      lastVpnKeySentDate: "1978-12-06",
      status: "Active",
    },
    {
      name: "Jeffrey Wolf",
      email: "ashleyporter@hotmail.com",
      lastVpnKeySentDate: "2023-07-25",
      status: "Active",
    },
  ];
  return users;
}
