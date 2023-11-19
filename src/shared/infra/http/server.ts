import { CheckService } from '../../../modules/checked/domain/useCases/checkService';
import { CronService } from '../services/CronService'
class Server {
  public static start() {
    console.log("Server started");
    CronService.createJob('*/2 * * * * *', () => {
      // console.log('2 second', new Date());
      const url = 'https://www.google.com';
      new CheckService(
        () => console.log(`Success on check service ${url}`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}

Server.start();