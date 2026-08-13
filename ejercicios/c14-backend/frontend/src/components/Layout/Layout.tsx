import type { ReactNode } from 'react';
import Header from './Header';
import Footer from '../Layout/Footer';
import '../../assets/styles/Layout.css';


interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
