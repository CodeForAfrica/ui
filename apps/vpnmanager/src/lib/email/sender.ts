import sgMail, { MailDataRequired } from "@sendgrid/mail";
import * as Sentry from "@sentry/nextjs";

import { emailKeyTemplate } from "./templates";

interface MailSender {
  recipient: string;
  key: string;
  name: string;
}

export async function sendVpnKeyEmail({
  recipient: to,
  key,
  name,
}: MailSender) {
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
    Sentry.captureMessage(`Email sent to "${to}" ${emailKeyTemplate(key, name)}`, 'info');
  } catch (error) {
    Sentry.captureException(error);
  }
}
