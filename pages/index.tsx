import { Button, Header } from "@ryfylke-react/ui";
import { ContactForm } from "components/ContactForm";
import { IndexTitle } from "components/IndexTitle";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  containerTransition,
  containerVariants,
} from "styles/index.styles";
import MeSVG from "../components/MeSVG";
import {
  ButtonContainer,
  Container,
  HeaderContainer,
} from "../styles/index.styles";

const Home: NextPage = () => {
  const router = useRouter();
  const [contactOpen, setContactOpen] = useState(false);
  return (
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
          I'm a Norwegian frontend developer currently doing
          contract work for my own company,{" "}
          <strong>Ryfylke React AS</strong>.
        </Header>
        <Header order={3}>
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

export default Home;
