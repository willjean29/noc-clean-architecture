import { CheckService } from '../../../modules/checked/domain/useCases/check-service.usecase';
import { FileSystemDatasource } from '../../../modules/logs/infra/datasource/file-system.datasource';
import { LogRepository } from '../../../modules/logs/infra/repositories/log.repository';
import { CronService } from '../services/CronService'
import { envs } from '../../../config/plugins/envs.plugin'
const fileSystemLogRepository = new LogRepository(
  new FileSystemDatasource()
);
class Server {
  public static start() {
    console.log("Server started");
    console.log({ envs });
    CronService.createJob('*/2 * * * * *', () => {
      // console.log('2 second', new Date());
      const url = 'https://www.gooddgle.com';
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`Success on check service ${url}`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}

Server.start();