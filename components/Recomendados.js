import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getAllFilesMetadata } from "../lib/mdx";
import Header from "../components/Header";

export default function Home2({ posts }) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.titleArticle}>
          <h3>Articulos</h3>
        </div>
        <div className={styles.grid}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`}>
              <a className={styles.card}>
                <img src={post.img} />
                <h2>{post.title}</h2>
              </a>
            </Link>
          ))}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
