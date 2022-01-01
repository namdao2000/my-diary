import { DiaryPage } from '../types/diary-page';
import { ReactElement, useState } from 'react';
import TimeAgo from 'react-timeago';
import ClickAwayListener from 'react-click-away-listener';

export const DiaryListItem = ({
  diaryPage,
  index,
  onSelect,
  onDelete,
}: {
  diaryPage: DiaryPage;
  index: number;
  onSelect: (page_id: string) => void;
  onDelete: (page_id: string, index: number) => void;
}): ReactElement => {
  const { page_id, title, updated_at } = diaryPage;
  const [confirmDeleteState, setConfirmDeleteState] = useState(false);

  const onConfirmDelete = (): void => {
    onDelete(page_id, index);
    setConfirmDeleteState(false);
  };

  return (
    <div className="flex flex-row items-center border py-2">
      <p
        className="ml-2 basis-8/12 cursor-pointer"
        onClick={(): void => onSelect(page_id)}
      >
        {title}
      </p>
      <p className="basis-3/12 items-center flex justify-end text-sm text-gray-600">
        <TimeAgo date={new Date(updated_at)} />
      </p>
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
              className="text-xs px-2 py-1 leading-none border rounded border-slate-400 hover:border-transparent hover:text-white hover:bg-slate-400"
              onClick={onConfirmDelete}
            >
              Confirm
            </button>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
};
