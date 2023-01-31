import { Box } from "@mui/material";
import PropTypes from "prop-types";

import RichText from "../RichText";

import { secondary } from "@/charterafrica/colors";

function PageSummary(props) {
  const { summary } = props;
  return summary ? (
    <Box
      sx={{ minHeight: 56, width: "100vw" }}
      display="flex"
      alignItems="center"
      bgcolor={secondary[200]}
      justifyContent="center"
    >
      <RichText color="#3E202C" textAlign="center" elements={summary} />
    </Box>
  ) : null;
}

PageSummary.propTypes = {
  summary: PropTypes.arrayOf(PropTypes.shape({})),
};

PageSummary.defaultProps = {
  summary: [],
};
export default PageSummary;
