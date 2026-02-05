import { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
const ContactForm = ({ 
    formDataa, 
    setFormDataa, 
    formSubmitted, 
    setFormSubmitted, 
    interested_property = false, 
    interested_property_value = "" 
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(formDataa);
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const { props } = usePage();

    useEffect(() => {
        if (interested_property) {
            setFormData(prev => ({
                ...prev,
                interested_property: interested_property_value,
                intrested: interested_property,
                subject: "property-inquiry" 
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                intrested: interested_property,
                interested_property: ""
            }));
        }
    }, [interested_property, interested_property_value, setFormData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // API call to store data
    const submitToAPI = async (data) => {
        try {
            // Get CSRF token
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            
            const apiData = {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                phone: data.phone,
                subject: data.subject || "property-inquiry",
                interested_property: data.interested_property || interested_property_value,
                message: data.message,
                interested: data.intrested || false
            };

            console.log('Submitting to API:', apiData);

            // Make API call
            const response = await fetch('/property-inquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(apiData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to submit form');
            }

            return result;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    };

    // Validation function
    const validateForm = () => {
        const errors = [];

        if (!formData.firstName?.trim()) {
            errors.push('First name is required');
        }

        if (!formData.lastName?.trim()) {
            errors.push('Last name is required');
        }

        if (!formData.email?.trim()) {
            errors.push('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.push('Please enter a valid email address');
        }

        if (!formData.message?.trim()) {
            errors.push('Message is required');
        }

        if (interested_property && !formData.interested_property?.trim()) {
            errors.push('Property reference is required');
        }

        if (!interested_property && !formData.subject) {
            errors.push('Please select a subject');
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        setSubmitError("");
        setSubmitSuccess(false);

        // Validate form
        const errors = validateForm();
        if (errors.length > 0) {
            setSubmitError(errors.join(', '));
            return;
        }

        // Set submitting state
        setIsSubmitting(true);

        try {
            // Submit to API
            const result = await submitToAPI(formData);
            
            console.log('API Response:', result);

            if (result.status === 'success') {
                // Show success message
                setSubmitSuccess(true);
                // setFormSubmitted(true);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        subject: interested_property ? "property-inquiry" : '',
                        message: '',
                        interested_property: interested_property_value,
                        intrested: interested_property,
                    });
                    setFormSubmitted(false);
                    setSubmitSuccess(false);
                    setIsSubmitting(false);
                }, 3000);
            } else {
                throw new Error(result.message || 'Submission failed');
            }
            
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitError(error.message || 'Failed to submit form. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-2xl p-8 darkblue-shadow">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-darkbluegray mb-4">Send Us a Message</h2>
                    <p className="text-darkbluegraylight">
                        Fill out the form below and one of our real estate experts will get back to you as soon as possible.
                    </p>
                </div>

                {/* Error Message */}
                {submitError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error submitting form</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{submitError}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800">Success!</h3>
                                <div className="mt-2 text-sm text-green-700">
                                    <p>Your inquiry has been submitted successfully. We'll get back to you soon!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="firstName" className="block text-darkbluegray font-medium mb-2">First Name *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData?.firstName}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-coral transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-darkbluegray font-medium mb-2">Last Name *</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData?.lastName}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-coral transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="block text-darkbluegray font-medium mb-2">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData?.email}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-coral transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-darkbluegray font-medium mb-2">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData?.phone}
                                onChange={handleInputChange}
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-coral transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Enter your phone number"
                            />
                        </div>
                    </div>

                    {interested_property ? (
                        <div>
                            <label htmlFor="interested_property" className="block text-darkbluegray font-medium mb-2">
                                Interested Property *
                            </label>
                            <input
                                type="text"
                                id="interested_property"
                                name="interested_property"
                                value={formData?.interested_property}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-coral transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Enter the property you are interested in"
                            />
                            <input
                                type="hidden"
                                name="subject"
                                value="property-inquiry"
                            />
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="subject" className="block text-darkbluegray font-medium mb-2">Subject *</label>
                            <select
                                id="subject"
                                name="subject"
                                value={formData?.subject}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-coral transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="" disabled>Select a subject</option>
                                <option value="property-inquiry">Property Inquiry</option>
                                <option value="property-valuation">Property Valuation</option>
                                <option value="buying-assistance">Buying Assistance</option>
                                <option value="selling-assistance">Selling Assistance</option>
                                <option value="property-management">Property Management</option>
                                <option value="investment-advice">Investment Advice</option>
                                <option value="general-question">General Question</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    )}

                    <div>
                        <label htmlFor="message" className="block text-darkbluegray font-medium mb-2">Message *</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            value={formData?.message}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-coral transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Tell us how we can help you..."
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full md:w-auto px-8 py-4 font-semibold rounded-full transition duration-300 transform ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-coral text-white hover:bg-darkbluegray hover:scale-105'}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : formSubmitted ? 'Message Sent!' : 'Send Message'}
                        </button>
                        
                        {formSubmitted && !isSubmitting && (
                            <p className="mt-2 text-green-600 font-medium">
                                Thank you! We'll get back to you within 24 hours.
                            </p>
                        )}
                        
                        <p className="mt-4 text-sm text-darkbluegraylight">
                            By submitting this form, you agree to our Privacy Policy and Terms of Service.
                        </p>
                    </div>
                </form>
            </div>

            {/* Additional Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-bold text-darkbluegray mb-3">What to Expect</h4>
                    <ul className="space-y-2 text-darkbluegraylight">
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-coral mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Response within 24 hours
                        </li>
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-coral mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Personalized consultation
                        </li>
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-coral mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            No obligation assessment
                        </li>
                    </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-bold text-darkbluegray mb-3">Quick Response</h4>
                    <p className="text-darkbluegraylight mb-4">
                        For immediate assistance, call our direct line:
                    </p>
                    <a href="tel:+15551234567" className="text-coral font-bold text-lg hover:text-darkbluegray transition">
                        {`${props.Contact}`}
                    </a>
                </div>
            </div>
        </>
    );
};

export default ContactForm;