// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const params = new URLSearchParams(
    req.url?.split?.("?")[1] ?? ""
  );
  const fromLink = params.get("url");
  if (fromLink) {
    const existingLink =
      await prisma.$executeRaw`GET * FROM links WHERE to = "${fromLink}"`;
    console.log(existingLink);
  }
  res.status(200).json({ name: "John Doe" });
}
