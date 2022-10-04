import { motion } from "framer-motion";
import { ReactElement } from "react";
import styled, { css } from "styled-components";

const words = [
  {
    word: "Hi,",
    delay: 0,
  },
  {
    word: "my",
    delay: 0.6,
  },
  {
    word: "name",
    delay: 0.7,
  },
  {
    word: "is",
    delay: 0.8,
  },
  {
    word: "Håkon",
    delay: 1,
    gradient:
      "linear-gradient(to right,var(--c-focus-01), var(--c-danger-02))",
  },
  {
    word: "Underbakke",
    delay: 1.2,
    gradient:
      "linear-gradient(to left,var(--c-focus-01), var(--c-danger-02))",
  },
];

export const IndexTitle = () => {
  return (
    <>
      {words.map((word, i) => (
        <>
          <TitleWord key={word.word} {...word} />{" "}
          {i === 3 && <br />}
        </>
      ))}
    </>
  );
};

export const TitleWord = ({
  word,
  delay,
  gradient,
}: {
  word: string;
  delay?: number;
  gradient?: string;
}): ReactElement => {
  return (
    <StyledTitleWord
      gradient={gradient}
      initial={{
        translateY: -5,
        opacity: gradient ? 0.05 : 0.2,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.2,
        delay,
      }}
      whileInView={{
        translateY: 0,
        opacity: 1,
      }}
    >
      {word}{" "}
    </StyledTitleWord>
  );
};

const StyledTitleWord = styled(motion.span)<{
  gradient?: string;
  firstLine?: boolean;
}>`
  line-height: 1.25em;
  ${(props) =>
    props.gradient &&
    css`
      background: ${props.gradient};
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `}
`;
