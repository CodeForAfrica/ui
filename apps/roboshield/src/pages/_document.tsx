import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from "@mui/material-nextjs/v14-pagesRouter";
import {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

import theme from "@/roboshield/theme";

export default function MyDocument(
  props: DocumentProps & DocumentHeadTagsProps,
) {
  // Read fresh on every server render and exposed to client code via
  // `window` (see src/utils/site.ts) instead of NEXT_PUBLIC_SENTRY_DSN,
  // so it can be changed via Dokku config without rebuilding the image.
  // NOTE: this only covers Pages Router routes — Payload's App Router admin
  // panel (src/app/(payload)/layout.tsx) is generated and must not be
  // edited, so instrumentation-client.ts falls back to the build-time
  // NEXT_PUBLIC_SENTRY_DSN there.
  const runtimeConfig = JSON.stringify({
    SENTRY_DSN: process.env.SENTRY_DSN,
  });

  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1020e1" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        <script
          dangerouslySetInnerHTML={{
            __html: `Object.assign(window, ${runtimeConfig});`,
          }}
        />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
