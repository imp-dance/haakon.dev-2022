import { PrismaClient } from "@prisma/client";
import { GetStaticProps, NextPage } from "next";

const GenerateLink: NextPage = () => {
  return <div></div>;
};

export const getStaticProps: GetStaticProps = async ({
  params,
}) => {
  const prisma = new PrismaClient();
  console.log("Hi there", params);
  if (params?.url) {
    const existingLink =
      await prisma.$queryRaw`SELECT * FROM link WHERE to = ${params.link}`;
    console.log("Existing", existingLink);
  }

  return {
    props: {},
  };
};

export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export default GenerateLink;
