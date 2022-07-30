import {
  applyFocusStyles,
  applyFontKind,
  TextInput,
} from "@ryfylke-react/ui";
import { motion } from "framer-motion";
import styled from "styled-components";

export const SearchContainer = styled(motion.div)`
  input {
    width: 100%;
  }
`;

export const Error = styled.li`
  ${applyFontKind("code")}
  color:var(--c-focus-01);
  padding-bottom: var(--s-05);
  span {
    color: var(--c-text-01);
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  gap: var(--s-02);
  justify-content: center;
`;

export const SearchInput = styled(TextInput)`
  width: 100%;
  margin: 0 var(--s-03);
  > div {
    width: 100%;
    input {
      width: 100%;
    }
  }
`;

export const Container = styled(motion.div)`
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
    gap: var(--s-05);
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
      footer {
        ${applyFontKind("label")}
        color:var(--c-text-03);
      }
    }
  }
`;

export const createContainerMotionProps = (path: string) => ({
  initial: {
    transform: "translateY(-20px)",
    opacity: 0,
  },
  animate: {
    transform: "translateY(0%)",
    opacity: 1,
  },
  exit:
    path === "/"
      ? {
          scale: 1.25,
          translateY: -100,
          opacity: 0,
        }
      : {
          transform: "translateX(-15%)",
          opacity: 0,
        },
});

export const listItemMotionProps = {
  initial: {
    translateY: -10,
    opacity: 0,
  },
  animate: {
    opacity: 1,
    translateY: 0,
  },
  exit: {
    opacity: 0,
    translateY: 10,
  },
};
