import { ReactElement } from 'react';

export const Page404 = (): ReactElement => {
  return (
    <>
      <p className="text-3xl font-semibold mb-2">404 Error</p>
      <p className="text-2xl text-slate-500">
        This page has been moved or it simply doesn&apos;t exist. Sorry!
      </p>
    </>
  );
};
