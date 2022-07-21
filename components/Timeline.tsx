import { applyFontKind, Button, useDM } from "@ryfylke-react/ui";
import { ArrowLeft, Close } from "@styled-icons/material";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled, { css, keyframes } from "styled-components";
import { Header } from "styles/portfolio.styles";
import Grass from "./Grass";
import LeaningMan from "./LeaningMan";
import Luci from "./Luci";
import Molly from "./Molly";

type TimelineItem = {
  id: string;
  title: string;
  subTitle: string;
  body: string;
  expandedBody: ReactNode;
  icon: ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  const [selectedItem, setSelectedItem] = useState("");
  const [_, render] = useState(".");
  const selectedItemInfo = useRef<{
    item: TimelineItem | undefined;
    shiftLeft: boolean;
  } | null>(null);

  const containerVariants = {
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

  const headerVariants = {
    shiftedLeft: {
      translateX: "calc(-50vw + 2rem)",
      opacity: 0,
    },
    shiftedRight: {
      translateX: "calc(50vw - 2rem)",
      opacity: 0,
    },
    idle: {
      translateX: "0vw",
    },
  };

  useEffect(() => {
    if (selectedItem !== "") {
      selectedItemInfo.current = {
        item: items.find(({ id }) => id === selectedItem),
        shiftLeft:
          selectedItem === ""
            ? false
            : items.indexOf(
                items.find(
                  ({ id }) => id === selectedItem
                ) as TimelineItem
              ) %
                2 ===
              0,
      };
      render(_ + ".");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
    }
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem("");
      }
    };
    if (selectedItem !== "") {
      document.body.style.overflow = "hidden";
      document.body.addEventListener("keydown", listener);
    } else {
      document.body.style.overflow = "unset";
      document.body.removeEventListener("keydown", listener);
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.removeEventListener("keydown", listener);
    };
  }, [selectedItem]);

  useEffect(() => {
    const el = document.querySelector(
      ".selected-item-container"
    );
    if (el) {
      const cont = el as HTMLDivElement;
      cont.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        cont.querySelector("button")?.focus?.();
      }, 600);
    }
  }, [_]);

  return (
    <RelativeContainer>
      <Header
        variants={headerVariants}
        initial="idle"
        animate={
          selectedItem === ""
            ? "idle"
            : selectedItemInfo.current?.shiftLeft
            ? "shiftedLeft"
            : "shiftedRight"
        }
        transition={{
          duration: 1.2,
          ease: "anticipate",
        }}
        style={{
          margin: "var(--s-05) auto var(--s-09)",
          maxWidth: 900,
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h2>
          <Link href="/">haakon.dev</Link>
          <span>/</span>
          <span>portfolio</span>
        </h2>
      </Header>
      <SelectedItemContainer
        className="selected-item-container"
        initial={
          selectedItem === ""
            ? {
                opacity: 0,
                translateX: selectedItemInfo.current?.shiftLeft
                  ? "46%"
                  : "-46%",
                scale: 0.5,
                pointerEvents: "none",
              }
            : {
                opacity: 0,
                translateX: "46%",
                scale: 0.5,
                pointerEvents: "all",
              }
        }
        animate={
          selectedItem === ""
            ? {
                opacity: 0,
                translateX: selectedItemInfo.current?.shiftLeft
                  ? 50
                  : -50,
                scale: 0.95,
                pointerEvents: "none",
              }
            : {
                opacity: 1,
                translateX: 0,
                scale: 1,
                pointerEvents: "all",
              }
        }
        exit={
          selectedItem === ""
            ? {
                opacity: 0,
                scale: 0.5,
                pointerEvents: "none",
              }
            : {
                opacity: 0,
                scale: 0.5,
                pointerEvents: "all",
              }
        }
        transition={
          selectedItem === ""
            ? {
                delay: 0.2,
                duration: 0.4,
                ease: "easeOut",
              }
            : {
                delay: 0.6,
                duration: 0.2,
                ease: "anticipate",
              }
        }
        shiftLeft={selectedItemInfo.current?.shiftLeft}
      >
        <h2>{selectedItemInfo.current?.item?.title}</h2>
        <span>
          <CloseButton
            size="sm"
            kind="ghost"
            icon={<Close />}
            onClick={() => setSelectedItem("")}
          />
          {selectedItemInfo.current?.item?.subTitle}
        </span>
        <div>{selectedItemInfo.current?.item?.expandedBody}</div>
        <Button
          size="lg"
          kind="ghost"
          onClick={() => setSelectedItem("")}
        >
          Back to Portfolio
        </Button>
      </SelectedItemContainer>
      <motion.div
        initial={{
          translateY: 150,
          opacity: 0,
          scaleY: 0.8,
        }}
        animate={{
          translateY: 0,
          opacity: 1,
          scaleY: 1,
        }}
        transition={{
          duration: 0.8,
          ease: "anticipate",
        }}
        exit={{
          translateY: 150,
          opacity: 0,
          scaleY: 0.8,
        }}
      >
        <TimelineContainer
          variants={containerVariants}
          active={selectedItem !== ""}
          initial="idle"
          animate={
            selectedItem === ""
              ? "idle"
              : selectedItemInfo.current?.shiftLeft
              ? "shiftedLeft"
              : "shiftedRight"
          }
          transition={{
            duration: 1.2,
            ease: "anticipate",
          }}
        >
          {items.map((item, i) => (
            <TimelineItem
              item={item}
              isFirst={i === 0}
              selectedItem={selectedItem}
              dir={i % 2 === 0 ? "right" : "left"}
              onSelect={() => setSelectedItem(item.id)}
              key={item.id}
            />
          ))}
          <Line
            style={{
              alignSelf: "center",
              flexGrow: 1,
              transform: "translateX(0.5px)",
              minHeight: 500,
            }}
            isFirst={false}
          />
          <Grass className="grass" />
          <LeaningMan className="leaning-man" />
          <Luci className="luci" />
          <Molly className="molly" />
        </TimelineContainer>
      </motion.div>
    </RelativeContainer>
  );
}

function TimelineItem({
  item,
  dir,
  isFirst,
  selectedItem,
  onSelect,
}: {
  item: TimelineItem;
  dir: "left" | "right";
  isFirst: boolean;
  selectedItem: string;
  onSelect: () => void;
}) {
  const { isDM } = useDM();
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const renderItem = () => (
    <ItemBox dm={isDM}>
      <h2>{item.title}</h2>
      <span>{item.subTitle}</span>
      <p>{item.body}</p>
      <Button kind="ghost" size="field" onClick={onSelect}>
        Read more
      </Button>
    </ItemBox>
  );

  return (
    <ItemContainer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {},
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      className={inView ? "inView" : ""}
    >
      {dir === "left" && renderItem()}
      {dir !== "left" && <Filler />}
      <LineContainer>
        <Line
          isFirst={isFirst}
          expanded={selectedItem === item.id}
        />
        <HoriLine
          dir={dir}
          selected={item.id === selectedItem}
          key={`${item.id}-line`}
          isHidden={
            selectedItem !== item.id && selectedItem !== ""
          }
        />
        <IconCont selected={item.id === selectedItem}>
          {item.icon}
        </IconCont>
      </LineContainer>
      {dir === "right" && renderItem()}
      {dir !== "right" && <Filler />}
    </ItemContainer>
  );
}

const CloseButton = styled(Button)`
  position: absolute;
  top: var(--s-03);
  right: var(--s-03);
  &:active,
  &:hover,
  &:focus {
    position: absolute;
  }
  svg {
    --size: 1.25em !important;
  }
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const IconCont = styled.div<{
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

const SelectedItemContainer = styled(motion.div)<{
  shiftLeft?: boolean;
}>`
  position: fixed;
  top: var(--s-07);
  background: var(--c-ui-bg);
  padding: var(--s-07);
  left: ${(props) => (props.shiftLeft ? "108px" : "3rem")};
  right: ${(props) => (!props.shiftLeft ? "108px" : "4rem")};
  min-height: calc(100vh - 48px);
  max-height: calc(100vh - 48px);
  overflow-y: auto;

  --scrollbar-bg: var(--c-ui-bg);
  --scrollbar-border-color: var(--scrollbar-bg);
  --scrollbar-color: var(--c-ui-04);
  scrollbar-width: auto;
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

const TimelineContainer = styled(motion.div)<{
  active: boolean;
}>`
  display: flex;
  width: calc(60vw + 200px);
  max-width: 100%;
  margin: 0 auto;
  margin-top: var(--s-09);
  flex-direction: column;
  --line-color: ${(props) =>
    props.active ? "var(--c-focus-01)" : "var(--c-ui-03)"};
  --line-thickness: 2px;
  @media screen and (max-width: 900px) {
    margin-top: var(--s-05);
  }
  min-height: calc(var(--app-height, 100vh) - 8.5rem);
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

const Filler = styled.div`
  min-width: 30vw;
  max-width: 30vw;
  @media screen and (max-width: 900px) {
    display: none;
  }
  height: 1px;
  flex: 0;
`;

const Line = styled.div<{
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

const HoriLine = styled.div<{
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

const LineContainer = styled.div`
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

const ItemBox = styled.div<{
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
  transition: outline 0.2s var(--ease-01);
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
    color:var(--c-text-04);
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

const itemBoxInAnim = keyframes`
  from {
    opacity:0;
    transform:translateY(10px);
  }
`;

const lineInAnim = keyframes`
  from {
    transform:scaleX(0);
  }
`;

const ItemContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
  &.inView {
    ${HoriLine} {
      animation: ${lineInAnim} 0.3s ease-in-out;
    }
    ${ItemBox} {
      animation: ${itemBoxInAnim} 0.3s ease-in-out;
      animation-fill-mode: both;
      animation-delay: 0.3s;
      @media screen and (max-width: 900px) {
        animation-delay: 0s;
      }
    }
  }
`;
