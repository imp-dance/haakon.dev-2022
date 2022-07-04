import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Prism from "prismjs";
import { ArticleItem } from "../../types/wordpress";
import { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { applyFontKind } from "../../styled-utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../../components/Button";
import { ArrowLeft } from "@styled-icons/material";

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
      exit={{
        transform: "translateX(-10%)",
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
        ease: "anticipate",
      }}
    >
      <Head>
        <title>{post.title.rendered} | haakon.dev</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism-tomorrow.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/prism.min.js" />
      </Head>
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
      <Link href="/articles" passHref scroll={false}>
        <BackButton
          kind="ghost"
          size="lg"
          ripple
          icon={<ArrowLeft style={{ flexShrink: 0 }} />}
        >
          Articles
        </BackButton>
      </Link>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 700px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 var(--s-05);
`;

const BackButton = styled(Button)`
  width: 100%;
  margin-bottom: 5rem;
  > span > svg {
    --size: 1rem;
  }
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
    background: var(--c-ui-01) !important;
  }
  pre,
  p,
  figure,
  blockquote {
    margin: 0;
    width: 100%;
    max-width: 100%;
  }
  h1,
  h2,
  h3,
  h4 {
    margin: var(--s-05) 0;
    &:first-child {
      margin: 0;
    }
    position: relative;
    &::after {
      z-index: -1;
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 30%;
      background: var(--c-ui-01);
    }
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
    overflow: auto;
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
