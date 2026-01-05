import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  return <>{children}</>;
};
