import Content from "@/roboshield/components/Content";
import Statistics from "@/roboshield/components/Statistics";
import { Page } from "@/roboshield/lib/data/generated-payload-types";
import PageHeader from "@/roboshield/components/PageHeader/PageHeader";

type BlockType = Page["blocks"];
interface BlockRendererProps {
  blocks: BlockType;
}

const components = {
  content: Content,
  statistics: Statistics,
  "page-header": PageHeader,
};

type BlockSlug = keyof typeof components;

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks?.map((block, index) => {
        const Component = components[block.blockType as BlockSlug];

        if (Component) {
          return <Component key={index} {...block} />;
        }

        return null;
      })}
    </>
  );
}
