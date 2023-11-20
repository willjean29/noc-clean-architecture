import * as path from 'path';
import axios from 'axios';
import { LogRepository } from '../../../logs/domain/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../../logs/domain/entities/log.entity';
import { CheckServiceUseCase, SuccessCallback, ErrorCallback } from '../../domain/use-cases/check-service.usecase';

export class CheckService implements CheckServiceUseCase {
  private fileName: string = path.basename(__filename);
  constructor(
    private readonly logRepository: LogRepository,
    private successCallback: SuccessCallback,
    private errorCallback: ErrorCallback
  ) { }
  async execute(url: string) {
    try {
      await axios.get(url);
      const log = new LogEntity({ message: `Service ${url} is working`, level: LogSeverityLevel.Low, origin: this.fileName });
      this.logRepository.saveLog(log);
      this.successCallback();
      return true
    } catch (error) {
      const errorMessage = `Service ${url} is not working`;
      const log = new LogEntity({ message: errorMessage, level: LogSeverityLevel.High, origin: this.fileName });
      this.logRepository.saveLog(log);
      this.errorCallback(errorMessage);
      return false;
    }
  };

}

