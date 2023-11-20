import { LogRepository as ILogRepository } from '../../../logs/domain/repositories/log.repository'
import { LogDatasource } from '../../domain/datasource/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class LogRepository implements ILogRepository {
  constructor(
    private readonly logDatasource: LogDatasource
  ) { }
  async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.getLogs(severityLevel);
  }
}