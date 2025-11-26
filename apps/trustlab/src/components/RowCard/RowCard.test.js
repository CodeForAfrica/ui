import { createRender } from "@commons-ui/testing-library";
import { screen } from "@testing-library/react";
import React from "react";

import RowCard from "./RowCard";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const richTextMock = {
  root: {
    children: [
      {
        type: "paragraph",
        version: 1,
        indent: 0,
        format: "",
        direction: "ltr",
        textFormat: 0,
        textStyle: "",
        children: [
          {
            type: "text",
            version: 1,
            text: "Sample description content for RowCard.",
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
          },
        ],
      },
    ],
    type: "root",
    version: 1,
    indent: 0,
    format: "",
    direction: "ltr",
  },
};

describe("<RowCard />", () => {
  it("renders title and image", () => {
    render(
      <RowCard
        title="Anti-spyware helpline"
        image={{
          src: "https://picsum.photos/seed/rowcard/400/300",
          alt: "Helpline",
        }}
      />,
    );
    expect(screen.getByText("Anti-spyware helpline")).toBeInTheDocument();
    expect(screen.getByAltText("Helpline")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<RowCard title="Card" description={richTextMock} />);
    expect(screen.getByText(/Sample description content/)).toBeInTheDocument();
  });

  it("renders action button when link provided", () => {
    render(
      <RowCard
        title="Support"
        link={{ href: "/support", label: "Request Support" }}
        description={richTextMock}
      />,
    );
    expect(
      screen.getByRole("button", { name: /Request Support/i }),
    ).toBeInTheDocument();
  });

  it("button text defaults to link label when actionLabel not set", () => {
    render(
      <RowCard
        title="Default"
        link={{ href: "/default", label: "Learn More" }}
        description={richTextMock}
      />,
    );
    expect(
      screen.getByRole("button", { name: /Learn More/i }),
    ).toBeInTheDocument();
  });

  it("respects custom actionLabel override", () => {
    render(
      <RowCard
        title="Override"
        link={{ href: "/override", label: "Ignored" }}
        actionLabel="Custom Label"
        description={richTextMock}
      />,
    );
    expect(
      screen.getByRole("button", { name: /Custom Label/i }),
    ).toBeInTheDocument();
  });

  it("omits button when no link", () => {
    render(<RowCard title="No Link" description={richTextMock} />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("clicking card triggers navigation when link exists (href attribute present)", async () => {
    render(
      <RowCard
        title="Navigate"
        link={{ href: "/navigate", label: "Go" }}
        description={richTextMock}
      />,
    );
    const card = screen.getByText("Navigate").closest("a");
    expect(card).toHaveAttribute("href", "/navigate");
  });
});
