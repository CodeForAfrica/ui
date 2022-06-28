import { NextSeo } from "next-seo";
import Head from "next/head";
import React from "react";

function AdminPage(props) {
  return (
    <>
      <Head>
        {/* Note the "type" and "rel" attribute values, which are required. */}
        <link
          href="/api/admin/config.yml"
          type="text/yaml"
          // eslint-disable-next-line react/no-invalid-html-attribute
          rel="cms-config-url"
        />
      </Head>
      <NextSeo {...props} />
      <script
        src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"
        strategy="beforeInteractive"
      />
    </>
  );
}

export default AdminPage;
