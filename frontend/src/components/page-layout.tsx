import { ReactElement, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export const PageLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const location = useLocation();
  const path = location.pathname.slice(0, location.pathname.lastIndexOf('/'));
  if (path === '/diary') {
    return <div className="diary_page_background">{children}</div>;
  }

  return <div className="pt-4 px-6 md:px-16 lg:px-32 h-full">{children}</div>;
};
