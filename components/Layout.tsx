import { AnimatePresence } from "framer-motion";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { GlobalStyles, Switch, useDM } from "@ryfylke-react/ui";
import { NightsStay, WbSunny } from "@styled-icons/material";

export const Layout: React.FC<{
  children: ReactElement;
}> = function ({ children }): ReactElement {
  const { isDM, setDM } = useDM();
  return (
    <MainContainer>
      <GlobalStyles />
      {children}
      <DMSwitch
        checked={isDM}
        onChange={setDM}
        checkedIcon={<NightsStay />}
        uncheckedIcon={<WbSunny />}
        containerProps={{
          className: "topSwitch",
        }}
      />
      ,
    </MainContainer>
  );
};

const DMSwitch = styled(Switch)``;

const MainContainer = styled.div`
  color: var(--c-text-02);
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  padding: var(--s-05);
  padding-bottom: 5rem;
  .topSwitch {
    position: fixed !important;
    top: var(--s-05);
    right: Var(--s-05);
  }
`;
