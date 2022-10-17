import { NextApiRequest, NextApiResponse } from "next";
import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY as string,
  process.env.MAILJET_SECRET as string
);

type Response = null | {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { from, email, message } = req.body as {
    from: string;
    email: string;
    message: string;
  };
  if (!from || !message || !email) {
    return res.status(400).json({
      message: "Missing fields. (Need: from, email, message)",
    });
  }
  try {
    const response = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "mail@ryfylke.dev",
              Name: from,
            },
            To: [
              {
                Email: "hakon@ryfylke.dev",
                Name: "Håkon",
              },
            ],
            Subject: "Message (haakon.dev) from " + from,
            TextPart: message,
            HTMLPart: `From ${email}.<br/><br/>${message}`,
            CustomID: "FromHaakonDev",
          },
        ],
      });
    if (response.body) {
      return res.status(200).json(null);
    } else {
      return res.status(500).json(null);
    }
  } catch {
    return res.status(500).json(null);
  }
}
