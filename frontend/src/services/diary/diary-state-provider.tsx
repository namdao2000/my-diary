import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { DiaryPage } from '../../types/diary-page';

interface IDiaryContext {
  diaryPages: DiaryPage[];
  count?: number;
  limitPerPage?: number;
  finalPage?: number;
  setDiaryPages: (diaryPages: DiaryPage[]) => void;
  setCount: (count: number) => void;
  setLimitPerPage: (limit: number) => void;
  setFinalPage: (page: number) => void;
}

export const DiaryStateContext = createContext<IDiaryContext>({
  diaryPages: [],
  setDiaryPages: (diaryPages: DiaryPage[]) => {
    throw new Error('DiaryProvider is required');
  },
  setCount: (count: number) => {
    throw new Error('DiaryProvider is required');
  },
  setLimitPerPage: (limit: number) => {
    throw new Error('DiaryProvider is required');
  },
  setFinalPage: (page: number) => {
    throw new Error('DiaryProvider is required');
  },
});

export const useDiaryState = (): IDiaryContext => useContext(DiaryStateContext);

export const DiaryStateProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [diaryPages, setDiaryPages] = useState<DiaryPage[]>([]);
  const [count, setCount] = useState<number | undefined>();
  const [limitPerPage, setLimitPerPage] = useState<number | undefined>();
  const [finalPage, setFinalPage] = useState<number | undefined>();

  return (
    <DiaryStateContext.Provider
      value={{
        diaryPages,
        count,
        limitPerPage,
        finalPage,
        setCount,
        setLimitPerPage,
        setFinalPage,
        setDiaryPages,
      }}
    >
      {children}
    </DiaryStateContext.Provider>
  );
};
