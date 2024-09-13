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

export async function getStaticProps() {
  const data = await getStats({ query: { orderBy: "date DESC" } } as any);
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
        menus: [
          {
            label: "Our Work",
            href: "/",
          },
        ],
        socialLinks: [
          {
            platform: "Github",
            url: "https://github.com/CodeForAfrica",
            id: "651e89dec938b817cab85676",
          },
        ],
      },
    },
  };
}
