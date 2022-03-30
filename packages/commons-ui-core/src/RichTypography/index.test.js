import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import RichTypography from ".";

describe("RichTypography", () => {
  it("renders a richtypography", () => {
    render(<RichTypography />);
  });
  it("Should return richtypography component with test", () => {
    const { getByText } = render(
      <RichTypography>this is an example</RichTypography>
    );
    expect(getByText(`this is an example`)).toBeInTheDocument();
  });
});
