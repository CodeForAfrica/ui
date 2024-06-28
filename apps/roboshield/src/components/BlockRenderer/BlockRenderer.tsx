import PageHeader from "@/roboshield/components/PageHeader/PageHeader";
import { Page } from "../../../payload-types";

type BlockType = Page["blocks"];
interface BlockRendererProps {
  blocks: BlockType;
}

const components = {
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
