import React from 'react';

const StatsCard = ({ icon, iconBg, iconColor, title, value, change, isPositive }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center">
                <div className={`${iconBg} p-3 rounded-lg`}>
                    <i className={`${icon} ${iconColor} text-xl`}></i>
                </div>
                <div className="ml-4">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm">{title}</h3>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
                </div>
            </div>
            <div className="mt-4">
                <span className={`${isPositive ? 'text-green-600' : 'text-red-600'} text-sm font-medium`}>
                    <i className={`fas fa-arrow-${isPositive ? 'up' : 'down'} mr-1`}></i>
                    {change}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">From last month</span>
            </div>
        </div>
    );
};

export default StatsCard;