import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useDiary } from '../services/diary/use-diary';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { DiaryListItem } from '../components/diary-list-item';
import { Pagination } from '../components/pagination';
import { DiaryPage } from '../types/diary-page';
import { DiaryListItemPlaceHolder } from '../components/diary-list-item-placeholder';

const DiaryFeed = (): ReactElement => {
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
    getDiaryPages(pageNumber, false).then((diaryPagesReturn) => {
      const { pages, final_page, count, limit } = diaryPagesReturn;
      setDiaryPages(pages);
      setCount(count);
      setFinalPage(final_page);
      setLimitPerPage(limit);
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
    if (diaryPages.length === 0) {
      return [...Array(6)].map((index, i) => (
        <DiaryListItemPlaceHolder key={i} />
      ));
    }
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
