import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ParticipatingOrganizationList from "./ParticipatingOrganizationList";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const mockOrganizations = [
  {
    id: "1",
    name: "International Centre for Investigative Reporting",
    description:
      "The ICIR is Nigeria's foremost investigative journalism organisation, producing high-impact accountability reporting on governance, corruption, and human rights.",
    image: {
      src: "https://picsum.photos/seed/org1/80/80",
      alt: "ICIR Logo",
    },
    link: {
      href: "https://example.com/icir",
    },
    buttonLabel: "Learn More",
  },
  {
    id: "2",
    name: "Stears Media",
    description:
      "Stears Media is a Lagos-based data journalism and business intelligence platform providing rigorous, data-driven coverage of African economies and markets.",
    image: {
      src: "https://picsum.photos/seed/org2/80/80",
      alt: "Stears Logo",
    },
    link: {
      href: "https://example.com/stears",
    },
    buttonLabel: "Learn More",
  },
];

describe("ParticipatingOrganizationList", () => {
  it("renders nothing when no organizations provided", () => {
    const { container } = render(
      <ParticipatingOrganizationList organizations={[]} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders all organizations in chip variant", () => {
    const { getByText } = render(
      <ParticipatingOrganizationList
        title="Participants"
        organizations={mockOrganizations}
      />,
    );
    expect(
      getByText("International Centre for Investigative Reporting"),
    ).toBeInTheDocument();
    expect(getByText("Stears Media")).toBeInTheDocument();
  });

  it("renders all organizations in card variant", () => {
    const { getByText } = render(
      <ParticipatingOrganizationList
        variant="card"
        title="Participants"
        organizations={mockOrganizations}
      />,
    );
    expect(
      getByText("International Centre for Investigative Reporting"),
    ).toBeInTheDocument();
    expect(getByText("Stears Media")).toBeInTheDocument();
  });

  it("renders with subtitle in card variant", () => {
    const { getByText } = render(
      <ParticipatingOrganizationList
        variant="card"
        title="Participants"
        subtitle="5 organizations completed TrustLab Incubator Cohort 2"
        organizations={mockOrganizations}
      />,
    );
    expect(
      getByText("5 organizations completed TrustLab Incubator Cohort 2"),
    ).toBeInTheDocument();
  });
});
