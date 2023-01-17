import Head from "next/head";

type Props = {};

export const IndexMeta = ({}: Props) => {
  return (
    <Head>
      <title>Håkon Underbakke | Front-end Developer</title>
      <meta
        name="description"
        content="I'm a Norwegian frontend developer currently doing contract work for my own company, Ryfylke React AS.
    I have been doing front-end focused web development professionally for the last 5 years. These days, I mostly work with React and Typescript."
      />
    </Head>
  );
};
