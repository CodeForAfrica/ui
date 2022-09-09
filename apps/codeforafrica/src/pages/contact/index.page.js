import React from "react";

import ContactForm from "@/codeforafrica/components/ContactForm";
import JoinOurSlack from "@/codeforafrica/components/JoinOurSlack";
import OfficeAddresses from "@/codeforafrica/components/OfficeAddresses";
import Page from "@/codeforafrica/components/Page";
import PageHeader from "@/codeforafrica/components/PageHeader";
import { getPageStaticProps } from "@/codeforafrica/lib";

function ContactPage({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) => {
        switch (section.slug) {
          case "contact-form": {
            return (
              <ContactForm
                {...section}
                sx={{ maxWidth: { md: "904px" }, my: { xs: 2.5, md: 10 } }}
                key={section.slug}
              />
            );
          }
          case "hero":
            return <PageHeader {...section} key={section.slug} />;
          case "join-our-slack": {
            return (
              <JoinOurSlack
                {...section}
                sx={{ maxWidth: { md: "904px" } }}
                key={section.slug}
              />
            );
          }
          case "our-offices": {
            return (
              <OfficeAddresses
                {...section}
                sx={{ mt: { xs: 2.5, md: 10 } }}
                key={section.slug}
              />
            );
          }
          default:
            return null;
        }
      })}
    </Page>
  );
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/contact" });
}

export default ContactPage;
