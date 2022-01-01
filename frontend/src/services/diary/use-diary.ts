import { DiaryPage } from '../../types/diary-page';
import { useCallback } from 'react';
import { requestWithJWT } from '../axios/axios.wrapper';
import { APP_URL } from '../../utils/constants';
import { useDiaryState } from './diary-state-provider';

export interface CreateDiaryPageArgs {
  title: string;
  content: string;
}

export interface UpdateDiaryPageArgs extends CreateDiaryPageArgs {
  page_id: string;
}

export interface SetDiaryPagesArgs {
  count: number;
  limit: number;
  final_page: number;
  pages: DiaryPage[];
}

export interface IUseDiaryReturn {
  loadOneDiaryPage: (page_id: string) => Promise<void>;
  loadDiaryPages: (page: number) => Promise<void>;
  createDiaryPage: (args: CreateDiaryPageArgs) => Promise<string>;
  updateDiaryPage: (args: UpdateDiaryPageArgs) => void;
  deleteDiaryPage: (page_id: string, index: number) => void;
}

export const useDiary = (): IUseDiaryReturn => {
  const {
    diaryPages,
    count,
    setDiaryPages,
    setCurrentDiaryPage,
    setFinalPage,
    setCount,
    setLimitPerPage,
    currentDiaryPage,
  } = useDiaryState();

  const loadOneDiaryPage = useCallback(
    async (page_id: string): Promise<void> => {
      const result = await requestWithJWT('get', `${APP_URL}/diary/${page_id}`);
      setCurrentDiaryPage(result?.data);
    },
    [requestWithJWT, setCurrentDiaryPage],
  );

  const loadDiaryPages = useCallback(
    async (page: number): Promise<void> => {
      const result = await requestWithJWT(
        'get',
        `${APP_URL}/diary?page=${page}`,
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
      const { page_id, title, content } = args;
      await requestWithJWT('put', `${APP_URL}/diary/${page_id}`, {
        title,
        content,
      });
      const newDiaryPage: DiaryPage = {
        page_id,
        username: currentDiaryPage?.username as string,
        title,
        content,
        updated_at: new Date(),
        created_at: currentDiaryPage?.created_at as Date,
      };
      setCurrentDiaryPage(newDiaryPage);
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
    loadOneDiaryPage,
    loadDiaryPages,
    createDiaryPage,
    updateDiaryPage,
    deleteDiaryPage,
  };
};
