import { format, startOfYesterday } from "date-fns";
import { GetSessionParams, getSession } from "next-auth/react";

import Statistics from "@/vpnmanager/components/Statistics";
import { Data } from "@/vpnmanager/components/Statistics/Statistics";
import { getStats } from "@/vpnmanager/lib/statistics";

interface Props {
  data: Data[];
}
export default function Home(props: Props) {
  const { data } = props;
  return <Statistics data={data} />;
}

export async function getServerSideProps(
  context: GetSessionParams | undefined,
) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const yesterday = startOfYesterday();
  const data = await getStats({
    query: { orderBy: "date DESC", date: format(yesterday, "yyyy-MM-dd") },
  });
  return {
    props: {
      data,
      navbar: {
        logo: {
          alt: "CfA logo",
          prefix: "media",
          filename: "cfa-logo.svg",
          mimeType: "image/svg+xml",
          filesize: 6029,
          width: 136,
          height: 61,
          url: "https://cfa.dev.codeforafrica.org/media/cfa-logo.svg",
          src: "https://cfa.dev.codeforafrica.org/media/cfa-logo.svg",
        },
        menus: [],
        socialLinks: [],
      },
    },
  };
}
