import {CronJob} from 'cron';
import {fetchQuizDataFromUpstream} from './models/quiz';

interface Task {
    time: string;
    handler: () => unknown;
}

const taskList: Task[] = [
    {
        time: '*/15 * * * *',
        handler: fetchQuizDataFromUpstream,
    },
];

const jobList = taskList.map(({time, handler}) => new CronJob(time, handler));

const startCron = (): void => {
    jobList.forEach((job) => job.start());
};

const stopCron = (): void => {
    jobList.forEach((job) => job.stop());
};

export {startCron, stopCron};
