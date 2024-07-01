import { Section } from "@commons-ui/core";
import RichText, { Children } from "@/roboshield/components/RichText";
import { Page } from "@/root/payload-types";
import { ExtractBlockType } from "@/roboshield/utils/blocks";

type ContentProps = ExtractBlockType<
  NonNullable<Page["blocks"]>[number],
  "content"
>;

export default function Content({ content }: ContentProps) {
  return (
    <Section
      component="section"
      variant="body3"
      sx={{
        px: { xs: 2.5, sm: 0 },
        my: 10,
      }}
    >
      <RichText
        elements={content as Children}
        sx={(theme: any) => ({
          mb: "30px",
          "& h2": {
            typography: { xs: "h4", md: "h2" },
          },
          "& p,& a, & li": {
            typography: { xs: "body1", md: "subheading" },
            mb: 2,
          },
          "& a": {
            textDecorationColor: theme.palette.primary.main,
          },
        })}
      />
    </Section>
  );
}
