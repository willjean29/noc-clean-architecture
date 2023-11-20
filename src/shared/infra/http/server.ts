import { CheckService } from '../../../modules/checked/domain/use-cases/check-service.usecase';
import { FileSystemDatasource } from '../../../modules/logs/infra/datasource/file-system.datasource';
import { LogRepository } from '../../../modules/logs/infra/repositories/log.repository';
import { CronService } from '../services/cron.service'
import { envs } from '../../../config/plugins/envs.plugin'
import { EmailService } from '../services/email.service';
import { SendLogService } from '../../../modules/logs/domain/use-cases/send-log-service.usecase';
const fileSystemLogRepository = new LogRepository(
  new FileSystemDatasource()
);
const emailService = new EmailService();
class Server {
  public static start() {
    console.log("Server started");
    console.log({ envs });
    // send email
    // const emailService = new EmailService(fileSystemLogRepository);
    // emailService.sendMailWithAttachments(['willjean29@gmail.com'])
    new SendLogService(emailService, fileSystemLogRepository).execute(['willjean29@gmail.com']);

    // emailService.sendMail({
    //   to: 'willjean29@gmail.com',
    //   subject: 'Logs de sistema',
    //   htmlBdoy: `
    //     <h3>Log de sistema - NOC</h3>
    //     <p>Se ha detectado un error en el sistema</p>
    //     <p>Ver archivos adjuntos</p>
    //   `,
    // });
    // CronService.createJob('*/2 * * * * *', () => {
    //   // console.log('2 second', new Date());
    //   const url = 'https://www.google.com';
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`Success on check service ${url}`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}

Server.start();