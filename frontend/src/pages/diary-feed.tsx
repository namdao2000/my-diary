import { ReactElement, useMemo, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { useDiary } from '../services/diary/use-diary';
import { DiaryPage } from '../types/diary-page';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { routes } from '../utils/routes';
import { DiaryListItem } from '../components/diary-list-item';

const DiaryFeed = (): ReactElement => {
  const { getDiaryPages, deleteDiaryPage } = useDiary();
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const pageNumber = pageParam ? parseInt(pageParam) : 1;
  const [diary, setDiary] = useState<DiaryPage[]>([]);
  const navigate = useNavigate();

  useEffectOnce(() => {
    getDiaryPages(pageNumber).then((data) => {
      setDiary(data);
    });
  });

  const handleSelect = (page_id: string): void => {
    navigate(`${routes.diaryFeed}/${page_id}`);
  };

  const handleDelete = async (
    page_id: string,
    index: number,
  ): Promise<void> => {
    await deleteDiaryPage(page_id);
    setDiary(
      diary.filter((value, i) => {
        return i !== index;
      }),
    );
  };

  const getDiaryListItems = useMemo(() => {
    return diary.map((diary, index) => (
      <DiaryListItem
        key={diary.page_id}
        diaryPage={diary}
        index={index}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />
    ));
  }, [diary]);

  return (
    <div>
      <p className="font-bold mb-2">Diary Entries</p>
      <div>{getDiaryListItems}</div>
    </div>
  );
};

export default DiaryFeed;
