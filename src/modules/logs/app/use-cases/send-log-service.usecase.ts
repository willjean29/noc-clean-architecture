import * as path from 'path';
import { SendLogUseCase } from "../../domain/use-cases/send-log.usecase";
import { LogRepository } from '../../domain/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { EmailAdapter } from '../../../../shared/adapters/email/email.adapter';

export class SendLogServiceUseCase implements SendLogUseCase {
  private filename = path.basename(__filename);
  constructor(
    private readonly emailService: EmailAdapter,
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