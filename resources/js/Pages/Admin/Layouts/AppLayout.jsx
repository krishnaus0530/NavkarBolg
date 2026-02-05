import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

export default function AppLayout({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    useEffect(() => {
        const isDark = localStorage.getItem('dark-mode') === 'true';
        const isSidebarCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
        setDarkMode(isDark);
        setSidebarCollapsed(isSidebarCollapsed);
        
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('dark-mode', newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const toggleSidebar = () => {
        const newState = !sidebarCollapsed;
        setSidebarCollapsed(newState);
        localStorage.setItem('sidebar-collapsed', newState);
    };

    const toggleMobileSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Mobile overlay */}
            {mobileSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleMobileSidebar}
                />
            )}

            <Sidebar 
                darkMode={darkMode}
                sidebarCollapsed={sidebarCollapsed}
                mobileSidebarOpen={mobileSidebarOpen}
                toggleDarkMode={toggleDarkMode}
            />

            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
                sidebarCollapsed ? 'md:ml-0' : 'md:ml-0'
            }`}>
                <Header 
                    toggleSidebar={toggleSidebar}
                    toggleMobileSidebar={toggleMobileSidebar}
                    sidebarCollapsed={sidebarCollapsed}
                />
                
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
                
                {/* <Footer /> */}
            </div>
        </div>
    );
}