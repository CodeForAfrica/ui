import { useLivePreview } from "@payloadcms/live-preview-react";
import { GetServerSidePropsContext } from "next";

import BlockRenderer from "@/roboshield/components/BlockRenderer";
import { getPageServerSideProps } from "@/roboshield/lib/data";
import { PageProps } from "@/roboshield/lib/data";

const Page: React.FC<PageProps> = (initialPage) => {
  const { data } = useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_APP_URL || "",
    depth: 2,
    initialData: initialPage,
  });

  return <BlockRenderer blocks={data?.blocks} />;
};

export default Page;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { props } = await getPageServerSideProps(context);
  return {
    props: {
      ...props,
    },
  };
}
