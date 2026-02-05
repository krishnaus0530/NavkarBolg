import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

const PropertyManagementContent = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        propertyType: ''
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert('Thank you! Our management team will contact you within 24 hours.');
        setFormData({
            name: '',
            phone: '',
            email: '',
            propertyType: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePlanSelect = (planName) => {
        alert(`Thank you for selecting the ${planName} plan. Our team will contact you shortly.`);
    };

    // Smooth scroll function
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="hero-bg py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Property Management Services</h1>
                        <p className="text-xl max-w-3xl mx-auto mb-10">
                            Comprehensive property management services including tenant screening, maintenance, and rent collection.
                        </p>
                       
                    </div>
                </div>
            </section>

            {/* Service Overview */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Stats & Overview */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h2 className="text-3xl font-bold text-darkbluegray mb-6">Stress-Free Property Management</h2>
                            <p className="text-darkbluegraylight mb-6">
                                Managing rental properties can be time-consuming and stressful. Let us handle the day-to-day 
                                operations while you enjoy passive income and peace of mind.
                            </p>
                            <p className="text-darkbluegraylight">
                                From finding quality tenants to handling maintenance emergencies, our comprehensive management 
                                services cover every aspect of property ownership.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="stats-card">
                                <div className="text-4xl font-bold mb-2">99%</div>
                                <p className="text-lg opacity-90">On-time Rent Collection</p>
                            </div>
                            <div className="stats-card">
                                <div className="text-4xl font-bold mb-2">24/7</div>
                                <p className="text-lg opacity-90">Emergency Support</p>
                            </div>
                            <div className="stats-card">
                                <div className="text-4xl font-bold mb-2">500+</div>
                                <p className="text-lg opacity-90">Properties Managed</p>
                            </div>
                            <div className="stats-card">
                                <div className="text-4xl font-bold mb-2">15+</div>
                                <p className="text-lg opacity-90">Years Experience</p>
                            </div>
                        </div>
                    </div>

                    {/* Core Services */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Our Comprehensive Management Services</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg service-card">
                                <div className="feature-badge">Tenant Management</div>
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">👥</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Tenant Screening & Placement</h3>
                                <p className="text-darkbluegraylight mb-6">
                                    Comprehensive background checks, credit verification, and interview process 
                                    to find reliable, long-term tenants for your property.
                                </p>
                                <ul className="space-y-2 text-darkbluegraylight">
                                    <li className="flex items-center">
                                        <span className="mr-2">✅</span>
                                        <span>Background & credit checks</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">✅</span>
                                        <span>Employment verification</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">✅</span>
                                        <span>Previous landlord references</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg service-card">
                                <div className="feature-badge">Financial Management</div>
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">💰</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Rent Collection & Accounting</h3>
                                <p className="text-darkbluegraylight mb-6">
                                    Automated rent collection, detailed financial reporting, and timely disbursement 
                                    of funds to your account with complete transparency.
                                </p>
                                <ul className="space-y-2 text-darkbluegraylight">
                                    <li className="flex items-center">
                                        <span className="mr-2">✅</span>
                                        <span>Automated rent collection</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">✅</span>
                                        <span>Monthly financial reports</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">✅</span>
                                        <span>Online payment portal</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg service-card">
                                <div className="feature-badge">Property Maintenance</div>
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">🔧</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Maintenance & Repairs</h3>
                                <p className="text-darkbluegraylight mb-6">
                                    24/7 emergency response, scheduled maintenance, and trusted vendor network 
                                    to keep your property in excellent condition.
                                </p>
                                <ul className="space-y-2 text-darkbluegraylight">
                                    <li className="flex items-center">
                                        <span className="mr-2">✅</span>
                                        <span>24/7 emergency response</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">✅</span>
                                        <span>Regular property inspections</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2">✅</span>
                                        <span>Trusted contractor network</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Management Process */}
                    <div className="mb-16 bg-darkbluegray rounded-3xl p-12 text-white">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Management Process</h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">1</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Property Assessment</h3>
                                <p className="text-gray-300">Detailed evaluation and setup</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">2</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Tenant Placement</h3>
                                <p className="text-gray-300">Screening & lease signing</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">3</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Ongoing Management</h3>
                                <p className="text-gray-300">Rent, maintenance & communication</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">4</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Regular Reporting</h3>
                                <p className="text-gray-300">Monthly updates & financials</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Services */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Additional Services</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-start mb-6">
                                    <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mr-6">
                                        <span className="text-3xl">📋</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-darkbluegray mb-3">Legal & Compliance</h3>
                                        <p className="text-darkbluegraylight">
                                            Stay compliant with all local regulations, handle eviction proceedings when necessary, 
                                            and ensure all legal documentation is up-to-date and properly filed.
                                        </p>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Lease agreement preparation</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Local regulation compliance</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Eviction proceedings (if needed)</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-start mb-6">
                                    <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mr-6">
                                        <span className="text-3xl">📊</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-darkbluegray mb-3">Marketing & Vacancy Management</h3>
                                        <p className="text-darkbluegraylight">
                                            Minimize vacancy periods with professional marketing, photography, 
                                            and strategic pricing to attract quality tenants quickly.
                                        </p>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Professional property marketing</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Vacancy rate optimization</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Rental rate analysis</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Plans */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Management Plans</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-darkbluegray mb-4">Basic Management</h3>
                                    <div className="text-4xl font-bold text-coral mb-2">8%</div>
                                    <p className="text-darkbluegraylight">of monthly rent</p>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Tenant screening & placement</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Rent collection</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Basic maintenance coordination</span>
                                    </li>
                                    <li className="flex items-center text-gray-400">
                                        <span className="mr-3">❌</span>
                                        <span>24/7 emergency response</span>
                                    </li>
                                    <li className="flex items-center text-gray-400">
                                        <span className="mr-3">❌</span>
                                        <span>Regular property inspections</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-coral relative">
                                <div className="absolute top-0 right-0 bg-coral text-white px-4 py-2 rounded-tr-2xl rounded-bl-lg">
                                    Most Popular
                                </div>
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-darkbluegray mb-4">Complete Management</h3>
                                    <div className="text-4xl font-bold text-coral mb-2">12%</div>
                                    <p className="text-darkbluegraylight">of monthly rent</p>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Everything in Basic</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>24/7 emergency response</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Quarterly property inspections</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Legal & compliance support</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Detailed financial reporting</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-darkbluegray mb-4">Premium Management</h3>
                                    <div className="text-4xl font-bold text-coral mb-2">15%</div>
                                    <p className="text-darkbluegraylight">of monthly rent</p>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Everything in Complete</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Monthly property inspections</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Property marketing & advertising</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Annual property improvement plan</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Dedicated account manager</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">What Property Owners Say</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="testimonial-card">
                                <p className="text-darkbluegraylight mb-6">
                                    "Managed my 5 rental properties for 3 years. Rent collection is always on time, 
                                    and maintenance issues are handled promptly. Highly recommend!"
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">Rajesh Nair</h4>
                                        <p className="text-darkbluegraylight text-sm">5 Properties Managed</p>
                                        <div className="flex items-center mt-1">
                                            <span className="text-yellow-500 mr-1">★★★★★</span>
                                            <span className="text-sm text-gray-500">3 years client</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="testimonial-card">
                                <p className="text-darkbluegraylight mb-6">
                                    "Living overseas, I needed reliable management. They handle everything perfectly. 
                                    Monthly reports are detailed and transparent."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">Priya Sharma</h4>
                                        <p className="text-darkbluegraylight text-sm">NRI Property Owner</p>
                                        <div className="flex items-center mt-1">
                                            <span className="text-yellow-500 mr-1">★★★★★</span>
                                            <span className="text-sm text-gray-500">2 years client</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="testimonial-card">
                                <p className="text-darkbluegraylight mb-6">
                                    "Vacancy rates dropped from 30 to 5 days average. Their marketing and tenant 
                                    screening process is exceptional."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">Amit Patel</h4>
                                        <p className="text-darkbluegraylight text-sm">Commercial Property Owner</p>
                                        <div className="flex items-center mt-1">
                                            <span className="text-yellow-500 mr-1">★★★★★</span>
                                            <span className="text-sm text-gray-500">4 years client</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                   
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Management FAQs</h2>
                    <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-xl font-bold text-darkbluegray mb-3">How quickly can you fill vacancies?</h3>
                            <p className="text-darkbluegraylight">With our marketing strategy, we typically fill vacancies within 15-30 days, depending on market conditions and property pricing.</p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-xl font-bold text-darkbluegray mb-3">How are maintenance costs handled?</h3>
                            <p className="text-darkbluegraylight">We provide estimates for approval on repairs over a specified amount. Routine maintenance is handled as per our agreed plan.</p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-xl font-bold text-darkbluegray mb-3">Can NRIs use your services?</h3>
                            <p className="text-darkbluegraylight">Yes, we specialize in managing properties for NRIs with monthly reports, online portals, and compliance with all regulations.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default function PropertyManagement(){

    return (
        <AppLayout>
            <PropertyManagementContent />
        </AppLayout>
    );
}
