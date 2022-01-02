import { ReactElement, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDiaryState } from '../services/diary/diary-state-provider';
import { useDiary } from '../services/diary/use-diary';
import { useEffectOnce } from 'react-use';
import TimeAgo from 'react-timeago';
import ReactQuill from 'react-quill';
import { ROUTES } from '../utils/routes';
import '../styles/react-quill.style.css';

const PublicDiary = (): ReactElement => {
  const { page_id } = useParams();
  const { currentDiaryPage } = useDiaryState();
  const { loadOneDiaryPage } = useDiary();
  const [isLoading, setLoading] = useState(true);

  useEffectOnce(() => {
    if (page_id) {
      loadOneDiaryPage(page_id, true).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  });

  // This never resolves lmao - fix it
  if (isLoading && !currentDiaryPage) return <>Loading...</>;

  return (
    <>
      {currentDiaryPage && (
        <>
          <div className="flex justify-center sticky diary_header_container top-0 z-10 p-2">
            <div className="diary_header">
              <div className="flex flex-col">
                <p className="text-xl">{currentDiaryPage.title}</p>
                <p className="text-sm text-slate-500">
                  {' '}
                  By {currentDiaryPage.username}
                </p>
              </div>
              <div className="flex flex-col pt-2">
                <p className="text-sm text-slate-500">
                  Updated{'  '}
                  <TimeAgo
                    date={new Date(currentDiaryPage.updated_at)}
                    live={false}
                  />
                </p>
                <p className="text-xs text-slate-500">
                  {currentDiaryPage.view_count} views
                </p>
              </div>
            </div>
          </div>
          <ReactQuill
            className="container"
            theme="snow"
            value={currentDiaryPage.content}
            modules={{ toolbar: [] }}
            readOnly
          />
        </>
      )}
      {!currentDiaryPage && <Navigate to={ROUTES.page404} />}
    </>
  );
};

export default PublicDiary;
