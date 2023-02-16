import Grantees from "@/charterafrica/components/Grantees/Grantees";
import { getPageServerSideProps } from "@/charterafrica/lib/data";

function About({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "grantees":
        return <Grantees {...block} key={block.slug} />;
      default:
        return null;
    }
  });
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default About;
