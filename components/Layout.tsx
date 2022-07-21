import { AnimatePresence, motion } from "framer-motion";
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
      <DMSwitch
        checked={isDM}
        onChange={setDM}
        checkedIcon={<NightsStay />}
        uncheckedIcon={<WbSunny />}
        containerProps={{
          className: "topSwitch",
        }}
      />
      {children}
    </MainContainer>
  );
};

const DMSwitch = styled(Switch)``;

const MainContainer = styled.div`
  color: var(--c-text-02);
  border-top: 10px solid var(--c-focus-01);
  min-width: 100vw;
  .topSwitch {
    position: fixed !important;
    top: calc(var(--s-05) + 10px);
    right: Var(--s-05);
    z-index: 999;
  }
`;
