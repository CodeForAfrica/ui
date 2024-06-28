import PageHeader from "@/roboshield/components/PageHeader/PageHeader";
import { Page } from "@/root/payload-types";

interface BlockRendererProps extends Pick<Page, "blocks"> {}

const components = {
  "page-header": PageHeader,
};

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks?.map((block, index) => {
        const Component = components[block.blockType];

        if (Component) {
          return <Component key={index} {...block} />;
        }

        return null;
      })}
    </>
  );
}
