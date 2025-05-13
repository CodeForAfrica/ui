import { NextSeo } from "next-seo";
import React from "react";

function Page({ children, seo }) {
  return (
    <>
      <NextSeo {...seo} />
      <div>
        {/* TODO: Add Navbar and footer */}
        {children ? <main>{children}</main> : null}
      </div>
    </>
  );
}

export default Page;
