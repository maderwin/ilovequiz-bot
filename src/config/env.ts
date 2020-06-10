import dotenv from 'dotenv';
import {resolve} from 'path';

export type Environment = 'production' | 'development' | 'testing';

const environment: Environment =
    (process.env.NODE_ENV as Environment) || 'development';

['.env', `.env.${environment}`, `.env.${environment}.local`]
    .map((filename) => resolve(process.cwd(), filename))
    .forEach((path) => dotenv.config({path}));

const {env} = process;

export {env, environment};
