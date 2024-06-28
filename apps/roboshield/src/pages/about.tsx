import { getPageServerSideProps } from "@/roboshield/lib/data";
import BlockRenderer from "@/roboshield/components/BlockRenderer";

interface PageProps {
  blocks: any[];
}

export default function About({ blocks }: PageProps) {
  return <BlockRenderer blocks={blocks} />;
}

export async function getServerSideProps(context: any) {
  const { props } = await getPageServerSideProps(context);
  return {
    props: {
      ...props,
    },
  };
}
