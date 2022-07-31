// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, User } from "@prisma/client";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      user: User | null;
    }
  | {
      error: any;
    };

const prisma = new PrismaClient();

type PrismaError =
  | PrismaClientInitializationError
  | PrismaClientValidationError
  | PrismaClientKnownRequestError
  | PrismaClientRustPanicError;

const isPrismaError = (err: unknown): err is PrismaError => {
  return (
    err instanceof PrismaClientInitializationError ||
    err instanceof PrismaClientValidationError ||
    err instanceof PrismaClientKnownRequestError ||
    err instanceof PrismaClientRustPanicError
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const params = new URLSearchParams(
      req.url?.split?.("?")[1] ?? ""
    );
    const user = await prisma.user.findFirst();
    res.status(200).json({ user });
  } catch (err) {
    if (isPrismaError(err))
      return res.status(500).json({ error: err.message });
    return res
      .status(500)
      .json({ error: { text: "Unknown error", data: err } });
  }
}
