import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-6xl mx-auto p-6">{children}</main>
    </div>
  );
};
