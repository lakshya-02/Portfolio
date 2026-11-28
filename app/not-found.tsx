import Link from "next/link";
import { siteConfig } from "@/data/site";
import styles from "./home.module.css";

export default function NotFound() {
  return (
    <div className={styles.home}>
      <section className={`${styles.inner} ${styles.page}`}>
        <pre className={styles.errorArt} aria-hidden="true">{`  _  _    ___    _  _
 | || |  / _ \\  | || |
 | || |_| | | | | || |_
 |__   _| |_| | |__   _|
    |_|  \\___/     |_|`}</pre>
        <header className={styles.pageHeader}>
          <h1>{siteConfig.notFound.title}</h1>
          <p>{siteConfig.notFound.body}</p>
        </header>
        <Link className={styles.more} href="/">[ {siteConfig.notFound.cta} ]</Link>
      </section>
    </div>
  );
}
