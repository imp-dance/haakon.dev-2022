import * as React from "react";
import { NextPage } from "next";
import {
  Container,
  Header,
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

export const Portfolio: NextPage = () => {
  return (
    <Container
      initial={{
        translateY: -150,
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        translateY: 0,
        scale: 1,
        opacity: 1,
      }}
      exit={{
        translateY: -30,
        opacity: 0,
      }}
      transition={{
        duration: 0.6,
        ease: "anticipate",
      }}
    >
      <Head>
        <title>Portfolio | haakon.dev</title>
      </Head>
      <Timeline
        items={[
          {
            id: "telenor",
            title: "Telenor (project)",
            subTitle: "2021-now",
            body: "Working as a front-end consultant on a project.",
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
            body: "CEO / Front-end Consultant",
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
            id: "idean",
            title: "Idean / Frog (Capgemini)",
            subTitle: "2020-2021",
            body: "Working as a front-end consultant on a project.",
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
                  src="https://haakon.dev/city.png"
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
            body: "Legal Tech Developer",
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
                  src="https://haakon.dev/ligl.png"
                  alt="Screenshot of ligl.no website"
                />
              </>
            ),
            icon: <Work />,
            id: "ligl",
          },
        ]}
      />
    </Container>
  );
};

export default Portfolio;
