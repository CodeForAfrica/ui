import { Section } from "@commons-ui/core";
import { Page } from "@/root/payload-types";
import {
  ExtractBlockType,
  ExtractNestedBlockType,
} from "@/roboshield/utils/blocks";
import LongFormRichText from "@/roboshield/components/LongFormRichText";
import LongFormMedia from "@/roboshield/components/LongFormMedia";
import LongFormExternalEmbed from "@/roboshield/components/LongFormExternalEmbed";
import { FC } from "react";

type ContentProps = ExtractBlockType<
  NonNullable<Page["blocks"]>[number],
  "content"
>;

export type ExternalEmbedBlock = ExtractNestedBlockType<
  NonNullable<ContentProps["content"]>[number],
  "externalEmbed"
>;

export type RichTextBlock = ExtractNestedBlockType<
  NonNullable<ContentProps["content"]>[number],
  "richtext"
>;

export type MediaBlock = ExtractNestedBlockType<
  NonNullable<ContentProps["content"]>[number],
  "mediaBlock"
>;

type ComponentMap = {
  richtext: React.FC<RichTextBlock>;
  mediaBlock: React.FC<MediaBlock>;
  externalEmbed: React.FC<ExternalEmbedBlock>;
};

export default function Content({ content }: ContentProps) {
  const COMPONENT_BY_CONTENT_TYPE: ComponentMap = {
    richtext: LongFormRichText,
    mediaBlock: LongFormMedia,
    externalEmbed: LongFormExternalEmbed,
  };

  return (
    <Section
      component="section"
      variant="body3"
      sx={{
        px: { xs: 2.5, sm: 0 },
        my: 10,
      }}
    >
      {content?.map((child) => {
        const Component: FC<any> = COMPONENT_BY_CONTENT_TYPE[child.blockType];

        if (Component) {
          return <Component key={child.id} {...child} />;
        }

        return null;
      })}
    </Section>
  );
}
