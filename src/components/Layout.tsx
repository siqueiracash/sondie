import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
