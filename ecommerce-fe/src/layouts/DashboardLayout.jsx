// src/layouts/DashboardLayout.jsx
import { Sidebar } from '@/components/Sidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Area (with space for sidebar + optional right panel) */}
      <div className="ml-64 flex-1 bg-dashboard-bg p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
