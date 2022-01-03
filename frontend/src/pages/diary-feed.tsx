import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { useDiary } from '../services/diary/use-diary';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { DiaryListItem } from '../components/diary-list-item';
import { Pagination } from '../components/pagination';
import { DiaryPage } from '../types/diary-page';

const DiaryFeed = (): ReactElement => {
  const [isLoading, setLoading] = useState(true);
  const [diaryPages, setDiaryPages] = useState<DiaryPage[]>([]);
  const [count, setCount] = useState<number | undefined>();
  const [limitPerPage, setLimitPerPage] = useState<number | undefined>();
  const [finalPage, setFinalPage] = useState<number | undefined>();

  const { getDiaryPages, deleteDiaryPage, createDiaryPage } = useDiary();
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const pageNumber = pageParam ? parseInt(pageParam) : 1;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getDiaryPages(pageNumber, false).then((diaryPagesReturn) => {
      const { pages, final_page, count, limit } = diaryPagesReturn;
      setDiaryPages(pages);
      setCount(count);
      setFinalPage(final_page);
      setLimitPerPage(limit);
      setLoading(false);
    });
  }, [pageNumber]);

  const handleNavigate = (page: number): void => {
    navigate(`${ROUTES.diaryFeed}?page=${page}`);
  };

  const handleSelect = (page_id: string): void => {
    navigate(`${ROUTES.diaryFeed}/${page_id}`);
  };

  const handleDelete = async (
    page_id: string,
    index: number,
  ): Promise<void> => {
    await deleteDiaryPage(page_id, index);
    setDiaryPages(
      diaryPages.filter((value, i) => {
        return i !== index;
      }),
    );
    if (count) setCount(count - 1);
  };

  const handleCreate = async (): Promise<void> => {
    const page_id = await createDiaryPage({
      title: 'New Page Title',
      content: '',
    });
    navigate(`${ROUTES.diaryFeed}/${page_id}`);
  };

  const getDiaryListItems = useMemo(() => {
    return diaryPages.map((diary, index) => (
      <DiaryListItem
        key={diary.page_id}
        diaryPage={diary}
        index={index}
        onSelect={handleSelect}
        onDelete={handleDelete}
        publicMode={false}
      />
    ));
  }, [diaryPages]);

  if (isLoading || !diaryPages) return <>Loading...</>;

  return (
    <>
      <div>
        <div className="flex justify-between mb-2">
          <p className="font-bold h-full">My Diary Entries</p>
          <button
            onClick={handleCreate}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold text-sm py-1 px-2 rounded"
          >
            New
          </button>
        </div>
        <div>{getDiaryListItems}</div>
      </div>
      {limitPerPage && count && finalPage && (
        <Pagination
          currentIndex={pageNumber}
          onNavigate={handleNavigate}
          resultsPerPage={limitPerPage}
          totalResults={count}
          finalIndex={finalPage}
        />
      )}
    </>
  );
};

export default DiaryFeed;
