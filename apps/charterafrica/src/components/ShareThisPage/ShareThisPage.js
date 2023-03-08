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
      <ShareButton type="twitter" url={url} />
      <ShareButton type="facebook" url={url} />
      <ShareButton type="linkedin" url={url} />
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
