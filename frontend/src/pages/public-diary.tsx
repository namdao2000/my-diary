import { ReactElement, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDiary } from '../services/diary/use-diary';
import { useEffectOnce } from 'react-use';
import TimeAgo from 'react-timeago';
import ReactQuill from 'react-quill';
import { ROUTES } from '../utils/routes';
import '../styles/react-quill.style.css';
import { DiaryPage } from '../types/diary-page';

const PublicDiary = (): ReactElement => {
  const { page_id } = useParams();
  const { getOneDiaryPage } = useDiary();
  const navigate = useNavigate();
  const [diaryPage, setDiaryPage] = useState<DiaryPage>(null!);
  const [isLoading, setLoading] = useState(true);

  useEffectOnce(() => {
    if (page_id) {
      getOneDiaryPage(page_id, true).then((diary) => {
        if (!diary) {
          navigate(ROUTES.page404);
        }
        setDiaryPage(diary);
        setLoading(false);
      });
    }
  });

  if (isLoading || !diaryPage) return <>Loading...</>;

  return (
    <>
      <div className="flex justify-center sticky diary_header_container top-0 z-10 p-2">
        <div className="diary_header">
          <div className="flex flex-col">
            <p className="text-xl">{diaryPage.title}</p>
            <p className="text-sm text-slate-500"> By {diaryPage.username}</p>
          </div>
          <div className="flex flex-col pt-2">
            <p className="text-sm text-slate-500">
              Updated{'  '}
              <TimeAgo date={new Date(diaryPage.updated_at)} live={false} />
            </p>
            <p className="text-xs text-slate-500">
              {diaryPage.view_count} views
            </p>
          </div>
        </div>
      </div>
      <ReactQuill
        className="container"
        theme="snow"
        value={diaryPage.content}
        modules={{ toolbar: [] }}
        readOnly
      />
    </>
  );
};

export default PublicDiary;
