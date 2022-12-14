import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const root = process.cwd();

const getFiles = () => fs.readdirSync(path.join(root, "data"));

const getFileBySlug = async (slug) => {
  //fichero fuente
  const mdxSource = fs.readFileSync(
    path.join(root, "data", `${slug}.mdx`),
    "utf-8"
  );

  //uso de librerias importadas
  const { data, content } = await matter(mdxSource);
  const source = await serialize(content, {});

  return {
    source,
    frontmatter: {
      slug,
      ...data,
    },
  };
};

const getAllFilesMetadata = () => {
  const files = getFiles();

  return files.reduce((allPosts, postSlug) => {
    const mdxSource = fs.readFileSync(
      path.join(root, "data", postSlug),
      "utf-8"
    );
    const { data } = matter(mdxSource);

    return [{ ...data, slug: postSlug.replace(".mdx", "") }, ...allPosts];
  }, []);
};

export { getFiles, getFileBySlug, getAllFilesMetadata };
