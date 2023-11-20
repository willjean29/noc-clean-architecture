import * as path from "path";
import { EmailService } from "../../../../shared/infra/services/email.service";
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogRepository } from "../repositories/log.repository";

interface SendLogUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}
export class SendLogService implements SendLogUseCase {
  private filename = path.basename(__filename);
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) { }
  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendMailWithAttachments(to);
      if (!sent) {
        throw new Error('Email log not sent')
      }
      const log = new LogEntity({
        message: `Log email sent`,
        level: LogSeverityLevel.Low,
        origin: this.filename
      })
      this.logRepository.saveLog(log)
      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `Email log not sent`,
        level: LogSeverityLevel.High,
        origin: this.filename
      })
      this.logRepository.saveLog(log)
      return false;
    }

  }
}