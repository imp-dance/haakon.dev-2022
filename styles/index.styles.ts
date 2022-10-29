import { motion } from "framer-motion";
import styled, { css, keyframes } from "styled-components";

export const Container = styled(motion.div)`
  max-width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid var(--c-ui-02);
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
    scale: 1,
    opacity: 0,
  },
};

export const containerTransition = {
  duration: 0.4,
  ease: "anticipate",
};

const gradientAnim = keyframes`
	0% {
		background-position: 100% 50%;
	}
	50% {
		background-position: 50% 50%;
	}
	100% {
		background-position: 100% 50%;
	}
`;

export const HeaderContainer = styled.div<{
  dm?: boolean;
}>`
  padding: var(--s-09);
  display: flex;
  flex-direction: column;
  gap: var(--s-07);
  min-height: calc(var(--app-height, 100vh) - 10px);
  justify-content: center;
  background: ${(props) =>
    props.dm
      ? css`linear-gradient(
    -45deg,
    var(--c-ui-bg),
    var(--c-ui-01),
    #2a2aab59,
    var(--c-danger-02)
  )`
      : css`linear-gradient(
    -45deg,
    var(--c-ui-02),
    var(--c-text-04),
    #6a37ff2b,
    var(--c-danger-02)
  )`};
  background-size: 400% 400%;
  background-position: 96%;
  animation: ${gradientAnim} 22s infinite ease-in-out;
  @media screen and (max-width: 600px) {
    background: var(--c-ui-bg);
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
