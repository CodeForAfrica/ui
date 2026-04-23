import {
  act,
  createRender,
  fireEvent,
  screen,
} from "@commons-ui/testing-library";
import React from "react";

import HelplineCard from "./HelplineCard";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

describe("<HelplineCard /> embed flow", () => {
  let intersectionObserverCallback;
  let originalIntersectionObserver;
  let originalRequestIdleCallback;
  let originalCancelIdleCallback;

  beforeEach(() => {
    intersectionObserverCallback = null;
    originalIntersectionObserver = window.IntersectionObserver;
    originalRequestIdleCallback = window.requestIdleCallback;
    originalCancelIdleCallback = window.cancelIdleCallback;

    window.requestIdleCallback = jest.fn((callback) => {
      callback();
      return 1;
    });
    window.cancelIdleCallback = jest.fn();
    window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      intersectionObserverCallback = callback;
      return {
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
      };
    });
  });

  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
    window.requestIdleCallback = originalRequestIdleCallback;
    window.cancelIdleCallback = originalCancelIdleCallback;
  });

  it("preloads the iframe before open and keeps it mounted after close", () => {
    render(
      <HelplineCard
        description={{
          root: {
            children: [],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        }}
        embedButtonLabel="Get support"
        embedCloseLabel="Close"
        embedTitle="Support form"
        embedUrl="https://airtable.com/embed/appTest"
        icon={{ alt: "Support", url: "/support.png" }}
        title="Rapid Response Helpline"
      />,
    );

    expect(screen.queryByTitle("Support form")).not.toBeInTheDocument();

    act(() => {
      intersectionObserverCallback?.([{ isIntersecting: true }]);
    });

    expect(window.requestIdleCallback).toHaveBeenCalled();
    expect(screen.getByTitle("Support form")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Get support" }));
    expect(
      screen.getByRole("heading", { name: "Rapid Response Helpline" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.getByTitle("Support form")).toBeInTheDocument();
  });
});
