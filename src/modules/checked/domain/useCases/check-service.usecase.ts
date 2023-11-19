import axios from 'axios';
import { LogRepository } from '../../../logs/domain/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../../logs/domain/entities/log.entity';


interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>;
}
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private successCallback: SuccessCallback,
    private errorCallback: ErrorCallback
  ) { }

  async execute(url: string): Promise<boolean> {
    try {
      await axios.get(url);
      const log = new LogEntity(`Service ${url} is working`, LogSeverityLevel.Low);
      this.logRepository.saveLog(log);
      this.successCallback();
      return true
    } catch (error) {
      const errorMessage = `Error on check service ${url}`
      const log = new LogEntity(errorMessage, LogSeverityLevel.High);
      this.logRepository.saveLog(log);
      this.errorCallback(errorMessage);
      return false;
    }
  }
}