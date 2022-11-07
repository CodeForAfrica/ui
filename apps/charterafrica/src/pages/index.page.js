import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";

import Partners from "@/charterafrica/components/Partners";

function Index({ blocks, locale, locales, title }) {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const handleClick = (l) => () => {
    router.push({ pathname, query }, asPath, { locale: l });
  };

  return (
    <>
      <Section sx={{ px: { xs: 5, sm: 0 } }}>
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
      </Section>
      {blocks?.map((block) => {
        switch (block.slug) {
          case "partners":
            return <Partners {...block} />;
          default:
            return null;
        }
      })}
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
      blocks: [
        {
          slug: "partners",
          title: "Partners",
          consortium: {
            description:
              "A consortium of African and European organisations is supporting the implementation of the Fund. Each organisation brings in specific expertise to the initiative, ranging from grassroots digital activism, to civic technology development and data science, policy analysis and democracy support. The consortium can ensure a presence across the African continent and leverage existing networks and partnerships.",
            partners: [
              {
                name: "Code for Africa",
                logo: {
                  src: "/images/codeforafrica.jpg",
                },
                link: {
                  href: "https://codeforafrica.org",
                },
              },
              {
                name: "Africtivistes",
                logo: {
                  src: "/images/africtivistes.jpg",
                },
                link: {
                  href: "https://www.africtivistes.com",
                },
              },
              {
                name: "Democracy Works Foundation",
                logo: {
                  src: "/images/dwf.jpg",
                },
                link: {
                  href: "https://www.democracyworks.org.za",
                },
              },
              {
                name: "Goree Institute",
                logo: {
                  src: "/images/goree.jpg",
                },
                link: {
                  href: "https://goreeinstitut.org/",
                },
              },
              {
                name: "ECDPM",
                logo: {
                  src: "/images/ecdpm.jpg",
                },
                link: {
                  href: "https://ecdpm.org",
                },
              },
              {
                name: "EPD",
                logo: {
                  src: "/images/epd.jpg",
                },
                link: {
                  href: "https://epd.eu",
                },
              },
            ],
          },
          project: {
            description:
              "The Fund was first conceived in the context of the Charter Project Africa, a pan-African project focused on the commitments contained in the African Charter for Democracy, Elections and Governance (ACDEG). The project, implemented by the six organisations mentioned above, promotes the usage of civic technology to amplify citizen voices. It is co-funded by the European Union.",
            partners: [
              {
                name: "The Charter Project Africa",
                logo: {
                  src: "/images/the-charter-project-africa_brandguide_guidedemarque-2-2.jpg",
                },
                link: {
                  href: "https://codeforafrica.org",
                },
              },
              {
                name: "The European Union",
                logo: {
                  src: "/images/eu.png",
                },
                link: {
                  href: "https://europa.eu",
                },
              },
            ],
          },
          fund: {
            description:
              "The Fund further integrates the African Union Civic Tech Fund, hosted by the African Union. Both the Charter Project Africa and the African Union Civic Tech Fund share common goals and, in particular, both emphasise the use of civic technology to improve inclusive public decision-making and strengthen democratic governance throughout Africa. The African Union Civic Tech Fund is financially supported by the Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ), and managed by the European Partnership for Democracy.",
            partners: [
              {
                name: "African Union Civic Tech Fund",
                logo: {
                  src: "/images/african-union-civic-tech-fund.jpg",
                },
                link: {
                  href: "https://civictechfund.africa/auctf/",
                },
              },
              {
                name: "African Union",
                logo: {
                  src: "/images/african-union.jpg",
                },
                link: {
                  href: "https://au.int",
                },
              },
              {
                name: "GIZ",
                logo: {
                  src: "/images/giz.jpg",
                },
                link: {
                  href: "https://www.giz.de",
                },
              },
            ],
          },
        },
      ],
      footer: {
        contact: {
          email: {
            href: "mailto:info@charter.africa",
            content: "info@charter.africa",
          },
        },
        copyright: "© 2022 European Partnership for Democracy (CC BY-NC 2.0)",
        links: [
          {
            href: "/",
            content: "Privacy Policy",
          },
          {
            href: "/",
            content: "Imprint",
          },
        ],
        logo: {
          src: "/images/eu.png",
        },
        projectDescription: "Website designed and built by Code for Africa",
        siteDescription:
          "This website was created and maintained with the financial support of the European Union. Its contents are the sole responsibility of the European Partnership for Democracy, Africtivistes, Code for Africa, ECPDM, and Goree Institute and do not necessarily reflect the views of the European Union.",
      },
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
