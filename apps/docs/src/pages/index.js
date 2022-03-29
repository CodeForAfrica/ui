import { RichTypography } from "commons-ui-core";
import Head from "next/head";
import { Button } from "ui";

import styles from "./index.module.css";

export default function Docs() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Docs Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <h1>DOCS IS HERE</h1>
          <Button />
        </div>
        <RichTypography>this is an example</RichTypography>
      </main>
    </div>
  );
}
