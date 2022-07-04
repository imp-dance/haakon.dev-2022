import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Prism from "prismjs";
import { ArticleItem } from "../../types/wordpress";
import { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { applyFontKind } from "../../styled-utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type ArticlePageProps = {
  post: ArticleItem;
};

const ArticlePage: NextPage<ArticlePageProps> = function ({
  post,
}) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <AnimatePresence>
      <Head>
        <title>{post.title.rendered} | haakon.dev</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism-tomorrow.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/prism.min.js" />
      </Head>
      <Container
        initial={{
          clipPath: "circle(0.01vw at 0 0)",
          transform: "translateX(-10%)",
          opacity: 0,
        }}
        animate={{
          clipPath: "circle(100vw at 0 0)",
          transform: "translateX(0%)",
          opacity: 1,
          transitionEnd: {
            clipPath: "none",
          },
        }}
        transition={{
          duration: 0.8,
          ease: "anticipate",
        }}
        exit={{
          clipPath: "circle(0.01vw at 0 0)",
          transform: "translateX(-10%)",
          opacity: 0,
        }}
      >
        <Title
          dangerouslySetInnerHTML={{
            __html: post.title.rendered,
          }}
        />
        <Main
          className="language-js"
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        />
        <Link href="/articles" passHref>
          <button>Go home</button>
        </Link>
      </Container>
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  max-width: 700px;
  margin: 0 auto;
`;

const Title = styled.h1`
  ${applyFontKind("h1")}
  color: var(--c-text-01);
  margin: 0 0 var(--s-05);
  padding: var(--s-07) 0;
`;

const Main = styled.main`
  ${applyFontKind("body")}
  color: var(--c-text-02);
  display: flex;
  gap: var(--s-05);
  flex-direction: column;
  margin-bottom: var(--s-09);
  code {
    ${applyFontKind("code")}
    color: var(--c-text-04);
    display: inline-block;
    padding: var(--s-01) var(--s-03) !important;
  }
  blockquote {
    padding: var(--s-05) var(--s-05) var(--s-05) var(--s-07);
  }
  blockquote,
  code {
    background: var(--c-ui-01);
  }
  pre,
  p,
  h2,
  h3,
  h4,
  figure,
  blockquote {
    margin: 0;
  }

  figure {
    margin-bottom: var(--s-07) !important;
  }
  h3 {
    ${applyFontKind("h2")}
  }
  h4 {
    ${applyFontKind("h3")}
  }
  pre > code {
    padding: var(--s-05) !important;
    display: block;
  }
  pre {
    padding: 0;
    margin: var(--s-07) 0;
    transition: outline 0.2s var(--ease-01);
    outline: 2px solid transparent;
    &:hover {
      outline: 2px solid var(--c-focus-01);
    }
  }
`;

type PostsReponse = Array<ArticleItem>;

export const getStaticProps: GetStaticProps = async ({
  params,
}) => {
  const slug = params?.slug;
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts/?slug=${
      slug as string
    }`
  );
  const posts: PostsReponse = await res.json();
  return {
    props: {
      post: posts[0],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts/?per_page=100`
  );
  const posts: PostsReponse = await res.json();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export default ArticlePage;
