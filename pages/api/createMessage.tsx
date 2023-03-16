// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = JSON.parse(req.body);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_FROM_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: `Sherien A. Bane's Curriculum Vitae`,
      html: `<p>Thank you for taking the time to speak with me recently. Please follow the link below to see my current curriculum vitae:</p><br/>https://drive.google.com/drive/folders/1bQTh_WdxTGRN1iN1yuSTVzJjNpevIEL2?usp=share_link`,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Couldn't submit contact form`, err });
  }
  res.status(200).json({ name: `Form Submitted` });
}
