import { ReactElement } from 'react';
import { PlaceHolderLoading } from './placeholder-loading';

export const DiaryListItemPlaceHolder = (): ReactElement => {
  return (
    <div className="flex flex-row items-center border py-4">
      <div className="ml-2 basis-8/12 cursor-pointer flex flex-col">
        <div className="flex items-center mb-2">
          <PlaceHolderLoading className="h-2 w-60" />
        </div>
        <div>
          <PlaceHolderLoading className="h-2 w-32 mb-2" />
          <PlaceHolderLoading className="h-2 w-32" />
        </div>
      </div>
      <div className="basis-3/12 items-center flex justify-end">
        <PlaceHolderLoading className="h-2 w-32" />
      </div>
    </div>
  );
};
