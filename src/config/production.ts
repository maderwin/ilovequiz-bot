import winston from 'winston';

import {AppConfig} from './interface';
import {env} from './env';

const productionConfig: AppConfig = {
    server: {
        mongodb: {
            url: env.MONGODB_URL || '',
            options: {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            },
        },
        telegram: {
            token: env.TELEGRAM_BOT_TOKEN || '',
        },
        logger: {
            level: 'info',
            format: winston.format.combine(
                winston.format.json(),
                winston.format.colorize()
            ),
            transports: [new winston.transports.Console()],
        },
        port: 8080,
    },
    client: {},
    isDev: false,
};

export {productionConfig};
