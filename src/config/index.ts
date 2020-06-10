import {productionConfig} from './production';
import {testingConfig} from './testing';
import {developmentConfig} from './development';
import {environment, Environment, env} from './env';
import {AppConfig} from './interface';

const configDict: Record<Environment, AppConfig> = {
    production: productionConfig,
    testing: testingConfig,
    development: developmentConfig,
};

const config = configDict[environment];

const {server: serverConfig, client: clientConfig, isDev} = config;

export {config, env, environment, isDev, serverConfig, clientConfig};
