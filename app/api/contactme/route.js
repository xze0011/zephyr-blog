import { NextResponse } from "next/server";
import { handleError, SUCCESS } from "../../../lib/common";
import nodemailer from "nodemailer";

export const POST = handleError(async (req) => {
  const { firstname, lastname, email, message } = await req.json();

  var from = process.env.GMAIL_ACCOUNT;
  var emailSubject = "New Inquiry";
  var recipient = process.env.GMAIL_RECEVIED;

  if (!firstname || !lastname || !email) {
    return NextResponse.json(
      { error: "First Name, Last Name and Email are required" },
      { status: 400 }
    );
  }

  var content = `
Hi Zephyr,
- First Name: ${firstname}
- Last Name: ${lastname}
- Email: ${email}
- Message: ${message || "N/A"}
  `;

  const mailOptions = {
    from: from,
    to: recipient,
    subject: emailSubject,
    text: content,
    bcc: from,
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_APP_KEY,
    },
  });

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
});
