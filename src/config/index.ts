import convict from 'convict';
import dotenv from 'dotenv';
import schema from './schema';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../.env') });

const config = convict(schema);

config.validate({ allowed: 'strict' });

export default config;