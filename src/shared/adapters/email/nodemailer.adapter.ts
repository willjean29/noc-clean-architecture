import { createTransport } from 'nodemailer';
import { EmailAdapter, SendMailOptions, Attachments } from './email.adapter';
import { envs } from '../../../config/plugins/envs.plugin';


export class NodeMailerAdapter implements EmailAdapter {
  private transport = createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
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