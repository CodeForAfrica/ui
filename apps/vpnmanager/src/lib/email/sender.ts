import sgMail, { MailDataRequired } from "@sendgrid/mail";
import * as Sentry from "@sentry/nextjs";

import { emailKeyTemplate } from "./templates";

interface MailSender {
  recipient: string;
  key: string;
}

export async function sendVpnKeyEmail({ recipient: to, key }: MailSender) {
  try {
    const sendGridApiKey = process.env.VPN_MANAGER_SENDGRID_API_KEY as string;
    if (!sendGridApiKey) {
      return null;
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
      html: emailKeyTemplate(key),
    };
    await sgMail.send(message);
  } catch (error) {
    Sentry.captureException(error);
  }
}