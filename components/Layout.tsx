import { GlobalStyles, Switch, useDM } from "@ryfylke-react/ui";
import { NightsStay, WbSunny } from "@styled-icons/material";
import React, { ReactElement } from "react";
import styled from "styled-components";

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
          "aria-hidden": "true",
        }}
      />
      {children}
    </MainContainer>
  );
};

const DMSwitch = styled(Switch)``;

const MainContainer = styled.div`
  color: var(--c-text-02);
  overflow: hidden;
  border-top: 10px solid var(--c-focus-01);
  @media screen and (max-width: 900px) {
    padding-top: var(--s-05) !important;
  }
  .topSwitch {
    position: fixed !important;
    top: calc(var(--s-05) + 10px);
    right: var(--s-05);
    z-index: 999;
    @media screen and (max-width: 900px) {
      position: absolute !important;
      top: var(--s-06);
    }
  }
`;
