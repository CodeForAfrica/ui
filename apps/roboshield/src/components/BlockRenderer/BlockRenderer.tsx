import PageHeader from "@/roboshield/components/PageHeader/PageHeader";
import { Page } from "@/root/payload-types";
import Hero from "@/roboshield/components/Hero";

interface BlockRendererProps extends Pick<Page, "blocks"> {}

const components = {
  "page-header": PageHeader,
  "page-hero": Hero,
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
