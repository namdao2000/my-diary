import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDiary } from '../services/diary/use-diary';
import { useDebounce, useEffectOnce } from 'react-use';
import { ROUTES } from '../utils/routes';
import ReactQuill from 'react-quill';
import '../styles/react-quill.style.css';
import TimeAgo from 'react-timeago';
import { Modal } from '../components/modal';
import { toast } from 'react-hot-toast';
import { DiaryPage } from '../types/diary-page';
import { PlaceHolderLoading } from '../components/placeholder-loading';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['blockquote', 'code-block'],
  ['link'],
  ['clean'],
];

const Diary = (): ReactElement => {
  const { getOneDiaryPage, updateDiaryPage } = useDiary();
  const [diaryPage, setDiaryPage] = useState<DiaryPage>();
  const [tempDiaryTitle, setTempDiaryTitle] = useState<string>('');
  const [tempDiaryContent, setTempDiaryContent] = useState<string>('');
  const [tempDiaryIsPublic, setTempDiaryIsPublic] = useState<boolean>(false);

  const { page_id } = useParams();
  const navigate = useNavigate();
  const [isSaving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffectOnce(() => {
    if (page_id) {
      getOneDiaryPage(page_id, false).then((diary) => {
        if (!diary) {
          navigate(ROUTES.page404, { replace: true });
        }
        setDiaryPage(diary);
        setTempDiaryTitle(diary.title);
        setTempDiaryContent(diary.content);
        setTempDiaryIsPublic(diary.is_public);
      });
    }
  });

  useEffect(() => {
    if (
      diaryPage?.content !== tempDiaryContent ||
      diaryPage?.title !== tempDiaryTitle ||
      diaryPage?.is_public !== tempDiaryIsPublic
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
    if (diaryPage && page_id && (tempDiaryTitle || tempDiaryContent)) {
      if (
        tempDiaryContent !== diaryPage.content ||
        tempDiaryTitle !== diaryPage.title ||
        tempDiaryIsPublic !== diaryPage.is_public
      ) {
        updateDiaryPage({
          page_id,
          title: tempDiaryTitle,
          content: tempDiaryContent,
          is_public: tempDiaryIsPublic,
        });
        const newDiaryPage: DiaryPage = {
          ...diaryPage,
          title: tempDiaryTitle,
          content: tempDiaryContent,
          is_public: tempDiaryIsPublic,
          updated_at: new Date(),
        };
        setDiaryPage(newDiaryPage);
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

  return (
    <div className="diary_page_background">
      <div className="flex justify-center sticky diary_header_container top-0 z-10 p-2">
        <div className="diary_header">
          <div className="flex flex-col w-1/2">
            {!diaryPage && (
              <div className="pt-4">
                <PlaceHolderLoading className="h-2 mb-2" />
                <PlaceHolderLoading className="h-2 w-1/2" />
              </div>
            )}
            {diaryPage && (
              <>
                <input
                  className="text-xl cursor-pointer"
                  defaultValue={tempDiaryTitle}
                  onChange={handleTitleUpdate}
                />
                {isSaving && (
                  <p className="text-xs text-slate-500 ml-3">...saving</p>
                )}
                {!isSaving && (
                  <p className="text-xs text-slate-500">
                    Edited <TimeAgo date={new Date(diaryPage.updated_at)} />
                  </p>
                )}
              </>
            )}
          </div>
          <div className="flex">
            {!diaryPage && (
              <div className="flex items-center">
                <PlaceHolderLoading className="h-2 w-44" />
              </div>
            )}
            {diaryPage && (
              <>
                <button
                  onClick={(): void => {
                    setTempDiaryIsPublic(!tempDiaryIsPublic);
                  }}
                  className="bg-teal-500 hover:bg-teal-700 text-white font-bold text-xs py-1.5 px-2 rounded"
                >
                  {!tempDiaryIsPublic && 'Publish'}
                  {tempDiaryIsPublic && 'Un-Publish'}
                </button>
                {diaryPage.is_public && (
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
                          <p className="text-xl">{diaryPage.title}</p>
                          <p className="text-sm text-slate-500">
                            {' '}
                            By {diaryPage.username}
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
        scrollingContainer="html"
      />
    </div>
  );
};

export default Diary;
