import { Button, Header, useDM } from "@ryfylke-react/ui";
import {
  ArrowDownward,
  TaskAlt,
  Work,
} from "@styled-icons/material";
import { ContactForm } from "components/ContactForm";
import { ExperienceSection } from "components/ExperienceSection";
import { IndexTitle } from "components/IndexTitle";
import MeSVG from "components/MeSVG";
import { Timeline, TimelineItem } from "components/Timeline";
import WavesSVG from "components/WavesSVG";
import parseFrontMatter from "front-matter-markdown";
import fs from "fs";
import useMediaQuery from "hooks/useMediaQuery";
import Markdown from "markdown-to-jsx";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import path from "path";
import React, { useEffect, useRef, useState } from "react";
import {
  ButtonContainer,
  Container,
  containerTransition,
  containerVariants,
  HeaderContainer,
} from "styles/index.styles";

type ServerTimeline = (Omit<
  TimelineItem,
  "expandedBody" | "icon"
> & {
  markdown: string;
  type: string;
})[];

const HomePage: NextPage<{
  timelineData: ServerTimeline;
}> = ({ timelineData }) => {
  const router = useRouter();
  const [contactOpen, setContactOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 650px)");
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [buttonContainerPos, setButtonContainerPos] =
    useState<number>();
  const [isScrolledPastButtons, setScrolledPastButtons] =
    useState(false);
  const { isDM } = useDM();

  const serverDataToTimelineItems = (
    item: ServerTimeline[0]
  ) => ({
    ...item,
    expandedBody: (
      <Markdown
        options={{
          wrapper: React.Fragment,
        }}
      >
        {item.markdown}
      </Markdown>
    ),
    icon: item.type === "work" ? <Work /> : <TaskAlt />,
  });

  useEffect(() => {
    if (buttonContainerRef.current) {
      const buttonScrollTop =
        buttonContainerPos ??
        buttonContainerRef.current.getBoundingClientRect().top +
          window.scrollY;
      if (!buttonContainerPos) {
        setButtonContainerPos(buttonContainerPos);
      }
      const listener = () => {
        if (
          window.scrollY >= buttonScrollTop &&
          !isScrolledPastButtons
        ) {
          setScrolledPastButtons(true);
        } else if (
          window.scrollY <= buttonScrollTop &&
          isScrolledPastButtons
        ) {
          setScrolledPastButtons(false);
        }
      };
      window.addEventListener("scroll", listener);
      return () =>
        window.removeEventListener("scroll", listener);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonContainerRef.current, isScrolledPastButtons]);

  const renderButtons = (scroller?: boolean) => (
    <>
      {scroller && isScrolledPastButtons && !isMobile && (
        <div
          style={{
            height: 72,
          }}
        />
      )}
      <ButtonContainer
        ref={scroller ? buttonContainerRef : null}
        style={
          scroller
            ? isScrolledPastButtons
              ? {
                  transition: "all 0.2s var(--ease-01)",
                  background: isDM
                    ? "rgba(0,0,0,0.2)"
                    : "rgba(255,255,255,0.2)",
                  zIndex: 2,
                  opacity: 1,
                  padding: "var(--s-04) var(--s-09)",
                  position: "fixed",
                  backdropFilter: "blur(5px)",
                  top: 0,
                  left: 0,
                  right: 0,
                  display: isMobile ? "none" : "flex",
                }
              : {
                  transition: "all 0.2s var(--ease-01)",
                  background: "var(--c-ui-bg)",
                  padding: "var(--s-03) var(--s-09)",
                  opacity: 0,
                  position: "static",
                  display: isMobile ? "none" : "flex",
                }
            : {}
        }
      >
        {!scroller && (
          <Button
            kind="primary"
            size="lg"
            ripple
            onClick={() =>
              buttonContainerRef?.current?.scrollIntoView?.({
                behavior: "smooth",
              })
            }
            icon={<ArrowDownward />}
          >
            My experience & career
          </Button>
        )}
        <Link href="/articles" passHref scroll={false}>
          <Button kind="ghost" size="lg">
            Articles by me
          </Button>
        </Link>
        <Button
          kind="ghost"
          size="lg"
          onClick={() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
            window.location.href = "#contact-me";
          }}
        >
          Contact me
        </Button>
      </ButtonContainer>
    </>
  );

  return (
    <>
      <Container
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={containerTransition}
      >
        <Head>
          <title>Håkon Underbakke | Front-end Developer</title>
          <meta
            name="description"
            content="I'm a Norwegian frontend developer currently doing contract work for my own company, Ryfylke React AS.
          I have been doing front-end focused web development professionally for the last 5 years. These days, I mostly work with React and Typescript."
          />
        </Head>
        <HeaderContainer>
          <Header order={1} key={router.asPath}>
            <IndexTitle />
          </Header>
          <Header order={3}>
            I&apos;m a Norwegian frontend developer currently
            doing contract work for my own company,{" "}
            <strong>Ryfylke React AS</strong>.
          </Header>
          <Header order={3}>
            I have been doing front-end focused web development
            professionally for the last 5 years. These days, I
            mostly work with React and Typescript.
          </Header>
          {renderButtons()}
        </HeaderContainer>
        <MeSVG />
        {contactOpen && (
          <ContactForm onClose={() => setContactOpen(false)} />
        )}
      </Container>
      {renderButtons(true)}
      <Timeline
        items={timelineData.map(serverDataToTimelineItems)}
      />
      <ExperienceSection />
      <WavesSVG
        style={{
          marginBottom: -20,
          transformOrigin: "bottom center",
          transform: "scaleY(0.7)",
          zIndex: 0,
        }}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch markdown files from `public/timelineData`
    const timelinePath = path.resolve(
      "./public",
      "timelineData"
    );
    const fileNames = fs.readdirSync(timelinePath);
    const timelineData: ServerTimeline = [];
    for (const fileName of fileNames) {
      const fileContent = fs.readFileSync(
        path.resolve("./public", "timelineData", fileName),
        "utf-8"
      );
      // Extract front matter
      const { skipSize, ...attributes } = parseFrontMatter<{
        id: string;
        title: string;
        type: string;
        subTitle: string;
        body: string;
        skipSize: number;
      }>(fileContent);
      // Extract markdown
      const markdown = fileContent.substring(skipSize);
      timelineData.push({
        ...attributes,
        markdown,
      });
    }
    // Reverse so filename that starts with highest number goes on top of the timeline
    timelineData.reverse();
    return {
      props: {
        timelineData,
      },
    };
  } catch (err) {
    return {
      props: {
        timelineData: [],
      },
    };
  }
};

export default HomePage;
