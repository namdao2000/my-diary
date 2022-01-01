import { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDiary } from '../services/diary/use-diary';
import { useEffectOnce } from 'react-use';
import { useDiaryState } from '../services/diary/diary-state-provider';

const Diary = (): ReactElement => {
  const { page_id } = useParams();
  const { currentDiaryPage } = useDiaryState();
  const { loadOneDiaryPage } = useDiary();
  const [isLoading, setLoading] = useState(true);
  useEffectOnce(() => {
    if (page_id) {
      loadOneDiaryPage(page_id).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  });

  if (isLoading) return <>Loading...</>;

  return (
    <>
      {currentDiaryPage && (
        <>
          <div className="w-full flex justify-between items-baseline">
            <p className="text-2xl font-semibold">{currentDiaryPage.title}</p>
            <p className="text-lg">{currentDiaryPage.created_at}</p>
          </div>
          <p>{currentDiaryPage.content}</p>
        </>
      )}
      {!currentDiaryPage && (
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
