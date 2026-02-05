import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from './Layouts/AppLayout'

const PropertyServices = () => {
    const services = [
        {
            id: 1,
            title: "Property Buying",
            subtitle: "Find your dream home",
            icon: "fa-home",
            features: [
                "Property search & selection",
                "Market analysis",
                "Negotiation support"
            ],
            link: "/propertyBuyingPage",
            color: "darkbluegray"
        },
        {
            id: 2,
            title: "Property Selling",
            subtitle: "Maximize property value",
            icon: "fa-dollar-sign",
            features: [
                "Property valuation",
                "Marketing strategy",
                "Buyer screening"
            ],
            link: "/propertySellingPage",
            color: "darkbluegray"
        },
        {
            id: 3,
            title: "Property Management",
            subtitle: "Complete management",
            icon: "fa-cogs",
            features: [
                "Tenant management",
                "Maintenance services",
                "Rent collection"
            ],
            link: "/propertyManagement",
            color: "darkbluegray"
        },
        {
            id: 4,
            title: "Real Estate Investment",
            subtitle: "Strategic investments",
            icon: "fa-chart-line",
            features: [
                "Market analysis",
                "Portfolio management",
                "Deal sourcing"
            ],
            link: "/realEstateInvestment",
            color: "darkbluegray"
        },
        {
            id: 5,
            title: "Legal & Documentation",
            subtitle: "Complete legal support",
            icon: "fa-file-contract",
            features: [
                "Title verification",
                "Contract preparation",
                "Registration support"
            ],
            link: "/legal_Documentation",
            color: "darkbluegray"
        }
    ];

    const stats = [
        { value: "5000+", label: "Properties" },
        { value: "15+", label: "Years Experience" },
        { value: "99.8%", label: "Satisfaction" },
        { value: "250+", label: "Team Members" }
    ];

    const handleContact = () => {
        // Handle contact button click
        console.log('Contact button clicked');
    };

    const handleCall = () => {
        // Handle call button click
        console.log('Call button clicked');
    };

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-darkbluegray mb-3">
                        Our Property Services
                    </h2>
                    <p className="text-gray-600">
                        Complete real estate solutions for all your needs
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div 
                            key={service.id} 
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border"
                        >
                            <div className="p-5">
                                <div className="flex items-center mb-4">
                                    <div className={`w-10 h-10 bg-${service.color} rounded-lg flex items-center justify-center mr-3`}>
                                        <i className={`fas ${service.icon} text-white`}></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-darkbluegray">
                                            {service.title}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {service.subtitle}
                                        </p>
                                    </div>
                                </div>
                                
                                <ul className="space-y-2 mb-4">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-sm">
                                            <i className="fas fa-check text-coral mr-2 text-xs"></i>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                <Link 
                                    href={service.link}
                                    className="block w-full bg-darkbluegray hover:bg-coral text-white text-center py-2 rounded-lg text-sm font-medium transition duration-300"
                                >
                                    Explore Service
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Simple Stats */}
                <div className="mt-12 bg-darkbluegray rounded-xl p-6 text-white">
                    <div className="grid md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Simple CTA */}
                <div className="mt-8 text-center">
                    <p className="text-lg text-darkbluegray mb-4">
                        Need help choosing a service?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button 
                            onClick={handleContact}
                            className="bg-coral hover:bg-darkbluegray text-white py-2 px-6 rounded-lg text-sm font-medium transition duration-300"
                        >
                            Contact Us
                        </button>
                        <button 
                            onClick={handleCall}
                            className="border border-darkbluegray text-darkbluegray hover:bg-darkbluegray hover:text-white py-2 px-6 rounded-lg text-sm font-medium transition duration-300"
                        >
                            Call: (555) 123-4567
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function Property(){
    return (
        <AppLayout>
            <PropertyServices />
        </AppLayout>
    );
};