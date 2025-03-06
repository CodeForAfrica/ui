import { render } from "@commons-ui/testing-library";
import React from "react";

import Summary from ".";

const defaultProps = {
  title: "History",
  subtitle:
    "The ClimateMapped.AFRICA project by the CfA Datalab team is a data storytelling initiative designed to make 120 years of climate sampling data accessible to experts, journalists, concerned citizens, and researchers. This project chronicles Africa's climate history, using data storytelling techniques to present temperature trends and analysis at both national and sub-national levels",
  content: [
    {
      children: [
        {
          text: "The project was focused on helping journalists at Kenyan community-based radio stations adopt data-driven digital journalism tools and techniques to improve their evidence-driven analysis and multimedia reporting on development issues. The data portal was built to help them explore, visualise and interpret development data that impacted their own communities.",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "The initial project involved 14 community radio stations in eight Kenyan counties. The selected community radios are all an integral part of their local communities and broadcast not only in English and Kiswahili but also in various local languages (such as Kitaita, Borana, Samburu and Meru).",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "Their listeners are mainly marginalised groups in Kenyan society and the poor rural population. The ‘Our County: Our Responsibility’ project was a partnership between ",
          children: null,
        },
        {
          text: "Code for Africa",
          bold: true,
          children: null,
        },
        {
          text: ", ",
          children: null,
        },
        {
          text: "KCOMNET",
          bold: true,
          children: null,
        },
        {
          text: " and ",
          children: null,
        },
        {
          text: "CAMECO",
          bold: true,
          children: null,
        },
        {
          text: ", with support from the German Cooperation.",
          children: null,
        },
      ],
    },
  ],
};

describe("<Summary />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Summary {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
