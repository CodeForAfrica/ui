import { styled } from "@mui/material/styles";

const Section = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
    maxWidth: theme.contentWidths.values.sm,
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: theme.contentWidths.values.md,
  },
}));

export default Section;
