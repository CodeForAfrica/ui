import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import TwoToneBackground from "@/roboshield/components/TwoToneBackground";
import { Page } from "@/root/payload-types";
import { ExtractBlockType } from "@/roboshield/utils/blocks";

type PageHeaderProps = ExtractBlockType<
  NonNullable<Page["blocks"]>[number],
  "page-header"
>;

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <>
      <TwoToneBackground sx={{ backgroundColor: "background.default" }}>
        <Section
          sx={{
            px: { xs: 2.5, sm: 0 },
            py: { xs: 3.75, sm: 5.5, md: 6.75, lg: 9.6 },
            zIndex: 1,
            textAlign: "center",
          }}
        >
          <RichTypography
            component="h2"
            sx={{
              color: "primary.main",
              paddingBottom: 2.5,
              textTransform: "uppercase",
            }}
            variant="h5ExtraBold"
          >
            {title}
          </RichTypography>
          <RichTypography component="h2" variant="h2">
            {subtitle}
          </RichTypography>
        </Section>
      </TwoToneBackground>
    </>
  );
}
