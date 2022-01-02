import { CreateDiaryPageArgs, UpdateDiaryPageArgs } from '../services/diary.service';
import { DB } from '../helpers/database.helper';
import { SQL_STATEMENTS } from './sql-statements';
import { v4 } from 'uuid';

export interface DiaryPageSchema {
  page_id: string;
  username: string;
  title: string;
  content: string;
  view_count: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export const DiaryDataLayer = {
  createDiaryPage: async ({
    username,
    title,
    content,
  }: CreateDiaryPageArgs): Promise<string> => {
    const page_id = v4();
    await (
      await DB
    ).run(SQL_STATEMENTS.createDiaryPage, [page_id, username, title, content]);
    return page_id;
  },
  updateDiaryPage: async ({
    is_public,
    title,
    content,
    page_id,
  }: UpdateDiaryPageArgs): Promise<void> => {
    await (
      await DB
    ).run(SQL_STATEMENTS.updateDiaryPage, [title, content, is_public, page_id]);
  },
  getDiaryPagePermission: async (
    page_id: string,
  ): Promise<{ username: string; is_public: boolean } | undefined> => {
    return await (await DB).get(SQL_STATEMENTS.getDiaryPageUsername, [page_id]);
  },
  deleteDiaryPage: async (page_id: string): Promise<void> => {
    await (await DB).run(SQL_STATEMENTS.deleteDiaryPage, [page_id]);
  },
  getOneDiaryPage: async (page_id: string): Promise<DiaryPageSchema | undefined> => {
    const result = await (
      await DB
    ).get<DiaryPageSchema>(SQL_STATEMENTS.getDiaryPage, [page_id]);

    if (result) {
      return {
        ...result,
        is_public: Boolean(result.is_public),
      };
    }
  },
  getDiaryPages: async (
    username: string,
    limit: number,
    offset: number,
  ): Promise<DiaryPageSchema[]> => {
    const result = await (
      await DB
    ).all<DiaryPageSchema[]>(SQL_STATEMENTS.getDiaryPages, [username, limit, offset]);

    return result.map((diary) => {
      return {
        ...diary,
        is_public: Boolean(diary.is_public),
      };
    });
  },
  getDiaryPagesCount: async (username: string): Promise<number> => {
    const result = await (await DB).get(SQL_STATEMENTS.getDiaryPagesCount, [username]);
    return result.count;
  },
  getPublicDiaryPages: async (
    limit: number,
    offset: number,
  ): Promise<DiaryPageSchema[]> => {
    return await (
      await DB
    ).all<DiaryPageSchema[]>(SQL_STATEMENTS.getPublicDiaryPages, [limit, offset]);
  },
  incrementDiaryPageViewCount: async (page_id: string): Promise<void> => {
    await (await DB).run(SQL_STATEMENTS.incrementDiaryPageViewCount, [page_id]);
  },
};
