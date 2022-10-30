import Link from "next/link";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { getAllFilesMetadata } from "../lib/mdx";

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.titleArticle}>
          <h3>Articulos</h3>
        </div>
        <div className={styles.grid}>
          {posts.map((post) => {
            const style = {
              backgroundImage: `url(${post.img})`,
            };
            return (
              <Link key={post.slug} href={`/${post.slug}`}>
                <a className={styles.card}>
                  <img style={style} />
                  <h2>{post.title}</h2>
                </a>
              </Link>
            );
          })}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesMetadata();
  return {
    props: { posts },
  };
}
