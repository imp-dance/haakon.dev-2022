import { Button, useDM } from "@ryfylke-react/ui";
import { Close } from "@styled-icons/material";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  CloseButton,
  containerVariants,
  Filler,
  HoriLine,
  IconCont,
  ItemBox,
  ItemContainer,
  Line,
  LineContainer,
  pageInTransition,
  pageInVariants,
  SelectedItemContainer,
  SelectedItemTopBorder,
  selectedItemTransitions,
  selectedItemVariants,
  TimelineContainer,
} from "styles/Timeline.styles";
import Grass from "./Grass";
import LeaningMan from "./LeaningMan";
import Luci from "./Luci";
import Molly from "./Molly";

export type TimelineItem = {
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
  const router = useRouter();
  const [_, render] = useState(".");
  const selectedItemControls = useAnimation();
  const selectedItemInfo = useRef<{
    item: TimelineItem | undefined;
    shiftLeft: boolean;
  } | null>(null);

  const selectItem = (item: string) => {
    setSelectedItem(item);
    if (typeof window !== "undefined") {
      const newUrl = item ? `/?item=${item}` : "/";
      window.history.replaceState(
        { ...window.history.state, as: newUrl, url: newUrl },
        "",
        newUrl
      );
    }
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
        selectItem("");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  useEffect(() => {
    if (
      router.query.item &&
      typeof router.query.item === "string" &&
      !selectedItem
    ) {
      const element = document.querySelector<HTMLDivElement>(
        `[data-itemname="${router.query.item}"]`
      );
      if (element) {
        const position =
          element.getBoundingClientRect().top +
          window.scrollY -
          300;
        window.scrollTo({
          top: position,
        });

        setSelectedItem(router.query.item);
      }
    }
  }, [router.query.item]);

  return (
    <div style={{ borderBottom: "2px solid var(--c-ui-03)" }}>
      <SelectedItemTopBorder isOpen={selectedItem !== ""} />
      <SelectedItemContainer
        className={`selected-item-container ${
          selectedItem !== "" ? "open" : ""
        }`}
        variants={selectedItemVariants}
        initial="closed"
        animate={selectedItemControls}
        transition={
          selectedItemTransitions[
            selectedItem === "" ? "closed" : "open"
          ]
        }
        $shiftLeft={selectedItemInfo.current?.shiftLeft}
      >
        <h2>{selectedItemInfo.current?.item?.title}</h2>
        <span>
          <CloseButton
            size="sm"
            kind="ghost"
            icon={<Close />}
            onClick={() => selectItem("")}
          />
          {selectedItemInfo.current?.item?.subTitle}
        </span>
        <div>{selectedItemInfo.current?.item?.expandedBody}</div>
        <Button
          size="lg"
          kind="ghost"
          onClick={() => selectItem("")}
        >
          Back to Portfolio
        </Button>
      </SelectedItemContainer>
      <motion.div
        variants={pageInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageInTransition}
      >
        <TimelineContainer
          variants={containerVariants}
          $active={selectedItem !== ""}
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
              onSelect={() => selectItem(item.id)}
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

  const isSelected =
    selectedItem !== "" && selectedItem === item.id;

  const className = `${isSelected ? "isSelected" : ""} ${dir}`;

  const renderItem = () => (
    <ItemBox
      key={`item-box-${item.id}`}
      dm={isDM}
      className={className}
      data-itemname={item.id}
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
      className={inView ? "inView" : ""}
      animate={controls}
      variants={{
        hidden: {},
        visible: {},
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
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
