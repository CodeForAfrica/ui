import { styled } from "@mui/material/styles";
import Head from "next/head";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import Twitter from "@/codeforafrica/assets/twitter.svg";
import Footer from "@/codeforafrica/components/Footer";
import NavMenu from "@/codeforafrica/components/NavMenu";
import config from "@/codeforafrica/config";

const NavIcon = styled("li")(({ theme: { typography } }) => ({
  listStyle: "none",
  margin: typography.pxToRem(5),
}));

function Page({ children, sections, title }) {
  const { footer } = sections;
  const { menu } = config;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
      <NavMenu menu={menu}>
        <NavIcon>
          <a href="/twitter">
            <Image src={Twitter} alt="twitter" />
          </a>
        </NavIcon>
      </NavMenu>
      {footer ? <Footer {...footer} /> : null}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.node,
  sections: PropTypes.shape({
    footer: PropTypes.shape({}),
  }),
  title: PropTypes.string,
};

Page.defaultProps = {
  children: undefined,
  sections: undefined,
  title: undefined,
};

export default Page;
