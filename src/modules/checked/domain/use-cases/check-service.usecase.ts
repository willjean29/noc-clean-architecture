import * as path from 'path';
import axios from 'axios';
import { LogRepository } from '../../../logs/domain/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../../logs/domain/entities/log.entity';


interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>;
}
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  private fileName: string = path.basename(__filename);
  constructor(
    private readonly logRepository: LogRepository,
    private successCallback: SuccessCallback,
    private errorCallback: ErrorCallback
  ) { }

  async execute(url: string): Promise<boolean> {
    try {
      await axios.get(url);
      const log = new LogEntity({ message: `Service ${url} is working`, level: LogSeverityLevel.Low, origin: this.fileName });
      this.logRepository.saveLog(log);
      this.successCallback();
      return true
    } catch (error) {
      const errorMessage = `Error on check service ${url}`
      const log = new LogEntity({ message: errorMessage, level: LogSeverityLevel.High, origin: this.fileName });
      this.logRepository.saveLog(log);
      this.errorCallback(errorMessage);
      return false;
    }
  }
}