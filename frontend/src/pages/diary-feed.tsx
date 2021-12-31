import { ReactElement, useMemo, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { useDiary } from '../services/diary/use-diary';
import { DiaryPage } from '../types/diary-page';

const DiaryFeed = (): ReactElement => {
  const { getDiaryPages } = useDiary();
  const [diary, setDiary] = useState<DiaryPage[]>([]);

  useEffectOnce(() => {
    getDiaryPages().then((data) => {
      setDiary(data);
    });
  });

  const getDiaryListItems = useMemo(() => {
    return diary.map((diary) => (
      <div key={diary.page_id}>
        <p>{diary.title}</p>
        <p>{diary.content}</p>
        <p>{diary.created_at}</p>
      </div>
    ));
  }, [diary]);

  return (
    <>
      <p className="font-semibold">Diary Pages</p>
      {getDiaryListItems}
    </>
  );
};

export default DiaryFeed;
