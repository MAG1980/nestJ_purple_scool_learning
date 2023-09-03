import {DataSourceOptions} from 'typeorm';
import * as process from 'process';

const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'scool',
  password: 'learning',
  database: 'purple',
}

export default ormconfig;