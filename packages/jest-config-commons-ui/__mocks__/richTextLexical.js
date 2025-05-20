import React from "react";

export function RichText({ data }) {
  return (
    <div data-testid="mock-richtext">
      Mocked RichText
      <div data-elements={JSON.stringify(data)} />
    </div>
  );
}

export default undefined;
