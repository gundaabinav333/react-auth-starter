import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">My App</h1>
        <div className="text-sm text-gray-700">Welcome!</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* This renders the nested route content */}
        <Outlet />
      </main>

      {/* Footer (optional) */}
      <footer className="bg-white shadow p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
