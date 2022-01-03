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
  currentDiaryPage?: DiaryPage;
  tempDiaryContent: string;
  tempDiaryTitle: string;
  tempDiaryIsPublic: boolean;
  setDiaryPages: (diaryPages: DiaryPage[]) => void;
  setCount: (count: number) => void;
  setLimitPerPage: (limit: number) => void;
  setFinalPage: (page: number) => void;
  setCurrentDiaryPage: (diaryPage: DiaryPage) => void;
  setTempDiaryContent: (content: string) => void;
  setTempDiaryTitle: (title: string) => void;
  setTempDiaryIsPublic: (isPublic: boolean) => void;
}

export const DiaryStateContext = createContext<IDiaryContext>({
  diaryPages: [],
  tempDiaryTitle: '',
  tempDiaryContent: '',
  tempDiaryIsPublic: false,
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
  setCurrentDiaryPage: (diaryPage: DiaryPage) => {
    throw new Error('DiaryProvider is required');
  },
  setTempDiaryContent: (content: string) => {
    throw new Error('DiaryProvider is required');
  },
  setTempDiaryTitle: (title: string) => {
    throw new Error('DiaryProvider is required');
  },
  setTempDiaryIsPublic: (isPublic: boolean) => {
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
  const [currentDiaryPage, setCurrentDiaryPage] = useState<
    DiaryPage | undefined
  >();
  const [count, setCount] = useState<number | undefined>();
  const [limitPerPage, setLimitPerPage] = useState<number | undefined>();
  const [finalPage, setFinalPage] = useState<number | undefined>();
  const [tempDiaryTitle, setTempDiaryTitle] = useState<string>('');
  const [tempDiaryContent, setTempDiaryContent] = useState<string>('');
  const [tempDiaryIsPublic, setTempDiaryIsPublic] = useState<boolean>(false);

  return (
    <DiaryStateContext.Provider
      value={{
        diaryPages,
        count,
        limitPerPage,
        finalPage,
        currentDiaryPage,
        tempDiaryContent,
        tempDiaryTitle,
        tempDiaryIsPublic,
        setCurrentDiaryPage,
        setCount,
        setLimitPerPage,
        setFinalPage,
        setDiaryPages,
        setTempDiaryTitle,
        setTempDiaryContent,
        setTempDiaryIsPublic,
      }}
    >
      {children}
    </DiaryStateContext.Provider>
  );
};
