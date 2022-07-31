// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from "lib/initSupabase";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      data: any | null;
    }
  | {
      error: any;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { data, error } = await supabase
      .from("links")
      .select("*");
    if (error) {
      return res.status(500).json({
        error,
      });
    }
    return res.status(200).json({
      data,
    });
  } catch (err) {
    return res.status(500).json({
      error: err ?? null,
    });
  }
}
