import React from 'react';

const RecentOrders = () => {
    const orders = [
        {
            name: 'Alex Johnson',
            avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=10b981&color=fff',
            date: 'May 15, 2023',
            amount: '$245.99',
            status: 'Completed',
            statusColor: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
        },
        {
            name: 'Maria Garcia',
            avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=8b5cf6&color=fff',
            date: 'May 14, 2023',
            amount: '$128.50',
            status: 'Pending',
            statusColor: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'
        },
        {
            name: 'David Smith',
            avatar: 'https://ui-avatars.com/api/?name=David+Smith&background=3b82f6&color=fff',
            date: 'May 13, 2023',
            amount: '$367.20',
            status: 'Completed',
            statusColor: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
        },
        {
            name: 'Sara Miller',
            avatar: 'https://ui-avatars.com/api/?name=Sara+Miller&background=f59e0b&color=fff',
            date: 'May 12, 2023',
            amount: '$89.99',
            status: 'Cancelled',
            statusColor: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Recent Orders</h3>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                            <th className="pb-3">Customer</th>
                            <th className="pb-3">Date</th>
                            <th className="pb-3">Amount</th>
                            <th className="pb-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="border-b dark:border-gray-700">
                                <td className="py-4">
                                    <div className="flex items-center">
                                        <img src={order.avatar} alt={order.name} className="w-8 h-8 rounded-full mr-3" />
                                        <span className="font-medium text-gray-800 dark:text-white">{order.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-gray-600 dark:text-gray-400">{order.date}</td>
                                <td className="py-4 font-medium text-gray-800 dark:text-white">{order.amount}</td>
                                <td className="py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs ${order.statusColor}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrders;