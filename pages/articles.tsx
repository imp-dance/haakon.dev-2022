import { motion } from "framer-motion";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import {
  applyFocusStyles,
  applyFontKind,
  Button,
  TextInput,
} from "@ryfylke-react/ui";
import { ArticleItem } from "../types/wordpress";
import usePagination from "../hooks/usePagination";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Search,
} from "@styled-icons/material";

type PostsResponse = Array<ArticleItem>;

const ArticlesPage: NextPage<{
  posts: PostsResponse;
}> = ({ posts }) => {
  const [firstRender, setFirstRender] = useState(true);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchShown, setSearchShown] = useState(false);
  const [paginatedList, pagination] = usePagination(posts, {
    perPage: 6,
    maxButtons: 5,
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
      <h1>
        <Link href="/" passHref>
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
          paginatedList.map((post: ArticleItem) => (
            <li>
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
                </a>
              </Link>
            </li>
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
  );
};

const SearchContainer = styled(motion.div)`
  input {
    width: 100%;
  }
`;

const Error = styled.li`
  ${applyFontKind("code")}
  color:var(--c-focus-01);
  padding-bottom: var(--s-05);
  span {
    color: var(--c-text-01);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  gap: var(--s-02);
  justify-content: center;
`;

const SearchInput = styled(TextInput)`
  width: 100%;
  margin: 0 var(--s-03);
  > div {
    width: 100%;
    input {
      width: 100%;
    }
  }
`;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--s-05);
  h1 {
    display: flex;
    gap: var(--s-02);
    ${applyFontKind("h2")}
    font-family: "Ubuntu Mono";
    font-weight: normal;
    margin: 0;
    padding: var(--s-05) 0 var(--s-03);
    color: var(--c-text-01);
    a {
      color: var(--c-text-03);
      transition: color 0.1s var(--ease-01);
      &:hover {
        color: var(--c-focus-01);
      }
    }
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    gap: var(--s-03);
    a {
      display: block;
      ${applyFontKind("h3")}
      ${applyFocusStyles()}
      font-family: "Ubuntu Mono";
      padding: var(--s-03);
      transition: color 0.1s var(--ease-01);
      &:hover,
      &:focus {
        color: var(--c-focus-01);
        background: var(--c-ui-01);
        span {
          opacity: 0.75;
        }
      }
      span {
        transition: opacity 0.2s var(--ease-01);
        color: var(--c-text-02);
        ${applyFontKind("small")}
        font-family: "Ubuntu";
        opacity: 0.45;
      }
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
