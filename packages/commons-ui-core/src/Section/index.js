import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";

const SectionRoot = styled(Container)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("xs")]: {
    justifyContent: "center",
    maxWidth: theme.contentWidths.values.xs,
  },
  [theme.breakpoints.up("sm")]: {
    maxWidth: theme.contentWidths.values.sm,
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
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
  return <SectionRoot fixed {...props} />;
}

export default Section;
