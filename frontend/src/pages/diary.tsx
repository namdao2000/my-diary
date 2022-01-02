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
    tempDiaryIsPublic,
    setTempDiaryContent,
    setTempDiaryTitle,
    setTempDiaryIsPublic,
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
      loadOneDiaryPage(page_id, false).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (
      currentDiaryPage?.content !== tempDiaryContent ||
      currentDiaryPage?.title !== tempDiaryTitle ||
      currentDiaryPage?.is_public !== tempDiaryIsPublic
    ) {
      setSaving(true);
    } else {
      setSaving(false);
    }
  }, [tempDiaryContent, tempDiaryTitle, tempDiaryIsPublic]);

  const handleTitleUpdate = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTempDiaryTitle(event.target.value);
    },
    [setTempDiaryTitle],
  );

  // TODO: useCallback
  const handleUpdateDiary = (): void => {
    if (currentDiaryPage && page_id && (tempDiaryTitle || tempDiaryContent)) {
      if (
        tempDiaryContent !== currentDiaryPage.content ||
        tempDiaryTitle !== currentDiaryPage.title ||
        tempDiaryIsPublic !== currentDiaryPage.is_public
      ) {
        updateDiaryPage({
          page_id,
          title: tempDiaryTitle,
          content: tempDiaryContent,
          is_public: tempDiaryIsPublic,
        });
      }
    }
    setSaving(false);
  };

  useDebounce(
    () => {
      handleUpdateDiary();
    },
    2000,
    [tempDiaryContent, tempDiaryTitle, tempDiaryIsPublic],
  );

  if (isLoading) return <>Loading...</>;

  return (
    <>
      {currentDiaryPage && (
        <>
          <div className="flex justify-center sticky diary_header_container top-0 z-10 p-2">
            <div className="diary_header">
              <div className="flex flex-col">
                <input
                  className="text-xl cursor-pointer"
                  defaultValue={tempDiaryTitle}
                  onChange={handleTitleUpdate}
                />
                {isSaving && (
                  <p className="text-sm text-slate-500 ml-3">...saving</p>
                )}
                {!isSaving && (
                  <p className="text-xs text-slate-500">
                    Edited{' '}
                    <TimeAgo date={new Date(currentDiaryPage.updated_at)} />
                  </p>
                )}
              </div>
              <button
                onClick={(): void => {
                  setTempDiaryIsPublic(!tempDiaryIsPublic);
                }}
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold text-xs py-1 px-2 rounded"
              >
                {!tempDiaryIsPublic && 'Publish'}
                {tempDiaryIsPublic && 'Un-Publish'}
              </button>
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
