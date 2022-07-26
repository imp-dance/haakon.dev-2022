import { Button, applyFontKind } from "@ryfylke-react/ui";
import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  padding: var(--s-05);
  padding-bottom: 5rem;
`;

export const Header = styled.header`
  padding: var(--s-05) 0;
  margin-bottom: var(--s-05);
`;

export const HeaderLinks = styled.div`
  display: flex;
  gap: var(--s-03);
  ${applyFontKind("small")}
  font-family: "Ubuntu Mono";
  color: var(--c-text-03);
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

export const BackLink = styled.a`
  ${applyFontKind("small")}
  font-family: "Ubuntu Mono";
  display: flex;
  align-items: center;
  transition: all 0.2s var(--ease-01);
  &:hover {
    color: var(--c-focus-01);
    svg {
      transform: translateX(-20%);
    }
  }
  svg {
    transition: all 0.2s var(--ease-01);
    width: 1em;
    height: 1em;
    transform: translateX(0%);
  }
`;

export const BackButton = styled(Button)`
  width: 100%;
  > span > svg {
    --size: 1rem;
  }
`;

export const Title = styled.h1`
  ${applyFontKind("h1")}
  color: var(--c-text-01);
  margin: 0 0 var(--s-03);
  padding: 0;
`;

export const Main = styled.main<{
  dm?: boolean;
}>`
  ${applyFontKind("body")}
  color: var(--c-text-02);
  display: flex;
  gap: var(--s-05);
  flex-direction: column;
  margin-bottom: var(--s-09);
  code {
    ${applyFontKind("code")}
    color:var(--c-text-04);
    display: inline-block;
    padding: var(--s-01) var(--s-03) !important;
  }
  blockquote {
    padding: var(--s-05) var(--s-05) var(--s-05) var(--s-07);
  }
  blockquote,
  code {
    background: ${(props) =>
      props.dm ? "var(--c-ui-01) !important" : "transparent"};
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
    margin: 0;
    margin-bottom: var(--s-05);
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
    margin: 0;
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
  code,
  pre {
    &::selection,
    &::-webkit-selection,
    > *::selection,
    *::selection {
      --selection-color: var(--c-primary-01);
      background: var(--selection-color);
    }
  }
  code::selection,
  pre::selection,
  code::-webkit-selection,
  pre::-webkit-selection {
  }
  pre {
    padding: 0;
    margin: 0;
    margin-bottom: var(--s-05);
    transition: outline 0.2s var(--ease-01);
    outline: 2px solid transparent;
    &:hover {
      outline: 2px solid var(--c-focus-01);
    }
  }
  p + h4,
  p + h3 {
    margin-top: var(--s-07);
  }
  iframe {
    margin: var(--s-07) 0;
  }
  ul,
  ol {
    margin: 0;
    margin-bottom: var(--s-05);
    padding-left: var(--s-07);
  }
  p,
  h1,
  h2,
  h3,
  h4,
  a {
    &::selection {
      background: var(--c-primary-03);
      color: var(--c-text-04);
    }
  }
  a {
    color: var(--c-focus-01);
    &:hover {
    }
  }
  a::selection {
    color: ${(props) =>
      props.dm ? "var(--c-focus-01)" : "var(--c-primary-01)"};
    ${(props) =>
      !props.dm &&
      `
      background: var(--c-ui-02);
      `}
  }
`;
