import { Button, useDM } from "@ryfylke-react/ui";
import { Close, ReadMore } from "@styled-icons/material";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  CloseButton,
  Filler,
  HoriLine,
  IconCont,
  ItemBox,
  ItemBoxInner,
  ItemContainer,
  Line,
  LineContainer,
  SelectedItemContainer,
  SelectedItemTopBorder,
  TimelineContainer,
  containerVariants,
  selectedItemTransitions,
  selectedItemVariants,
} from "styles/Timeline.styles";
import Grass from "./Grass";
import LeaningMan from "./LeaningMan";
import Luci from "./Luci";
import Molly from "./Molly";
import useMediaQuery from "hooks/useMediaQuery";

export type TimelineItem = {
  id: string;
  title: string;
  subTitle: string;
  body: string;
  expandedBody: ReactNode;
  icon: ReactNode;
  image?: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  const [selectedItem, setSelectedItem] = useState("");
  const router = useRouter();
  const [_, render] = useState(".");
  const selectedItemControls = useAnimation();
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.item]);

  return (
    <>
      <SelectedItemTopBorder isOpen={selectedItem !== ""} />
      <SelectedItemContainer
        className={`selected-item-container ${
          selectedItem !== "" ? "open" : ""
        }`}
        variants={selectedItemVariants}
        initial="closed"
        animate={selectedItemControls}
        transition={
          prefersReducedMotion
            ? {
                delay: 0,
                duration: 0.001,
                ease: "easeOut",
              }
            : selectedItemTransitions[
                selectedItem === "" ? "closed" : "open"
              ]
        }
        $shiftLeft={selectedItemInfo.current?.shiftLeft}
        aria-hidden={selectedItem === ""}
      >
        <div>
          <h2>{selectedItemInfo.current?.item?.title}</h2>
          <span>
            <CloseButton
              size="sm"
              kind="ghost"
              icon={<Close />}
              onClick={() => selectItem("")}
              aria-label="Back to Portfolio"
            />
            {selectedItemInfo.current?.item?.subTitle}
          </span>
          <div>
            {selectedItemInfo.current?.item?.expandedBody}
          </div>
          <Button
            size="lg"
            kind="ghost"
            onClick={() => selectItem("")}
          >
            Back to Portfolio
          </Button>
        </div>
      </SelectedItemContainer>
      <motion.div>
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
    </>
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
  const [, rerender] = useState();
  const isSelected =
    selectedItem !== "" && selectedItem === item.id;

  const className = `${dir}`;

  const renderItem = () => (
    <ItemBox
      dm={isDM}
      className={className}
      data-itemname={item.id}
      dir={dir}
    >
      <ItemBoxInner dm={isDM}>
        {item.image && <img src={item.image} />}
        <h2>{item.title}</h2>
        <span>{item.subTitle}</span>
        <p>{item.body}</p>
        <Button
          kind="ghost"
          size="field"
          onClick={onSelect}
          icon={<ReadMore />}
        >
          Read more
        </Button>
      </ItemBoxInner>
    </ItemBox>
  );

  useEffect(() => {
    rerender(undefined);
  }, []);

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
