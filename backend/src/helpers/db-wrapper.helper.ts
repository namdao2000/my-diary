/**
 * Purpose of this file is to introduce a singleton pattern.
 * Furthermore, it can also be mocked easily in the jest testing.
 */
import sqlite3 from 'sqlite3';
import { DB_LOCATION } from '../utils/constants';

export const DB = new sqlite3.Database(DB_LOCATION);
