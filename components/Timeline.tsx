import { applyFontKind, Button } from "@ryfylke-react/ui";
import { ArrowLeft, Close } from "@styled-icons/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Header } from "styles/portfolio.styles";

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
      }, 600);
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
      >
        <h2>
          <Link href="/">haakon.dev</Link>
          <span>/</span>
          <span>portfolio</span>
        </h2>
      </Header>
      <SelectedItemContainer
        initial={
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
                opacity: 0,
                translateX: 50,
                scale: 0.95,
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
                translateX: selectedItemInfo.current?.shiftLeft
                  ? 150
                  : -150,
                scale: 0.95,
                pointerEvents: "none",
              }
            : {
                opacity: 0,
                translateX: 50,
                scale: 0.95,
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
      <TimelineContainer
        variants={containerVariants}
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
            transform: "translateX(1px)",
          }}
          isFirst={false}
        />
      </TimelineContainer>
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
  const renderItem = () => (
    <ItemBox>
      <h2>{item.title}</h2>
      <span>{item.subTitle}</span>
      <p>{item.body}</p>
      <Button kind="ghost" size="sm" onClick={onSelect}>
        Read more
      </Button>
    </ItemBox>
  );

  return (
    <ItemContainer>
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
    props.selected ? "var(--c-ui-02)" : "var(--c-ui-01)"};
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
  z-index: 3;
  border: 1px solid var(--c-ui-02);
  @media screen and (max-width: 850px) {
    left: ${(props) => (props.shiftLeft ? "0rem" : "0rem")};
    right: ${(props) => (!props.shiftLeft ? "0rem" : "0rem")};
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

const TimelineContainer = styled(motion.div)`
  display: flex;
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  flex-direction: column;
  margin-top: var(--s-09);
  min-height: calc(var(--app-height, 100vh) - 8.5rem);
`;

const Filler = styled.div`
  min-width: 300px;
  max-width: 300px;
  @media screen and (max-width: 850px) {
    display: none;
  }
  height: 1px;
  flex: 0;
`;

const Line = styled.div<{
  isFirst: boolean;
  expanded?: boolean;
}>`
  width: 1px;
  height: 100%;
  min-height: 200px;
  transition: transform 0.6s var(--ease-01);
  background: var(--c-ui-02);
  ${(props) =>
    props.isFirst &&
    `
    transform:translateY(var(--s-09));
  `}
  @media screen and (max-width: 850px) {
    display: none;
  }
`;

const HoriLine = styled.div<{
  dir: string;
  selected: boolean;
}>`
  transition: transform 1.6s var(--ease-01);
  transform-origin: ${(props) =>
    props.dir === "left" ? "center right" : "center left"};
  width: 100px;
  height: 1px;
  background: ${(props) =>
    props.selected ? "var(--c-ui-02)" : "var(--c-ui-02)"};
  position: absolute;
  top: var(--s-09);
  left: ${(props) => (props.dir === "left" ? "auto" : "50%")};
  right: ${(props) => (props.dir === "right" ? "auto" : "50%")};
  @media screen and (max-width: 850px) {
    display: none;
  }
`;

const LineContainer = styled.div`
  padding: 0 100px;
  text-align: center;
  position: relative;
  @media screen and (max-width: 850px) {
    display: none;
  }
`;

const ItemBox = styled.div`
  min-width: 300px;
  max-width: 300px;
  border: 1px solid var(--c-ui-02);
  transition: outline 0.2s var(--ease-01);
  outline: 2px solid transparent;
  margin: var(--s-03) 0;
  flex: 0;
  min-height: 1px;
  &:hover {
    outline: 2px solid var(--c-focus-01);
  }
  height: min-content;
  display: flex;
  flex-direction: column;
  gap: var(--s-03);
  padding: var(--s-05);
  h2,
  p,
  span,
  button {
    margin: 0;
  }
  > h2 {
    ${applyFontKind("subtitle")}
  }
  > span {
    ${applyFontKind("code")}
    color:var(--c-text-03);
  }
  > p {
    ${applyFontKind("body")}
  }
`;

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  @media screen and (max-width: 850px) {
    flex-direction: column;
    align-items: center;
  }
`;
