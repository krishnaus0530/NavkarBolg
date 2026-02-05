import React, { useState } from 'react';
import LoginForm from './Login';
import SignupForm from './Signup';
import { Link } from '@inertiajs/react';

const AuthPage = () => {
    const [activeTab, setActiveTab] = useState('login');

    return (
        // <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full mx-auto">
            <div className="flex flex-col lg:flex-row form-container">
                {/* Left side with logo and brand info */}
                <div className="lg:w-2/5 bg-primary p-8 lg:p-12 text-white flex flex-col justify-between relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#e76b53] opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#e76b53] opacity-10 rounded-full"></div>

                    <div>
                        {/* Logo */}
                        <div className="flex items-center space-x-4 mb-12">
                            <div className="logo-circle w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden">
                                <img
                                    src="../desgin/Triumph_Logo.png"
                                    alt="SecureAuth Logo"
                                    className="w-10 h-10 logo-img"
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">SecureAuth</h1>
                                <p className="text-sm opacity-90">Protected Access</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
                        <p className="mb-8 opacity-90 leading-relaxed">Experience the future of secure authentication with our cutting-edge platform designed for both security and simplicity.</p>

                        {/* Features list */}
                        <div className="space-y-5 mb-10">
                            <div className="flex items-center">
                                <div className="feature-icon w-10 h-10 rounded-full flex items-center justify-center mr-4">
                                    <img src="https://cdn-icons-png.flaticon.com/512/159/159478.png" alt="Security" className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Bank-Level Security</h4>
                                    <p className="text-sm opacity-80">Military-grade encryption for all your data</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="feature-icon w-10 h-10 rounded-full flex items-center justify-center mr-4">
                                    <img src="https://cdn-icons-png.flaticon.com/512/2087/2087744.png" alt="Fast" className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Lightning Fast</h4>
                                    <p className="text-sm opacity-80">Instant authentication across all devices</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="feature-icon w-10 h-10 rounded-full flex items-center justify-center mr-4">
                                    <img src="https://cdn-icons-png.flaticon.com/512/1358/1358023.png" alt="Sync" className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Seamless Sync</h4>
                                    <p className="text-sm opacity-80">Keep your data updated everywhere</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="mt-8 pt-8 border-t border-white/20">
                        <p className="text-sm opacity-80 mb-4">Trusted by innovative teams worldwide</p>
                        <div className="flex items-center">
                            <div className="flex -space-x-3">
                                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                                        alt="User 1"
                                        className="w-full h-full user-avatar"
                                    />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                                        alt="User 2"
                                        className="w-full h-full user-avatar"
                                    />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                                        alt="User 3"
                                        className="w-full h-full user-avatar"
                                    />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#323751] flex items-center justify-center text-xs font-bold border-2 border-white">
                                    +47
                                </div>
                            </div>
                            <div className="ml-4">
                                <div className="flex text-yellow-400">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                </div>
                                <p className="text-xs mt-1 opacity-80">4.8/5 from 3,200+ reviews</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side with forms */}
                <div className="lg:w-3/5 bg-white p-8 lg:p-12">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-10">
                        <button
                            onClick={() => setActiveTab('login')}
                            className={`py-3 px-6 font-semibold text-lg focus:outline-none transition-all duration-300 ${activeTab === 'login' ? 'tab-active' : 'text-gray-500'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setActiveTab('signup')}
                            className={`py-3 px-6 font-semibold text-lg focus:outline-none transition-all duration-300 ${activeTab === 'signup' ? 'tab-active' : 'text-gray-500'}`}
                        >
                            Sign Up
                        </button>

                        <Link
                            href="/"
                            className={`py-3 px-6 font-semibold focus:outline-none transition-all duration-300 ${activeTab === 'website'
                                    ? 'tab-active text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500'
                                }`}
                        >
                            Website
                        </Link>
                    </div>

                    {/* Render forms based on active tab */}
                    {activeTab === 'login' ? (
                        <LoginForm onSwitchToSignup={() => setActiveTab('signup')} />
                    ) : (
                        <SignupForm onSwitchToLogin={() => setActiveTab('login')} />
                    )}
                </div>
            </div>
        </div>
        // </div>
    );
};

export function AuthPublic() {
    return (
        <>
            <AuthPage></AuthPage>
        </>
    )
};

export default function Auth() {
    return (
        <>
            <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
                <AuthPage></AuthPage>
            </div>
        </>
    )
};