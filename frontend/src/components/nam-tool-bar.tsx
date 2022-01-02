import React, { ReactElement } from 'react';
import { useAuthState } from '../services/auth/auth-state-provider';
import { useDiary } from '../services/diary/use-diary';

export const NamToolBar = (): ReactElement => {
  const { setUserLoggedOut } = useAuthState();
  const { createDiaryPage, loadDiaryPages } = useDiary();

  const createDiary = async (): Promise<void> => {
    await createDiaryPage({
      title: 'example diary',
      content: '<p>Hello world!</p><p><br></p><p>STOP</p>',
    });
  };

  const getDiary = async (): Promise<void> => {
    console.log(await loadDiaryPages(1, true));
  };

  return (
    <>
      <div className="p-4 flex justify-center items-center w-full bg-amber-300">
        <p className="justify-self-start mr-4 font-semibold">
          🔧 Nam&apos;s Tool Bar
        </p>
        <button
          className="rounded-lg bg-blue-500 p-1 text-sm mr-4"
          onClick={createDiary}
        >
          Create Diary
        </button>
        <button
          className="rounded-lg bg-blue-500 p-1 text-sm mr-4"
          onClick={getDiary}
        >
          Get Diary
        </button>
        <button
          className="rounded-lg bg-blue-500 p-1 text-sm"
          onClick={setUserLoggedOut}
        >
          Logout
        </button>
      </div>
    </>
  );
};
