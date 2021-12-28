import { ReactElement, ReactNode } from 'react';

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  return <>{children}</>;
};
