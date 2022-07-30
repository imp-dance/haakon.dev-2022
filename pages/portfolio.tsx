import { TaskAlt, Work } from "@styled-icons/material";
import { ExperienceSection } from "components/ExperienceSection";
import { Timeline, TimelineItem } from "components/Timeline";
import parseFrontMatter from "front-matter-markdown";
import fs from "fs";
import Markdown from "markdown-to-jsx";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import path from "path";
import * as React from "react";
import {
  Container,
  containerTransition,
  containerVariants,
} from "styles/portfolio.styles";

type ServerTimeline = (Omit<
  TimelineItem,
  "expandedBody" | "icon"
> & {
  markdown: string;
  type: string;
})[];

export const Portfolio: NextPage<{
  timelineData: ServerTimeline;
}> = ({ timelineData }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const ensureNoTransform = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = "";
    }
  };

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

  return (
    <Container
      ref={containerRef}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={containerTransition}
      onAnimationComplete={ensureNoTransform}
    >
      <Head>
        <title>Portfolio | haakon.dev</title>
      </Head>
      <Timeline
        items={timelineData.map(serverDataToTimelineItems)}
      />
      <ExperienceSection />
    </Container>
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

export default Portfolio;
