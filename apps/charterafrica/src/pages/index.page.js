import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";

function Index({ locale, locales, seo, title }) {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const handleClick = (l) => () => {
    router.push({ pathname, query }, asPath, { locale: l });
  };

  return (
    <>
      <NextSeo {...seo} />
      <main>
        <nav>
          <Box
            component="ul"
            sx={{
              display: "flex",
              listStyle: "none",
              padding: 0,
            }}
          >
            {locales.map((l) => (
              <Box
                component="li"
                sx={{
                  marginLeft: 1,
                  "&:first-of-type": {
                    marginLeft: 0,
                  },
                }}
                key={l}
              >
                <Button
                  size="small"
                  onClick={handleClick(l)}
                  disabled={l === locale}
                  sx={{ minWidth: 0, padding: 0 }}
                >
                  {l}
                </Button>
              </Box>
            ))}
          </Box>
        </nav>
        <header>
          <Typography variant="h1">{title}</Typography>
        </header>
      </main>
    </>
  );
}

const TITLES = {
  "en-GB": "Hello",
  fr: "Bonjour",
  pt: "Olá",
};

export async function getStaticProps({ defaultLocale, locale, locales }) {
  const title = TITLES[locale] ?? TITLES[defaultLocale];

  return {
    props: {
      locale,
      locales,
      seo: {
        title: "charter.AFRICA",
      },
      title,
    },
  };
}

export default Index;
