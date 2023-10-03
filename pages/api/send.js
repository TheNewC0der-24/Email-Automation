import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const timer = (time) => {
  return new Promise((res) => {
    setTimeout(() => res(true), time);
  });
}

export default async function handler(req, res) {
  const { subject, email, tasks } = req.body;
  if (!subject || !tasks || !email) {
    res.status(400).json({ invalid: true });
  }

  for (const task of tasks) {
    await resend.emails.send({
      from: "bhavyakhurana002@gmail.com",
      to: [email],
      subject,
      text: task.data.value
    });

    await timer(600000);
  }

  res.status(200).json({ invalid: false });
}