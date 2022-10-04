import { applyFontKind, Button } from "@ryfylke-react/ui";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

export const pageInVariants = {
  initial: {
    translateY: 150,
    opacity: 0,
    scaleY: 0.8,
  },
  animate: {
    translateY: 0,
    opacity: 1,
    scaleY: 1,
  },
  exit: {
    translateY: 150,
    opacity: 0,
    scaleY: 0.8,
  },
};

export const Header = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--s-05);
  margin: var(--s-05) auto var(--s-09);
  max-width: 900px;
  position: relative;
  z-index: 2;
  h2 {
    display: flex;
    gap: var(--s-02);
    ${applyFontKind("h2")}
    font-family: "Ubuntu Mono";
    font-weight: normal;
    margin: 0;
    a {
      color: var(--c-text-03);
      transition: color 0.1s var(--ease-01);
      &:hover {
        color: var(--c-focus-01);
      }
    }
  }
`;

export const pageInTransition = {
  duration: 0.8,
  ease: "anticipate",
};

export const CloseButton = styled(Button)`
  position: fixed;
  top: var(--s-05);
  right: var(--s-03);
  &:active,
  &:hover,
  &:focus {
    position: fixed;
  }
  svg {
    --size: 1.25em !important;
  }
`;

export const RelativeContainer = styled.div``;

export const IconCont = styled.div<{
  selected: boolean;
}>`
  position: absolute;
  top: var(--s-09);
  --size: 32px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  padding: var(--s-02);
  transform: translate(-50%, -50%);
  background: ${(props) =>
    props.selected ? "var(--c-focus-01)" : "var(--c-ui-01)"};
  color: ${(props) =>
    props.selected ? "var(--c-text-04)" : "var(--c-text-01)"};
  transition: color 0.6s ease-in-out, background 0.6s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    --size: 18px;
    width: var(--size);
    height: var(--size);
  }
`;

export const containerVariants = {
  shiftedLeft: {
    translateX: "calc(-50vw + 2rem)",
  },
  shiftedRight: {
    translateX: "calc(50vw - 2rem)",
  },
  idle: {
    translateX: "0vw",
  },
};

export const headerVariants = {
  shiftedLeft: {
    translateX: "calc(-50vw + 2rem)",
    translateY: "-150%",
    opacity: 0,
  },
  shiftedRight: {
    translateX: "calc(50vw - 2rem)",
    translateY: "-150%",
    opacity: 0,
  },
  idle: {
    translateX: "0vw",
    translateY: "0%",
  },
};

export const selectedItemVariants = {
  closed: {
    opacity: 0,
    translateX: 0,
    translateY: 100,
  },
  open: {
    opacity: 1,
    translateX: 0,
    translateY: 0,
    scale: 1,
    scaleX: 1,
  },
};

export const selectedItemTransitions = {
  open: {
    delay: 0.5,
    duration: 0.6,
    ease: "anticipate",
  },
  closed: {
    delay: 0.2,
    duration: 0.6,
    ease: "easeOut",
  },
};

export const SelectedItemTopBorder = styled.div<{
  isOpen: Boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  z-index: 2;
  border-top: 10px solid var(--c-focus-01);
  background: var(--c-ui-bg);
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transform: ${(props) =>
    props.isOpen ? "scaleX(1)" : "scaleX(0)"};
  transition: transform 0.4s ease-in-out,
    opacity 0.4s ease-in-out;
  transition-delay: 0.3s;
`;

export const SelectedItemContainer = styled(motion.div)<{
  $shiftLeft?: boolean;
}>`
  position: fixed;
  top: 10px;
  background: var(--c-ui-01);
  padding: var(--s-07);
  padding-top: var(--s-09);
  left: ${(props) => (props.$shiftLeft ? "108px" : "3rem")};
  right: ${(props) => (!props.$shiftLeft ? "108px" : "4rem")};
  bottom: 0;
  overflow-y: auto;
  pointer-events: none;
  &.open {
    pointer-events: all;
  }

  --scrollbar-bg: var(--c-ui-bg);
  --scrollbar-border-color: var(--scrollbar-bg);
  --scrollbar-color: var(--c-ui-04);
  scrollbar-width: auto;
  transform-origin: ${(props) =>
    props.$shiftLeft ? "center left" : "center right"};
  scrollbar-color: var(--scrollbar-color) var(--scrollbar-bg);
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: var(--scrollbar-bg);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-color);
    border-radius: 10px;
    border: 3px solid var(--scrollbar-border-color);
  }

  z-index: 3;
  @media screen and (max-width: 900px) {
    left: 0;
    right: 0;
    bottom: 0;
    > button {
      width: 100%;
    }
  }
  h2 {
    ${applyFontKind("h1")}
  }
  > span {
    display: flex;
    align-items: center;
    gap: var(--s-03);
    ${applyFontKind("code")}
    color: var(--c-text-03);
  }
  > div {
    ${applyFontKind("body")}
    margin: var(--s-05) 0;
    color: var(--c-text-02);
    max-width: 700px;
    p {
      margin-bottom: var(--s-04);
    }
  }
`;

export const TimelineContainer = styled(motion.div)<{
  $active: boolean;
}>`
  display: flex;
  width: calc(60vw + 200px);
  max-width: 100%;
  margin: 0 auto;
  margin-top: var(--s-09);
  flex-direction: column;
  --line-color: ${(props) =>
    props.$active ? "var(--c-focus-01)" : "var(--c-ui-03)"};
  --line-thickness: 2px;
  @media screen and (max-width: 900px) {
    margin-top: var(--s-05);
  }
  min-height: var(--app-height, 100vh);
  .grass {
    position: absolute;
    bottom: 0;
    left: 50%;
    pointer-events: none;
    height: 90px;
    opacity: 0.7;
    transform: translateX(-50%) scaleX(1.3) scaleY(0.2);
    transform-origin: center bottom;
    @media screen and (max-width: 900px) {
      display: none;
    }
  }
  .molly,
  .luci {
    position: absolute;
    bottom: calc(-1rem - 2px);
    left: 50%;
    pointer-events: none;
    @media screen and (max-width: 900px) {
      display: none;
    }
  }
  .luci {
    height: 85px;
    transform: translateX(-70%) scaleX(-1);
    width: auto;
  }
  .molly {
    bottom: calc(-1rem - 7px);
  }
  .leaning-man {
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-96%);
    --skin-color: #ffdbc2;
    --pants-color: var(--c-ui-04);
    --shoe-color: var(--c-ui-03);
    pointer-events: none;
    path#HEAD,
    path#NECK,
    path#LEFT_ARM,
    path#RIGHT_ARM {
      fill: var(--skin-color);
    }
    path#LEFT_PANTS,
    path#RIGHT_PANTS {
      fill: var(--pants-color);
    }
    path#LEFT_SHOE,
    path#RIGHT_SHOE {
      fill: var(--shoe-color);
    }
    @media screen and (max-width: 900px) {
      z-index: -1;
      right: 0;
      transform: translateX(37%);
      left: auto;
      bottom: -5%;
    }
    @media screen and (max-width: 650px) {
      opacity: 0;
    }
  }
`;

export const Filler = styled.div`
  min-width: 30vw;
  max-width: 30vw;
  @media screen and (max-width: 900px) {
    display: none;
  }
  height: 1px;
  flex: 0;
`;

export const Line = styled.div<{
  isFirst: boolean;
  expanded?: boolean;
}>`
  width: var(--line-thickness);
  height: 100%;
  min-height: 200px;
  transition: transform 0.6s var(--ease-01);
  transition: background 0.8s ease-in-out;
  background: var(--line-color);
  ${(props) =>
    props.isFirst &&
    `
  transform:translateY(var(--s-09));
`}
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const HoriLine = styled.div<{
  dir: string;
  selected: boolean;
  isHidden: boolean;
}>`
  transition: transform 1.2s ease-in-out,
    background 0.8s ease-in-out;
  transform-origin: ${(props) =>
    props.dir === "left" ? "center right" : "center left"};
  height: var(--line-thickness);
  transform: ${(props) =>
    props.isHidden ? "scaleX(0)" : "scaleX(1)"};
  background: var(--line-color);
  position: absolute;
  top: var(--s-09);
  left: ${(props) => (props.dir === "left" ? "0" : "50%")};
  right: ${(props) => (props.dir === "right" ? "0" : "50%")};
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const LineContainer = styled.div`
  padding: 0 100px;
  text-align: center;
  position: relative;
  .line-left,
  .line-right {
    position: absolute;
    width: 50vw;
  }
  .line-left {
    right: 0;
  }
  .line-right {
    left: 0;
  }
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const ItemBox = styled.div<{
  dm: boolean;
}>`
  min-width: 30vw;
  max-width: 30vw;
  @media screen and (max-width: 900px) {
    min-width: calc(100% - 6rem);
    max-width: calc(100% - 6rem);
  }
  @media screen and (max-width: 650px) {
    min-width: calc(100%);
    max-width: calc(100%);
  }
  transition: background 0.6s var(--ease-01);
  outline: 2px solid transparent;
  margin: var(--s-03) 0;
  flex: 0;
  min-height: 1px;
  background: ${(props) =>
    props.dm ? "var(--c-ui-02)" : "var(--c-ui-04)"};
  height: min-content;
  display: flex;
  flex-direction: column;
  gap: var(--s-03);
  padding: var(--s-05);
  &.isSelected {
    background: var(--c-ui-bg);
  }
  @media screen and (min-width: 1200px) {
    padding: var(--s-07);
  }
  h2,
  p,
  span,
  button {
    margin: 0;
  }
  > h2 {
    ${applyFontKind("subtitle")}
    color:var(--c-text-04) !important;
  }
  > span {
    ${applyFontKind("code")}
    color:var(--c-text-03);
  }
  > p {
    ${applyFontKind("body")}
    max-width:600px;
    color: var(--c-text-04);
  }
  > button {
    margin-top: var(--s-05);
    color: var(--c-text-04);
    &:hover {
      background: var(--c-ui-03);
    }
  }
`;

export const itemBoxInAnim = keyframes`
from {
  opacity:0;
  transform:translateY(10px);
}
`;

export const lineInAnim = keyframes`
from {
  transform:scaleX(0);
}
`;

export const ItemContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
  &.inView {
    ${HoriLine} {
      animation: ${lineInAnim} 0.4s ease-in-out;
    }
    ${ItemBox} {
      animation: ${itemBoxInAnim} 0.3s ease-in-out !important;
      animation-fill-mode: both;
      animation-delay: 0.3s;
      @media screen and (max-width: 900px) {
        animation-delay: 0s;
      }
      position: relative;
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 2rem;
        height: 1rem;
        width: 1rem;
        background: var(--c-ui-03);
        border-radius: 50%;
      }
      &.left::after {
        left: 100%;
        transform: translateX(-50%);
      }
      &.right::after {
        right: 100%;
        transform: translateX(50%);
      }
    }
  }
`;
