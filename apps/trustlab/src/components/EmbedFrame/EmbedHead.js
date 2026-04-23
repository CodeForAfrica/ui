import Head from "next/head";
import React from "react";

import getEmbedOrigin from "@/trustlab/utils/embed";

function EmbedHead({ embed }) {
  const embedOrigin = getEmbedOrigin(embed?.src);

  if (!embedOrigin) {
    return null;
  }

  return (
    <Head>
      <link
        key={`${embedOrigin}-dns-prefetch`}
        rel="dns-prefetch"
        href={embedOrigin}
      />
      <link
        key={`${embedOrigin}-preconnect`}
        rel="preconnect"
        href={embedOrigin}
        crossOrigin="anonymous"
      />
    </Head>
  );
}

export default EmbedHead;
