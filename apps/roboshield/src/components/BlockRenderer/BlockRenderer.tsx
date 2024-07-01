import PageHeader from "@/roboshield/components/PageHeader";
import Content from "@/roboshield/components/Content";
import Statistics from "@/roboshield/components/Statistics";
import { Page } from "@/root/payload-types";

interface BlockRendererProps extends Pick<Page, "blocks"> {}

const components = {
  "page-header": PageHeader,
  content: Content,
  statistics: Statistics,
};

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks?.map((block) => {
        const Component = components[block.blockType];

        if (Component) {
          return <Component key={block.blockType} {...block} />;
        }

        return null;
      })}
    </>
  );
}
