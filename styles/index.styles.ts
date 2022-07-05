import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  max-width: 3000px;
  margin: 0 auto;
`;

export const HeaderContainer = styled.div`
  padding: var(--s-09);
  display: flex;
  flex-direction: column;
  gap: var(--s-07);
  min-height: calc(var(--app-height, 100vh) - 10px);
  justify-content: center;
  @media screen and (max-width: 600px) {
    justify-content: flex-start;
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
