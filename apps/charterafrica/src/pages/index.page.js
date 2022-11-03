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
          <Typography variant="display1" component="h2">
            display1: {title}
          </Typography>
          <Typography variant="display2" component="h2">
            display2: {title}
          </Typography>
          <Typography variant="h1" component="h2">
            h1: {title}
          </Typography>
          <Typography variant="h2">h2: {title}</Typography>
          <Typography variant="h3" component="h2">
            h3: {title}
          </Typography>
          <Typography variant="h4" component="h2">
            h4: {title}
          </Typography>
          <Typography variant="h5" component="h2">
            h5: {title}
          </Typography>
          <Typography variant="h6" component="h2">
            h6: {title}
          </Typography>
          <Typography variant="subheading">subheading: {title}</Typography>
          <Typography variant="p1" component="p">
            p1: {title}
          </Typography>
          <Typography variant="p2" component="p">
            p2: {title}
          </Typography>
          <Typography variant="p3" component="p">
            p3: {title}
          </Typography>
          <Typography variant="caption" sx={{ display: "block" }}>
            caption: {title}
          </Typography>
          <Typography variant="footer" sx={{ display: "block" }}>
            footer: {title}
          </Typography>
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
