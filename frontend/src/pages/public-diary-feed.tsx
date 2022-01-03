import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useDiary } from '../services/diary/use-diary';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { DiaryListItem } from '../components/diary-list-item';
import { Pagination } from '../components/pagination';
import { DiaryPage } from '../types/diary-page';
import { PlaceHolderLoading } from '../components/placeholder-loading';
import { DiaryListItemPlaceHolder } from '../components/diary-list-item-placeholder';

const PublicDiaryFeed = (): ReactElement => {
  const [isLoading, setLoading] = useState(true);
  const [diaryPages, setDiaryPages] = useState<DiaryPage[]>([]);
  const [count, setCount] = useState<number | undefined>();
  const [limitPerPage, setLimitPerPage] = useState<number | undefined>();
  const [finalPage, setFinalPage] = useState<number | undefined>();

  const { getDiaryPages } = useDiary();

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
    navigate(`${ROUTES.publicDiaryFeed}?page=${page}`);
  };

  const handleSelect = (page_id: string): void => {
    navigate(`${ROUTES.publicDiaryFeed}/${page_id}`);
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
        publicMode={true}
      />
    ));
  }, [diaryPages]);

  return (
    <>
      <div>
        <div className="flex justify-between mb-2">
          <p className="font-bold h-full">Trending Pages 🔥</p>
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

export default PublicDiaryFeed;
