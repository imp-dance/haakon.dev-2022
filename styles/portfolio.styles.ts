import { applyFontKind } from "@ryfylke-react/ui";
import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  min-height: calc(var(--app-height, 100vh) - 10px);
  padding: var(--s-05);
  padding-bottom: 0;
  max-width: 100vw;
  overflow: hidden;
  background: linear-gradient(
    to bottom,
    var(--c-ui-bg),
    var(--c-ui-01)
  );
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

export const containerVariants = {
  initial: {
    translateY: 20,
    opacity: 0,
  },
  animate: {
    translateY: 0,
    scale: 1,
    opacity: 1,
  },
  exit: {
    translateY: 50,
    opacity: 0,
  },
};

export const containerTransition = {
  duration: 0.6,
  ease: "anticipate",
};

export const InnerContainer = styled.div`
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
`;

export const LinksContainer = styled.div`
  display: flex;
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
