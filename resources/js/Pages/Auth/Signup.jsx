import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

const SignupForm = ({ onSwitchToLogin }) => {
    const { errors } = usePage().props;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [localError, setLocalError] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalError('');
        setSuccessMessage('');

        if (formData.password !== formData.confirmPassword) {
            setLocalError('Passwords do not match');
            return;
        }

        if (!formData.terms) {
            setLocalError('Please agree to the terms and conditions');
            return;
        }

        router.post(
            '/register',
            {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
            },
            {
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
                onSuccess: () => {
                    // Show success message instead of redirect
                    setSuccessMessage(`Welcome ${formData.firstName}! Your account has been created successfully.`);
                    // Optionally, switch to login form after success
                    setTimeout(() => {
                        onSwitchToLogin();
                    }, 2000); // 2 seconds delay
                }
            }
        );
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        const updatedData = {
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        };

        setFormData(updatedData);

        if (name === 'password' || name === 'confirmPassword') {
            setPasswordMatch(updatedData.password === updatedData.confirmPassword);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-7">
            {/* Local error */}
            {localError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                    {localError}
                </div>
            )}

            {/* Backend validation errors */}
            {Object.keys(errors).length > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                    <ul className="list-disc ml-4">
                        {Object.values(errors).map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Success message */}
            {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm">
                    {successMessage}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 rounded-xl"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 rounded-xl"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl"
                    required
                />
            </div>

            {/* Password field with Eye */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-4 pr-12 border border-gray-300 rounded-xl"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>
            </div>

            {/* Confirm Password with Eye */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full p-4 pr-12 border rounded-xl ${
                            formData.confirmPassword
                                ? passwordMatch
                                    ? 'border-green-400'
                                    : 'border-red-300'
                                : 'border-gray-300'
                        }`}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                    >
                        {showConfirmPassword ? '🙈' : '👁️'}
                    </button>
                </div>
                {!passwordMatch && (
                    <p className="text-red-500 text-sm mt-1">
                        Passwords do not match
                    </p>
                )}
            </div>

            <div className="flex items-start">
                <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="h-4 w-4 mt-1"
                />
                <span className="ml-2 text-sm text-gray-600">
                    I agree to the Terms & Privacy Policy
                </span>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary text-white font-semibold py-4 rounded-xl disabled:opacity-70"
            >
                {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="text-center text-gray-600 text-sm mt-6">
                Already have an account?
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-accent font-semibold ml-1"
                >
                    Sign in here
                </button>
            </p>
        </form>
    );
};

export default SignupForm;
