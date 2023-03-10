/* eslint-env browser */
import PropTypes from "prop-types";
import React from "react";

import ShareButton from "@/charterafrica/components/ShareButton";
import SocialMediaBar from "@/charterafrica/components/SocialMediaBar";

const ShareThisPage = React.forwardRef(function ShareThisPage(props, ref) {
  const { url: passedurl, title, ...other } = props;

  const url = passedurl || (typeof window !== "undefined" && window?.location);
  return (
    <SocialMediaBar title={title} ref={ref} {...other}>
      <ShareButton medium="twitter" url={url} />
      <ShareButton medium="facebook" url={url} />
      <ShareButton medium="linkedin" url={url} />
    </SocialMediaBar>
  );
});

ShareThisPage.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};

ShareThisPage.defaultProps = {
  url: undefined,
};

export default ShareThisPage;
