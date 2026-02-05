import React from 'react';
import { usePage } from '@inertiajs/react';

const Header = ({ toggleSidebar, toggleMobileSidebar, sidebarCollapsed }) => {
    const { auth } = usePage().props;
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden mr-4 text-gray-600 dark:text-gray-300"
                        onClick={toggleMobileSidebar}
                    >
                        <i className="fas fa-bars text-xl"></i>
                    </button>

                    {/* Desktop Sidebar Toggle */}
                    <div className="hidden md:flex items-center mr-6">
                        {/* <span className="mr-2 text-gray-600 dark:text-gray-400">Collapse Sidebar</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only" 
                                checked={sidebarCollapsed}
                                onChange={toggleSidebar}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label> */}
                        <button
                            className=" mr-4 text-gray-600 dark:text-gray-300"
                            onClick={toggleSidebar}
                        >
                            <i className="fas fa-bars text-xl"></i>
                        </button>
                    </div>

                    {/* Search Bar */}
                    {/* <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-search text-gray-400"></i>
                        </div>
                        <input
                            type="text"
                            className="bg-gray-100 dark:bg-gray-700 border-0 text-gray-800 dark:text-white pl-10 pr-4 py-2 rounded-lg w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Search..."
                        />
                    </div> */}
                </div>

                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    {/* <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <i className="fas fa-bell"></i>
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                    </button> */}

                    {/* Messages */}
                    {/* <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <i className="fas fa-envelope"></i>
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500"></span>
                    </button> */}

                    {/* User Dropdown */}
                    <div className="relative">
                        <button className="flex items-center focus:outline-none">
                            <img
                                src={`https://ui-avatars.com/api/?name=${auth?.user?.name}+${auth?.user?.last_name}&background=3b82f6&color=fff`}
                                alt="User"
                                className="w-8 h-8 rounded-full"
                            />
                            {/* <i className="fas fa-chevron-down ml-2 text-gray-600 dark:text-gray-300"></i> */}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;