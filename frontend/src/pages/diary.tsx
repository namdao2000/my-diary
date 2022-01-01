import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDiary } from '../services/diary/use-diary';
import { useDebounce, useEffectOnce } from 'react-use';
import { useDiaryState } from '../services/diary/diary-state-provider';
import { ROUTES } from '../utils/routes';
import ReactQuill from 'react-quill';
import '../styles/react-quill.style.css';
import TimeAgo from 'react-timeago';

const Diary = (): ReactElement => {
  const { page_id } = useParams();
  const {
    currentDiaryPage,
    tempDiaryTitle,
    tempDiaryContent,
    setTempDiaryContent,
    setTempDiaryTitle,
  } = useDiaryState();
  const { loadOneDiaryPage, updateDiaryPage } = useDiary();
  const [isLoading, setLoading] = useState(true);
  const [isSaving, setSaving] = useState(false);

  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    ['blockquote', 'code-block'],
    ['clean'],
  ];

  useEffectOnce(() => {
    if (page_id) {
      loadOneDiaryPage(page_id).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  });

  useDebounce(
    () => {
      if (currentDiaryPage && page_id && tempDiaryTitle && tempDiaryContent) {
        if (
          currentDiaryPage.content !== tempDiaryContent ||
          tempDiaryTitle !== currentDiaryPage.title
        ) {
          updateDiaryPage({
            page_id,
            title: tempDiaryTitle,
            content: tempDiaryContent,
          });
        }
      }
      setSaving(false);
    },
    5000,
    [tempDiaryContent, tempDiaryTitle],
  );

  useEffect(() => {
    if (
      currentDiaryPage?.content !== tempDiaryContent ||
      currentDiaryPage?.title !== tempDiaryTitle
    ) {
      setSaving(true);
    } else {
      setSaving(false);
    }
  }, [tempDiaryContent, tempDiaryTitle]);

  const handleTitleUpdate = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTempDiaryTitle(event.target.value);
    },
    [setTempDiaryTitle],
  );

  if (isLoading) return <>Loading...</>;

  return (
    <>
      {currentDiaryPage && (
        <>
          <div className="flex justify-center sticky diary_header_container top-0 z-10 p-1">
            <div className="diary_header">
              <div className="flex items-center">
                <input
                  className="text-xl cursor-pointer"
                  defaultValue={tempDiaryTitle}
                  onChange={handleTitleUpdate}
                />
                <p className="text-sm text-slate-500 ml-3">
                  {isSaving && <>...saving</>}
                </p>
              </div>
              <p className="text-sm text-slate-500 underline">
                Last edit was{' '}
                <TimeAgo date={new Date(currentDiaryPage.updated_at)} />
              </p>
            </div>
          </div>
          <ReactQuill
            className="container"
            theme="snow"
            value={tempDiaryContent}
            onChange={setTempDiaryContent}
            modules={{ toolbar: TOOLBAR_OPTIONS }}
          />
        </>
      )}
      {!currentDiaryPage && <Navigate to={ROUTES.page404} />}
    </>
  );
};

export default Diary;
