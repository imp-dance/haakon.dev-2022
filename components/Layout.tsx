import React, { ReactElement } from "react";
import styled from "styled-components";
import { GlobalStyles } from "../styled-utils";

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
  background: var(--c-ui-bg);
  color: var(--c-text-02);
`;
