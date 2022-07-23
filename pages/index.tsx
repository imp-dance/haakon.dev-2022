import { Button, Header } from "@ryfylke-react/ui";
import { ContactForm } from "components/ContactForm";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import MeSVG from "../components/MeSVG";
import {
  ButtonContainer,
  Container,
  HeaderContainer,
} from "../styles/index.styles";

const Home: NextPage = () => {
  const router = useRouter();
  const [contactOpen, setContactOpen] = useState(false);
  const titleWords = [
    {
      word: "Hi,",
      delay: 0,
    },
    {
      word: "my",
      delay: 0.6,
    },
    {
      word: "name",
      delay: 0.7,
    },
    {
      word: "is",
      delay: 0.8,
    },
    {
      word: "Håkon",
      delay: 1,
    },
    {
      word: "Underbakke",
      delay: 1.2,
    },
  ];
  return (
    <Container
      initial={{
        translateY: 20,
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
      }}
      exit={{
        transform: "translateX(-15%)",
        scale: 0.8,
        opacity: 0,
      }}
      transition={{
        duration: 0.4,
        ease: "anticipate",
      }}
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
          {titleWords.map(({ word, delay }) => (
            <TitleWord word={word} delay={delay} />
          ))}
        </Header>
        <Header order={3}>
          I'm a Norwegian frontend developer currently doing
          contract work for my own company,{" "}
          <strong>Ryfylke React AS</strong>.
        </Header>
        <Header order={3}>
          {" "}
          I have been doing front-end focused web development
          professionally for the last 5 years. These days, I
          mostly work with React and Typescript.
        </Header>
        <ButtonContainer>
          <Link href="/portfolio" passHref scroll={false}>
            <Button kind="primary" size="lg" ripple>
              My experience & career
            </Button>
          </Link>
          <Link href="/articles" passHref scroll={false}>
            <Button kind="ghost" size="lg">
              Articles by me
            </Button>
          </Link>
          <Button
            kind="ghost"
            size="lg"
            onClick={() => setContactOpen(true)}
          >
            Contact me
          </Button>
        </ButtonContainer>
      </HeaderContainer>
      <MeSVG />
      {contactOpen && (
        <ContactForm onClose={() => setContactOpen(false)} />
      )}
    </Container>
  );
};

const TitleWord = ({
  word,
  delay,
}: {
  word: string;
  delay?: number;
}) => {
  return (
    <motion.span
      initial={{
        translateY: -5,
        opacity: 0.2,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.2,
        delay,
      }}
      whileInView={{
        translateY: 0,
        opacity: 1,
      }}
    >
      {word}{" "}
    </motion.span>
  );
};

export default Home;
