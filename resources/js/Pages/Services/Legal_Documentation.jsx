import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

const LegalDocumentationContent = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);

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

    const handlePackageSelect = (packageName) => {
        setSelectedPackage(packageName);
        alert(`Thank you for selecting the ${packageName} package. Our legal team will contact you shortly.`);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="hero-bg bg-gradient-to-r from-darkbluegray to-darkbluegray/90 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Legal & Documentation Services</h1>
                        <p className="text-xl max-w-3xl mx-auto mb-10">
                            Complete legal support, contract preparation, title verification, and seamless documentation process.
                        </p>
                    </div>
                </div>
            </section>

            {/* Service Overview */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Overview Section */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h2 className="text-3xl font-bold text-darkbluegray mb-6">Expert Legal Support for Real Estate Transactions</h2>
                            <p className="text-darkbluegraylight mb-6">
                                Real estate transactions involve complex legal procedures and documentation. Our team of legal experts 
                                ensures your property transactions are legally sound, secure, and compliant with all regulations.
                            </p>
                            <p className="text-darkbluegraylight">
                                From title verification to contract execution, we handle every legal aspect with precision, 
                                protecting your interests and ensuring smooth, hassle-free transactions.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl p-8 text-white">
                            <div className="text-4xl font-bold mb-4">99.8%</div>
                            <p className="text-xl mb-6">Error-Free Documentation Rate</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/20 p-4 rounded-lg">
                                    <div className="text-2xl font-bold">5000+</div>
                                    <p className="text-sm opacity-90">Documents Processed</p>
                                </div>
                                <div className="bg-white/20 p-4 rounded-lg">
                                    <div className="text-2xl font-bold">15+</div>
                                    <p className="text-sm opacity-90">Legal Experts</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Core Services */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Our Legal Services</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">📄</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Contract Preparation</h3>
                                <p className="text-darkbluegraylight mb-6">
                                    Drafting, reviewing, and finalizing all real estate contracts with legal precision.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Sale agreements</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Lease agreements</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">MOUs & LOIs</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">🔍</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Title Verification</h3>
                                <p className="text-darkbluegraylight mb-6">
                                    Comprehensive title search and verification to ensure clear ownership.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Chain of title</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Encumbrance check</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Legal opinion</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">⚖️</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Legal Due Diligence</h3>
                                <p className="text-darkbluegraylight mb-6">
                                    Thorough legal investigation of property and transaction details.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Property documents</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Approvals & permits</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Compliance check</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">📋</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Registration & Stamp Duty</h3>
                                <p className="text-darkbluegraylight mb-6">
                                    Complete assistance with property registration and stamp duty payment.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Document registration</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Stamp duty calculation</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Government liaison</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Documentation Process */}
                    <div className="mb-16 bg-darkbluegray rounded-3xl p-12 text-white">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Documentation Process</h2>
                        <div className="grid md:grid-cols-5 gap-8">
                            <div className="text-center">
                                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl">1</span>
                                </div>
                                <h3 className="text-lg font-bold mb-3">Document Collection</h3>
                                <p className="text-gray-300 text-sm">Gathering all required papers</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl">2</span>
                                </div>
                                <h3 className="text-lg font-bold mb-3">Verification</h3>
                                <p className="text-gray-300 text-sm">Authenticity & validity check</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl">3</span>
                                </div>
                                <h3 className="text-lg font-bold mb-3">Preparation</h3>
                                <p className="text-gray-300 text-sm">Drafting legal documents</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl">4</span>
                                </div>
                                <h3 className="text-lg font-bold mb-3">Review</h3>
                                <p className="text-gray-300 text-sm">Legal expert review</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl">5</span>
                                </div>
                                <h3 className="text-lg font-bold mb-3">Execution</h3>
                                <p className="text-gray-300 text-sm">Signing & registration</p>
                            </div>
                        </div>
                    </div>

                    {/* Document Checklist */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Essential Document Checklist</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-xl">🏠</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-darkbluegray">Property Documents</h3>
                                        <p className="text-darkbluegraylight text-sm">Ownership Proof</p>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Title Deed</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Sale Agreement</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Property Tax Receipts</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Encumbrance Certificate</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-xl">📋</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-darkbluegray">Approval Documents</h3>
                                        <p className="text-darkbluegraylight text-sm">Regulatory Clearances</p>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Building Plan Approval</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Occupation Certificate</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">NOC from Society</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Fire Safety Certificate</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-xl">👤</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-darkbluegray">Identity Documents</h3>
                                        <p className="text-darkbluegraylight text-sm">Party Identification</p>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">PAN Card</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Aadhaar Card</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Passport (for NRIs)</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Passport-size Photos</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Legal Protection */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Legal Protection Services</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-r from-red-600 to-red-400 rounded-2xl p-8 text-white">
                                <div className="flex items-start mb-6">
                                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-6">
                                        <span className="text-3xl">🛡️</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-3">Risk Mitigation</h3>
                                        <p className="opacity-90">
                                            Identify and address potential legal risks before they become issues.
                                        </p>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <span className="mr-3">✅</span>
                                        <span>Title defect identification</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-3">✅</span>
                                        <span>Litigation history check</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-3">✅</span>
                                        <span>Fraud prevention measures</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-2xl p-8 text-white">
                                <div className="flex items-start mb-6">
                                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-6">
                                        <span className="text-3xl">⚖️</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-3">Dispute Resolution</h3>
                                        <p className="opacity-90">
                                            Legal representation and mediation for property disputes.
                                        </p>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <span className="mr-3">✅</span>
                                        <span>Mediation services</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-3">✅</span>
                                        <span>Legal representation</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-3">✅</span>
                                        <span>Arbitration support</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Case Studies */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Legal Success Stories</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-xl">🔍</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">Title Dispute Resolved</h4>
                                        <p className="text-darkbluegraylight text-sm">Property Purchase</p>
                                    </div>
                                </div>
                                <p className="text-darkbluegraylight mb-6">
                                    "Identified title defect during verification. Resolved inheritance dispute saving buyer from ₹50 lakhs potential loss."
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-coral font-semibold">Mr. Gupta</span>
                                    <span className="text-sm text-darkbluegraylight">Mumbai Property</span>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-xl">📄</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">NRI Documentation</h4>
                                        <p className="text-darkbluegraylight text-sm">Overseas Investment</p>
                                    </div>
                                </div>
                                <p className="text-darkbluegraylight mb-6">
                                    "Complete documentation for NRI property purchase. Handled RBI compliance, POA, and registration remotely."
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-coral font-semibold">Dr. Singh (NRI)</span>
                                    <span className="text-sm text-darkbluegraylight">USA-based Client</span>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-xl">⚖️</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">Commercial Lease</h4>
                                        <p className="text-darkbluegraylight text-sm">Corporate Agreement</p>
                                    </div>
                                </div>
                                <p className="text-darkbluegraylight mb-6">
                                    "Drafted complex commercial lease protecting tenant rights. Negotiated favorable terms saving ₹20 lakhs annually."
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-coral font-semibold">Tech Company</span>
                                    <span className="text-sm text-darkbluegraylight">5-Year Lease</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Legal Service Packages</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-darkbluegray mb-4">Basic Legal Support</h3>
                                    <div className="text-4xl font-bold text-coral mb-2">₹25,000</div>
                                    <p className="text-darkbluegraylight">One-time fee</p>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Title verification report</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Standard agreement drafting</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Basic due diligence</span>
                                    </li>
                                    <li className="flex items-center text-gray-400">
                                        <span className="mr-3">❌</span>
                                        <span>Registration assistance</span>
                                    </li>
                                    <li className="flex items-center text-gray-400">
                                        <span className="mr-3">❌</span>
                                        <span>Ongoing legal support</span>
                                    </li>
                                </ul>
                                {/* <button 
                                    onClick={() => handlePackageSelect('Basic Legal Support')}
                                    className="w-full border-2 border-coral text-coral hover:bg-coral hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                                >
                                    Select Package
                                </button> */}
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-coral relative">
                                <div className="absolute top-0 right-0 bg-coral text-white px-4 py-2 rounded-tr-2xl rounded-bl-lg">
                                    Most Popular
                                </div>
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-darkbluegray mb-4">Complete Legal Package</h3>
                                    <div className="text-4xl font-bold text-coral mb-2">₹75,000</div>
                                    <p className="text-darkbluegraylight">End-to-end support</p>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Everything in Basic</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Comprehensive due diligence</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Registration & stamping</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Custom agreement drafting</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>6 months post-deal support</span>
                                    </li>
                                </ul>
                                {/* <button 
                                    onClick={() => handlePackageSelect('Complete Legal Package')}
                                    className="w-full bg-coral hover:bg-darkbluegray text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                                >
                                    Select Package
                                </button> */}
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-darkbluegray mb-4">Premium Legal Suite</h3>
                                    <div className="text-4xl font-bold text-coral mb-2">₹1,50,000</div>
                                    <p className="text-darkbluegraylight">For complex transactions</p>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Everything in Complete</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Senior legal counsel</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Dispute resolution support</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>1 year legal support</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-3">✅</span>
                                        <span>Priority processing</span>
                                    </li>
                                </ul>
                                {/* <button 
                                    onClick={() => handlePackageSelect('Premium Legal Suite')}
                                    className="w-full border-2 border-coral text-coral hover:bg-coral hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                                >
                                    Select Package
                                </button> */}
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Legal Services FAQs</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-xl font-bold text-darkbluegray mb-3">How long does title verification take?</h3>
                                    <p className="text-darkbluegraylight">Typically 3-5 working days for residential properties, 5-7 days for commercial properties.</p>
                                </div>
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-xl font-bold text-darkbluegray mb-3">What documents do I need to provide?</h3>
                                    <p className="text-darkbluegraylight">Basic KYC documents, existing property papers, and any previous agreements. We provide a complete checklist.</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-xl font-bold text-darkbluegray mb-3">Do you handle NRI documentation?</h3>
                                    <p className="text-darkbluegraylight">Yes, we specialize in NRI property transactions including POA, RBI compliance, and FEMA regulations.</p>
                                </div>
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-xl font-bold text-darkbluegray mb-3">What if issues are found during verification?</h3>
                                    <p className="text-darkbluegraylight">We provide solutions including legal remedies, negotiation support, or alternative properties if needed.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default function LegalDocumentation(){
    
        return (
            <AppLayout>
                <LegalDocumentationContent />
            </AppLayout>
        );
};