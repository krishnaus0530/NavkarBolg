import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

const Sidebar = ({ darkMode, sidebarCollapsed, mobileSidebarOpen, toggleDarkMode }) => {
  const { props } = usePage();
  const auth = props?.auth;
  const currentUrl = props?.url || window.location.pathname;
  
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const menuItems = [
    { 
      icon: 'fas fa-tachometer-alt', 
      label: 'Dashboard', 
      href: '/dashboard',
      matchExact: true
    },
    { 
      icon: 'fas fa-building', 
      label: 'Properties', 
      href: '/property/admin/index',
      children: [
        { icon: 'fas fa-folder', label: 'All Properties', href: '/property/admin/index' },
        { icon: 'fas fa-plus', label: 'Add Property', href: '/properties/create' },
      ],
      matchPaths: ['/property/admin/index', '/properties/create', '/properties/*/edit']
    },
    {
      icon: 'fas fa-blog',
      label: 'Blogs',
      href: '/createPost',
      children: [
        { icon: 'fas fa-pencil-alt', label: 'Post  Activity', href: '/createPost' },
        { icon: 'fas fa-folder', label: 'Categories', href: '/categories' },
        { icon: 'fas fa-file-alt', label: 'Posts', href: '/blogs' },
      ],
      matchPaths: ['/blogs', '/blogs/*', '/createPost', '/categories', '/blog-images/*']
    },
  //   {
  //   icon: 'fas fa-envelope',
  //   label: 'Messages',
  //   href: '/messages',
  //   children: [
  //     { icon: 'fas fa-inbox', label: 'Inbox', href: '/messages' },
  //     // { icon: 'fas fa-paper-plane', label: 'Sent', href: '/messages/sent' },
  //      { 
  //     icon: 'fas fa-fire', 
  //     label: 'Interested Leads', 
  //     href: '/messages/interested' 
  //   },
  //   { 
  //     icon: 'fas fa-envelope-open-text', 
  //     label: 'General Messages', 
  //     href: '/messages/general' 
  //   },
  //   ],
  //   matchPaths: ['/messages', '/messages/*']
  // },
  { 
      icon: 'fas fa-envelope', 
      label: 'Messages', 
      href: '/messages',
      matchExact: true
    },
    { 
      icon: 'fas fa-globe', 
      label: 'Web Site', 
      href: '/',
      external: true,
      matchExact: true
    },
  ];

  const safeStartsWith = (str, prefix) => {
    return str && prefix ? str.startsWith(prefix) : false;
  };

  const isActive = (item) => {
    if (!currentUrl) return false;

    if (item.matchExact) {
      return currentUrl === item.href;
    }
    
    if (item.matchPaths) {
      return item.matchPaths.some(path => {
        if (!path) return false;
        
        if (path.includes('*')) {
          try {
            const pattern = new RegExp('^' + path.replace('*', '.*') + '$');
            return pattern.test(currentUrl);
          } catch {
            return safeStartsWith(currentUrl, path.replace('*', ''));
          }
        }
        return safeStartsWith(currentUrl, path);
      });
    }
    
    return safeStartsWith(currentUrl, item.href);
  };

  const isChildActive = (child) => {
    if (!currentUrl || !child?.href) return false;
    
    if (child.href === '/property/admin/index' && currentUrl === '/property/admin/index') {
      return true;
    }
    if (child.href === '/properties/create' && safeStartsWith(currentUrl, '/properties/create')) {
      return true;
    }
    if (child.href === '/createPost' && ( currentUrl === '/createPost')) {
      return true;
    }
    if (child.href === '/categories' && safeStartsWith(currentUrl, '/categories')) {
      return true;
    }
    return currentUrl === child.href;
  };

  const handleLogout = () => {
    router.post('/logout');
  };

  const activeClass = "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600";
  const inactiveClass = "hover:bg-gray-100 dark:hover:bg-gray-700";

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden ${mobileSidebarOpen ? 'block' : 'hidden'}`} />

      <aside className={`bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex flex-col fixed md:relative h-full z-40 shadow-lg transition-all duration-300 ${sidebarCollapsed ? 'md:w-16 w-16' : 'md:w-64 w-64'} ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <div className="bg-blue-600 w-8 h-8 rounded-md flex items-center justify-center">
            <i className="fas fa-chart-bar text-white"></i>
          </div>
          <h1 className={`text-xl font-bold ml-3 ${sidebarCollapsed ? 'hidden' : 'block'}`}>Dashboard</h1>
        </div>

        {/* User Info */}
        {!sidebarCollapsed && auth?.user && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <img
                src={`https://ui-avatars.com/api/?name=${auth.user.name || ''}+${auth.user.last_name || ''}&background=3b82f6&color=fff`}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <h3 className="font-medium">{auth.user.name || ''} {auth.user.last_name || ''}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{auth.user.role === 0 ? 'Administrator' : 'User'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              const active = isActive(item);
              const childActive = item.children?.some(child => isChildActive(child));
              const isOpen = openDropdowns[index];
              
              return (
                <li key={index}>
                  <div>
                    {/* Main link */}
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleDropdown(index)}
                          className={`flex items-center w-full p-3 rounded-lg transition-colors ${(active || childActive) ? activeClass : inactiveClass}`}
                        >
                          <i className={`${item.icon} mr-3 ${(active || childActive) ? 'text-blue-600 dark:text-blue-400' : ''}`}></i>
                          {!sidebarCollapsed && <span className="flex-1 text-left font-medium">{(active || childActive) ? item.label : item.label}</span>}
                          {!sidebarCollapsed && (
                            <i className={`fas fa-chevron-${isOpen ? 'down' : 'right'} ml-auto ${(active || childActive) ? 'text-blue-600 dark:text-blue-400' : ''}`}></i>
                          )}
                        </button>

                        {/* Dropdown children */}
                        {isOpen && !sidebarCollapsed && (
                          <ul className="ml-6 mt-1 space-y-1">
                            {item.children.map((child, i) => {
                              const childIsActive = isChildActive(child);
                              return (
                                <li key={i}>
                                  <Link
                                    href={child.href}
                                    className={`flex items-center p-2 pl-3 rounded-lg transition-colors ${childIsActive ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                  >
                                    <i className={`${child.icon} mr-2 ${childIsActive ? 'text-blue-600 dark:text-blue-400' : ''}`}></i>
                                    {child.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center p-3 rounded-lg transition-colors ${active ? activeClass : inactiveClass}`}
                        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        <i className={`${item.icon} mr-3 ${active ? 'text-blue-600 dark:text-blue-400' : ''}`}></i>
                        {!sidebarCollapsed && <span className={`font-medium ${active ? 'text-blue-600 dark:text-blue-400' : ''}`}>{item.label}</span>}
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Logout & Theme Toggle */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <i className="fas fa-sign-out-alt"></i>
            {!sidebarCollapsed && <span className="ml-3">Logout</span>}
          </button>

          {!sidebarCollapsed && (
            <div className="mt-3 p-3 flex items-center justify-between">
              <div className="flex items-center">
                <i className={`fas ${darkMode ? 'fa-moon' : 'fa-sun'} mr-2`}></i>
                <span>Dark Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={darkMode} 
                  onChange={toggleDarkMode} 
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;


// import React, { useState } from 'react';
// import { Link } from '@inertiajs/react';
// import { usePage, router } from '@inertiajs/react';

// const Sidebar = ({ darkMode, sidebarCollapsed, mobileSidebarOpen, toggleDarkMode }) => {
//   const { auth } = usePage().props;
  
//   const [openDropdowns, setOpenDropdowns] = useState({}); // track which dropdowns are open

//   const toggleDropdown = (index) => {
//     setOpenDropdowns((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const menuItems = [
//     { icon: 'fas fa-tachometer-alt', label: 'Dashboard', href: '/dashboard' },
//     // { icon: 'fas fa-users', label: 'User', href: '/User' },
//     { icon: 'fas fa-building', label: 'Properties', href: '/property/admin/index' },
//     {
//       icon: 'fas fa-blog',
//       label: 'Blogs',
//       href: '#',
//       children: [
//         { icon: 'fas fa-folder', label: 'Categories', href: '/categories' },
//         { icon: 'fas fa-pencil-alt', label: 'Posts', href: '/createPost' },
//       ],
//     },
//     { icon: 'fas fa-globe', label: 'Web Site', href: '/' },
//   ];

//   const handleLogout = () => {
//     router.post('/logout');
//   };

//   return (
//     <>
//       <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden ${mobileSidebarOpen ? 'block' : 'hidden'}`} />

//       <aside className={`bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex flex-col fixed md:relative h-full z-40 shadow-lg transition-all duration-300 ${sidebarCollapsed ? 'md:w-16 w-16' : 'md:w-64 w-64'} ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
//         {/* Logo */}
//         <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
//           <div className="bg-blue-600 w-8 h-8 rounded-md flex items-center justify-center">
//             <i className="fas fa-chart-bar text-white"></i>
//           </div>
//           <h1 className={`text-xl font-bold ml-3 ${sidebarCollapsed ? 'hidden' : 'block'}`}>Dashboard</h1>
//         </div>

//         {/* User Info */}
//         {!sidebarCollapsed && auth?.user && (
//           <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <img
//                 src={`https://ui-avatars.com/api/?name=${auth.user.name}+${auth.user.last_name}&background=3b82f6&color=fff`}
//                 alt="User"
//                 className="w-10 h-10 rounded-full"
//               />
//               <div className="ml-3">
//                 <h3 className="font-medium">{auth.user.name} {auth.user.last_name}</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{auth.user.role === 0 ? 'Administrator' : 'User'}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Navigation */}
//         <div className="flex-1 overflow-y-auto p-4">
//           <ul className="space-y-2">
//             {menuItems.map((item, index) => (
//               <li key={index}>
//                 <div>
//                   {/* Main link */}
//                   {item.children ? (
//                     <button
//                       type="button"
//                       onClick={() => toggleDropdown(index)}
//                       className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
//                     >
//                       <i className={`${item.icon} mr-3`}></i>
//                       {!sidebarCollapsed && <span className="flex-1 text-left">{item.label}</span>}
//                       {!sidebarCollapsed && (
//                         <i className={`fas fa-chevron-${openDropdowns[index] ? 'down' : 'right'} ml-auto`}></i>
//                       )}
//                     </button>
//                   ) : (
//                     <Link href={item.href} className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
//                       <i className={`${item.icon} mr-3`}></i>
//                       {!sidebarCollapsed && <span>{item.label}</span>}
//                     </Link>
//                   )}

//                   {/* Dropdown children */}
//                   {item.children && openDropdowns[index] && !sidebarCollapsed && (
//                     <ul className="ml-6 mt-1 space-y-1">
//                       {item.children.map((child, i) => (
//                         <li key={i}>
//                           <Link href={child.href} className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
//                             <i className={`${child.icon} mr-2`}></i>
//                             {child.label}
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Logout & Theme Toggle */}
//         <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//           <button
//             onClick={handleLogout}
//             className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${sidebarCollapsed ? 'justify-center' : ''}`}
//           >
//             <i className="fas fa-sign-out-alt mr-0"></i>
//             {!sidebarCollapsed && <span className="ml-3">Logout</span>}
//           </button>

//           {!sidebarCollapsed && (
//             <div className="mt-3 p-3 flex items-center justify-between">
//               <div className="flex items-center">
//                 <i className={`fas ${darkMode ? 'fa-moon' : 'fa-sun' } mr-2`}></i>
//                 <span>Dark Mode</span>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={toggleDarkMode} />
//                 <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
//               </label>
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;
