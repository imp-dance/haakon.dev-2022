import { motion } from "framer-motion";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ArticleItem } from "../types/wordpress";

type PostsResponse = Array<ArticleItem>;

const ArticlesPage: NextPage<{
  posts: PostsResponse;
}> = ({ posts }) => {
  return (
    <motion.div>
      <ul>
        {posts.map((post) => (
          <li>
            <Link href={`/article/${post.slug}`} passHref>
              <a
                dangerouslySetInnerHTML={{
                  __html: post.title.rendered,
                }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts/?per_page=100`
  );
  const posts: PostsResponse = await res.json();
  return {
    props: {
      posts: posts,
    },
  };
};

export default ArticlesPage;
