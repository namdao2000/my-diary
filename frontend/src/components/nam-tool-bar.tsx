import React, { ReactElement } from 'react';
import { requestWithJWT } from '../services/axios/axios.wrapper';
import { useAuthState } from '../services/auth/auth-state-provider';
import { toast } from 'react-hot-toast';

export const NamToolBar = (): ReactElement => {
  const { setUserLoggedOut } = useAuthState();
  const createDiary = async (): Promise<void> => {
    await requestWithJWT('post', 'http://localhost:8080/my-diary/v1/diary', {
      title: 'My 454 diary',
      content: 'Please work lmao',
    });
    toast.success('Created a new Diary entry');
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
          className="rounded-lg bg-blue-500 p-1 text-sm"
          onClick={setUserLoggedOut}
        >
          Logout
        </button>
      </div>
    </>
  );
};
