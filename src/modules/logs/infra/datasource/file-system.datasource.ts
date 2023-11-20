import fs from "fs";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = 'logs/'
  private readonly allLogsPath = 'logs/logs-all.log'
  private readonly mediumLogsPath = 'logs/logs-medium.log'
  private readonly highLogsPath = 'logs/logs-high.log'
  private readonly pathToSeverityLog: Record<LogSeverityLevel, string> = {
    [LogSeverityLevel.Low]: this.allLogsPath,
    [LogSeverityLevel.Medium]: this.mediumLogsPath,
    [LogSeverityLevel.High]: this.highLogsPath
  }

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles() {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(path => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, '')
    })
  }

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(log)}\n`;
    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (this.pathToSeverityLog[log.level] && this.pathToSeverityLog[log.level] !== this.allLogsPath) {
      fs.appendFileSync(this.pathToSeverityLog[log.level], logAsJson);
    }

  }

  private getLogsFromFile(path: string): LogEntity[] {
    const content = fs.readFileSync(path, 'utf-8');
    const logs = content.split('\n').map(log => LogEntity.fromJson(log));
    return logs;
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = this.pathToSeverityLog[severityLevel];
    if (!logs) {
      throw new Error(`${severityLevel} is not a valid severity level`);
    }
    return this.getLogsFromFile(logs);
  }

}