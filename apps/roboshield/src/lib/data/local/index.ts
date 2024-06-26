import { getPageProps } from "@/roboshield/lib/data/common";
import api from "@/roboshield/lib/payload";
import { AppContext } from "next/app";

export async function getPageServerSideProps(context: AppContext) {
  const props = await getPageProps(api, context);
  if (!props) {
    return { notFound: true };
  }
  return {
    props,
  };
}
