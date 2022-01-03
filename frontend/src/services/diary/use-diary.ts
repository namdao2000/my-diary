import { DiaryPage } from '../../types/diary-page';
import { useCallback, useState } from 'react';
import { requestWithJWT } from '../axios/axios.wrapper';
import { APP_URL } from '../../utils/constants';
import { useDiaryState } from './diary-state-provider';

export interface CreateDiaryPageArgs {
  title: string;
  content: string;
}

export interface UpdateDiaryPageArgs extends CreateDiaryPageArgs {
  page_id: string;
  is_public: boolean;
}

export interface SetDiaryPagesArgs {
  count: number;
  limit: number;
  final_page: number;
  pages: DiaryPage[];
}

export interface IUseDiaryReturn {
  getOneDiaryPage: (page_id: string, isPublic: boolean) => Promise<DiaryPage>;
  loadDiaryPages: (page: number, isPublic: boolean) => Promise<void>;
  createDiaryPage: (args: CreateDiaryPageArgs) => Promise<string>;
  updateDiaryPage: (args: UpdateDiaryPageArgs) => void;
  deleteDiaryPage: (page_id: string, index: number) => void;
}

export const useDiary = (): IUseDiaryReturn => {
  const {
    diaryPages,
    count,
    setDiaryPages,
    setFinalPage,
    setCount,
    setLimitPerPage,
  } = useDiaryState();

  const getOneDiaryPage = useCallback(
    async (page_id: string, isPublic: boolean): Promise<DiaryPage> => {
      const publicRoute = isPublic ? '/public' : '';
      const result = await requestWithJWT(
        'get',
        `${APP_URL}${publicRoute}/diary/${page_id}`,
      );
      return result?.data;
    },
    [requestWithJWT],
  );

  const loadDiaryPages = useCallback(
    async (page: number, isPublic: boolean): Promise<void> => {
      const publicRoute = isPublic ? '/public' : '';
      const result = await requestWithJWT(
        'get',
        `${APP_URL}${publicRoute}/diary?page=${page}`,
      );
      const { pages, final_page, count, limit } = result?.data;
      setDiaryPages(pages);
      setCount(count);
      setFinalPage(final_page);
      setLimitPerPage(limit);
    },
    [requestWithJWT, setDiaryPages, setCount, setFinalPage, setLimitPerPage],
  );

  const createDiaryPage = useCallback(
    async (args: CreateDiaryPageArgs): Promise<string> => {
      const result = await requestWithJWT('post', `${APP_URL}/diary`, args);
      return result?.data.page_id;
    },
    [requestWithJWT],
  );

  const updateDiaryPage = useCallback(
    async (args: UpdateDiaryPageArgs): Promise<void> => {
      const { page_id, title, content, is_public } = args;
      await requestWithJWT('put', `${APP_URL}/diary/${page_id}`, {
        title,
        content,
        is_public,
      });
    },
    [requestWithJWT],
  );

  const deleteDiaryPage = useCallback(
    async (page_id: string, index: number): Promise<void> => {
      await requestWithJWT('delete', `${APP_URL}/diary/${page_id}`);
      setDiaryPages(
        diaryPages.filter((value, i) => {
          return i !== index;
        }),
      );
      if (count) setCount(count - 1);
    },
    [requestWithJWT, setDiaryPages, diaryPages, setCount],
  );

  return {
    getOneDiaryPage: getOneDiaryPage,
    loadDiaryPages,
    createDiaryPage,
    updateDiaryPage,
    deleteDiaryPage,
  };
};
