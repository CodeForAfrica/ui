import Head from "next/head";
import { Button } from "ui";

import styles from "./index.module.css";

function Index() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PromiseTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Tracking Politician</h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <Button />
        </div>
      </main>
    </div>
  );
}

export default Index;
