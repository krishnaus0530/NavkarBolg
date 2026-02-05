import { Head, Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Footer from '../Component/Footer';
import { AuthPublic } from '../Auth/AuthPage'; // import your LoginForm
import { faChevronDown, faBriefcase, faHome, faBuilding, faNewspaper, faAddressBook } from '@fortawesome/free-solid-svg-icons';

export default function AppLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false); // <-- modal state
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

    const { url } = usePage();
    // console.log(url);
    const { props } = usePage();
    // console.log(props);
    const { auth } = props;

    const isLoggedIn = auth?.user ? true : false;
    const userRole = auth?.user?.role;
    const serviceRoutes = [
        '/service',
        '/RegulatoryCompliance',
        '/PropertyOperations',];
    const property = [
        '/properties',
        '/propertyBuyingPage',
        '/propertySellingPage',
        '/propertyManagement',
        '/realEstateInvestment',
        '/legal_Documentation',

    ];

    const isActive = (path) => {
        if (path === 'services') {
            return serviceRoutes.some((route) => url.startsWith(route))
                ? 'text-coral border-b-2 border-coral'
                : 'text-darkbluegray hover:text-coral';
        }
        if (path === 'properties') {
            return property.some((route) => url.startsWith(route))
                ? 'text-coral border-b-2 border-coral'
                : 'text-darkbluegray hover:text-coral';
        }

        return url === path
            ? 'text-coral border-b-2 border-coral'
            : 'text-darkbluegray hover:text-coral';
    };

    return (
        <>
            <Head>
                <title>Triumph Real Estate</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-gray-100">
                {/* Navbar */}
                <nav className="sticky top-0 z-50 bg-white shadow-md">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex justify-between md:justify-center items-center h-16">
                            <img src= {`../desgin/${props.logo}`} alt="Logo" className="h-12 md:hidden" />

                            <div className="hidden md:flex items-center w-full">
                                <img src={`/../desgin/${props.logo}`} alt="Logo" className="h-12 mr-10" />
                                <div className="flex space-x-10">
                                    <Link href="/" className={`font-semibold ${isActive('/')}`}>
                                        Home
                                    </Link>
                                    {/* <Link href="/About" className={`font-semibold ${isActive('/About')}`}>
                                        About
                                    </Link> */}
                                    <div className="relative"
                                    //  onMouseLeave={() => setServicesDropdownOpen(false)}
                                     >
                                        <button
                                            // onMouseEnter={() => setServicesDropdownOpen(true)}
                                            onClick={() => setServicesDropdownOpen(prev => !prev)}
                                            className={`font-semibold flex items-center gap-1 ${isActive('services')}`}
                                        >
                                            Services
                                               <i
                                                className={`fas fa-chevron-down text-xs transition-transform duration-200 ${
                                                    servicesDropdownOpen ? 'rotate-180' : ''
                                                }`}
                                            ></i>
                                        </button>

                                            {/* Dropdown */}
                                           {servicesDropdownOpen && (
                                            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                                                <Link
                                                href="/RegulatoryCompliance"
                                                className={`block px-4 py-2 hover:bg-blue-50 ${isActive('/RegulatoryCompliance')}`}
                                                >
                                                Regulatory Compliance
                                                </Link>
                                                <Link
                                                href="/PropertyOperations"
                                                className={`block px-4 py-2 hover:bg-blue-50 ${isActive('/PropertyOperations')}`}
                                                >
                                                Property Operations
                                                </Link>
                                            </div>
                                            )}
                                    </div>

                                    <Link href="/contact" className={`flex items-center gap-1 font-semibold ${isActive('/contact')}`}>
                                        Contact
                                        <FontAwesomeIcon icon="fa-solid fa-chevron-down" className="text-xs" />
                                    </Link>
                                    <Link href="/properties" className={`block font-semibold ${isActive('properties')}`}>
                                        Property
                                    </Link>
                                    <Link href="/blog" className={`font-semibold ${isActive('/blog')}`}>
                                        Blog
                                    </Link>
                                </div>
                                <div className="flex space-x-4 ml-auto items-center">
                                    {isLoggedIn ? (
                                        <div className="flex items-center space-x-4">
                                            {/* User Avatar */}
                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center space-x-2">

                                                    {auth.user.profile_pic ? (
                                                        <img
                                                            src={auth.user.profile_pic}
                                                            alt={auth.user.name}
                                                            className="w-8 h-8 rounded-full border-2 border-gray-200"
                                                        />
                                                    ) : (
                                                        <div className="w-8 h-8 bg-darkbluegray text-white rounded-full flex items-center justify-center font-semibold">
                                                            {auth.user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <div className="hidden lg:block text-left">
                                                        <p className="text-sm font-semibold text-darkbluegray">
                                                            {auth.user.name}
                                                        </p>
                                                        <p className={`text-xs font-bold ${userRole === '0' ? 'text-red-600' : 'text-blue-600'}`}>
                                                            {userRole == 0 ? 'Administrator' : 'User'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Role-based Dashboard Button */}
                                                {userRole == 0 ? (
                                                    <>
                                                        <Link
                                                            href="/dashboard"
                                                            className="px-4 py-1 bg-darkbluegray text-white rounded-lg hover:bg-coral transition text-sm font-semibold shadow-sm"
                                                        >
                                                            Dashboard
                                                        </Link>
                                                        {/* Logout Button */}
                                                        <Link
                                                            href="/logout"
                                                            method="post"
                                                            as="button"
                                                            className="px-4 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm"
                                                        >
                                                            Logout
                                                        </Link>
                                                    </>
                                                ) : (
                                                    <span>
                                                        <Link
                                                            href="/logout"
                                                            method="post"
                                                            as="button"
                                                            className="px-4 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm"
                                                        >
                                                            Logout
                                                        </Link>
                                                    </span>
                                                )}

                                            </div>
                                        </div>
                                    ) : (
                                        url !== '/' && (
                                            <button
                                                onClick={() => setLoginModalOpen(true)}
                                                className="px-4 py-1 border border-darkbluegray text-darkbluegray rounded-lg hover:bg-darkbluegray hover:text-white transition font-semibold"
                                            >
                                                Login
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="md:hidden">
                                <button 
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                                    className="text-2xl text-darkbluegray transition-transform duration-300 hover:scale-110"
                                >
                                    ☰
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Overlay */}
                    <div 
                        className={`md:hidden fixed inset-0 z-40 bg-black transition-all duration-300 ease-in-out ${
                            mobileMenuOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Mobile Menu Sidebar - Updated with smooth slide animation */}
                    <div 
                        className={`md:hidden fixed top-0 left-0 h-full w-80 z-50 bg-white shadow-2xl transition-all duration-300 ease-in-out transform ${
                            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    >
                        {/* Mobile Menu Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                            <img src="../desgin/Triumph_Logo.png" alt="Logo" className="h-10" />
                            <button 
                                onClick={() => setMobileMenuOpen(false)} 
                                className="text-3xl text-darkbluegray transition-transform duration-200 hover:scale-125 hover:text-coral"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Mobile Menu Links */}
                        <div className="px-6 py-8 space-y-3 h-[calc(100%-180px)] overflow-y-auto">
                            <Link 
                                href="/" 
                                className={`flex items-center py-4 px-5 font-semibold text-lg rounded-xl transition-all duration-200 ${isActive('/')} hover:bg-blue-50 hover:pl-7 active:scale-[0.98]`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FontAwesomeIcon icon="fa-solid fa-home" className="w-6 mr-4 text-darkbluegray" />
                                Home
                            </Link>
                            {/* <Link 
                                href="/About" 
                                className={`flex items-center py-4 px-5 font-semibold text-lg rounded-xl transition-all duration-200 ${isActive('/About')} hover:bg-blue-50 hover:pl-7 active:scale-[0.98]`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FontAwesomeIcon icon="fa-solid fa-info-circle" className="w-6 mr-4 text-darkbluegray" />
                                About
                            </Link> */}
                            <div>
                                <button
                                    onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                                    className={`w-full flex items-center py-4 px-5 font-semibold text-lg rounded-xl transition-all duration-200 ${isActive('services')} hover:bg-blue-50 hover:pl-7 active:scale-[0.98]`}
                                >
                                    Services
                                       <i
                                        className={`ml-32 fas fa-chevron-down text-xs transition-transform duration-200 ${
                                            servicesDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                    ></i>
                                </button>
                               {servicesDropdownOpen && (
                                <div className="pl-12 space-y-2">
                                    <Link
                                    href="/RegulatoryCompliance"
                                    className={`block py-2 hover:text-coral ${isActive('/RegulatoryCompliance')}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    >
                                    Regulatory Compliance
                                    </Link>
                                    <Link
                                    href="/PropertyOperations"
                                    className={`block py-2 hover:text-coral ${isActive('/PropertyOperations')}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    >
                                    Property Operations
                                    </Link>
                                </div>
                                )}

                            </div>

                            <Link 
                                href="/properties" 
                                className={`flex items-center py-4 px-5 font-semibold text-lg rounded-xl transition-all duration-200 ${isActive('properties')} hover:bg-blue-50 hover:pl-7 active:scale-[0.98]`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FontAwesomeIcon icon="fa-solid fa-building" className="w-6 mr-4 text-darkbluegray" />
                                Property
                            </Link>
                            <Link 
                                href="/contact" 
                                className={`flex items-center py-4 px-5 font-semibold text-lg rounded-xl transition-all duration-200 ${isActive('/contact')} hover:bg-blue-50 hover:pl-7 active:scale-[0.98]`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FontAwesomeIcon icon="fa-solid fa-address-book" className="w-6 mr-4 text-darkbluegray" />
                                Contact
                            </Link>
                            <Link 
                                href="/blog" 
                                className={`flex items-center py-4 px-5 font-semibold text-lg rounded-xl transition-all duration-200 ${isActive('/blog')} hover:bg-blue-50 hover:pl-7 active:scale-[0.98]`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FontAwesomeIcon icon="fa-solid fa-newspaper" className="w-6 mr-4 text-darkbluegray" />
                                Blog
                            </Link>
                        </div>

                        {/* Mobile Auth Section */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
                            {isLoggedIn ? (
                                <div className="space-y-5">
                                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                                        {auth.user.profile_pic ? (
                                            <img
                                                src={auth.user.profile_pic}
                                                alt={auth.user.name}
                                                className="w-14 h-14 rounded-full border-3 border-white shadow-md"
                                            />
                                        ) : (
                                            <div className="w-14 h-14 bg-gradient-to-br from-darkbluegray to-coral text-white rounded-full flex items-center justify-center font-semibold text-xl shadow-md">
                                                {auth.user.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <p className="font-bold text-darkbluegray text-lg">{auth.user.name}</p>
                                            <p className={`text-sm font-bold ${userRole === '0' ? 'text-red-600' : 'text-blue-600'}`}>
                                                {userRole == 0 ? 'Administrator' : 'User Account'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {userRole == 0 ? (
                                            <>
                                                <Link
                                                    href="/dashboard"
                                                    className="block py-3.5 bg-gradient-to-r from-darkbluegray to-blue-800 text-white rounded-xl hover:from-coral hover:to-orange-500 transition-all duration-300 text-center font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    Dashboard
                                                </Link>
                                                <Link
                                                    href="/logout"
                                                    method="post"
                                                    as="button"
                                                    className="block py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 text-center font-semibold text-lg hover:shadow-md"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    Logout
                                                </Link>
                                            </>
                                        ) : (
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="col-span-2 block py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 text-center font-semibold text-lg hover:shadow-md"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Logout
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <button
                                        onClick={() => {
                                            setLoginModalOpen(true);
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full py-4 border-2 border-darkbluegray text-darkbluegray rounded-xl hover:bg-darkbluegray hover:text-white transition-all duration-300 font-semibold text-lg hover:shadow-lg transform hover:-translate-y-0.5"
                                    >
                                        Login
                                    </button>
                                    <button className="w-full py-4 bg-gradient-to-r from-darkbluegray to-blue-800 text-white rounded-xl hover:from-coral hover:to-orange-500 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Full-screen Login Modal */}
                {loginModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300">
                        <div className="bg-white w-full max-w-7xl mx-4 md:mx-0 p-5 rounded-2xl relative h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
                            <button
                                onClick={() => setLoginModalOpen(false)}
                                className="absolute top-6 right-6 text-gray-600 text-2xl font-bold hover:text-gray-900 transition-transform duration-200 hover:scale-125"
                            >
                                &times;
                            </button>
                            <h2 className="text-3xl font-bold mb-6 text-center text-darkbluegray">Login to Your Account</h2>
                            <AuthPublic />
                        </div>
                    </div>
                )}

                {/* Page Content */}
                <main>{children}</main>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
