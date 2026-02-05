import React from "react";
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from './Layouts/AppLayout'

const PrivacyPolicy = ({ lastUpdated, contactEmail, companyName, companyAddress }) => {
    const { props } = usePage();
    const policySections = [
        {
            id: 'intro',
            title: 'Privacy Policy',
            icon: 'info-circle',
            content: [
                'Triumph Residential Services believes in the Privacy of our users and consumers. It is also committed to its data protection and its data privacy.',
                'This Privacy Policy describes how Triumph Residential Services collects and uses the information of its users and/or consumers. The policy will be updated from time to time in accordance with the State and Federal Laws.',
                'Please read the Privacy Policy and CCPA together as it also applies to the Personal Information that is collected pursuant to CCPA.'
            ]
        },
        {
            id: 'collection',
            title: 'When is the Information Collected?',
            icon: 'database',
            content: [
                'Triumph Residential Services collects any/all information only when it is voluntarily submitted by its users in order to obtain certain information or details.',
                'By clicking on the ‘Send Message’ button provided on the website, users agree to have their information shared with us and allow us to contact them via Personal Information that is submitted to us.'
            ]
        },
        {
            id: 'use',
            title: 'Why and How the collected Information is used?',
            icon: 'cogs',
            content: [
                'The information that is collected is used by Triumph Residential Services to provide the requested property information and services that are being offered, respond to customer service requests, respond to communications pertaining to marketing, improve Website and Marketing efforts, etc.',
                'This information may be disclosed when legally compelled to do so, and the law requires it for the protection of legal rights.'
            ]
        },
        {
            id: 'minors',
            title: 'What if you are a Minor?',
            icon: 'child',
            content: [
                'Triumph Residential Services does not collect any information from minors under the age of 16 years or the equivalent age as specified by law.',
                'If anyone requires such website access under equal housing opportunity, it can only be in conjunction with permission and guidance from the parents or guardians.'
            ]
        },
        {
            id: 'third-parties',
            title: 'What is the provision for Third Parties accessing collected Information?',
            icon: 'user-friends',
            content: [
                'Personally Identifiable Information is never used for any kind of sale, trade, or otherwise transferred to third parties unless users are provided with advance notice.'
            ]
        },
        {
            id: 'privacy',
            title: 'Privacy under Privacy Policy',
            icon: 'shield-alt',
            content: [
                'Triumph Residential Services safeguards the fundamental Right of Privacy of all of its users and will always take all reasonable efforts to protect it.'
            ]
        },
        {
            id: 'amendments',
            title: 'Amendments',
            icon: 'edit',
            content: [
                'All rights are reserved with Triumph Residential Services, for the amendments to this Privacy Policy to cope up with the legal requirements, technological advancements and growing business operations.',
                'However, any changes and amendments in the future will not affect the information that is submitted to us in a manner detrimental or materially inconsistent with this Privacy Policy, without prior consent.',
                'ALL users are requested to read the policies carefully.'
            ]
        }
    ];

    const keyPoints = [
        'We respect your privacy and protect your data',
        'Information collected only when voluntarily submitted',
        'No information collected from minors under 16'
    ];

    const getIconClass = (iconName) => {
        switch(iconName) {
            case 'info-circle': return 'fas fa-info-circle';
            case 'database': return 'fas fa-database';
            case 'cogs': return 'fas fa-cogs';
            case 'child': return 'fas fa-child';
            case 'user-friends': return 'fas fa-user-friends';
            case 'shield-alt': return 'fas fa-shield-alt';
            case 'edit': return 'fas fa-edit';
            default: return 'fas fa-info-circle';
        }
    };

    return (
        <>
        <AppLayout>
            <Head title="Privacy Policy - Triumph Residential Services" />
             <Head>
                <title>Privacy Policy - Triumph Residential Services</title>
                <meta name="description" content="Read the Privacy Policy of Triumph Residential Services. Learn how we collect, use, and protect your personal information while providing our residential services in Los Angeles." />
                <meta name="keywords" content="Privacy Policy, Triumph Residential Services, Los Angeles apartments, data protection, user information" />
                
                {/* Open Graph / Social Sharing */}
                <meta property="og:title" content="Privacy Policy - Triumph Residential Services" />
                <meta property="og:description" content="Learn about Triumph Residential Services’ commitment to privacy and data protection for users and customers." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.triumphresidential.com/privacy-policy" />
                <meta property="og:image" content="https://www.triumphresidential.com/og-image.jpg" />

                {/* Optional: Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Privacy Policy - Triumph Residential Services" />
                <meta name="twitter:description" content="Learn about Triumph Residential Services’ commitment to privacy and data protection for users and customers." />
                <meta name="twitter:image" content="https://www.triumphresidential.com/og-image.jpg" />
            </Head>
            <div className="mt-8">
            <main className="container mx-auto px-4 py-8 ">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                            <h3 className="font-bold text-lg text-[#323751] mb-4 pb-2 border-b border-gray-200">
                                Policy Sections
                            </h3>
                            <ul className="space-y-3">
                                {policySections.map((section) => (
                                    <li key={section.id}>
                                        <a 
                                            href={`#${section.id}`}
                                            className="flex items-center hover:text-[#e76b53] transition-colors"
                                        >
                                            <i className={`fas fa-chevron-right text-xs mr-3 text-[#e76b53]`}></i>
                                            {section.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="font-bold text-[#323751] mb-3">Key Points</h4>
                                <div className="space-y-3">
                                    {keyPoints.map((point, index) => (
                                        <div key={index} className="flex items-start">
                                            <i className="fas fa-check text-[#e76b53] mr-3 mt-1"></i>
                                            <span className="text-sm">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Policy Content */}
                    <div className="lg:w-3/4">
                        {policySections.map((section) => (
                            <section 
                                key={section.id} 
                                id={section.id}
                                className="bg-white rounded-lg shadow-md p-6 mb-8"
                            >
                                <div className="flex items-center mb-6">
                                    <div className="bg-[#e76b53] p-3 rounded-full mr-4">
                                        <i className={`${getIconClass(section.icon)} text-white text-xl`}></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#323751]">
                                        {section.title}
                                    </h2>
                                </div>
                                
                                <div className="space-y-4 text-gray-700">
                                    {section.content.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                    
                                    {/* Special formatting for specific sections */}
                                    {section.id === 'intro' && (
                                        <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-[#e76b53] my-6">
                                            <p className="text-gray-700">
                                                <strong>Note:</strong> {section.content[1]}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {section.id === 'use' && (
                                        <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-[#e76b53] my-6">
                                            <p className="text-gray-700">
                                                <strong>Legal Disclosure:</strong> {section.content[1]}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {section.id === 'minors' && (
                                        <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500 my-6">
                                            <div className="flex items-start">
                                                <i className="fas fa-users text-blue-500 text-xl mr-4 mt-1"></i>
                                                <div>
                                                    <h4 className="font-bold text-[#323751] mb-2">
                                                        Equal Housing Opportunity
                                                    </h4>
                                                    <p className="text-gray-700">{section.content[1]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                        ))}

                        {/* Contact Section */}
                        <section id="contact" className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center mb-6">
                                <div className="bg-[#e76b53] p-3 rounded-full mr-4">
                                    <i className="fas fa-envelope text-white text-xl"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-[#323751]">Contact Us</h2>
                            </div>
                            
                            <p className="text-gray-700 mb-6">
                                All Users and Consumers are requested hereby for any questions or concerns regarding 
                                Triumph Residential Services PRIVACY POLICY, to write to us at:
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-5 rounded-lg">
                                    <h4 className="font-bold text-[#323751] mb-4 flex items-center">
                                        <i className="fas fa-envelope text-[#e76b53] mr-3"></i> 
                                        Email Address
                                    </h4>
                                    <a 
                                        href={`mailto:${contactEmail}`}
                                        className="text-lg font-medium text-[#e76b53] hover:underline"
                                    >
                                        {`${props.Email}`}
                                    </a>
                                </div>
                                
                                <div className="bg-gray-50 p-5 rounded-lg">
                                    <h4 className="font-bold text-[#323751] mb-4 flex items-center">
                                        <i className="fas fa-map-marker-alt text-[#e76b53] mr-3"></i> 
                                        Postal Address
                                    </h4>
                                    <p className="text-gray-700"> 
                                        {`${props.Address_1}`} 
                                        {`${props.Address_2}`}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            </div>
        </AppLayout>

        </>
    );
};

export default PrivacyPolicy;