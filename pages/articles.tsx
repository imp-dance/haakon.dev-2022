import { motion } from "framer-motion";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import { Button } from "../components/Button";
import { applyFontKind } from "../styled-utils";
import { ArticleItem } from "../types/wordpress";

type PostsResponse = Array<ArticleItem>;

const ArticlesPage: NextPage<{
  posts: PostsResponse;
}> = ({ posts }) => {
  return (
    <Container
      initial={{
        transform: "translateY(-20px)",
        opacity: 0,
      }}
      animate={{
        transform: "translateY(0%)",
        opacity: 1,
      }}
      exit={{
        transform: "translateY(20px)",
        opacity: 0,
      }}
      transition={{
        ease: "anticipate",
        duration: 0.8,
      }}
      key="articles-page"
    >
      <h1>Articles</h1>
      <ul>
        {posts
          .filter(
            (item) =>
              item.categories.includes(2) ||
              item.categories.includes(3)
          )
          .map((post) => (
            <li>
              <Link
                href={`/article/${post.slug}`}
                passHref
                scroll={false}
              >
                <a
                  dangerouslySetInnerHTML={{
                    __html: post.title.rendered,
                  }}
                />
              </Link>
            </li>
          ))}
      </ul>
    </Container>
  );
};

const Container = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  h1 {
    ${applyFontKind("h1")}
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    a {
      display: block;
      ${applyFontKind("button")}
      padding:var(--s-03);
    }
  }
`;

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
