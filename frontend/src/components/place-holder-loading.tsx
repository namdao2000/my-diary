import { ReactElement } from 'react';
import clsx from 'clsx';

export const PlaceHolderLoading = ({
  className = '',
}: {
  className: string;
}): ReactElement => {
  return (
    <div className="animate-pulse">
      <div className={clsx('bg-gray-200 rounded', className)} />
    </div>
  );
};
