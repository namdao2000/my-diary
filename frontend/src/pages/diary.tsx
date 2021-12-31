import { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDiary } from '../services/diary/use-diary';
import { useEffectOnce } from 'react-use';
import { DiaryPage } from '../types/diary-page';

const Diary = (): ReactElement => {
  const { page_id } = useParams();
  const { getOneDiaryPage } = useDiary();
  const [diaryPage, setDiaryPage] = useState<DiaryPage | undefined>();
  const [isLoading, setLoading] = useState(true);
  useEffectOnce(() => {
    if (page_id) {
      getOneDiaryPage(page_id).then((data) => {
        setDiaryPage(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  });

  if (isLoading) return <>Loading...</>;

  return (
    <>
      {diaryPage && (
        <>
          <div className="w-full flex justify-between items-baseline">
            <p className="text-2xl font-semibold">{diaryPage.title}</p>
            <p className="text-lg">{diaryPage.created_at}</p>
          </div>
          <p>{diaryPage.content}</p>
        </>
      )}
      {!diaryPage && (
        <>
          <p className="text-2xl font-semibold">
            Oh Snap! Can&apos;t load this page
          </p>
        </>
      )}
    </>
  );
};

export default Diary;
