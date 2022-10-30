import { MDXRemote } from "next-mdx-remote";
import { getFileBySlug, getFiles } from "../lib/mdx";
import Link from "next/link";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

// import MDXComponents from "../components/MDXComponents";

export default function Post({ source, frontmatter }) {
  return (
    <div>
      <Header />
      <div className="mainContent">
        <Link href="/">
          <a className="buttonBack">Regresar</a>
        </Link>
        <div className="postContent">
          <MDXRemote {...source} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { source, frontmatter } = await getFileBySlug(params.slug);
  return {
    props: { source, frontmatter },
  };
}

export async function getStaticPaths() {
  const posts = await getFiles();
  const paths = posts.map((post) => ({
    params: {
      slug: post.replace(/\.mdx/, ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
