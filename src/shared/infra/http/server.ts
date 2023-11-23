import { FileSystemDatasource } from '../../../modules/logs/infra/datasource/file-system.datasource';
import { LogRepository } from '../../../modules/logs/infra/repositories/log.repository';
import { CronService } from '../services/cron.service'
import { envs } from '../../../config/plugins/envs.plugin'
// import { EmailService } from '../services/email.service';
import { CronAdapter } from '../../adapters/cron/cron.adapter'
import { CronJobAdapter } from '../../adapters/cron/cron-job.adapter';
import { SendLogServiceUseCase } from '../../../modules/logs/app/use-cases/send-log-service.usecase';
import { EmailAdapter } from '../../adapters/email/email.adapter';
import { NodeMailerAdapter } from '../../adapters/email/nodemailer.adapter';
import { LogModel, MongoDatabase } from '../../data/mongo';
import { CheckService } from '../../../modules/checked/app/use-cases/check-service.usecase';
import { MongoLogDatasource } from '../../../modules/logs/infra/datasource/mongo-log.datasource';
import { LogSeverityLevel } from '../../../modules/logs/domain/entities/log.entity';
const cronService: CronAdapter = new CronJobAdapter();
const emailService: EmailAdapter = new NodeMailerAdapter();
const logRepository = new LogRepository(
  // new FileSystemDatasource()
  new MongoLogDatasource()
);

// const emailService = new EmailService();
class Server {
  public static async start() {

    // const email
    console.log("Server started");
    console.log({ envs });
    const logs = await logRepository.getLogs(LogSeverityLevel.Low);
    console.log(logs);
    // send email
    // const emailService = new EmailService(fileSystemLogRepository);
    // emailService.sendMailWithAttachments(['willjean29@gmail.com'])
    // new SendLogServiceUseCase(emailService, fileSystemLogRepository).execute(['willjean29@gmail.com'])

    // emailService.sendMail({
    //   to: 'willjean29@gmail.com',
    //   subject: 'Logs de sistema',
    //   htmlBdoy: `
    //     <h3>Log de sistema - NOC</h3>
    //     <p>Se ha detectado un error en el sistema</p>
    //     <p>Ver archivos adjuntos</p>
    //   `,
    // });
    // cronService.createJob('*/2 * * * * *', () => {
    //   console.log('2 second', new Date());
    //   const url = 'https://www.googdddle.com';
    //   new CheckService(
    //     logRepository,
    //     () => console.log(`Success on check service ${url}`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}

(async () => {
  main();
})()

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  Server.start();
}