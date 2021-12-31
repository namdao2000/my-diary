import { CreateDiaryPageArgs, UpdateDiaryPageArgs } from '../services/diary.service';
import { DB } from '../helpers/database.helper';
import { SQL_STATEMENTS } from './sql-statements';
import { v4 } from 'uuid';

export interface DiaryPageSchema {
  page_id: string;
  username: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const DiaryDataLayer = {
  createDiaryPage: async ({
    username,
    title,
    content,
  }: CreateDiaryPageArgs): Promise<void> => {
    await (
      await DB
    ).run(SQL_STATEMENTS.createDiaryPage, [v4(), username, title, content]);
  },
  updateDiaryPage: async ({
    title,
    content,
    page_id,
  }: UpdateDiaryPageArgs): Promise<void> => {
    await (await DB).run(SQL_STATEMENTS.updateDiaryPage, [title, content, page_id]);
  },
  getDiaryPageUsername: async (page_id: string): Promise<string | undefined> => {
    const result = await (await DB).get(SQL_STATEMENTS.getDiaryPageUsername, [page_id]);
    return result?.username;
  },
  deleteDiaryPage: async (page_id: string): Promise<void> => {
    await (await DB).run(SQL_STATEMENTS.deleteDiaryPage, [page_id]);
  },
  getOneDiaryPage: async (page_id: string): Promise<DiaryPageSchema | undefined> => {
    return await (await DB).get<DiaryPageSchema>(SQL_STATEMENTS.getDiaryPage, [page_id]);
  },
  getDiaryPages: async (
    username: string,
    limit: number,
    offset: number,
  ): Promise<DiaryPageSchema[]> => {
    return await (
      await DB
    ).all<DiaryPageSchema[]>(SQL_STATEMENTS.getDiaryPages, [username, limit, offset]);
  },
  getDiaryPagesCount: async (username: string): Promise<number> => {
    const result = await (await DB).get(SQL_STATEMENTS.getDiaryPagesCount, [username]);
    return result.count;
  },
};
