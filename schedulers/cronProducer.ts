import { CronJob } from 'cron';
import agentService from '../services/AgentService';

function startProducerCron() {
    const job = new CronJob(
        '30 2 * * *',
        async () => {
            console.log('⏰ [Production] UTC 02:30 - Cron triggered...');
            try {
                const result = await agentService.GenerateVideoAsync();
                console.log(result.message);
            } catch (error) {
                console.error('🚨 Production Error --> ', error);
            }
        },
        null,
        true,
        'UTC',
    );

    job.start();
}

export default startProducerCron;
