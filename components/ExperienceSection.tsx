import { Button } from "@ryfylke-react/ui";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import {
  InnerContainer,
  LinksContainer,
} from "styles/portfolio.styles";
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
          as Jira and Azure Devops. Fine-tuning accessible and
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
        <ul>
          <li>
            Carbon Design System <i>(contributor)</i>
          </li>
          <li>
            Equinor Design System <i>(contributor)</i>
          </li>
          <li>Material UI</li>
        </ul>
        <p>Javascript frameworks and tools, such as...</p>
        <ul>
          <li>React</li>
          <li>NextJS</li>
          <li>gatsby</li>
          <li>Redux</li>
          <li>Yup (form validation)</li>
          <li>
            <code>react-hook-form</code>
          </li>
          <li>Jest</li>
          <li>Testcafe</li>
        </ul>
        <p>Web development concepts, such as...</p>
        <ul>
          <li>Responsive design</li>
          <li>Accessibility</li>
          <li>Security</li>
          <li>Search Engine Optimization</li>
          <li>Server-side vs Client-side rendering</li>
          <li>Animations (and animation performance)</li>
          <li>Version control (git)</li>
        </ul>
        <p />
        <h3>My other interests include...</h3>
        <ul>
          <li>
            🎶 Music production (
            <Link
              href="https://soundcloud.com/sl1ck"
              target="_blank"
            >
              sl1ck
            </Link>
            ) 🎶
          </li>
          <li>🥁 Drumming 🥁</li>
          <li>🎮 Gaming 💻</li>
        </ul>
        <p />
        <h3>You can find me on...</h3>
        <ul>
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
        <ButtonContainer>
          <Button
            kind="primary"
            onClick={() => setContactOpen(true)}
          >
            Get in touch
          </Button>
          <Link href="/" passHref scroll={false}>
            <Button kind="ghost">Back to homepage</Button>
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
  padding: var(--s-09);
  @media screen and (max-width: 850px) {
    margin-top: var(--s-09);
  }
  @media screen and (max-width: 600px) {
    padding: var(--s-09) var(--s-05);
  }
  p + h3 {
    margin-top: var(--s-09);
  }
  ul {
    margin: var(--s-05) 0;
  }
`;
