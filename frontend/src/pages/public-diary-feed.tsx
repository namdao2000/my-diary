import { ReactElement, useEffect, useMemo } from 'react';
import { useDiaryState } from '../services/diary/diary-state-provider';
import { useDiary } from '../services/diary/use-diary';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { DiaryListItem } from '../components/diary-list-item';
import { Pagination } from '../components/pagination';

const PublicDiaryFeed = (): ReactElement => {
  const { diaryPages, count, limitPerPage, finalPage } = useDiaryState();
  const { loadDiaryPages } = useDiary();
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const pageNumber = pageParam ? parseInt(pageParam) : 1;
  const navigate = useNavigate();

  useEffect(() => {
    loadDiaryPages(pageNumber, true);
  }, [pageNumber]);

  const handleNavigate = (page: number): void => {
    navigate(`${ROUTES.publicDiaryFeed}?page=${page}`);
  };

  const handleSelect = (page_id: string): void => {
    navigate(`${ROUTES.publicDiaryFeed}/${page_id}`);
  };

  const getDiaryListItems = useMemo(() => {
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
