import React, { ReactNode } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import UserProvider from './context/user';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next Courses',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div>
          <UserProvider>{children}</UserProvider>
        </div>
      </body>
    </html>
  );
}
