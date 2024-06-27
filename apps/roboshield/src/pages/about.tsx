import { getPageServerSideProps } from "@/roboshield/lib/data";
import RichText from "@/roboshield/components/RichText";
import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import Statistics from "@/roboshield/components/Statistics";

interface ContentType {
  title: string;
  content: Array<{
    type: string;
    children: Array<{
      text: string;
    }>;
  }>;
  statistics: Array<{
    name: string;
    value: string;
    label: string;
    icon: string;
    description: Array<{
      type: string;
      children: Array<{
        text: string;
      }>;
    }>;
  }>;
}

export default function About({ title, content, statistics }: ContentType) {
  return (
    <>
      <Section
        component="section"
        variant="body3"
        sx={{
          px: { xs: 2.5, sm: 0 },
          my: 10,
        }}
      >
        <RichTypography variant="h4" sx={{ mb: "30px" }}>
          {title}
        </RichTypography>
        <RichText
          elements={content}
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
      <Statistics title="Statistics" statistics={statistics} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { props } = await getPageServerSideProps(context);
  return {
    props: {
      ...props,
      title: "About Page",
      content: [
        {
          type: "h2",
          children: [
            {
              text: "Overview",
            },
          ],
        },
        {
          children: [
            {
              text: "As AI bots become more prevalent, it is crucial for websites to protect their data from unauthorised scraping and crawling by AI bots, which use the scraped data to train their models.",
            },
          ],
        },
        {
          children: [
            {
              text: "We recently analysed a broad range of popular websites across Africa to assess their measures against AI bot activities. The results were alarming, highlighting a significant gap in the security practices of these websites.",
            },
          ],
        },
        {
          type: "h3",
          children: [
            {
              text: "Robots.txt File",
            },
          ],
        },
        {
          children: [
            {
              text: "The robots.txt file is a critical component in guiding search engine bots on which pages to index and which to ignore. Surprisingly, only 45.5% of the websites had implemented a robots.txt file. This leaves more than half of the websites without a fundamental line of defence against unwanted bot activities.",
            },
          ],
        },
        {
          type: "h3",
          children: [
            {
              text: "Blocking AI Bots",
            },
          ],
        },
        {
          children: [
            {
              text: "Only 4.3% of the websites were blocking AI bots. This means 95.7% of websites are potentially vulnerable to unauthorised scraping and crawling by AI bots.",
            },
          ],
        },
        {
          type: "h3",
          children: [
            {
              text: "Aim of Study",
            },
          ],
        },
        {
          children: [
            {
              text: "The principal aim of this study was to determine how frequently African media houses and other top websites were implementing policies to block artificial intelligence (AI) crawlers. Large language models (LLMs) rely on vast amounts of data for training and improvement, often gathered through methodical trawling of web content using crawlers. However, some websites aim to limit how their content is used to train LLMs by blocking these web crawlers.",
            },
          ],
        },
        {
          type: "h3",
          children: [
            {
              text: "Technique Used",
            },
          ],
        },
        {
          children: [
            {
              text: "We examined the robots.txt files of the websites to determine if they were blocking AI bots. The robots.txt file specifies which pages search engine bots can crawl and which they cannot. We checked these files for common AI bot user agents to see if they were being ",
            },
          ],
        },
        {
          children: [
            {
              text: "\n\n",
            },
          ],
        },
      ],
      statistics: [
        {
          name: "botsTracked",
          value: "30+",
          label: "Bots Tracked",
          icon: "/images/Type=layout,%20Size=32,%20Color=1020E1.svg",
          description: [
            {
              type: "p",
              children: [
                {
                  text: "We tracked more than 40 unique AI bots across all websites scanned.",
                },
              ],
            },
          ],
        },
        {
          name: "websitesScanned",
          value: "4000+",
          label: "Websites Scanned",
          icon: "/images/Type=layout,%20Size=32,%20Color=1020E1.svg",
          description: [
            {
              type: "p",
              children: [
                {
                  text: "We scanned 4626 websites across Africa.",
                },
              ],
            },
          ],
        },
        {
          name: "websitesBlocking",
          value: "203",
          label: "Websites Blocking AI Bots",
          icon: "/images/Type=layout,%20Size=32,%20Color=1020E1.svg",
          description: [
            {
              type: "p",
              children: [
                {
                  text: "Only 203 websites were blocking AI bots.",
                },
              ],
            },
          ],
        },
        {
          name: "websitesWithRobots",
          value: "2106",
          label: "Websites With Robots.txt File",
          icon: "/images/Type=layout,%20Size=32,%20Color=1020E1.svg",
          description: [
            {
              type: "p",
              children: [
                {
                  text: "Only 2106 websites had a robots.txt file.",
                },
              ],
            },
          ],
        },
      ],
    },
  };
}
