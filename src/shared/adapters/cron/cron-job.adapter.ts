import { CronJob } from 'cron';
import { CronAdapter, CronTime, OnTick } from './cron.adapter';



export class CronJobAdapter implements CronAdapter {
  createJob(cronTime: CronTime, onTick: OnTick) {
    const job = new CronJob(cronTime, onTick);
    job.start();
    return job;
  }
}