import React from "react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Example header */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-semibold">My App</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        {children}
      </main>

      {/* Example footer */}
      <footer className="bg-gray-100 text-center py-3 text-sm text-gray-600">
        © {new Date().getFullYear()} My Company
      </footer>
    </div>
  );
};

export default Layout;
