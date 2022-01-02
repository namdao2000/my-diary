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
  is_public: boolean;
}

export interface SetDiaryPagesArgs {
  count: number;
  limit: number;
  final_page: number;
  pages: DiaryPage[];
}

export interface IUseDiaryReturn {
  loadOneDiaryPage: (page_id: string) => Promise<void>;
  loadDiaryPages: (page: number, is_public: boolean) => Promise<void>;
  createDiaryPage: (args: CreateDiaryPageArgs) => Promise<string>;
  updateDiaryPage: (args: UpdateDiaryPageArgs, callback?: () => void) => void;
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
    setTempDiaryIsPublic,
    setTempDiaryTitle,
    setTempDiaryContent,
  } = useDiaryState();

  const loadOneDiaryPage = useCallback(
    async (page_id: string): Promise<void> => {
      const result = await requestWithJWT('get', `${APP_URL}/diary/${page_id}`);
      const { content, title, is_public } = result?.data;
      setCurrentDiaryPage(result?.data);
      setTempDiaryContent(content);
      setTempDiaryTitle(title);
      setTempDiaryIsPublic(is_public);
    },
    [requestWithJWT, setCurrentDiaryPage],
  );

  const loadDiaryPages = useCallback(
    async (page: number, is_public: boolean): Promise<void> => {
      const result = await requestWithJWT(
        'get',
        `${APP_URL}/diary?page=${page}${is_public && '&is_public=true'}`,
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
    async (args: UpdateDiaryPageArgs, callback?: () => void): Promise<void> => {
      const { page_id, title, content, is_public } = args;
      await requestWithJWT('put', `${APP_URL}/diary/${page_id}`, {
        title,
        content,
        is_public,
      });
      if (currentDiaryPage) {
        const newDiaryPage: DiaryPage = {
          ...currentDiaryPage,
          page_id,
          title,
          content,
          is_public,
          updated_at: new Date(),
        };
        setCurrentDiaryPage(newDiaryPage);
      }
      if (callback) {
        callback();
      }
    },
    [requestWithJWT, setCurrentDiaryPage, currentDiaryPage],
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
