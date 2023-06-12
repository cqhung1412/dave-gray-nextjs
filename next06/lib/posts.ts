import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "blogposts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDir);
  const allPostsData = fileNames.map((filename) => {
    // Remove ".md"
    const id = filename.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    // Parse metadata
    const matterResult = matter(fileContent);

    const blogPost: BlogPost = {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
    };

    // Combine with id
    return blogPost;
  });

  // Sort by date
  return allPostsData.sort((a, b) => (a.date <= b.date ? 1 : -1));
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDir, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  // Parse metadata
  const matterResult = matter(fileContent);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const htmlContent = processedContent.toString();

  const blogPostWithHTML: BlogPost & { htmlContent: string } = {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    htmlContent,
  };

  return blogPostWithHTML
}
