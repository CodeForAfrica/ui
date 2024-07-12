import { Box, Grid } from "@mui/material";
import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import StatisticCard from "./StatisticCard";
import { Page } from "@/root/payload-types";
import { ExtractBlockType } from "@/roboshield/utils/blocks";

type StatiscticsProps = ExtractBlockType<
  NonNullable<Page["blocks"]>[number],
  "statistics"
>;

export type Statistics = NonNullable<StatiscticsProps["statistics"]>[number];

export default function Statistics({ title, statistics }: StatiscticsProps) {
  return (
    <Box
      sx={{
        backgroundColor: "background.main",
      }}
    >
      <Section
        sx={{
          px: { xs: 2.5, md: 0 },
          py: { xs: 7.5, sm: 10, md: 8, lg: 12.5 },
        }}
      >
        {title && (
          <RichTypography
            sx={{
              pb: { xs: 10, md: 5, lg: 7.5 },
            }}
            variant="h4"
          >
            {title}
          </RichTypography>
        )}
        <Grid container rowSpacing={10} justifyContent="space-between">
          {statistics?.map((statistic) => (
            <Grid item key={statistic.name} xs={12} md={4}>
              <StatisticCard {...statistic} />
            </Grid>
          ))}
        </Grid>
      </Section>
    </Box>
  );
}
