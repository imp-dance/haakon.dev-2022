import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  max-width: 100%;
  margin: 0 auto;
`;

export const containerVariants = {
  initial: {
    translateY: 20,
    opacity: 0,
  },
  animate: {
    translateY: 0,
    opacity: 1,
  },
  exit: {
    transform: "translateX(-15%)",
    scale: 0.8,
    opacity: 0,
  },
};

export const containerTransition = {
  duration: 0.4,
  ease: "anticipate",
};

export const HeaderContainer = styled.div`
  padding: var(--s-09);
  display: flex;
  flex-direction: column;
  gap: var(--s-07);
  min-height: var(--app-height, 100vh);
  justify-content: center;
  @supports (-webkit-touch-callout: none) {
    min-height: var(--app-height, 100vh);
  }
  h1,
  h3 {
    margin: 0;
  }
  h1 {
    font-size: clamp(26px, 4vw, 90px);
  }
  h3 {
    font-size: clamp(16px, 2vw, 22px);
    max-width: 700px;
    line-height: 1.5em;
  }
  button {
    justify-self: flex-start;
    width: fit-content;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  gap: var(--s-05);
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
