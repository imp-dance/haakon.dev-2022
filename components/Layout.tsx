import { AnimatePresence } from "framer-motion";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { GlobalStyles } from "@ryfylke-react/ui";

export const Layout: React.FC<{
  children: ReactElement;
}> = function ({ children }): ReactElement {
  return (
    <MainContainer>
      <GlobalStyles />
      {children}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  color: var(--c-text-02);
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  padding: var(--s-05);
  padding-bottom: 5rem;
`;
