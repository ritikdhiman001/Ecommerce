import { Sidebar } from '@/components/Sidebar';
import DashboardLayout from '@/layouts/DashboardLayout';
import React from 'react';

const Overview = () => {
  return (

    <DashboardLayout > {/* Main Dashboard Content */}
      <div className="flex-1 p-6 bg-dashboard-bg space-y-6">
        {/* Dashboard Header */}
        <h1 className="text-2xl font-bold ">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 bg-dashboard-bg sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-200 p-4 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
            <p className="mt-2 text-3xl font-bold text-blue-600">1,250</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
            <p className="mt-2 text-3xl font-bold text-green-600">340</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
            <p className="mt-2 text-3xl font-bold text-purple-600">980</p>
          </div>
        </div>

        {/* Dummy Content */}
        <div className="bg-gray-200 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Overview</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel sapien eu
            leo facilisis viverra. Sed vulputate turpis a mauris placerat, sed malesuada
            turpis tristique.
          </p>
        </div>
      </div>

    </DashboardLayout>
  );
};

export default Overview;
