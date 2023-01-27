/* eslint-env browser */
import Head from "next/head";
import { NextSeo } from "next-seo";
import React from "react";

function AdminPage() {
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
      <NextSeo noindex />
      <script
        src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"
        async
      />
      <script
        src="https://unpkg.com/netlify-cms-widget-uuid-v4@^1.0.12/dist/index.js"
        async
      />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener("load", () => {
              window.CMS.registerWidget(
                "uuid",
                window.uuidWidget.UuidControl
              );
            });
          `,
        }}
      />
    </>
  );
}

export default AdminPage;
