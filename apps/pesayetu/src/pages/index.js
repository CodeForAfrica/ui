import { RichTypography } from "@commons-ui/core";
import Link from "@commons-ui/next/Link";
import Head from "next/head";
import { Button } from "ui";

import styles from "./index.module.css";

function Index() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PesaYetu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Data to hold your government accountable
        </h1>

        <p className={styles.description}>
          Get started by editing <Link href="/">pages/index.js</Link>
        </p>

        <div className={styles.grid}>
          <Button />
        </div>
        <RichTypography>this is an example</RichTypography>
      </main>
    </div>
  );
}

export default Index;
