import { createRender } from "@commons-ui/testing-library";
import React from "react";

import LongFormRichText from "./LongFormRichText";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  richTextBlockFields: {
    content: [
      {
        children: [
          {
            text: "We process and manage your personal data in compliance with the European Union’s General Data Protection Regulation (GDPR). The following information provides an overview of how we process and manage your personal data as well as of your rights as a visitor and user of this site.\nWho is responsible and who may you contact?\nThe responsible party is:\nEuropean Partnership for Democracy (EPD)\nRue Froissart 123-133\n1040 Brussels, Belgium\n\nYou may contact privacy@epd.eu to reach out to our external data protection officer.\nWhat personal data do we collect and why do we collect it?\nWe only store data when this is necessary for our objectives and when we have a legal basis for storing and processing the data. Below, you can read what type of data we collect via which channel and what we use it for.\nApplications\nWe will store personal information that will be included by applicants in their applications. This may include names, positions and email addresses as well as other information related to the legal entity that the applications will be received from. Both parties, i.e. the applicants and EPD, have a legitimate interest in this data processing and we thus rely on this legal basis for storing such information.\nNewsletter\nWhen you sign up to our newsletter, you are asked to opt in, and provide your name and email address. This is necessary for us in order to send you our updates. We use the MailChimp system to send the newsletter to our subscribers and analyse click and open rates. This is necessary to understand our readers’ interests and thereby improve the content of the newsletter.\n\nIn this relationship, EPD is the “Data Controller” and MailChimp the “Data Processor,” in GDPR terminology. To find out more about how MailChimp manages your data, visit https://mailchimp.com/legal/privacy/.\n\nYou can unsubscribe from the newsletter at any point without having to give a reason why.\nWebsite analytics\nWhen you use our website, your personal data is shared with a third-party company based outside the EU called Google Analytics (owned by Google LLC), whose software we use to track and analyse how people use and interact with our website. Any data collected is stored on secure servers by EPD and Google.Quando você usa o nosso site, os seus dados pessoais são compartilhados com uma empresa terceirizada, com sede fora da UE, chamada Google Analytics ( propriedade do Google LLC), cujo software usamos para rastrear e analisar como as pessoas usam e interagem com o nosso site. Todos os dados colectados são armazenados em servidores seguros pela EPD e Google.\n\nGoogle Analytics is compliant with the EU-US Privacy Shield Framework, which means they are certified to receive data from EPD. In this relationship, EPD is deemed the ‘Data Controller’ and Google Analytics the ‘Data Processor’. To find out more about how Google manages data, visit www.google.com/privacy.\n\nPlease see our cookies policy below for more information on which data Google Analytics collects.\nHow do we keep your data safe?\nWe store your data securely in our password protected server. These are accessible only to EPD staff. We regularly check our contacts database to ensure all information is accurate and necessary.\nCookies policy\nA “cookie” is a small file sent out by the servers of Google Analytics and WordPress and installed on the hard disk of your computer. The information stored on these cookies can only be read by us and only during the duration of the visit to the Website.\nTracking cookies from Google Analytics are used to determine the surfing behaviour of visitors.\nYou can refuse or block cookies by changing the configuration parameters of your navigation system.\nYour rights.\nRight of access and inspection:\nYou have the right – at any time, free of charge – to access your personal data and information on how we use it.\nRight of correction, deletion and restriction:\nYou always have the right to ask us to correct, supplement or delete your personal data. You may also ask to restrict the processing of your personal data. You acknowledge that we cannot send you the newsletter anymore without your email address, if you were to send us a request to delete your personal data.\nRight of objection:\nYou have a right of objection to the processing of your personal data for serious and legitimate reasons.\nRight of free data transfer:\nYou have the right to obtain your Personal Data that are processed by us in a structured, commonly used and machine-readable form and/or to transfer them to other controllers.\nRight to withdraw consent:\nIn so far as the processing is based on your prior consent, you have the right to withdraw this consent.",
            children: null,
          },
        ],
      },
    ],
  },
  id: "63ff27b28f84b7853796696b",
  slug: "richText",
};

describe("<LongFormRichText />", () => {
  it("renders unchanged", () => {
    const { container } = render(<LongFormRichText {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
