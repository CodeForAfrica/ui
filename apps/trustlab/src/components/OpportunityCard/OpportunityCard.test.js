import { createRender } from "@commons-ui/testing-library";
import { fireEvent } from "@testing-library/react";

import OpportunityCard from "./OpportunityCard";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const mockDescription = {
  root: {
    children: [
      {
        text: "This is a test description for the opportunity card.",
        type: "text",
      },
    ],
  },
};

const defaultProps = {
  title: "Test Opportunity",
  description: mockDescription,
  image: {
    src: "https://example.com/image.jpg",
    alt: "Test image",
  },
  link: {
    href: "/test-link",
  },
  caption: "Test Caption",
  location: "Nairobi, Kenya",
  date: "15-01-2024",
};

describe("<OpportunityCard />", () => {
  it("renders without crashing", () => {
    const { getByText, container } = render(
      <OpportunityCard {...defaultProps} />,
    );
    expect(getByText("Test Opportunity")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders title correctly", () => {
    const { getByText } = render(<OpportunityCard {...defaultProps} />);
    expect(getByText("Test Opportunity")).toBeInTheDocument();
  });

  it("renders caption when provided", () => {
    const { getByText } = render(<OpportunityCard {...defaultProps} />);
    expect(getByText("Test Caption")).toBeInTheDocument();
  });

  it("renders only location when date is not provided", () => {
    const { getByText } = render(
      <OpportunityCard {...defaultProps} date={undefined} />,
    );
    expect(getByText("Nairobi, Kenya")).toBeInTheDocument();
  });

  it("renders only date when location is not provided", () => {
    const { getByText } = render(
      <OpportunityCard {...defaultProps} location={undefined} />,
    );
    expect(getByText("15-01-2024")).toBeInTheDocument();
  });

  it("does not render location/date text when both are missing", () => {
    const { queryByText } = render(
      <OpportunityCard
        {...defaultProps}
        location={undefined}
        date={undefined}
      />,
    );
    expect(queryByText("|")).not.toBeInTheDocument();
  });

  it("renders image when provided", () => {
    const { getByAltText } = render(<OpportunityCard {...defaultProps} />);
    expect(getByAltText("Test image")).toBeInTheDocument();
  });

  it("uses title as alt text when image alt is not provided", () => {
    const propsWithoutAlt = {
      ...defaultProps,
      image: { src: "https://example.com/image.jpg" },
    };
    const { getByAltText } = render(<OpportunityCard {...propsWithoutAlt} />);
    expect(getByAltText("Test Opportunity")).toBeInTheDocument();
  });

  it("does not render image when not provided", () => {
    const { queryByRole } = render(
      <OpportunityCard {...defaultProps} image={undefined} />,
    );
    expect(queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders as a link when href is provided", () => {
    const { container } = render(<OpportunityCard {...defaultProps} />);
    const link = container.querySelector('a[href="/test-link"]');
    expect(link).toBeInTheDocument();
  });

  it("renders as div when link href is not provided", () => {
    const { container } = render(
      <OpportunityCard {...defaultProps} link={undefined} />,
    );
    const link = container.querySelector("a");
    expect(link).not.toBeInTheDocument();
  });

  it("renders view more label", () => {
    const { getByText } = render(<OpportunityCard {...defaultProps} />);
    expect(getByText("View more")).toBeInTheDocument();
  });

  it("renders custom view more label", () => {
    const { getByText } = render(
      <OpportunityCard {...defaultProps} viewMoreLabel="Read more" />,
    );
    expect(getByText("Read more")).toBeInTheDocument();
  });

  it("renders view less label when expanded", () => {
    const { getByText } = render(<OpportunityCard {...defaultProps} />);
    const viewMoreButton = getByText("View more");
    fireEvent.click(viewMoreButton);
    expect(getByText("View less")).toBeInTheDocument();
  });

  it("toggles between expanded and collapsed state", () => {
    const { getByText } = render(<OpportunityCard {...defaultProps} />);
    const viewMoreButton = getByText("View more");

    fireEvent.click(viewMoreButton);
    expect(getByText("View less")).toBeInTheDocument();

    fireEvent.click(getByText("View less"));
    expect(getByText("View more")).toBeInTheDocument();
  });

  it("renders custom view less label", () => {
    const { getByText } = render(
      <OpportunityCard
        {...defaultProps}
        viewMoreLabel="Read more"
        viewLessLabel="Read less"
      />,
    );
    const viewMoreButton = getByText("Read more");
    fireEvent.click(viewMoreButton);
    expect(getByText("Read less")).toBeInTheDocument();
  });

  it("does not render description section when description is not provided", () => {
    const { queryByText } = render(
      <OpportunityCard {...defaultProps} description={undefined} />,
    );
    expect(queryByText("View more")).not.toBeInTheDocument();
  });
});
