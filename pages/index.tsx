import { Button, Header, useDM } from "@ryfylke-react/ui";
import {
  AutoAwesome,
  TaskAlt,
  Work,
  ArrowDownward,
} from "@styled-icons/material";
import { ContactForm } from "components/ContactForm";
import { ExperienceSection } from "components/ExperienceSection";
import { IndexTitle } from "components/IndexTitle";
import MeSVG from "components/MeSVG";
import { IndexMeta } from "components/meta/indexMeta";
import { Timeline } from "components/Timeline";
import WavesSVG from "components/WavesSVG";
import { useReducedMotion } from "framer-motion";
import {
  getTimelineData,
  ServerTimeline,
} from "helpers/getTimelineData";
import useMediaQuery from "hooks/useMediaQuery";
import Markdown from "markdown-to-jsx";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  ButtonContainer,
  Container,
  containerTransition,
  containerVariants,
  HeaderContainer,
} from "styles/index.styles";
import { TimelineSectionContainer } from "styles/Timeline.styles";

const HomePage: NextPage<{
  timelineData: ServerTimeline;
}> = ({ timelineData }) => {
  const router = useRouter();
  const [contactOpen, setContactOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 750px)");
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [buttonContainerPos, setButtonContainerPos] =
    useState<number>();
  const [isScrolledPastButtons, setScrolledPastButtons] =
    useState(false);
  const shouldReduceMotion = useReducedMotion();
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
      {isMobile ? <div /> : null}
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
                behavior: shouldReduceMotion ? "auto" : "smooth",
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
              behavior: shouldReduceMotion ? "auto" : "smooth",
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
      <IndexMeta />
      <Container
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={containerTransition}
      >
        <HeaderContainer dm={isDM}>
          <Header order={1} key={router.asPath}>
            <IndexTitle />
          </Header>
          <Header
            order={2}
            style={{
              fontSize: 23,
              fontWeight: "normal",
              letterSpacing: 0,
              maxWidth: 600,
            }}
          >
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
      {/*       <HorizontalPortfolio
        items={timelineData.map(serverDataToTimelineItems)}
      /> */}
      <TimelineSectionContainer>
        {renderButtons(true)}
        <Timeline
          items={timelineData.map(serverDataToTimelineItems)}
        />
      </TimelineSectionContainer>
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
    const timelineData = await getTimelineData();
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
