import { createRender } from "@commons-ui/testing-library";
import { fireEvent } from "@testing-library/react";
import React from "react";

import ImageLightbox from "./ImageLightbox";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const mockImages = [
  {
    id: "1",
    url: "https://example.com/image1.jpg",
    alt: "Image 1",
    height: 600,
    width: 800,
  },
  {
    id: "2",
    url: "https://example.com/image2.jpg",
    alt: "Image 2",
    height: 600,
    width: 800,
  },
  {
    id: "3",
    url: "https://example.com/image3.jpg",
    alt: "Image 3",
    height: 600,
    width: 800,
  },
];

describe("ImageLightbox", () => {
  it("renders nothing when closed", () => {
    const { queryByRole, container } = render(
      <ImageLightbox
        open={false}
        images={mockImages}
        currentIndex={0}
        onClose={jest.fn()}
      />,
    );
    expect(queryByRole("presentation")).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders modal when open", () => {
    const { getByRole } = render(
      <ImageLightbox
        open
        images={mockImages}
        currentIndex={0}
        onClose={jest.fn()}
      />,
    );
    expect(getByRole("presentation")).toBeInTheDocument();
  });

  it("renders current image", () => {
    const { getByAltText } = render(
      <ImageLightbox
        open
        images={mockImages}
        currentIndex={0}
        onClose={jest.fn()}
      />,
    );
    expect(getByAltText("Image 1")).toBeInTheDocument();
  });

  it("renders next button when not on last image", () => {
    const { getByLabelText } = render(
      <ImageLightbox
        open
        images={mockImages}
        currentIndex={0}
        onClose={jest.fn()}
        onNext={jest.fn()}
      />,
    );
    expect(getByLabelText("Next image")).toBeInTheDocument();
  });

  it("does not render next button on last image", () => {
    const { queryByLabelText } = render(
      <ImageLightbox
        open
        images={mockImages}
        currentIndex={2}
        onClose={jest.fn()}
        onNext={jest.fn()}
      />,
    );
    expect(queryByLabelText("Next image")).not.toBeInTheDocument();
  });

  it("renders previous button when not on first image", () => {
    const { getByLabelText } = render(
      <ImageLightbox
        open
        images={mockImages}
        currentIndex={1}
        onClose={jest.fn()}
        onPrevious={jest.fn()}
      />,
    );
    expect(getByLabelText("Previous image")).toBeInTheDocument();
  });

  it("does not render previous button on first image", () => {
    const { queryByLabelText } = render(
      <ImageLightbox
        open
        images={mockImages}
        currentIndex={0}
        onClose={jest.fn()}
        onPrevious={jest.fn()}
      />,
    );
    expect(queryByLabelText("Previous image")).not.toBeInTheDocument();
  });

  it("calls onNext when next button is clicked", () => {
    const onNext = jest.fn();
    const { getByLabelText } = render(
      <ImageLightbox
        open
        images={mockImages}
        currentIndex={0}
        onClose={jest.fn()}
        onNext={onNext}
      />,
    );
    fireEvent.click(getByLabelText("Next image"));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("calls onPrevious when previous button is clicked", () => {
    const onPrevious = jest.fn();
    const { getByLabelText } = render(
      <ImageLightbox
        open
        images={mockImages}
        currentIndex={1}
        onClose={jest.fn()}
        onPrevious={onPrevious}
      />,
    );
    fireEvent.click(getByLabelText("Previous image"));
    expect(onPrevious).toHaveBeenCalledTimes(1);
  });

  it("renders image counter when multiple images", () => {
    const { getByText } = render(
      <ImageLightbox
        open
        images={mockImages}
        currentIndex={0}
        onClose={jest.fn()}
      />,
    );
    expect(getByText("1 / 3")).toBeInTheDocument();
  });

  it("does not render image counter for single image", () => {
    const { queryByText } = render(
      <ImageLightbox
        open
        images={[mockImages[0]]}
        currentIndex={0}
        onClose={jest.fn()}
      />,
    );
    expect(queryByText("1 / 1")).not.toBeInTheDocument();
  });

  it("handles keyboard navigation - Escape closes modal", () => {
    const onClose = jest.fn();
    render(
      <ImageLightbox
        open
        images={mockImages}
        currentIndex={1}
        onClose={onClose}
        onPrevious={jest.fn()}
        onNext={jest.fn()}
      />,
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("handles keyboard navigation - ArrowRight calls onNext", () => {
    const onNext = jest.fn();
    render(
      <ImageLightbox
        open
        images={mockImages}
        currentIndex={0}
        onClose={jest.fn()}
        onNext={onNext}
      />,
    );
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("handles keyboard navigation - ArrowLeft calls onPrevious", () => {
    const onPrevious = jest.fn();
    render(
      <ImageLightbox
        open
        images={mockImages}
        currentIndex={1}
        onClose={jest.fn()}
        onPrevious={onPrevious}
      />,
    );
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(onPrevious).toHaveBeenCalledTimes(1);
  });

  it("does not call onPrevious on ArrowLeft when on first image", () => {
    const onPrevious = jest.fn();
    render(
      <ImageLightbox
        open
        images={mockImages}
        currentIndex={0}
        onClose={jest.fn()}
        onPrevious={onPrevious}
      />,
    );
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(onPrevious).not.toHaveBeenCalled();
  });

  it("does not call onNext on ArrowRight when on last image", () => {
    const onNext = jest.fn();
    render(
      <ImageLightbox
        open
        images={mockImages}
        currentIndex={2}
        onClose={jest.fn()}
        onNext={onNext}
      />,
    );
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(onNext).not.toHaveBeenCalled();
  });

  it("renders nothing when no current image", () => {
    const { queryByRole } = render(
      <ImageLightbox open images={[]} currentIndex={0} onClose={jest.fn()} />,
    );
    expect(queryByRole("presentation")).not.toBeInTheDocument();
  });

  it("handles image with src instead of url", () => {
    const imagesWithSrc = [
      { id: "1", src: "https://example.com/image.jpg", alt: "Test image" },
    ];
    const { getByAltText } = render(
      <ImageLightbox
        open
        images={imagesWithSrc}
        currentIndex={0}
        onClose={jest.fn()}
      />,
    );
    expect(getByAltText("Test image")).toBeInTheDocument();
  });
});
