import { createRender } from "@commons-ui/testing-library";
import React from "react";

import GuidingPrinciples from "./GuidingPrinciples";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Guiding Principles",
  items: [
    {
      summary: {
        title: "Open Source",
      },
      details: [
        {
          children: [
            {
              text: "Lorem ipsum dolor sit amet consectetur adipiscing elit, faucibus penatibus congue vestibulum libero in neque dignissim, netus mus orci eu molestie per gravida, vel placerat maecenas dictumst nec etiam. Libero proin sagittis curae volutpat integer mattis magnis sociis, molestie curabitur montes per lectus sociosqu natoque facilisi, vestibulum convallis cursus nascetur eget vivamus nam. Augue placerat cubilia blandit integer nulla tempor magna, pretium sem magnis netus ullamcorper luctus eget egestas, curae fermentum rhoncus vitae odio sociis.\nHimenaeos est aenean ut torquent curabitur curae fames mus, condimentum accumsan ornare fermentum varius praesent sapien imperdiet, natoque morbi nullam mauris suspendisse nisi aptent. Vehicula malesuada litora libero himenaeos quisque vestibulum urna pretium ullamcorper dapibus, scelerisque phasellus commodo ligula est ut nascetur magna nisi ad ante, senectus sem nostra donec morbi placerat posuere pharetra pellentesque. ",
              children: null,
            },
          ],
        },
      ],
      id: "63f388c3ebe92a85650e8051",
    },
    {
      summary: {
        title: "Teamwork",
      },
      details: [
        {
          children: [
            {
              text: "Lorem ipsum dolor sit amet consectetur adipiscing elit, faucibus penatibus congue vestibulum libero in neque dignissim, netus mus orci eu molestie per gravida, vel placerat maecenas dictumst nec etiam. Libero proin sagittis curae volutpat integer mattis magnis sociis, molestie curabitur montes per lectus sociosqu natoque facilisi, vestibulum convallis cursus nascetur eget vivamus nam. Augue placerat cubilia blandit integer nulla tempor magna, pretium sem magnis netus ullamcorper luctus eget egestas, curae fermentum rhoncus vitae odio sociis.\nHimenaeos est aenean ut torquent curabitur curae fames mus, condimentum accumsan ornare fermentum varius praesent sapien imperdiet, natoque morbi nullam mauris suspendisse nisi aptent. Vehicula malesuada litora libero himenaeos quisque vestibulum urna pretium ullamcorper dapibus, scelerisque phasellus commodo ligula est ut nascetur magna nisi ad ante, senectus sem nostra donec morbi placerat posuere pharetra pellentesque. ",
              children: null,
            },
          ],
        },
      ],
      id: "63f388e0ebe92a85650e8052",
    },
    {
      summary: {
        title: "Accountability",
      },
      details: [
        {
          children: [
            {
              text: "Lorem ipsum dolor sit amet consectetur adipiscing elit, faucibus penatibus congue vestibulum libero in neque dignissim, netus mus orci eu molestie per gravida, vel placerat maecenas dictumst nec etiam. Libero proin sagittis curae volutpat integer mattis magnis sociis, molestie curabitur montes per lectus sociosqu natoque facilisi, vestibulum convallis cursus nascetur eget vivamus nam. Augue placerat cubilia blandit integer nulla tempor magna, pretium sem magnis netus ullamcorper luctus eget egestas, curae fermentum rhoncus vitae odio sociis.\nHimenaeos est aenean ut torquent curabitur curae fames mus, condimentum accumsan ornare fermentum varius praesent sapien imperdiet, natoque morbi nullam mauris suspendisse nisi aptent. Vehicula malesuada litora libero himenaeos quisque vestibulum urna pretium ullamcorper dapibus, scelerisque phasellus commodo ligula est ut nascetur magna nisi ad ante, senectus sem nostra donec morbi placerat posuere pharetra pellentesque. ",
              children: null,
            },
          ],
        },
      ],
      id: "63f388f9ebe92a85650e8053",
    },
    {
      summary: {
        title: "Impact",
      },
      details: [
        {
          children: [
            {
              text: "Lorem ipsum dolor sit amet consectetur adipiscing elit, faucibus penatibus congue vestibulum libero in neque dignissim, netus mus orci eu molestie per gravida, vel placerat maecenas dictumst nec etiam. Libero proin sagittis curae volutpat integer mattis magnis sociis, molestie curabitur montes per lectus sociosqu natoque facilisi, vestibulum convallis cursus nascetur eget vivamus nam. Augue placerat cubilia blandit integer nulla tempor magna, pretium sem magnis netus ullamcorper luctus eget egestas, curae fermentum rhoncus vitae odio sociis.\nHimenaeos est aenean ut torquent curabitur curae fames mus, condimentum accumsan ornare fermentum varius praesent sapien imperdiet, natoque morbi nullam mauris suspendisse nisi aptent. Vehicula malesuada litora libero himenaeos quisque vestibulum urna pretium ullamcorper dapibus, scelerisque phasellus commodo ligula est ut nascetur magna nisi ad ante, senectus sem nostra donec morbi placerat posuere pharetra pellentesque. ",
              children: null,
            },
          ],
        },
      ],
      id: "63f38902ebe92a85650e8054",
    },
  ],
  id: "63f388b3ebe92a85650e8050",
  slug: "guiding-principles",
};

describe("<GuidingPrinciples />", () => {
  it("renders unchanged", () => {
    const { container } = render(<GuidingPrinciples {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
