import * as winston from 'winston';
import {serverConfig} from '../../config';

const logger = winston.createLogger(serverConfig.logger);

export {logger};
