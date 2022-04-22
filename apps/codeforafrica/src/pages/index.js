import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Head from "next/head";
import React from "react";

import NavList from "@/codeforafrica/component/NavList";
import config from "@/codeforafrica/config";

function Index() {
  const { menu } = config;
  return (
    <div>
      <Head>
        <title>CFA SITE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>This is the official CFA SITE</h1>

        <RichTypography component="p">
          Get started by editing <Link href="/">pages/index.js</Link>
        </RichTypography>
        <NavList menu={menu} />
      </main>
    </div>
  );
}

export default Index;
