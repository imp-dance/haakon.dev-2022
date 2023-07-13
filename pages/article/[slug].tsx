import { useDM } from "@ryfylke-react/ui";
import { ArrowLeft } from "@styled-icons/material";
import { formatDistance } from "date-fns";
import { useReducedMotion } from "framer-motion";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Prism from "prismjs";
import { useEffect } from "react";
import { stripHtml } from "utils";
import {
  BackButton,
  BackLink,
  Container,
  containerMotionProps,
  Header,
  HeaderLinks,
  Main,
  Title,
} from "../../styles/article.styles";
import { ArticleItem } from "../../types/wordpress";
import Giscus from "@giscus/react";

type ArticlePageProps = {
  post: ArticleItem;
};

const ArticlePage: NextPage<ArticlePageProps> = function ({
  post,
}) {
  const shouldReduceMotion = useReducedMotion();
  const { isDM } = useDM();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Container
      {...(shouldReduceMotion ? {} : containerMotionProps)}
      transition={{
        duration: 0.4,
        ease: "anticipate",
      }}
    >
      <Head>
        <title>
          {`${stripHtml(post.title.rendered)} | haakon.dev`}
        </title>
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
        <HeaderLinks>
          <Link href="/articles" passHref scroll={false}>
            <BackLink>
              <ArrowLeft /> Articles
            </BackLink>
          </Link>
          |
          <Link href="/" passHref scroll={false}>
            <BackLink>Håkon Underbakke</BackLink>
          </Link>{" "}
          |{" "}
          {formatDistance(new Date(post.date), new Date(), {
            addSuffix: true,
          })}
        </HeaderLinks>
      </Header>
      <Main
        dm={isDM}
        className="language-js"
        dangerouslySetInnerHTML={{
          __html: post.content.rendered,
        }}
      />
      <div
        style={{ height: "1px", background: "var(--c-ui-02)" }}
      />
      <div style={{ height: "2rem" }} />
      <Giscus
        repo="imp-dance/haakon.dev-2022"
        repoId="R_kgDOHmeYng"
        category="General"
        categoryId="DIC_kwDOHmeYns4CX3IT"
        mapping="pathname"
        emitMetadata="0"
        reactionsEnabled="1"
        theme={isDM ? "dark" : "light"}
        lang="en"
        loading="lazy"
        strict="0"
        inputPosition="top"
      />
      <div style={{ height: "2rem" }} />
      <Link href="/articles" passHref scroll={false}>
        <BackButton
          kind="ghost"
          size="lg"
          ripple
          icon={<ArrowLeft style={{ flexShrink: 0 }} />}
        >
          More Articles
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
