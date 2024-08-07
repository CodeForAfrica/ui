import React from "react";

import CMSContent from "@/civicsignalblog/components/CMSContent";

const LongForm = React.forwardRef(function LongForm(props, ref) {
  const { content } = props;

  if (!content?.length) {
    return null;
  }
  return (
    <CMSContent
      variant="body3"
      sx={{
        maxWidth: {
          sm: "648px",
          md: "912px",
        },
        my: { xs: 2.5, md: 5 },
        px: { xs: 2.5, sm: 0 },
      }}
      ref={ref}
    >
      {content}
    </CMSContent>
  );
});

export default LongForm;
