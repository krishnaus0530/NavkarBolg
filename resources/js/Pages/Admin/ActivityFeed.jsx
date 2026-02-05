import React from 'react';

const ActivityFeed = () => {
    const activities = [
        {
            icon: 'fas fa-user-plus',
            iconBg: 'bg-blue-100 dark:bg-blue-900',
            iconColor: 'text-blue-600 dark:text-blue-400',
            title: 'New user registered',
            description: 'John Doe joined the platform',
            time: '2 hours ago'
        },
        {
            icon: 'fas fa-shopping-cart',
            iconBg: 'bg-green-100 dark:bg-green-900',
            iconColor: 'text-green-600 dark:text-green-400',
            title: 'New order placed',
            description: 'Order #ORD-7892 was placed',
            time: '4 hours ago'
        },
        {
            icon: 'fas fa-file-invoice-dollar',
            iconBg: 'bg-purple-100 dark:bg-purple-900',
            iconColor: 'text-purple-600 dark:text-purple-400',
            title: 'Payment received',
            description: 'Payment of $245.99 received',
            time: '1 day ago'
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Recent Activity</h3>
            <div className="space-y-6">
                {activities.map((activity, index) => (
                    <div key={index} className="flex">
                        <div className="flex-shrink-0">
                            <div className={`w-10 h-10 rounded-full ${activity.iconBg} flex items-center justify-center`}>
                                <i className={`${activity.icon} ${activity.iconColor}`}></i>
                            </div>
                        </div>
                        <div className="ml-4">
                            <h4 className="font-medium text-gray-800 dark:text-white">{activity.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{activity.description}</p>
                            <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityFeed;