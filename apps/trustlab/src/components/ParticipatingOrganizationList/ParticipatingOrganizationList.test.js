import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ParticipatingOrganizationList from "./ParticipatingOrganizationList";

import theme from "@/trustlab/theme";

// Mock the external link icon
jest.mock("@/trustlab/assets/icons/external-link.svg", () => {
  return function MockExternalLinkIcon(props) {
    return <svg data-testid="external-link-icon" {...props} />;
  };
});

const render = createRender({ theme });

const mockOrganizations = [
  {
    id: "1",
    name: "Lamu Arts & Theatre Alliance",
    link: { href: "https://example.com/lamu" },
  },
  {
    id: "2",
    name: "Turathi ya Lamu Women Group",
    link: { href: "https://example.com/turathi" },
  },
  { id: "3", name: "Kikozi Programme Group" },
  { id: "4", name: "Lamu Youth Alliance" },
];

describe("ParticipatingOrganizationList", () => {
  it("renders nothing when no organizations provided", () => {
    const { container } = render(
      <ParticipatingOrganizationList organizations={[]} />,
    );
    expect(container.firstChild).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it("renders title when provided", () => {
    const { getByText } = render(
      <ParticipatingOrganizationList
        title="Participating Organizations"
        organizations={mockOrganizations}
      />,
    );
    expect(getByText("Participating Organizations")).toBeInTheDocument();
  });

  it("renders all organization names", () => {
    const { getByText } = render(
      <ParticipatingOrganizationList organizations={mockOrganizations} />,
    );
    expect(getByText("Lamu Arts & Theatre Alliance")).toBeInTheDocument();
    expect(getByText("Turathi ya Lamu Women Group")).toBeInTheDocument();
    expect(getByText("Kikozi Programme Group")).toBeInTheDocument();
    expect(getByText("Lamu Youth Alliance")).toBeInTheDocument();
  });

  it("renders external link icon only for organizations with link.href", () => {
    const { getAllByTestId } = render(
      <ParticipatingOrganizationList organizations={mockOrganizations} />,
    );
    const icons = getAllByTestId("external-link-icon");
    expect(icons).toHaveLength(2);
  });

  it("renders chips as links for organizations with href", () => {
    const { getByText } = render(
      <ParticipatingOrganizationList organizations={mockOrganizations} />,
    );
    const lamuChip = getByText("Lamu Arts & Theatre Alliance").closest("a");
    expect(lamuChip).toHaveAttribute("href", "https://example.com/lamu");
  });
});
