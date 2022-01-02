import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useDiary } from '../services/diary/use-diary';
import { useDebounce, useEffectOnce } from 'react-use';
import { useDiaryState } from '../services/diary/diary-state-provider';
import { ROUTES } from '../utils/routes';
import ReactQuill from 'react-quill';
import '../styles/react-quill.style.css';
import TimeAgo from 'react-timeago';
import { Modal } from '../components/modal';
import { toast } from 'react-hot-toast';

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
  const [showModal, setShowModal] = useState(false);

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

  const handleShare = async (): Promise<void> => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/public/diary/${page_id}`,
    );
    toast.success('Copied to Clipboard 📋');
    setShowModal(true);
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
              <div className="flex items-end">
                <button
                  onClick={(): void => {
                    setTempDiaryIsPublic(!tempDiaryIsPublic);
                  }}
                  className="bg-teal-500 hover:bg-teal-700 text-white font-bold text-xs py-1.5 px-2 rounded"
                >
                  {!tempDiaryIsPublic && 'Publish'}
                  {tempDiaryIsPublic && 'Un-Publish'}
                </button>
                {currentDiaryPage.is_public && (
                  <>
                    <button
                      onClick={handleShare}
                      className="bg-teal-500 hover:bg-teal-700 text-white font-bold text-xs py-1.5 px-2 rounded ml-2"
                    >
                      Share
                    </button>
                    <Modal
                      width="lg:w-1/3 md:w-2/3"
                      show={showModal}
                      onClose={(): void => {
                        setShowModal(false);
                      }}
                      position="center"
                    >
                      <div className="p-4 border-b-2">
                        <p className="text-xl font-semibold">
                          Write it, Share it!
                        </p>
                      </div>
                      <div className="p-4">
                        <div className="flex flex-col mb-4">
                          <p className="text-xl">{currentDiaryPage.title}</p>
                          <p className="text-sm text-slate-500">
                            {' '}
                            By {currentDiaryPage.username}
                          </p>
                        </div>

                        <p className="mb-4">
                          This page is now accessible to anyone with that link.
                          So what are you waiting for? The world needs to see
                          what you&apos;ve just wrote ✍️
                        </p>
                        <button
                          className="bg-teal-500 hover:bg-teal-700 text-white font-bold text-sm py-1 px-2 rounded"
                          onClick={(): void => {
                            toast.success('Yes, I know 😎');
                          }}
                        >
                          That&apos;s Epic
                        </button>
                      </div>
                    </Modal>
                  </>
                )}
              </div>
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
