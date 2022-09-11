import { applyFontKind, Button } from "@ryfylke-react/ui";
import { ArrowLeft, EmojiPeople } from "@styled-icons/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { InnerContainer } from "styles/portfolio.styles";
import { ContactForm } from "./ContactForm";

export function ExperienceSection() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <Container>
      <InnerContainer>
        <h3>I am the most comfortable when...</h3>
        <p>
          Working from home, in teams, along designers, using
          collaborative tools and task management services such
          as Jira or Azure Devops. Fine-tuning accessible and
          creative user experiences using React and Typescript.
        </p>
        <h3>I am an expert in...</h3>
        <p>
          All the front-end fundamentals such as{" "}
          <code>HTML</code>, <code>CSS</code> and{" "}
          <code>Javascript</code>, as well as <code>React</code>,{" "}
          <code>Typescript</code>, and modern CSS solutions such
          as <code>SCSS</code> and CSS-in-JS (
          <code>styled-components</code>).
        </p>
        <h3>I have comprehensive experience with...</h3>
        <p>Designs systems and UI-libraries, such as...</p>
        <ul className="tags">
          <li>
            Carbon Design System <i> (contributor)</i>
          </li>
          <li>
            Equinor Design System <i> (contributor)</i>
          </li>
          <li>Material UI</li>
        </ul>
        <p>Javascript frameworks and tools, such as...</p>
        <ul className="tags">
          <li>React</li>
          <li>TypeScript</li>
          <li>Redux (Toolkit)</li>
          <li>NextJS</li>
          <li>gatsby</li>
          <li>yup</li>
          <li>
            <code>react-hook-form</code>
          </li>
          <li>react-query</li>
          <li>Jest</li>
          <li>Vitest</li>
          <li>Testcafe</li>
          <li>jQuery</li>
        </ul>
        <p>CSS technologies and concepts, such as...</p>
        <ul className="tags">
          <li>SCSS</li>
          <li>Animations</li>
          <li>Responsive design</li>
          <li>CSS-in-JS</li>
          <li>Modern layout (flex/grid)</li>
          <li>styled-components</li>
        </ul>
        <p>Other web development concepts, such as...</p>
        <ul className="tags">
          <li>Accessibility</li>
          <li>Security</li>
          <li>Search Engine Optimization</li>
          <li>Semantic HTML</li>
          <li>Server-side vs Client-side rendering</li>
          <li>Docker</li>
          <li>NPM</li>
          <li>Webpack</li>
          <li>Vite</li>
          <li>Unit & Functional Testing</li>
          <li>Version control (git)</li>
          <li>Jira</li>
          <li>VSTS</li>
          <li>Agile / SCRUM methodology</li>
          <li>Caching</li>
          <li>Mocking</li>
        </ul>
        <p />
        <h3>My journey</h3>
        <p>
          I started building websites back around 2010, when I
          was just 13 years old. Over the course of my formal
          education, I built many personal projects - as well as
          a few websites for local businesses.
        </p>
        <p>
          In 2016, after 2 years in electronic education, and one
          year in IT, I started working as the only IT consultant
          in a start-up legal/law-tech company (
          <Link href="https://ligl.no" target="_blank">
            LIGL AS
          </Link>
          ).
        </p>
        <p>
          At LIGL, I worked on automating the process of writing
          legal documents through ContractExpress Author - as
          well as creating a web UI for external customers to
          use.
        </p>
        <p>
          After working at LIGL for 4 years, I started working as
          a front-end consultant at{" "}
          <Link href="https://frog.co" target="_blank">
            Frog
          </Link>{" "}
          (previously Idean, part of Capgemini). At Idean/Frog, I
          was able to work at a couple of projects at Equinor,
          one of them related to their design system, EDS, as
          well as a project at NDLA (the norwegian digital
          learning area) - where I developed a educational
          game/simulation, and one internal project called{" "}
          <Link
            href="https://www.capgemini.com/pt-en/article/city-for-city/"
            target="_blank"
          >
            City for City
          </Link>
          . Lastly, I worked on a project/POC relating to graph
          visualization and data correlation, called Haystack.
        </p>
        <p>
          In 2021, I started my own company -{" "}
          <Link href="https://ryfylke.dev" target="_blank">
            Ryfylke React AS
          </Link>
          . I had a contract set up with Telenor from day 1,
          working on another data-correlation and log analysis
          project. Since then I've been working full-time on this
          project.
        </p>
        <p>
          Besides the Telenor project, I have also been working
          on my company's digital presence,{" "}
          <Link
            href="https://design.ryfylke.dev"
            target="_blank"
          >
            Ryfylke React UI
          </Link>
          , and some other internal projects not yet ready for
          launch. My company currently consists of me, as well as
          Eirik Underbakke - who works part-time as a designer.
        </p>
        <h3>You can find me on...</h3>
        <ul className="links">
          <li>
            <Link
              href="https://github.com/imp-dance"
              target="_blank"
            >
              Github
            </Link>
          </li>
          <li>
            <Link
              href="https://linkedin.com/in/hakonunderbakke"
              target="_blank"
            >
              Linkedin
            </Link>
          </li>
          <li>
            <Link
              href="https://codepen.io/schart"
              target="_blank"
            >
              Codepen
            </Link>
          </li>
        </ul>
        <p />
        <ButtonContainer>
          <Button
            kind="primary"
            onClick={() => setContactOpen(true)}
            icon={<EmojiPeople />}
          >
            Get in touch
          </Button>
          <Link href="/" passHref scroll={false}>
            <Button kind="ghost" icon={<ArrowLeft />}>
              Back to homepage
            </Button>
          </Link>
        </ButtonContainer>
        {contactOpen && (
          <ContactForm onClose={() => setContactOpen(false)} />
        )}
      </InnerContainer>
    </Container>
  );
}

const ButtonContainer = styled.div`
  margin-top: var(--s-09);
  display: flex;
  gap: var(--s-05);
  align-items: center;
`;

const Container = styled(motion.div)`
  background: var(--c-ui-bg);
  margin: 0 calc(var(--s-05) * -1);
  padding: 6rem var(--s-09);
  @media screen and (max-width: 870px) {
    margin-top: var(--s-09);
  }
  @media screen and (max-width: 600px) {
    padding: var(--s-09) var(--s-05);
  }
  @media screen and (min-width: 850px) {
    h3 {
      font-size: 2.5rem;
      color: var(--c-text-01);
      margin-bottom: var(--s-07);
    }
  }
  p + h3 {
    margin-top: 6rem;
  }
  p + p {
    margin-top: var(--s-05);
  }
  p,
  li {
    color: var(--c-text-02);
  }
  a:hover {
    text-decoration: underline;
  }
  ul {
    margin: var(--s-05) 0;
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-03);
    li {
      ${applyFontKind("small")}
      display:flex;
      padding: var(--s-03);
      background: var(--c-ui-01);
      color: var(--c-text-01);
    }
    &.links li {
      ${applyFontKind("code")}
    }
    &.tags li {
      background: var(--c-primary-02);
      color: var(--c-text-04);
      font-family: "Ubuntu Mono";
    }
  }
`;
