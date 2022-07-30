import { motion } from "framer-motion";
import { ReactElement } from "react";

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
  },
  {
    word: "Underbakke",
    delay: 1.2,
  },
];

export const IndexTitle = () => {
  return (
    <>
      {words.map((word) => (
        <TitleWord key={word.word} {...word} />
      ))}
    </>
  );
};

export const TitleWord = ({
  word,
  delay,
}: {
  word: string;
  delay?: number;
}): ReactElement => {
  return (
    <motion.span
      initial={{
        translateY: -5,
        opacity: 0.2,
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
    </motion.span>
  );
};
