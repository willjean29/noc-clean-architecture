export enum LogSeverityLevel {
  Low = "low",
  Medium = "medium",
  High = "high"
}
interface LogEntityOptions {
  level: LogSeverityLevel
  message: string
  createdAt?: Date
  origin: string
}
export class LogEntity {
  public level: LogSeverityLevel
  public message: string
  public createdAt: Date
  public origin: string

  constructor(options: LogEntityOptions) {
    const { level, message, origin, createdAt = new Date() } = options;
    this.level = level
    this.message = message
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson(json: string): LogEntity {
    json = json === '' ? '{}' : json;
    const { level, message, createdAt, origin } = JSON.parse(json);
    const log = new LogEntity({ level, message, createdAt, origin });
    return log;
  }

  static fromObject(obj: LogEntity): LogEntity {
    const { level, message, createdAt, origin } = obj;
    const log = new LogEntity({ level, message, createdAt, origin });
    return log;
  }
}