import { getPageServerSideProps } from "@/roboshield/lib/data";
import RoboForm from "@/roboshield/components/RoboForm";
import Hero from "@/roboshield/components/Hero";
import { useRef } from "react";
import { Block } from "payload/types";

export default function Index(props: any) {
  const scrolRef = useRef<HTMLDivElement | null>(null);
  const { blocks } = props;
  return (
    <>
      <Hero scrolRef={scrolRef} />
      {blocks.map((block: any) => {
        if (block.slug === "robo-form") {
          return <RoboForm key={block.slug} {...block} />;
        }
        return null;
      })}
    </>
  );
}
export async function getServerSideProps(context: any) {
  return getPageServerSideProps(context);
}
