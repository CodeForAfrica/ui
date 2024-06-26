import { getPageServerSideProps } from "@/roboshield/lib/data";

export default function About() {
  return (
    <>
      <h1>About Page</h1>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { props } = await getPageServerSideProps(context);
  return {
    props: {
      ...props,
      footer: {
        logo: props?.footer?.logo,
        newsletter: props?.footer?.newsletter,
        description: `This site is an <a href="https://github.com/CodeForAfrica/ui/tree/main/apps/roboshield">open source code</a> built by <a href="https://codeforafrica.org">Code for Africa</a>, the continent's largest network of civic technology and data journalism labs. All content is released under a <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons 4 Attribution</a> License. Reuse it to help empower your own community.`,
        connect: props?.footer?.connect,
        partners: [
          {
            name: "DW Africa",
            url: "https://www.dw.com/africa",
            logo: {
              alt: "DW Africa",
              prefix: "media",
              filename: "dw-africa.png",
              sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
              url: "/images/DW.png",
              src: "/images/DW.png",
            },
          },
          {
            name: "Civic Signal",
            url: "https://civicsignal.africa/",
            logo: {
              alt: "Civic Signal",
              prefix: "media",
              filename: "civic-signal.png",
              sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
              url: "/images/civic-signal.png",
              src: "/images/civic-signal.png",
            },
          },
        ],
        project: `This project was inspired by a
                  <a href="https://reutersinstitute.politics.ox.ac.uk/how-many-news-websites-block-ai-crawlers" rel="noreferrer noopener" target="blank">survey conducted</a>
                  by the Reutures Instititue in the Minority World. The Audit data used
                  in this project was based on
                  <a href="https://civicsignal.africa" rel="noreferrer noopener" target="blank">CivicSignal</a>
                  MediaData database.
                  `,
      },
    },
  };
}
