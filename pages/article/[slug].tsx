import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Prism from "prismjs";
import { ArticleItem } from "../../types/wordpress";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useDM } from "@ryfylke-react/ui";
import Link from "next/link";
import { ArrowLeft } from "@styled-icons/material";
import { formatDistance } from "date-fns";
import {
  Container,
  BackLink,
  BackButton,
  Main,
  Header,
  Title,
} from "./styles";

type ArticlePageProps = {
  post: ArticleItem;
};

const ArticlePage: NextPage<ArticlePageProps> = function ({
  post,
}) {
  const { isDM, setDM } = useDM();
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
        clipPath: "circle(100vmax at 0 0)",
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
        duration: 0.6,
        ease: "anticipate",
      }}
    >
      <Head>
        <title>{post.title.rendered} | haakon.dev</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism-tomorrow.min.css"
        />
      </Head>
      <Header>
        <Title
          dangerouslySetInnerHTML={{
            __html: post.title.rendered,
          }}
        />
        <Link href="/" passHref>
          <BackLink>
            <ArrowLeft /> Håkon Underbakke |{" "}
            {formatDistance(new Date(post.date), new Date(), {
              addSuffix: true,
            })}
          </BackLink>
        </Link>
      </Header>
      <Main
        dm={isDM}
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
