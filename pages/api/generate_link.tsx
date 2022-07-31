// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  user: User | null;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const params = new URLSearchParams(
    req.url?.split?.("?")[1] ?? ""
  );
  const user = await prisma.user.findFirst();
  res.status(200).json({ user });
}
