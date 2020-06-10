import {AppConfig} from './interface';
import {productionConfig} from './production';

const testingConfig: AppConfig = {
    ...productionConfig,
    server: {
        ...productionConfig.server,
        logger: {
            ...productionConfig.server.logger,
            level: 'debug',
        },
    },
};

export {testingConfig};
