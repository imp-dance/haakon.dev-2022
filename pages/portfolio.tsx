import * as React from "react";
import { NextPage } from "next";
import {
  Container,
  Header,
  TitleDescription,
  YearBox,
} from "styles/portfolio.styles";
import Head from "next/head";
import {
  ChevronRight,
  Task,
  Work,
} from "@styled-icons/material";
import { Button } from "@ryfylke-react/ui";
import Link from "next/link";

export const Portfolio: NextPage = () => {
  return (
    <Container
      initial={{
        scale: 0.95,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        translateY: -30,
        opacity: 0,
      }}
      transition={{
        duration: 0.4,
        ease: "anticipate",
      }}
    >
      <Head>
        <title>Portfolio | haakon.dev</title>
      </Head>
      <Header>
        <h2>
          <Link href="/">haakon.dev</Link>
          <span>/</span>
          <span>portfolio</span>
        </h2>
        <TitleDescription>
          My relevant work experience, and related projects.
        </TitleDescription>
      </Header>

      <YearBox>
        <h3>
          <ChevronRight />
          Technologies
        </h3>
        <ul>
          <li
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <strong>Javascript</strong>
            ES6, Typescript, React, Redux, Jest, Testcafe, SSR,
            Node, Electron, jQuery
          </li>
          <li
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <strong>CSS</strong>
            SCSS, Animations, Responsive design, Performance,
            styled-components, Cross-browser compatibility
          </li>
          <li
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <strong>HTML</strong>
            HTML5, Accessibility, Hierarchy & Semantics, Search
            Engine Optimization
          </li>
          <li
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <strong>Tools</strong>
            Git, VSCode, Webpack, Babel, Jira, VSTS / Azure
            DevOps Services, Docker, NPM
          </li>
        </ul>
      </YearBox>
      <YearBox>
        <h3>
          <ChevronRight />
          2021-{new Date().getFullYear().toString()}
        </h3>
        <ul>
          <li>
            <Work title="Work" />
            Founder & Front-End Consultant at
            <strong>
              <a href="https://www.ryfylke.dev/" target="_blank">
                Ryfylke React AS
              </a>
            </strong>
            .
          </li>
          <li>
            <Task title="Work as consultant" />
            Project for{" "}
            <strong>
              <a href="https://www.telenor.no/" target="_blank">
                Telenor
              </a>
            </strong>
            , through <strong>Ryfylke React AS</strong>.
          </li>
          <li>
            <Task title="Internal project" />
            Started working on
            <strong>
              <a
                href="https://design.ryfylke.dev"
                target="_blank"
              >
                Ryfylke React UI
              </a>
            </strong>
            .
          </li>
        </ul>
      </YearBox>
      <YearBox>
        <h3>
          <ChevronRight />
          2020-2021
        </h3>
        <ul>
          <li>
            <Work title="Work" />
            Front-End Consultant at
            <strong>
              <a
                href="https://www.frog.co/"
                target="_blank"
                rel="norefferer"
              >
                Frog
              </a>
            </strong>{" "}
            (<strong>Capgemini</strong>) .
          </li>
          <li>
            <Task title="Work as consultant" />
            Project for
            <strong>
              <a
                href="https://www.equinor.com/en"
                target="_blank"
              >
                Equinor
              </a>
            </strong>{" "}
            (through <strong>Capgemini</strong>) .
          </li>
          <li>
            <Task title="Work as consultant" />
            Project for
            <strong>
              <a href="https://ndla.no/" target="_blank">
                NDLA
              </a>
            </strong>{" "}
            (through <strong>Capgemini</strong>) .
          </li>
        </ul>
      </YearBox>
      <YearBox>
        <h3>
          <ChevronRight /> 2016-2020
        </h3>
        <ul>
          <li>
            <Work title="Work" />
            Legal Tech & Web Developer at{" "}
            <strong>
              <a
                href="https://ligl.no"
                target="_blank"
                rel="norefferer"
              >
                LIGL AS
              </a>
            </strong>
            .
          </li>
          <li>
            <Task title="Internal project" />
            Made website for
            <strong>
              <a
                href="https://ligl.no"
                target="_blank"
                rel="norefferer"
              >
                LIGL Advokater / AS
              </a>
            </strong>
            .
          </li>
          <li>
            <Task title="Internal project" />
            Worked on first iterations of{" "}
            <strong>
              <Link
                href="/article/imat-ida-by-ligl-a-react-powered-pwa"
                passHref
              >
                Ida by LIGL
              </Link>
            </strong>
            .
          </li>
        </ul>
      </YearBox>
      <YearBox>
        <h3>
          <ChevronRight />
          2015
        </h3>
        <ul>
          <li>
            <Task title="Summer job" />
            Designed and developed{" "}
            <strong>
              <a
                href="https://eirik.underbakke.net"
                target="_blank"
              >
                Eirik Underbakke
              </a>
            </strong>
            's portfolio.
          </li>
        </ul>
      </YearBox>
      <YearBox>
        <h3>
          <ChevronRight />
          2014
        </h3>
        <ul>
          <li>
            <Task title="Summer job" />
            Designed and developed{" "}
            <strong>
              <Link href="/article/ryfylke-bok-it">
                Ryfylke Bok & IT
              </Link>
            </strong>
            's website.
          </li>
        </ul>
      </YearBox>
    </Container>
  );
};

export default Portfolio;
