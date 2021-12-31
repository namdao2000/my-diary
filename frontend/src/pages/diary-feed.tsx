import { ReactElement, useMemo, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { useDiary } from '../services/diary/use-diary';
import { DiaryPage } from '../types/diary-page';
import { useNavigate } from 'react-router-dom';
import { routes } from '../utils/routes';
import TimeAgo from 'react-timeago';

const DiaryPageListItem = ({
  diaryPage,
}: {
  diaryPage: DiaryPage;
}): ReactElement => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate(`${routes.diaryFeed}/${diaryPage.page_id}`);
  };
  return (
    <div
      className="flex flex-row items-center border py-2 cursor-pointer"
      onClick={handleClick}
    >
      <p className="ml-2 basis-11/12">{diaryPage.title}</p>
      <p className="ml-20 text-sm text-gray-600 basis-1/12 ">
        <TimeAgo date={new Date(diaryPage.updated_at)} />
      </p>
    </div>
  );
};

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
      <DiaryPageListItem key={diary.page_id} diaryPage={diary} />
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
