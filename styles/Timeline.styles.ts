import { applyFontKind, Button } from "@ryfylke-react/ui";
import { motion } from "framer-motion";
import styled, { css, keyframes } from "styled-components";

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

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.001ms;
  }
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

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.001ms;
    transition-delay: 0s;
  }
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
  > div {
    max-width: 700px;
    margin: 0 auto;
    h2 {
      ${applyFontKind("h1")}
    }
    > span {
      display: flex;
      align-items: center;
      gap: var(--s-03);
      ${applyFontKind("code")}
      color: var(--c-text-03) !important;
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

    p a {
      color: var(--c-focus-01);
    }

    li a {
      color: var(--c-focus-01);
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
      /*       z-index: -1;
      right: 0;
      transform: translateX(37%);
      left: auto;
      bottom: -5%; */
      display: none;
    }
    /*     @media screen and (max-width: 650px) {
      opacity: 0;
    } */
  }
  @media screen and (max-width: 900px) {
    padding-bottom: var(--s-06);
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

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.001ms;
  }
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
  transform: ${(props) => {
    const transform = [];
    transform.push(props.isHidden ? "scaleX(0)" : "scaleX(1)");
    transform.push(
      props.dir === "left" ? "rotate(5deg)" : "rotate(-5deg)"
    );
    return transform.join(" ");
  }};

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.001ms;
  }
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

export const TimelineSectionContainer = styled.section`
  padding-top: var(--s-05);
  border-bottom: 2px solid var(--c-ui-03);

  background: var(--c-ui-bg);
  @media screen and (max-width: 900px) {
    border-bottom-width: 1px;
  }
`;

export const ItemBoxInner = styled.div<{
  dm: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: var(--s-03);
  @media screen and (min-width: 900px) {
    position: relative;
    background: ${(props) =>
      props.dm ? "var(--c-ui-02)" : "var(--c-ui-04)"};
    z-index: 2;
    margin: calc(var(--s-07) * -1);
    padding: var(--s-07);
  }
`;

const setupBubbleAnim = css`
  padding: 40px;
  --_p: 100px;
  --_g1: radial-gradient(
    50% 50%,
    var(--c-ui-04) 90%,
    #0000
  ); /* color 1 */
  --_g2: radial-gradient(
    50% 50%,
    var(--c-ui-03) 90%,
    #0000
  ); /* color 2 */
  --_g3: radial-gradient(
    50% 50%,
    var(--c-ui-02) 90%,
    #0000
  ); /* color 3 */
  --_g4: radial-gradient(
    50% 50%,
    var(--c-ui-01) 90%,
    #0000
  ); /* color 4 */
  background: var(--_g1) calc(20% - var(--_p))
      calc(20% - var(--_p)),
    var(--_g2) calc(80% + var(--_p)) calc(8% - var(--_p)),
    var(--_g3) calc(88% + var(--_p)) calc(82% + var(--_p)),
    var(--_g3) 55% calc(8% - var(--_p)),
    var(--_g1) calc(18% - var(--_p)) calc(91% + var(--_p)),
    var(--_g2) calc(10% - var(--_p)) calc(70% + var(--_p)),
    var(--_g2) calc(95% + var(--_p)) 40%,
    var(--_g1) calc(82% + var(--_p)) calc(28% - var(--_p)),
    var(--_g4) calc(12% - var(--_p)) 30%,
    var(--_g4) 65% calc(94% + var(--_p)),
    var(--_g3) calc(20% - var(--_p)) calc(10% - var(--_p)),
    var(--_g4) calc(42% - var(--_p)) calc(91% + var(--_p));
  background-size: 15px 15px, 20px 20px, 30px 30px;
  background-repeat: no-repeat;
`;

export const ItemBox = styled.div<{
  dm: boolean;
  dir: "left" | "right";
}>`
  min-width: 30vw;
  max-width: 30vw;
  transition: background 0.6s var(--ease-01),
    transform 2s var(--ease-01), opacity 2s var(--ease-01);
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
  border-radius: 15px;
  padding: var(--s-05);
  overflow: hidden;
  position: relative;
  z-index: 5;
  @media screen and (min-width: 900px) {
    transform: ${(props) =>
      props.dir === "right"
        ? "rotate3d(1, 1, 1, 0deg) scale(0.85) translateX(-9%)"
        : "rotate3d(1, 1, 1, -0deg) scale(0.85) translateX(9%)"};
  }
  &.isSelected {
    background: var(--c-ui-bg);
  }
  h2,
  p,
  span,
  button {
    margin: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.001ms;
    transition-delay: 0s;
  }
  ${ItemBoxInner} {
    > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 0.25;
      z-index: -1;
      filter: contrast(2) brightness(47%) blur(10px);
      object-fit: cover;
      height: 100%;
      @media screen and (max-width: 900px) {
        filter: contrast(2) brightness(70%) blur(15px);
      }
    }
    > h2 {
      ${applyFontKind("subtitle")}
      @media screen and (min-width: 1200px) {
        font-size: 23px;
      }
      color: var(--c-text-04) !important;
    }
    > span {
      ${applyFontKind("code")}
      color:#eddfdf !important;
      @media screen and (max-width: 900px) {
        color: #6e6969 !important;
      }
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
  }
  &::before {
    content: "";
    position: absolute;
    top: -2rem;
    bottom: -2rem;
    left: -2rem;
    right: -2rem;
    z-index: -1;
    transition: all 2s var(--ease-01);
    @media (prefers-reduced-motion: reduce) {
      transition-duration: 0.001ms;
    }
    ${setupBubbleAnim}

    clip-path: circle(0px);
    opacity: 0;
    --_p: 100px;
  }
  @media screen and (min-width: 1200px) {
    padding: var(--s-07);
  }
  @media screen and (max-width: 900px) {
    min-width: calc(100% - 6rem);
    max-width: calc(100% - 6rem);
    background: var(--c-ui-bg) !important;
    ${ItemBoxInner} {
      > h2,
      > p,
      > button {
        color: var(--c-text-01) !important;
      }
      > button:hover {
        background: var(--c-ui-02);
      }
    }
  }
  @media screen and (max-width: 650px) {
    min-width: calc(100%);
    max-width: calc(100%);
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
  ${HoriLine} {
    animation: ${lineInAnim} 0.4s ease-in-out;

    @media (prefers-reduced-motion: reduce) {
      animation-duration: 0.001ms;
      animation-delay: 0s;
    }
    opacity: 0.8;
  }
  ${ItemBox} {
    animation: ${itemBoxInAnim} 0.3s ease-in-out !important;
    animation-fill-mode: both;
    animation-delay: 0.3s;
    opacity: 0.8;
    @media screen and (max-width: 900px) {
      animation-delay: 0s;
    }
    @media (prefers-reduced-motion: reduce) {
      animation-duration: 0.001ms;
      animation-delay: 0s;
    }
  }

  @media screen and (max-width: 900px) {
    &:nth-child(even) ${ItemBox}:before {
      ${setupBubbleAnim}

      clip-path: circle(80%);
      opacity: 0.1;
      --_p: 0px;
    }
  }

  &:hover {
    ${ItemBox} {
      opacity: 1;
      transition-duration: 0.4s;
      // only apply transform when not in reduced motion
      transform: rotate3d(0, 0, 0, 0deg);

      @media (prefers-reduced-motion: reduce) {
        transition-duration: 0.001ms;
        &[dir="right"] {
          transform: rotate3d(1, 1, 1, 0deg) scale(0.85)
            translateX(-9%);
        }
        &[dir="left"] {
          transform: rotate3d(1, 1, 1, -0deg) scale(0.85)
            translateX(9%);
        }
      }
      /*  &::before {
        transition-duration: 0.4s;
        clip-path: circle(80%);
        opacity: 0.3;
        --_p: 0px;
        @media screen and (max-width: 900px) {
          opacity: 0.1;
        }
      } */
    }
    ${HoriLine} {
      transition-duration: 0.4s;

      @media (prefers-reduced-motion: reduce) {
        transition-duration: 0.001ms;
      }
      transform: rotate(0deg);
      opacity: 1;
    }
  }
`;
