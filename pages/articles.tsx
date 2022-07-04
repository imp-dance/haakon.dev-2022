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
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@styled-icons/material";

type PostsResponse = Array<ArticleItem>;

const ArticlesPage: NextPage<{
  posts: PostsResponse;
}> = ({ posts }) => {
  const [search, setSearch] = useState("");
  const [paginatedList, pagination] = usePagination(posts, {
    perPage: 6,
    maxButtons: 5,
    isHidden(item: ArticleItem) {
      if (search.trim() == "") {
        return (
          item.categories.includes(2) ||
          item.categories.includes(3)
        );
      }
      return (
        item.title.rendered
          .toLowerCase()
          .includes(search.trim().toLowerCase()) &&
        (item.categories.includes(2) ||
          item.categories.includes(3))
      );
    },
    searchDeps: [search],
  });
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
      <h1>/articles</h1>
      <SearchInput
        label="Search"
        placeholder="#tips"
        style={{ width: "100%" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {paginatedList.map((post: ArticleItem) => (
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
                    __html: post.excerpt.rendered,
                  }}
                />
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <PaginationContainer>
        <Button
          size="sm"
          kind="ghost"
          icon={<ArrowLeft />}
          onClick={() => pagination.previousPage()}
        />
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
        <Button
          size="sm"
          kind="ghost"
          icon={<ArrowRight />}
          onClick={() => pagination.nextPage()}
        />
      </PaginationContainer>
    </Container>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  gap: var(--s-02);
  justify-content: center;
`;

const SearchInput = styled(TextInput)`
  width: 100%;
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
    ${applyFontKind("h1")}
    font-family: "Ubuntu Mono";
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
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
      posts: posts,
    },
  };
};

export default ArticlesPage;
