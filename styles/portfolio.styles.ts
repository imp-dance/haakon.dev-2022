import { applyFontKind } from "@ryfylke-react/ui";
import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  min-height: calc(var(--app-height, 100vh) - 10px);
  padding: var(--s-05);
  padding-bottom: 0;
  max-width: 100vw;
  overflow: hidden;
  @media screen and (max-width: 700px) {
    padding: var(--s-05);
  }
  p {
    margin: 0;
  }
  h1,
  h2,
  h3 {
    margin: 0;
    margin-bottom: var(--s-05);
    color: var(--c-text-01);
  }
  ${applyFontKind("body")}
  h3 {
    ${applyFontKind("h3")}
    font-family: "Ubuntu Mono";
    display: flex;
    gap: var(--s-03);
    align-items: center;
    svg {
      --size: 0.8em;
      width: var(--size);
      height: var(--size);
      fill: var(--c-text-03);
    }
  }
  a {
    color: var(--c-focus-01);
  }
`;

export const Header = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--s-05);
  margin: var(--s-05) 0 var(--s-07);
  h2 {
    display: flex;
    gap: var(--s-02);
    ${applyFontKind("h2")}
    font-family: "Ubuntu Mono";
    font-weight: normal;
    margin: 0;
    a {
      color: var(--c-text-03);
      transition: color 0.1s var(--ease-01);
      &:hover {
        color: var(--c-focus-01);
      }
    }
  }
`;

export const YearBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--s-07);
  @media screen and (min-width: 1000px) {
    margin-bottom: var(--s-09);
  }
  padding: var(--s-05) 0 0;
  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    list-style: none;
    margin: 0;
    gap: var(--s-05);
    padding-left: var(--s-07);
    li {
      display: flex;
      gap: var(--s-02);
      align-items: center;
      svg {
        --size: 1em;
        width: var(--size);
        height: var(--size);
        color: var(--c-focus-01);
        opacity: 1;
        margin-right: var(--s-03);
      }
    }
  }
`;
