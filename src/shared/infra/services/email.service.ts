import * as path from 'path';
import { createTransport } from 'nodemailer';

interface Attachments {
  filename: string;
  path: string;
}

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBdoy: string;
  attachments?: Attachments[]
}

export class EmailService {
  private fileName: string = path.basename(__filename);
  private transport = createTransport({
    service: 'Gmail',
    auth: {
      user: 'puntospixie@gmail.com',
      pass: 'fnmbaqptilgywjsk'
    }
  });

  async sendMail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBdoy, attachments = [] } = options;
    try {
      const setInformation = await this.transport.sendMail({
        to,
        subject,
        html: htmlBdoy,
        attachments
      })
      console.log({ setInformation })
      return true;
    } catch (error) {
      console.log({ error })
      return false;
    }
  }

  async sendMailWithAttachments(to: string | string[]): Promise<boolean> {
    const subject = 'Logs de sistema';
    const htmlBdoy = `
        <h3>Log de sistema - NOC</h3>
        <p>Se ha detectado un error en el sistema</p>
        <p>Ver archivos adjuntos</p>
      `;

    const attachments: Attachments[] = [
      { filename: 'log-all.log', path: './logs/logs-all.log' },
      { filename: 'log-medium.log', path: './logs/logs-medium.log' },
      { filename: 'log-high.log', path: './logs/logs-high.log' },
    ]
    this.sendMail({
      to, subject, htmlBdoy, attachments
    });
    return true;
  }
}