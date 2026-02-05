import React from 'react';
import AppLayout from './Layouts/AppLayout';
import StatsCard from './StatsCards';
import RecentOrders from './RecentOrders';
import ActivityFeed from './ActivityFeed';

export default function Dashboard({ stats }) {
    return (
        <AppLayout>
            {/* Page Title */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h2>
                <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your business today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatsCard
                    icon="fas fa-home"
                    iconBg="bg-blue-100 dark:bg-blue-900"
                    iconColor="text-blue-600 dark:text-blue-400"
                    title="Total Properties"
                    value={stats.total_properties || 0}
                    change="Manage Properties"
                />

                <StatsCard
                    icon="fas fa-blog"
                    iconBg="bg-green-100 dark:bg-green-900"
                    iconColor="text-green-600 dark:text-green-400"
                    title="Total Blogs"
                    value={stats.total_blogs || 0}
                    change="Manage Blogs"
                />

                <StatsCard
                    icon="fas fa-tags"
                    iconBg="bg-purple-100 dark:bg-purple-900"
                    iconColor="text-purple-600 dark:text-purple-400"
                    title="Blog Categories"
                    value={stats.total_blog_categories || 0}
                    change="Manage Categories"
                />

                <StatsCard
                    icon="fas fa-users"
                    iconBg="bg-yellow-100 dark:bg-yellow-900"
                    iconColor="text-yellow-600 dark:text-yellow-400"
                    title="Total Users"
                    value={stats.total_users || 0}
                    change="Manage Users"
                />
                
                <StatsCard
                    icon="fas fa-envelope"
                    iconBg="bg-red-100 dark:bg-red-900"
                    iconColor="text-red-600 dark:text-red-400"
                    title="Total Messages"
                    value={stats.total_messages || 0}
                    change="Manage Messages"
                />
            </div>

            {/* Charts and Tables Section */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Revenue Overview</h3>
                        <select className="bg-gray-100 dark:bg-gray-700 border-0 text-gray-800 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 90 days</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-100 rounded-lg">
                        <div className="text-center ">
                            <i className="fas fa-chart-line text-4xl text-gray-400 dark:text-gray-600 mb-2"></i>
                            <p className="text-gray-500 dark:text-gray-400">Revenue chart visualization</p>
                            <p className="text-sm text-gray-400 dark:text-gray-600">Interactive chart would appear here</p>
                        </div>
                    </div>
                </div>

                <RecentOrders />
            </div> */}

            {/* Bottom Section */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2">
                    <ActivityFeed />
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Quick Stats</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Storage Usage', value: '65%', color: 'bg-blue-600', width: '65%' },
                            { label: 'Bandwidth Usage', value: '42%', color: 'bg-green-600', width: '42%' },
                            { label: 'Task Completion', value: '78%', color: 'bg-yellow-600', width: '78%' }
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
                                    <span className="font-medium text-gray-800 dark:text-white">{stat.value}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div className={`${stat.color} h-2 rounded-full`} style={{ width: stat.width }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t dark:border-gray-700">
                        <h4 className="font-medium text-gray-800 dark:text-white mb-3">System Status</h4>
                        {['Web Server', 'Database', 'API Service'].map((service, index) => (
                            <div key={index} className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 dark:text-gray-400">{service}</span>
                                <span className="px-3 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
                                    Online
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
        </AppLayout>
    );
}