import { DiaryPage } from '../types/diary-page';
import { ReactElement, useState } from 'react';
import TimeAgo from 'react-timeago';
import ClickAwayListener from 'react-click-away-listener';

export const DiaryListItem = ({
  diaryPage,
  index,
  onSelect,
  onDelete,
  publicMode,
}: {
  diaryPage: DiaryPage;
  index: number;
  publicMode: boolean;
  onSelect: (page_id: string) => void;
  onDelete?: (page_id: string, index: number) => void;
}): ReactElement => {
  const { page_id, title, updated_at, is_public } = diaryPage;
  const [confirmDeleteState, setConfirmDeleteState] = useState(false);

  const onConfirmDelete = (): void => {
    if (!onDelete) return;
    onDelete(page_id, index);
    setConfirmDeleteState(false);
  };

  return (
    <div className="flex flex-row items-center border py-2">
      <div
        className="ml-2 basis-8/12 cursor-pointer flex flex-col"
        onClick={(): void => onSelect(page_id)}
      >
        <div className="font-semibold flex items-center">
          <p>{title}</p>
          {is_public && !publicMode && (
            <p className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
              Public
            </p>
          )}
        </div>
        <div className="text-xs text-gray-600">
          <p> By {diaryPage.username}</p>
          <p> {diaryPage.view_count} views</p>
        </div>
      </div>
      <p className="basis-3/12 items-center flex justify-end text-sm text-gray-600">
        <TimeAgo date={new Date(updated_at)} />
      </p>
      {!publicMode && (
        <div className="basis-1/12 select-none text-slate-400 flex justify-end pr-5">
          {!confirmDeleteState && (
            <span
              className="cursor-pointer font-xl"
              onClick={(): void => setConfirmDeleteState(true)}
            >
              &#xd7;
            </span>
          )}
          {confirmDeleteState && (
            <ClickAwayListener
              onClickAway={(): void => setConfirmDeleteState(false)}
            >
              <button
                className="text-xs px-2 py-1 leading-none border rounded border-slate-400 hover:border-transparent hover:text-white hover:bg-slate-400 ml-2"
                onClick={onConfirmDelete}
              >
                Confirm
              </button>
            </ClickAwayListener>
          )}
        </div>
      )}
    </div>
  );
};
