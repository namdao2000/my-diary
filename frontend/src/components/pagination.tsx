import { ReactElement, useMemo } from 'react';

const PaginationButton = ({
  index,
  isCurrent,
  onClick,
}: {
  index: number;
  isCurrent: boolean;
  onClick: (index: number) => void;
}): ReactElement => {
  const className = isCurrent
    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer';

  return (
    <p className={className} onClick={(): void => onClick(index)}>
      {index}
    </p>
  );
};

export const Pagination = ({
  currentIndex,
  finalIndex,
  resultsPerPage,
  totalResults,
  onNavigate,
}: {
  currentIndex: number;
  finalIndex: number;
  resultsPerPage: number;
  totalResults: number;
  onNavigate: (index: number) => void;
}): ReactElement => {
  const getPaginationButtons = useMemo((): ReactElement[] => {
    if (!finalIndex) return [<>...</>];

    return [...Array(finalIndex)].map((index, i) => {
      return (
        <PaginationButton
          key={i + 1}
          index={i + 1}
          isCurrent={i + 1 === currentIndex}
          onClick={onNavigate}
        />
      );
    });
  }, [currentIndex, resultsPerPage, totalResults, finalIndex]);

  return (
    <div className="bg-white py-3 flex items-center justify-between border-t border-gray-200">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {(currentIndex - 1) * resultsPerPage + 1}{' '}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(currentIndex * resultsPerPage, totalResults)}
            </span>{' '}
            of <span className="font-medium">{totalResults}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              onClick={(): void => {
                onNavigate(Math.max(1, currentIndex - 1));
              }}
              className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
            >
              <span className="sr-only">Previous</span>
              &larr;
            </a>
            {getPaginationButtons}
            <a
              onClick={(): void => {
                onNavigate(Math.min(finalIndex, currentIndex + 1));
              }}
              className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
            >
              <span className="sr-only">Next</span>
              &rarr;
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};
