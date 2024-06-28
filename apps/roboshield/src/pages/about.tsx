import { getPageServerSideProps } from "@/roboshield/lib/data";
import BlockRenderer from "@/roboshield/components/BlockRenderer";
import { Page } from "@/root/payload-types";

type BlockType = Page["blocks"];

interface PageProps {
  blocks: BlockType;
}

export default function About({ blocks }: PageProps) {
  return (
    <>
      <BlockRenderer blocks={blocks} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { props } = await getPageServerSideProps(context);
  return {
    props: {
      ...props,
    },
  };
}
