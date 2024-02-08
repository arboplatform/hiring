import { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';
import { exec } from 'child_process';
import dotenv from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import mongoose from 'mongoose';
import util from 'util';
import { v4 as uuid } from 'uuid';

dotenv.config({ path: '.env.testing' });

const execSync = util.promisify(exec);

const prismaBinary = './node_modules/.bin/prisma';

export default class PrismaTestEnvironment extends NodeEnvironment {
  private connectionString: string;

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);

    const dbHost = process.env.DATABASE_HOST;
    const dbPort = process.env.DATABASE_PORT;
    const dbName = `test_${uuid()}`;

    this.connectionString = `mongodb://${dbHost}:${dbPort}/${dbName}?authSource=admin`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execSync(`${prismaBinary} db push && ${prismaBinary} db seed`);

    return super.setup();
  }

  async teardown() {
    await mongoose.connect(this.connectionString);
    await mongoose.connection.db.dropDatabase();
    mongoose.connection.close();
  }
}
