import {AppConfig} from './interface';
import {testingConfig} from './testing';

const developmentConfig: AppConfig = {
    ...testingConfig,
    isDev: true,
};

export {developmentConfig};
