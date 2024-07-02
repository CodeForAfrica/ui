import PageHeader from "@/roboshield/components/PageHeader/PageHeader";
import { Page } from "@/root/payload-types";
import Hero from "@/roboshield/components/Hero";
import RoboForm from "@/roboshield/components/RoboForm";
import { FC } from "react";

interface BlockRendererProps extends Pick<Page, "blocks"> {}

const components = {
  "page-header": PageHeader,
  "page-hero": Hero,
  "robo-form": RoboForm,
};

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks?.map((block, index) => {
        const Component: FC<any> = components[block.blockType];

        if (Component) {
          return <Component key={index} {...block} />;
        }

        return null;
      })}
    </>
  );
}
