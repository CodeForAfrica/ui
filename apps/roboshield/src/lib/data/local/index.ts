import { GetServerSidePropsContext } from "next";

import { getPageProps } from "@/roboshield/lib/data/common";
import api from "@/roboshield/lib/payload";

export async function getPageServerSideProps(
  context: GetServerSidePropsContext,
) {
  const props = await getPageProps(api, context);
  if (!props) {
    return { notFound: true };
  }
  return {
    props,
  };
}
