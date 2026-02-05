import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

const LoginForm = ({ onSwitchToSignup }) => {
    const { errors } = usePage().props; // Get errors from Laravel backend

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        router.post('/login', formData, {
            onFinish: () => setLoading(false),
            preserveScroll: true, // optional: keeps scroll position
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-7">
                {errors?.email && typeof errors.email === 'string' && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
                        {errors.email}
                    </div>
                )}

                <div>
                    <label htmlFor="loginEmail" className="block text-gray-700 font-medium mb-2">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                                alt="Email"
                                className="w-5 h-5"
                            />
                        </div>
                        <input
                            type="email"
                            id="loginEmail"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 p-4 border border-gray-300 rounded-xl input-focus focus:outline-none transition-all duration-300"
                            placeholder="you@example.com"
                        />
                    </div>
                    {errors?.email && Array.isArray(errors.email) && (
                        <p className="text-red-600 text-sm mt-1">{errors.email[0]}</p>
                    )}
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="loginPassword" className="block text-gray-700 font-medium">
                            Password
                        </label>
                        {/* <button
                            type="button"
                            className="text-sm font-medium text-accent hover:underline"
                            onClick={() => alert('Forgot password feature will be implemented here')}
                        >
                            Forgot password?
                        </button> */}
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
                                alt="Password"
                                className="w-5 h-5"
                            />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="loginPassword"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 p-4 border border-gray-300 rounded-xl input-focus focus:outline-none transition-all duration-300"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <img
                                src={
                                    showPassword
                                        ? 'https://cdn-icons-png.flaticon.com/512/2767/2767146.png'
                                        : 'https://cdn-icons-png.flaticon.com/512/709/709612.png'
                                }
                                alt="Show Password"
                                className="w-5 h-5"
                            />
                        </button>
                    </div>
                    {errors?.password && Array.isArray(errors.password) && (
                        <p className="text-red-600 text-sm mt-1">{errors.password[0]}</p>
                    )}

                    <div className="flex items-center mt-3">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            checked={formData.remember}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                        />
                        <label htmlFor="remember" className="ml-2 text-gray-600 text-sm">
                            Keep me signed in for 30 days
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary text-white font-semibold py-4 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent flex items-center justify-center disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1791/1791961.png"
                                alt="Loading"
                                className="w-5 h-5 mr-2 animate-spin"
                            />
                            Signing In...
                        </>
                    ) : (
                        <>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3588/3588775.png"
                                alt="Login"
                                className="w-5 h-5 mr-2"
                            />
                            Sign In to Your Account
                        </>
                    )}
                </button>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Don't have an account?
                    <button
                        type="button"
                        onClick={onSwitchToSignup}
                        className="text-accent font-semibold hover:underline ml-1"
                    >
                        Sign up here
                    </button>
                </p>
            </form>
        </>
    );
};

export default LoginForm;
