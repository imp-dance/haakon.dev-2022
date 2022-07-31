import { PrismaClient } from "@prisma/client";
import { GetStaticProps, NextPage } from "next";

const GenerateLink: NextPage = () => {
  return <div></div>;
};

export const getStaticProps: GetStaticProps = async ({
  params,
}) => {
  const prisma = new PrismaClient();
  await prisma.$connect();
  console.log("Hi there", params);
  if (params?.link) {
    const existingLink =
      await prisma.$queryRaw`SELECT * FROM link WHERE to = ${params.link}`;
    console.log("Existing", existingLink);
  }

  return {
    props: {},
  };
};

export default GenerateLink;
