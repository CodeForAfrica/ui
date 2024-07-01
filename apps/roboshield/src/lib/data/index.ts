import { Page } from "@/root/payload-types";

export { getPageServerSideProps } from "./local";

export interface PageProps {
  blocks: Page["blocks"];
}
