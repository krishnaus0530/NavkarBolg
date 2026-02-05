// src/components/MainContent.jsx
import React from 'react';
import StatsCards from './StatsCards';
import RevenueChart from './RevenueChart';
import RecentOrders from './RecentOrders';
import ActivityFeed from './ActivityFeed';
import QuickStats from './QuickStats';
import { DollarSign, Users, ShoppingCart, BarChart } from 'lucide-react';

const MainContent = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h2>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your business today.</p>
      </div>
      
      {/* Stats Cards */}
      <StatsCards />
      
      {/* Charts and Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <RecentOrders />
      </div>
      
      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <ActivityFeed />
        <QuickStats />
      </div>
    </main>
  );
};

export default MainContent;