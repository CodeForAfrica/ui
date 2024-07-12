import { getPageServerSideProps } from "@/roboshield/lib/data";
import BlockRenderer from "@/roboshield/components/BlockRenderer";
import { PageProps } from "@/roboshield/lib/data";
import { GetServerSidePropsContext } from "next";

export default function Page({ blocks }: PageProps) {
  return <BlockRenderer blocks={blocks} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { props } = await getPageServerSideProps(context);
  return {
    props: {
      ...props,
    },
  };
}
