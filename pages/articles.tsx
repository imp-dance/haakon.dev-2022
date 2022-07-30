import { Button } from "@ryfylke-react/ui";
import {
  ArrowLeft,
  ArrowRight,
  Search,
} from "@styled-icons/material";
import { formatDistance } from "date-fns";
import { motion, useReducedMotion } from "framer-motion";
import usePagination from "hooks/usePagination";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Container as ArticlePageContainer } from "styles/article.styles";
import {
  Container,
  createContainerMotionProps,
  Error,
  listItemMotionProps,
  PaginationContainer,
  SearchContainer,
  SearchInput,
} from "styles/articles.styles";
import { ArticleItem } from "types/wordpress";

type PostsResponse = Array<ArticleItem>;

const ArticlesPage: NextPage<{
  posts: PostsResponse;
}> = ({ posts }) => {
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();
  const [firstRender, setFirstRender] = useState(true);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchShown, setSearchShown] = useState(false);
  const [paginatedList, pagination] = usePagination(posts, {
    perPage: 6,
    maxButtons: 5,
    onPageChange: () => {
      document.body.scrollTop = 0;
    },
    isHidden(item: ArticleItem) {
      if (search.trim() == "") {
        return true;
      }
      return (
        item.title.rendered
          .toLowerCase()
          .search(search.trim().toLowerCase()) > -1
      );
    },
    searchDeps: [search],
  });

  useEffect(() => setFirstRender(false));

  useEffect(() => {
    if (searchShown && searchRef.current) {
      searchRef.current.querySelector("input")?.focus();
    }
  }, [searchShown]);

  return (
    <ArticlePageContainer
      {...(shouldReduceMotion
        ? {}
        : createContainerMotionProps(router.asPath))}
      transition={{
        ease: "anticipate",
        duration: 0.4,
      }}
      key="articles-page"
    >
      <Container>
        <Head>
          <title>{"Articles | haakon.dev"}</title>
        </Head>
        <h1>
          <Link href="/" passHref scroll={false}>
            <a>haakon.dev</a>
          </Link>
          <span>/</span>
          <span>articles</span>
        </h1>
        {searchShown && (
          <SearchContainer
            initial={{ transform: "scaleY(0)" }}
            animate={{ transform: "scaleY(1)" }}
            exit={{ transform: "translateY(-5px)", opacity: 0 }}
            transition={{
              ease: "easeInOut",
              duration: 0.2,
            }}
            ref={searchRef}
          >
            <SearchInput
              placeholder="Type something to filter articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={() => {
                if (search.trim() === "") {
                  setSearchShown(false);
                }
              }}
            />
          </SearchContainer>
        )}

        {!searchShown && (
          <motion.div
            initial={{ transform: "scaleY(0)" }}
            animate={{ transform: "scaleY(1)" }}
            exit={{ transform: "translateY(-5px)", opacity: 0 }}
            transition={{
              ease: "easeInOut",
              duration: 0.2,
            }}
            ref={searchRef}
          >
            <Button
              kind="ghost"
              size="field"
              icon={<Search />}
              onClick={() => setSearchShown(true)}
              style={{ width: "100%" }}
            >
              Search
            </Button>
          </motion.div>
        )}
        <ul>
          {paginatedList.length > 0 ? (
            paginatedList.map((post: ArticleItem, i) => (
              <motion.li
                key={post.id}
                {...(shouldReduceMotion
                  ? {}
                  : listItemMotionProps)}
                transition={{
                  duration: 0.1,
                  delay: 0.4 + i * 0.075,
                }}
              >
                <Link
                  href={`/article/${post.slug}`}
                  passHref
                  scroll={false}
                >
                  <a>
                    <strong
                      dangerouslySetInnerHTML={{
                        __html: post.title.rendered,
                      }}
                    />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: firstRender
                          ? post.excerpt.rendered
                          : post.excerpt.rendered
                              .replaceAll("[...]", "")
                              .substring(0, 250) + "...",
                      }}
                    />
                    <footer>
                      {formatDistance(
                        new Date(post.date),
                        new Date(),
                        {
                          addSuffix: true,
                        }
                      )}
                    </footer>
                  </a>
                </Link>
              </motion.li>
            ))
          ) : (
            <Error>
              No articles found for "<span>{search}</span>"
            </Error>
          )}
        </ul>
        <PaginationContainer>
          {pagination.buttons.length > 1 && (
            <Button
              size="sm"
              kind="ghost"
              icon={<ArrowLeft />}
              onClick={() => pagination.previousPage()}
            />
          )}
          {pagination.buttons.map((button) =>
            typeof button === "string" ? (
              "..."
            ) : (
              <Button
                size="sm"
                key={button}
                kind={
                  pagination.activePage === button
                    ? "regular"
                    : "ghost"
                }
                onClick={() => pagination.goToPage(button)}
              >
                {button}
              </Button>
            )
          )}
          {pagination.buttons.length > 1 && (
            <Button
              size="sm"
              kind="ghost"
              icon={<ArrowRight />}
              onClick={() => pagination.nextPage()}
            />
          )}
        </PaginationContainer>
      </Container>
    </ArticlePageContainer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts/?per_page=100`
  );
  const posts: PostsResponse = await res.json();
  return {
    props: {
      posts: posts
        .filter(
          (item) =>
            item.categories.includes(2) ||
            item.categories.includes(3)
        )
        .map((post) => ({
          ...post,
          excerpt: {
            rendered: post.excerpt.rendered,
            protected: post.excerpt.protected,
          },
        })),
    },
  };
};

export default ArticlesPage;
