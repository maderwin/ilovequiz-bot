import winston from 'winston';
import mongoose from 'mongoose';

export interface ServerConfig {
    mongodb: {
        url: string;
        options?: mongoose.ConnectionOptions;
    };
    telegram: {
        token: string;
    };
    logger: winston.LoggerOptions;
    port: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClientConfig {}

export interface AppConfig {
    isDev: boolean;
    server: ServerConfig;
    client: ClientConfig;
}
