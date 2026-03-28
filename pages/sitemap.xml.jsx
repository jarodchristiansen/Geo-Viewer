import { GET_POSTS } from "@/helpers/queries/posts";
import client from "../apollo-client";

const Sitemap = () => {
  return null;
};

const getSiteTitle = async () => {
  const result = await client.query({
    query: GET_POSTS,
    variables: {
      filter: "Education",
    },
  });

  return { data: result };
};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = process.env.BASE_URL;

  const response = await getSiteTitle();
  const data = response?.data?.data?.getPosts;

  let postPaths = [];

  if (data) {
    postPaths = data.map((post) => {
      return `${BASE_URL}/${post.section.toLowerCase()}${post.slug}`;
    });
  }

  const origin =
    BASE_URL && BASE_URL.startsWith("http")
      ? BASE_URL.replace(/\/$/, "")
      : "https://hodl-watch.vercel.app";

  const dynamicPaths = [`${origin}/newsfeed`, `${origin}/user`];

  const allPaths = [...dynamicPaths, ...postPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${origin}/news</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${origin}/education</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  ${allPaths
    .map((url) => {
      return `
  <url>
    <loc>${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`;
    })
    .join("")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
