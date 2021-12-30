/**
 * Purpose of this file is to introduce a singleton pattern.
 * Furthermore, it can also be mocked easily in the jest testing.
 *
 * Using an sqlite wrapper around sqlite3 for async / await capability
 */
import sqlite3 from 'sqlite3';
import { DB_LOCATION } from '../utils/constants';
import { open } from 'sqlite';
import { SQL_STATEMENTS } from '../data-layer/sql-statements';

export const DB = open({
  filename: DB_LOCATION,
  driver: sqlite3.Database,
});

export const initialiseDatabase = async () => {
  await (await DB).exec(SQL_STATEMENTS.initialiseDatabase);
};
