import { CreateDiaryPageArgs } from '../services/diary.service';
import { DB } from '../helpers/database.helper';
import { SQL_STATEMENTS } from './sql-statements';
import { v4 } from 'uuid';

export const DiaryDataLayer = {
  createDiaryPage: async ({ username, content }: CreateDiaryPageArgs): Promise<void> => {
    await (await DB).run(SQL_STATEMENTS.createDiaryDocument, [v4(), username, content]);
  },
};
