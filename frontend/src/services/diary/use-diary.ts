import { DiaryPage } from '../../types/diary-page';
import { useCallback } from 'react';
import { requestWithJWT } from '../axios/axios.wrapper';
import { APP_URL } from '../../utils/constants';

export interface CreateDiaryPageArgs {
  title: string;
  content: string;
}

export interface UpdateDiaryPageArgs extends CreateDiaryPageArgs {
  page_id: string;
}

export interface IUseDiaryReturn {
  getOneDiaryPage: (page_id: string) => Promise<DiaryPage>;
  getDiaryPages: (page?: number) => Promise<DiaryPage[]>;
  createDiaryPage: (args: CreateDiaryPageArgs) => void;
  updateDiaryPage: (args: UpdateDiaryPageArgs) => void;
  deleteDiaryPage: (page_id: string) => void;
}

export const useDiary = (): IUseDiaryReturn => {
  const getOneDiaryPage = useCallback(
    async (page_id: string): Promise<DiaryPage> => {
      const result = await requestWithJWT('get', `${APP_URL}/diary/${page_id}`);
      return result?.data;
    },
    [requestWithJWT],
  );

  const getDiaryPages = useCallback(
    async (page?: number): Promise<DiaryPage[]> => {
      const result = await requestWithJWT(
        'get',
        `${APP_URL}/diary?page=${page ?? 1}`,
      );
      return result?.data.pages;
    },
    [requestWithJWT],
  );

  const createDiaryPage = useCallback(
    async (args: CreateDiaryPageArgs): Promise<void> => {
      await requestWithJWT('post', `${APP_URL}/diary`, args);
    },
    [requestWithJWT],
  );

  const updateDiaryPage = useCallback(
    async (args: UpdateDiaryPageArgs): Promise<void> => {
      await requestWithJWT('put', `${APP_URL}/diary`, args);
    },
    [requestWithJWT],
  );

  const deleteDiaryPage = useCallback(
    async (page_id: string): Promise<void> => {
      await requestWithJWT('delete', `${APP_URL}/diary/${page_id}`);
    },
    [requestWithJWT],
  );

  return {
    getOneDiaryPage,
    getDiaryPages,
    createDiaryPage,
    updateDiaryPage,
    deleteDiaryPage,
  };
};
