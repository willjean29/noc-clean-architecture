export type CronTime = string | Date;
export type OnTick = () => void;

export interface CronAdapter {
  createJob(cronTime: CronTime, onTick: OnTick): void
}