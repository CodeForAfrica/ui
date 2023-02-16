import React from "react";

import Error from "@/charterafrica/components/Error";

const ErrorPage = React.forwardRef(function NotFoundPage(props, ref) {
  const { blocks } = props;

  return blocks?.map((block) => {
    switch (block?.slug) {
      case "error":
        return <Error key={block.slug} {...block} ref={ref} />;
      default:
        return null;
    }
  });
});

export default ErrorPage;
