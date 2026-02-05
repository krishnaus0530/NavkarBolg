import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
                    &copy; {new Date().getFullYear()} Dashboard Pro. All rights reserved.
                </div>
                <div className="flex space-x-6">
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                        Privacy Policy
                    </a>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                        Terms of Service
                    </a>
                    <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                        Help Center
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;