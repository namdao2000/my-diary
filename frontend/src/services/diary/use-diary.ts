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
  is_public: boolean;
}

export interface DiaryPagesReturn {
  count: number;
  limit: number;
  final_page: number;
  pages: DiaryPage[];
}

export interface IUseDiaryReturn {
  getOneDiaryPage: (page_id: string, isPublic: boolean) => Promise<DiaryPage>;
  getDiaryPages: (page: number, isPublic: boolean) => Promise<DiaryPagesReturn>;
  createDiaryPage: (args: CreateDiaryPageArgs) => Promise<string>;
  updateDiaryPage: (args: UpdateDiaryPageArgs) => void;
  deleteDiaryPage: (page_id: string, index: number) => void;
}

export const useDiary = (): IUseDiaryReturn => {
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

  const getDiaryPages = useCallback(
    async (page: number, isPublic: boolean): Promise<DiaryPagesReturn> => {
      const publicRoute = isPublic ? '/public' : '';
      const result = await requestWithJWT(
        'get',
        `${APP_URL}${publicRoute}/diary?page=${page}`,
      );
      return result?.data;
    },
    [requestWithJWT],
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
