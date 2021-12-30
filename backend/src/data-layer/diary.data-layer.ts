import { CreateDiaryPageArgs, UpdateDiaryPageArgs } from '../services/diary.service';
import { DB } from '../helpers/database.helper';
import { SQL_STATEMENTS } from './sql-statements';
import { v4 } from 'uuid';

export const DiaryDataLayer = {
  createDiaryPage: async ({ username, content }: CreateDiaryPageArgs): Promise<void> => {
    await (await DB).run(SQL_STATEMENTS.createDiaryDocument, [v4(), username, content]);
  },
  updateDiaryPage: async ({ content, page_id }: UpdateDiaryPageArgs): Promise<void> => {
    await (await DB).run(SQL_STATEMENTS.updateDiaryDocument, [content, page_id]);
  },
  getDiaryPageUsername: async (page_id: string): Promise<string | undefined> => {
    const result = await (await DB).get(SQL_STATEMENTS.getDiaryPageUsername, [page_id]);
    return result?.username;
  },
};
