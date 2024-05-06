import sgMail, { MailDataRequired } from "@sendgrid/mail";
import * as Sentry from "@sentry/nextjs";

import { emailKeyTemplate } from "./templates";

interface MailSender {
  to: string;
  key: string;
  name: string;
}

export async function sendVpnKeyEmail({ to, key, name }: MailSender) {
  try {
    const sendGridApiKey = process.env.VPN_MANAGER_SENDGRID_API_KEY as string;
    if (!sendGridApiKey) {
      throw new Error("Send Grid API Key is not provided");
    }
    sgMail.setApiKey(sendGridApiKey);
    const from = {
      email: process.env.VPN_MANAGER_SENDGRID_FROM_EMAIL as string,
      name: process.env.VPN_MANAGER_SENDGRID_FROM_NAME as string,
    };
    const subject =
      process.env.VPN_MANAGER_KEY_EMAIL_SUBJECT ?? "CFA VPN Access Key";
    const message: MailDataRequired = {
      to,
      from,
      subject,
      html: emailKeyTemplate(key, name),
    };
    await sgMail.send(message);
    Sentry.withScope((scope) => {
      scope.setLevel("info");
      scope.setUser({
        email: to,
      });
      scope.addAttachment({
        filename: "email.html",
        data: emailKeyTemplate("*hidden*", name),
      });
      Sentry.captureMessage("Outline key sent");
    });
  } catch (error) {
    Sentry.captureException(error);
  }
}
