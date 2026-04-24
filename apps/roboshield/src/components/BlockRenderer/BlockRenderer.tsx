import { FC } from "react";

import Content from "@/roboshield/components/Content";
import Hero from "@/roboshield/components/Hero";
import PageHeader from "@/roboshield/components/PageHeader";
import RobotsTxtGenerator from "@/roboshield/components/RobotsTxtGenerator";
import Statistics from "@/roboshield/components/Statistics";
import { Page } from "@/root/payload-types";

interface BlockRendererProps extends Pick<Page, "blocks"> {}

const components = {
  "page-header": PageHeader,
  "page-hero": Hero,
  content: Content,
  statistics: Statistics,
  "robots-txt-generator": RobotsTxtGenerator,
};

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks?.map((block) => {
        const Component: FC<any> = components[block.blockType];

        if (!Component) {
          return null;
        }
        return <Component {...block} key={block.id} />;
      })}
    </>
  );
}
