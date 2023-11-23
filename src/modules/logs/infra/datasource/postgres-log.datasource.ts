import { SeveriryLevelEnum, prismaClient } from "../../../../shared/data/prisma";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
export class PostgresLogDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {
    const level = SeveriryLevelEnum[log.level];
    const newLog = await prismaClient.logModel.create({
      data: {
        ...log,
        level
      }
    })
    console.log("first log saved", newLog.id);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = SeveriryLevelEnum[severityLevel];
    const logs = await prismaClient.logModel.findMany({
      where: {
        level
      }
    })
    return logs.map(log => LogEntity.fromObject({
      ...log, level: log.level.toLowerCase() as LogSeverityLevel
    }));
  }

}