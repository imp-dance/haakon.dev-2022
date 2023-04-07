import { TimelineItem } from "components/Timeline";
import parseFrontMatter from "front-matter-markdown";
import fs from "fs";
import path from "path";

export type ServerTimeline = (Omit<
  TimelineItem,
  "expandedBody" | "icon"
> & {
  markdown: string;
  type: string;
  image?: string;
})[];

export const getTimelineData = async () => {
  // Fetch markdown files from `public/timelineData`
  const timelinePath = path.resolve("./public", "timelineData");
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
      image?: string;
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
  return timelineData;
};
