import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Head from "next/head";
import React from "react";

function Index() {
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
      </main>
    </div>
  );
}

export default Index;
