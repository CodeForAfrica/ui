import Statistics from "@/vpnmanager/components/Statistics";
import { getStats } from "@/vpnmanager/lib/statistics";

export default function Home(props) {
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
