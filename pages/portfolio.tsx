import * as React from "react";
import { NextPage } from "next";
import {
  Container,
  Header,
  InnerContainer,
  LinksContainer,
  YearBox,
} from "styles/portfolio.styles";
import Head from "next/head";
import {
  ChevronRight,
  Task,
  TaskAlt,
  Work,
} from "@styled-icons/material";
import { Button } from "@ryfylke-react/ui";
import Link from "next/link";
import { Timeline } from "components/Timeline";
import { ExperienceSection } from "components/ExperienceSection";

export const Portfolio: NextPage = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  return (
    <Container
      ref={containerRef}
      initial={{
        translateY: 20,
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        scale: 1,
        opacity: 1,
      }}
      exit={{
        translateY: 50,
        opacity: 0,
      }}
      transition={{
        duration: 0.6,
        ease: "anticipate",
      }}
      onAnimationComplete={() => {
        if (containerRef.current) {
          containerRef.current.style.transform = "";
        }
      }}
    >
      <Head>
        <title>Portfolio | haakon.dev</title>
      </Head>
      <Timeline
        items={[
          {
            id: "ryfreact-ui",
            title: "Ryfylke React UI (project)",
            subTitle: "2022-now",
            body: "Internal design system, and UI component library for React.",
            icon: <TaskAlt />,
            expandedBody: (
              <>
                <p>
                  Ryfylke React UI is a design system that me and
                  my brother, Eirik Underbakke, have been working
                  on for a few months.
                </p>
                <p>
                  The design system includes colors, spacing
                  tokens, typography, and some UI-components. You
                  can install a package for React from NPM (
                  <code>@ryfylke-react/ui</code>) to use these
                  components.
                </p>
                <img
                  src="/ui-preview.png"
                  alt="Preview of Ryfylke React UI"
                  style={{
                    width: 350,
                    maxWidth: "100%",
                  }}
                />
                <p>
                  I've always enjoyed making detailed, accessible
                  and reusable components. This project is a a
                  nice challenge for me to create a collection of
                  matching components that go well together.
                </p>
                <p>
                  The design system takes some heavy inspiration
                  from libraries such as Carbon Design System,
                  and Material-UI.
                </p>
                <p>
                  My latest portfolio design is built using
                  Ryfylke React UI.
                </p>
                <Link
                  href="https://design.ryfylke.dev"
                  target="_blank"
                >
                  Ryfylke React UI
                </Link>
              </>
            ),
          },
          {
            id: "telenor",
            title: "Telenor (project)",
            subTitle: "2021-now",
            body: "Working as a front-end consultant on a project related to log analysis and correlation of data.",
            icon: <TaskAlt />,
            expandedBody: (
              <>
                <p>
                  Since February of 2021, I've been working as a
                  front-end consultant on a project at Telenor, a
                  Norwegian telecommunications company.
                </p>
                <p>
                  The project I'm working on is related to log
                  analysis and correlation of messages and log
                  data from hardware and software.{" "}
                </p>
                <p>
                  Although I can't disclose too much about the
                  project, I can say that it's been an amazing
                  learning experience. I've been able to work on
                  complex data visualisation components, and
                  other interesting things such as working with
                  websockets, writing functional and unit tests,
                  setting up a good developer experience, and
                  much more.
                </p>
                <p>
                  This is my own company's first contract - and I
                  will most likely be working on this for the
                  whole of 2021, possibly extending onwards.
                </p>
              </>
            ),
          },
          {
            id: "ryfreact",
            title: "Ryfylke React AS",
            subTitle: "2021-now",
            body: "Founded company. Working as an independent front-end consultant.",
            icon: <Work />,
            expandedBody: (
              <>
                <p>
                  After 9 months at Idean, because of life
                  circumstances, I've decided to leave and start
                  my own company. I'm soon going to move out of
                  the city, and needed to find a more long-term
                  remote option, beyond the current pandemic.
                </p>
                <p>
                  Although I initially looked into full-time
                  remote positions, I did get a proposal to do
                  contract work for a Norwegian
                  telecommunications company (Telenor), which I
                  figured served as a perfect springboard to
                  start my own company and start working for
                  myself.
                </p>
                <p>
                  As of now, I'm the only employee at my company
                  (
                  <Link
                    target="_blank"
                    href="https://ryfylke.dev"
                  >
                    Ryfylke React
                  </Link>
                  ). I'm still in the process of considering what
                  to do for the future. One option would be
                  delivering more of a full-stack package and
                  selling that to local businesses - another
                  would be continuing to do consultancy work for
                  larger companies outside of Suldal. The third
                  option, which is currently where I'm at - would
                  be essentially both. To achieve this in the
                  long term, I would most likely need to hire a
                  team to help me out on local projects.
                </p>
                <p>
                  On that note, if you are interested in joining
                  my team as a designer or developer (frontend or
                  backend) - please do reach out through{" "}
                  <Link
                    target="_blank"
                    href="https://ryfylke.dev"
                  >
                    our website
                  </Link>
                  .
                </p>
              </>
            ),
          },
          {
            id: "haystack",
            title: "Haystack (POC)",
            subTitle: "2020",
            body: "A proof-of-concept data-visualisation and anti-fraud software",
            icon: <TaskAlt />,
            expandedBody: (
              <>
                <p>
                  I was hired as a consultant from Idean to work
                  on developing the frontend for the proof of
                  concept for a data-visualisation and anti-fraud
                  software.
                </p>
                <p>
                  The website was developed using React.JS with
                  TypeScript and styled-components. For the
                  graphs, we used Linkurious' Ogma library. For
                  the charts, we used Nivo.
                </p>
                <p>
                  The proof of concept is running on JSON-data,
                  but the project structure is set up for a
                  future handover for further development. Some
                  of the working features include:
                </p>
                <ul>
                  <li>
                    Geo/map-mode that plots all nodes with
                    coordinates.
                  </li>
                  <li>Creating charts based on node-data.</li>
                  <li>Expand nodes to show relations.</li>
                  <li>Adding pulses to the nodes.</li>
                  <li>
                    Shortest-path algorhythm between nodes.
                  </li>
                  <li>
                    Adding filters based on node-types, with
                    conditions based on the type properties.
                  </li>
                  <li>Hiding individual nodes.</li>
                  <li>
                    Graph fullscreen-mode (for map and main
                    graph).
                  </li>
                </ul>
                <img
                  src="/haystack.png"
                  alt="Screenshot of the Haystack project."
                />
                <p>
                  While I'm not a visual-designer, I also made
                  the logo draft that's featured in the
                  screenshot above using{" "}
                  <a
                    href="https://logomaker.thehoth.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    logomaker
                  </a>
                  .
                </p>
                <p>
                  I worked on this project for a total of around
                  4 weeks - building the entire front end in that
                  time-span. I also helped demo the POC to
                  multiple clients and partners.
                </p>
              </>
            ),
          },
          {
            id: "ndla",
            title: "NDLA (game)",
            subTitle: "2020",
            body: "Developed a game for the NDLA platform",
            icon: <TaskAlt />,
            expandedBody: (
              <>
                <p>
                  This was a short project to create a
                  network-simulation game to be used in
                  IT-education on the Norwegian Digital Learning
                  Arena. The objective of the game is to connect
                  various nodes through switches to the network,
                  and to map the correct networks to the correct
                  devices. The design of the game was made by a
                  Senior Visual Designer at Idean, and I worked
                  on implementing the design myself.
                </p>
                <p>
                  The game is made in React.JS with Typescript
                  and styled-components.
                </p>
                <img
                  src="/ndla.png"
                  alt="Screenshot of the NDLA project."
                />
              </>
            ),
          },
          {
            id: "equinor",
            title: "Equinor projects",
            subTitle: "2020",
            body: "Worked on two projects for Equinor through Idean.",
            icon: <TaskAlt />,
            expandedBody: (
              <>
                <p>
                  While working as a consultant for Idean, I
                  worked on two separate Equinor projects. I'll
                  keep the descriptions a bit vauge, and with no
                  screenshots - since these are both internal
                  projects.
                </p>
                <p>
                  On the first project, related to internal
                  technology development and documenting tool, I
                  was hired as a replacement for a previous
                  frontender from Idean. There I worked for three
                  months, helping clean up various bugs and also
                  developing a few new components - including an
                  animated expandable search-field. We used the
                  SCRUM methodology with a team of between 10-20
                  developers, mostly from India. The project was
                  setup using <strong>React.JS</strong>,{" "}
                  <strong>TypeScript</strong>,{" "}
                  <strong>styled-components</strong> and{" "}
                  <strong>Formik</strong> + <strong>Yup</strong>{" "}
                  for handling forms and validation.
                </p>
                <p>
                  On the second project, related to internal
                  documentation for the various plants Equinor
                  owns, I worked "pro-bono" in-between other
                  projects. I mostly developed new generic
                  components like a Table-component and an
                  Accordion-component. The stack on this project
                  was quite similar, with <strong>React</strong>{" "}
                  and <strong>TypeScript</strong> - but this
                  project notably used <strong>LESS</strong> for
                  styling and the code-structure was more
                  class/object-oriented.
                </p>
              </>
            ),
          },
          {
            id: "byforby",
            title: "City for City",
            subTitle: "2020",
            body: "An internal project at Idean.",
            icon: <TaskAlt />,
            expandedBody: (
              <>
                <p>
                  CityforCity was started on a voluntary basis at
                  Idean Bergen. The initiative was a website
                  where small local businesses that had been
                  affected by and/or made concrete changes to
                  their operation because of the covid pandemic
                  are promoted to their local community.
                </p>
                <p>
                  The original websites for Bergen, Stavanger and
                  Oslo were all built and hosted at Squarespace,
                  but this soon showed itself to be very limiting
                  when the ambitions of the project grew.
                  Squarespace was generally bad at handling
                  articles and categorisation and it was
                  difficult to implement more complex features.
                  Because of this, we decided to develop our own
                  custom system.
                </p>
                <p>
                  My role in this project was sketching out and
                  developing the new system. I decided to go for
                  GatsbyJS for static rendering, and Strapi as a
                  CMS system. After setting up the core
                  functionality, I developed the frontend design
                  based on an Adobe XD sketch created by a UX
                  designer at Idean.
                </p>
                <Link
                  href="https://stavangerforstavanger.no"
                  target="_blank"
                >
                  <img
                    src="https://haakon.dev/city.png"
                    alt="Screenshot of cityforcity website"
                  />
                </Link>
              </>
            ),
          },
          {
            id: "idean",
            title: "Idean / Frog (Capgemini)",
            subTitle: "2020-2021",
            body: "Worked as a front-end consultant. Took part in multiple projects.",
            icon: <Work />,
            expandedBody: (
              <>
                <p>
                  I started working as a frontend developer for
                  Idean in April of 2020. Since then I've been
                  able to take part in a couple of projects,
                  namely the CityforCity initiative - as well as
                  an internal Equinor project.
                </p>
                <p>
                  Working at Idean has been my first official web
                  developer position, and has allowed me to work
                  with larger teams of other developers and
                  designers, which has greatly accelerated my
                  growth and learning.
                </p>
                <p>
                  We usually have <i>frontend friday</i> every
                  week, where me and the other frontenders
                  discuss and share news and interesting things
                  related to frontend that we've picked up over
                  the week. We also sometimes do presentations
                  for eachother on various subjects, to teach and
                  reflect.
                </p>
                <p>
                  One of my projects at Idean has been developing
                  the frontend for the City for City initiative.
                  The websites were developed using Gatsby and
                  Strapi, and were published October 2020.
                </p>
                <img
                  src="/city.png"
                  alt="Screenshot of City for City website"
                />
                <p>
                  I've also been involved in an internal project
                  at Equinor, which was my first large-scale
                  Typescript+React project. I worked on
                  developing and implementing a few new features,
                  as well as fixing bugs and testing. We used the
                  agile SCRUM methodology, which I really enjoyed
                  working with.
                </p>
              </>
            ),
          },
          {
            title: "LIGL AS",
            subTitle: "2016-2020",
            body: "Worked as a Legal Tech & Web Developer. Work related to contract automation. Start-up company. ",
            expandedBody: (
              <>
                <p>
                  I worked for LIGL AS for 4 years, from August
                  2016 - April 2020.
                </p>
                <p>
                  During my time at LIGL I worked with a great
                  range of tasks ranging from office IT-support
                  to web development and legal tech development.
                </p>
                <p>
                  While working at LIGL, I learned how to use
                  ContractExpress Author to automate legal
                  documents. I also designed a website that
                  interacts with these documents, complete with a
                  login system, rating system, backend
                  statistics, rating and sorting, and much more.
                  This website came in many iterations, but the
                  final version which is still up today is called{" "}
                  <Link
                    href="https://ida.ligl.no"
                    target="_blank"
                  >
                    Ida by LIGL
                  </Link>
                  . .
                </p>
                <img
                  src="https://ligl.no/dev8/_admin/uploads/63133-Screenshot%202019-12-16%20at%2000.02.44.png"
                  alt="Screenshot of Ida by LIGL"
                />
                <p>
                  I have also developed and designed their
                  website,{" "}
                  <a href="https://ligl.no" target="_blank">
                    ligl.no
                  </a>
                  . This project was started prior to me having
                  much experience with Javascript frameworks, so
                  it was made using PHP, HTML, CSS and jQuery.
                </p>
                <img
                  src="/ligl.png"
                  alt="Screenshot of ligl.no website"
                />
              </>
            ),
            icon: <Work />,
            id: "ligl",
          },
        ]}
      />
      <ExperienceSection />
    </Container>
  );
};

export default Portfolio;
