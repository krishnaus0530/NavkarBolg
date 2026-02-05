import React, { useState } from 'react';
import { Head, Link,usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';


const PropertyOperations = ({ auth }) => {
    const { props } = usePage();
    console.log(props);
    const [openAccordion, setOpenAccordion] = useState(0); // Default first accordion open

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const services = [
        {
            id: 1,
            title: "Marketing",
            icon: "fa-bullhorn",
            description: "We advertise our vacancies across multiple online platforms and conduct email campaigns to reach interested organizations.",
            link: "https://triumphresidential.com/marketing/"
        },
        {
            id: 2,
            title: "Tenant Screening",
            icon: "fa-search",
            description: "We conduct exhaustive screening measures to ensure quality tenants.",
            link: "https://triumphresidential.com/tenant-screening/"
        },
        {
            id: 3,
            title: "Leasing",
            icon: "fa-handshake",
            description: "We execute lease and lease renewals prepared by our professional team.",
            link: "https://triumphresidential.com/leasing/"
        },
        {
            id: 4,
            title: "Rent Collection",
            icon: "fa-dollar-sign",
            description: "We offer a variety of ways to rent which leads to collecting rent every month in a timely and orderly fashion.",
            link: "https://triumphresidential.com/rent-collection/"
        },
        {
            id: 5,
            title: "Emergency Services",
            icon: "fa-phone-alt",
            description: "We provide an emergency service line which connects to a professional representative 24 hours and 7 days a week.",
            link: "https://triumphresidential.com/emergency-services/"
        },
        {
            id: 6,
            title: "Maintenance",
            icon: "fa-wrench",
            description: "We conduct inspections upon move-in and move-out and ensure all maintenance issues are addressed in a timely manner.",
            link: "https://triumphresidential.com/maintenance/"
        }
    ];


    return (
        <>
            <AppLayout>
                <Head>
                    <title>{`Property Operations - ${props.BRAND_WORD} `}</title>
                    <meta 
                        name="description" 
                        content={` ${props.BRAND_WORD} delivers end-to-end property operations for affordable housing with efficient, time-tested standards and continuous on-site management.`}
                    />
                    <meta name="keywords" content={` ${props.BRAND_WORD}, property operations, affordable housing management, property management, operational standards, Los Angeles apartments`} />

                    {/* Open Graph */}
                    <meta property="og:title" content={`Property Operations - ${props.BRAND_WORD}`} />
                    <meta property="og:description" content={`${props.BRAND_WORD} delivers end-to-end property operations for affordable housing with efficient, time-tested standards and continuous on-site management.`}/>
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://www.triumphresidential.com/property-operations" />
                    <meta property="og:image" content="https://www.triumphresidential.com/images/property-operations-og.jpg" />

                    {/* Twitter Card */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={`Property Operations - ${props.BRAND_WORD}`} />
                    <meta name="twitter:description" content={`${props.BRAND_WORD} delivers end-to-end property operations for affordable housing with efficient, time-tested standards and continuous on-site management.`}/>
                    <meta name="twitter:image" content="https://www.triumphresidential.com/images/property-operations-og.jpg" />
                </Head>
                {/* Hero Section */}
                <section className="hero-bg-property_opration bg-gradient-to-r from-darkbluegray to-darkbluegray/90 py-20">
                    <div className="max-w-7xl mx-auto px-4 min-h-[250px]">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Property Operations</h1>
                            <p className="text-xl">
                                 {props.BRAND_WORD} brings an end-to-end management approach to Affordable Housing that allows us to implement efficient and time-tested operational standards. We have a continuous personal presence at your property, ensuring our culture of management and leadership is realized with all of our associates.
                            </p>
                        </div>
                    </div>
                </section>
                <div className="site-content fade-in">
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        {/* Page Header */}
                        {/* <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Property Operations</h1>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Triumph Residential Services brings an end-to-end management approach to Affordable Housing that allows us to implement efficient and time-tested operational standards. We have a continuous personal presence at your property, ensuring our culture of management and leadership is realized with all of our associates.
                            </p>
                        </div> */}
                        {/* Services Grid */}
                        {/* Services Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="service-card bg-white rounded-2xl shadow-md p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div
                                            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                                            style={{ backgroundColor: '#e76b53', color: '#fff' }}
                                        >
                                            <i className={`fas ${service.icon} text-3xl`}></i>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4" style={{ color: '#323751' }}>
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-700">
                                            {service.description}
                                        </p>
                                        {/* <a
                                            href={service.link}
                                            target="_blank"
                                            className="mt-4 inline-block px-6 py-2 rounded-full font-semibold text-white"
                                            style={{ backgroundColor: '#323751' }}
                                            >
                                            Learn More
                                            </a> */}
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export default PropertyOperations;