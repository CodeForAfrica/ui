import { styled } from "@mui/material/styles";

import BaseSection from "./BaseIndex";

const SectionStyled = styled(BaseSection)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("xs")]: {
    justifyContent: "center",
    maxWidth: theme.contentWidths.values.xs,
  },
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
    maxWidth: theme.contentWidths.values.sm,
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: theme.contentWidths.values.md,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: theme.contentWidths.values.lg,
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: theme.contentWidths.values.xl,
  },
}));

function Section({ ...props }) {
  return <SectionStyled {...props} />;
}

export default Section;
