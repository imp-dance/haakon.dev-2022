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
import {
  RelativeContainer,
  SelectedItemContainer,
  CloseButton,
  TimelineContainer,
  Line,
  ItemBox,
  ItemContainer,
  Filler,
  LineContainer,
  HoriLine,
  IconCont,
  SelectedItemTopBorder,
} from "styles/Timeline.styles";

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
  const selectedItemControls = useAnimation();
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

  const selectedItemVariants = {
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
    }
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem("");
      }
    };
    if (selectedItem !== "") {
      selectedItemControls.start("open");
      document.body.style.overflow = "hidden";
      document.body.addEventListener("keydown", listener);
      const el = document.querySelector(
        ".selected-item-container"
      );
      if (el) {
        const div = el as HTMLDivElement;
        div.scrollTop = 0;
      }
    } else {
      selectedItemControls.start("closed");
      document.body.style.overflow = "unset";
      document.body.removeEventListener("keydown", listener);
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.removeEventListener("keydown", listener);
    };
  }, [selectedItem]);

  return (
    <div>
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
      <SelectedItemTopBorder isOpen={selectedItem !== ""} />
      <SelectedItemContainer
        className={`selected-item-container ${
          selectedItem !== "" ? "open" : ""
        }`}
        variants={selectedItemVariants}
        initial="closed"
        animate={selectedItemControls}
        transition={
          selectedItem === ""
            ? {
                delay: 0.2,
                duration: 0.6,
                ease: "easeOut",
              }
            : {
                delay: 0.5,
                duration: 0.6,
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
    </div>
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
    <ItemBox
      key={`item-box-${item.id}`}
      dm={isDM}
      className={
        selectedItem !== "" && selectedItem === item.id
          ? "isSelected"
          : ""
      }
    >
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
