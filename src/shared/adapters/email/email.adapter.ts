export interface Attachments {
  filename: string;
  path: string;
}

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBdoy: string;
  attachments?: Attachments[]
}

export interface EmailAdapter {
  sendMail(options: SendMailOptions): Promise<boolean>
  sendMailWithAttachments(to: string | string[]): Promise<boolean>
}