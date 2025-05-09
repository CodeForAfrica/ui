import { Page } from "@/root/payload-types";

export { getPageServerSideProps } from "./local";

export interface PageProps {
  [key: string]: unknown;
  blocks: Page["blocks"];
}
