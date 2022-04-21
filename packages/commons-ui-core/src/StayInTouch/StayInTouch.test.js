import { render, screen } from "@testing-library/react";
import React from "react";
import github from "../../public/github.png";
import instagram from "../../public/instagram.png";
import facebook from "../../public/facebook.png";
import twitter from "../../public/twitter.png";
import slack from "../../public/slack.png";
import linkedin from "../../public/linkedin.png";

import StayInTouch from ".";

describe("Stay In Touch", () => {
  it("renders unchanged", () => {
    const { container } = render(<StayInTouch />);
    expect(container).toMatchSnapshot();
  });

  it("renders title", () => {
    const socialMedia = [
      {
        url: "https://twitter.com/Code4Africa",
        image: { alt: "Twitter", url: twitter },
      },
      {
        url: "https://ke.linkedin.com/company/code-for-africa",
        image: { alt: "Slack", url: slack },
      },
      {
        url: "https://ke.linkedin.com/company/code-for-africa",
        image: { alt: "LinkedIn", url: linkedin },
      },
      {
        url: "https://www.facebook.com/CodeForAfrica/",
        image: { alt: "Facebook", url: facebook },
      },
      {
        url: "https://www.instagram.com/code4africa__/",
        image: { alt: "Instagram", url: instagram },
      },
      {
        url: "https://github.com/CodeForAfrica",
        image: { alt: "Github", url: github },
      },
    ];
    render(<StayInTouch title="stay in touch" socialMedia={socialMedia} />);
    const title = screen.getByText(/stay in touch/i);
    expect(title).toBeInTheDocument();
  });
});
