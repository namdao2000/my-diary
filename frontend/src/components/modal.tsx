import React, { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

export type ModalPosition = 'top' | 'center';

export interface ModalProps {
  children: ReactNode;
  show: boolean;
  width?: string;
  onClose: () => void;
  position?: ModalPosition;
}

const getContainerClassName = (position: ModalPosition): string => {
  return clsx(
    `fixed py-12 md:py-20 inset-0 z-50 bg-black overflow-hidden`,
    { 'flex items-center': position === 'center' },
    'bg-black bg-opacity-50',
  );
};

const getContentClassName = (show: boolean, width: string): string => {
  return clsx(
    'flex flex-col max-h-full transition-opacity duration-300 overflow-auto bg-white mx-auto relative',
    width,
    { 'opacity-0': !show },
    { 'opacity-1': show },
    'rounded-md text-primary-900',
  );
};

export const Modal = ({
  show,
  onClose,
  children,
  position = 'top',
  width = 'md:w-1/2 md:mx-auto',
}: ModalProps): ReactElement => {
  // Whack code
  const handleClose = (e: React.MouseEvent): void => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const containerClass = getContainerClassName(position);
  const contentClass = getContentClassName(show, width);

  return (
    <div
      className={clsx(containerClass, { hidden: !show })}
      onClick={handleClose}
    >
      <div className={contentClass}>{children}</div>
    </div>
  );
};
