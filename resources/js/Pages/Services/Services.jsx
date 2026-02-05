import { useState } from 'react';
import AppLayout from '../Layouts/AppLayout'
import { Head, Link, usePage } from '@inertiajs/react';

const ServicesComponent = () => {

    return (
        <>
            <section className="hero-bg py-20 md:py-28 px-4 bg-darkbluegray">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center text-white">
                        <span className="inline-block text-coral font-semibold text-sm uppercase tracking-wider mb-4">
                            Our Expertise
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Premium Real Estate Services
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10">
                            From finding your dream home to managing your investment property, we offer comprehensive solutions tailored to your needs.
                        </p>
                        <a href="#services" className="inline-flex items-center px-8 py-4 bg-coral text-white font-semibold rounded-full hover:bg-white hover:text-coral transition-all duration-300">
                            Explore Our Services
                            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>


            <section id="services" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-darkbluegray mb-4">
                            Comprehensive Real Estate Solutions
                        </h2>
                        <p className="text-darkbluegraylight text-lg max-w-3xl mx-auto">
                            We provide end-to-end real estate services that help you make informed decisions, maximize value, and achieve your property goals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">

                        <div className="bg-white rounded-2xl p-8 darkblue-shadow service-card">
                            <div className="bg-coral/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-darkbluegray mb-4">Residential Services</h3>
                            <p className="text-darkbluegraylight mb-6">
                                Find, buy, sell, or rent your perfect home with expert guidance and personalized service.
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center text-darkbluegray">
                                    <svg className="w-5 h-5 text-coral mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Home Buying Assistance
                                </li>
                                <li className="flex items-center text-darkbluegray">
                                    <svg className="w-5 h-5 text-coral mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Property Selling & Marketing
                                </li>
                                <li className="flex items-center text-darkbluegray">
                                    <svg className="w-5 h-5 text-coral mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Rental Property Management
                                </li>
                            </ul>
                            <a href="#residential" className="text-coral font-semibold flex items-center group">
                                View Residential Services
                                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </a>
                        </div>

                        <div className="bg-white rounded-2xl p-8 darkblue-shadow service-card">
                            <div className="bg-coral/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-darkbluegray mb-4">Commercial Services</h3>
                            <p className="text-darkbluegraylight mb-6">
                                Office spaces, retail locations, and industrial properties for business growth and investment.
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center text-darkbluegray">
                                    <svg className="w-5 h-5 text-coral mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Office Space Leasing
                                </li>
                                <li className="flex items-center text-darkbluegray">
                                    <svg className="w-5 h-5 text-coral mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Retail Property Acquisition
                                </li>
                                <li className="flex items-center text-darkbluegray">
                                    <svg className="w-5 h-5 text-coral mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Industrial Property Solutions
                                </li>
                            </ul>
                            <a href="#commercial" className="text-coral font-semibold flex items-center group">
                                View Commercial Services
                                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </a>
                        </div>

                        <div className="bg-white rounded-2xl p-8 darkblue-shadow service-card">
                            <div className="bg-coral/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-darkbluegray mb-4">Investment Services</h3>
                            <p className="text-darkbluegraylight mb-6">
                                Strategic investment opportunities and portfolio management for maximum returns.
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center text-darkbluegray">
                                    <svg className="w-5 h-5 text-coral mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Market Analysis & Research
                                </li>
                                <li className="flex items-center text-darkbluegray">
                                    <svg className="w-5 h-5 text-coral mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Property Portfolio Management
                                </li>
                                <li className="flex items-center text-darkbluegray">
                                    <svg className="w-5 h-5 text-coral mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Investment Property Sourcing
                                </li>
                            </ul>
                            <a href="#investment" className="text-coral font-semibold flex items-center group">
                                View Investment Services
                                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="bg-darkbluegray rounded-3xl p-10 md:p-16 text-white mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
                            <p className="text-gray-300 text-lg max-w-3xl mx-auto">A streamlined approach to ensure your real estate journey is smooth and successful</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="process-step text-center p-6">
                                <div className="bg-coral/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-white">1</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Consultation</h3>
                                <p className="text-gray-300">Understanding your needs, goals, and budget</p>
                            </div>

                            <div className="process-step text-center p-6">
                                <div className="bg-coral/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-white">2</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Property Search</h3>
                                <p className="text-gray-300">Curated selection based on your criteria</p>
                            </div>

                            <div className="process-step text-center p-6">
                                <div className="bg-coral/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-white">3</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Negotiation</h3>
                                <p className="text-gray-300">Expert negotiation for the best terms</p>
                            </div>

                            <div className="process-step text-center p-6">
                                <div className="bg-coral/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-white">4</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Closing</h3>
                                <p className="text-gray-300">Seamless paperwork and finalization</p>
                            </div>
                        </div>
                    </div>

                    <div id="residential" className="mb-20">
                        <div className="flex items-center mb-10">
                            <div className="bg-coral w-3 h-12 mr-6 rounded-full"></div>
                            <div>
                                <span className="text-coral font-semibold text-sm uppercase tracking-wider">Residential Services</span>
                                <h2 className="text-3xl font-bold text-darkbluegray">Find Your Dream Home</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                            <div className="bg-white rounded-2xl p-8 darkblue-shadow">
                                <div className="flex items-start mb-6">
                                    <div className="bg-coral/10 p-4 rounded-xl mr-6 hidden sm:block">
                                        <svg className="w-8 h-8 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-darkbluegray mb-3">Home Buying Assistance</h3>
                                        <p className="text-darkbluegraylight mb-4">Personalized search, property evaluation, negotiation, and closing assistance to find your perfect home.</p>
                                        <ul className="space-y-2 text-darkbluegraylight">
                                            <li className="flex items-center">
                                                <svg className="w-4 h-4 text-coral mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                Personalized property search
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="w-4 h-4 text-coral mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                Property inspection coordination
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="w-4 h-4 text-coral mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                Expert negotiation services
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div className="bg-white rounded-2xl p-8 darkblue-shadow">
                                <div className="flex items-start mb-6">
                                    <div className="bg-coral/10 p-4 rounded-xl mr-6 hidden sm:block">
                                        <svg className="w-8 h-8 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-darkbluegray mb-3">Property Marketing & Sales</h3>
                                        <p className="text-darkbluegraylight mb-4">Maximize your property value with professional marketing, staging, and strategic pricing.</p>
                                        <ul className="space-y-2 text-darkbluegraylight">
                                            <li className="flex items-center">
                                                <svg className="w-4 h-4 text-coral mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                Professional photography & virtual tours
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="w-4 h-4 text-coral mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                Multi-platform marketing strategy
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="w-4 h-4 text-coral mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                Open house coordination
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div id="commercial" className="mb-20">
                        <div className="flex items-center mb-10">
                            <div className="bg-coral w-3 h-12 mr-6 rounded-full"></div>
                            <div>
                                <span className="text-coral font-semibold text-sm uppercase tracking-wider">Commercial Services</span>
                                <h2 className="text-3xl font-bold text-darkbluegray">Business Property Solutions</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                            <div className="bg-white rounded-2xl p-8 darkblue-shadow">
                                <div className="flex items-start mb-6">
                                    <div className="bg-coral/10 p-4 rounded-xl mr-6 hidden sm:block">
                                        <svg className="w-8 h-8 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-darkbluegray mb-3">Office Space Solutions</h3>
                                        <p className="text-darkbluegraylight mb-4">Find the perfect office space that fits your business needs, culture, and growth plans.</p>
                                        <div className="mt-6">
                                            <span className="inline-block bg-gray-100 text-darkbluegray text-sm font-medium px-4 py-2 rounded-full mr-3 lg:mt-0 mt-3">Flexible Leasing</span>
                                            <span className="inline-block bg-gray-100 text-darkbluegray text-sm font-medium px-4 py-2 rounded-full mr-3 lg:mt-0 mt-3">Location Analysis</span>
                                            <span className="inline-block bg-gray-100 text-darkbluegray text-sm font-medium px-4 py-2 rounded-full lg:mt-0 mt-6">Space Planning</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="bg-white rounded-2xl p-8 darkblue-shadow">
                                <div className="flex items-start mb-6">
                                    <div className="bg-coral/10 p-4 rounded-xl mr-6 hidden sm:block">
                                        <svg className="w-8 h-8 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-darkbluegray mb-3">Retail Property Services</h3>
                                        <p className="text-darkbluegraylight mb-4">Prime retail locations with high foot traffic and visibility for your business success.</p>
                                        <div className="mt-6">
                                            <span className="inline-block bg-gray-100 text-darkbluegray text-sm font-medium px-4 py-2 rounded-full mr-3 lg:mt-0 mt-3">Foot Traffic Analysis</span>
                                            <span className="inline-block bg-gray-100 text-darkbluegray text-sm font-medium px-4 py-2 rounded-full mr-3 lg:mt-0 mt-3">Lease Negotiation</span>
                                            <span className="inline-block bg-gray-100 text-darkbluegray text-sm font-medium px-4 py-2 rounded-full mt-6">Market Research</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="bg-gradient-to-r from-darkbluegray to-darkbluegray/90 rounded-3xl p-10 md:p-16 text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Property?</h2>
                        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">Let our experts guide you through every step of your real estate journey</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                           
                            <Link href="/contact" className="px-8 py-4 bg-coral text-white font-semibold rounded-full hover:bg-white hover:text-coral transition-all duration-300">
                                Contact Us
                            </Link>
                            <a href="#" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-darkbluegray transition-all duration-300">
                                Call Now: (213) 252-4444
                            </a>
                        </div>
                    </div>
                </div>
            </section>


            <section className="w-full max-w-7xl mx-auto px-4 py-12 mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-darkbluegray mb-4">Service FAQs</h2>
                    <p className="text-darkbluegraylight text-lg max-w-2xl mx-auto">Common questions about our services and processes</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
                    <div className="divide-y divide-gray-100">
                        <details className="group">
                            <summary className="list-none cursor-pointer">
                                <div className="flex justify-between items-center p-6 md:p-8 hover:bg-gray-50 transition-colors duration-200">
                                    <h3 className="text-lg md:text-xl font-semibold text-darkbluegray pr-8">How long does the buying process usually take?</h3>
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-coral flex items-center justify-center ml-4 group-open:rotate-45 transition-transform duration-300">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 6v12M6 12h12"></path>
                                        </svg>
                                    </div>
                                </div>
                            </summary>
                            <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-4">
                                <p className="text-darkbluegraylight">The typical buying process takes 30-45 days from offer acceptance to closing. However, this can vary based on financing, inspections, and other factors. We work to streamline every step.</p>
                            </div>
                        </details>

                        <details className="group">
                            <summary className="list-none cursor-pointer">
                                <div className="flex justify-between items-center p-6 md:p-8 hover:bg-gray-50 transition-colors duration-200">
                                    <h3 className="text-lg md:text-xl font-semibold text-darkbluegray pr-8">What fees are involved in your services?</h3>
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-coral flex items-center justify-center ml-4 group-open:rotate-45 transition-transform duration-300">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 6v12M6 12h12"></path>
                                        </svg>
                                    </div>
                                </div>
                            </summary>
                            <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-4">
                                <p className="text-darkbluegraylight">Our fees vary by service type. For property sales, we typically charge a commission percentage. For buying services, we often work on a fixed fee basis. All fees are transparently discussed during our initial consultation.</p>
                            </div>
                        </details>
                    </div>
                </div>
            </section>
        </>
    );
};

export default function Services() {
    return (
        <AppLayout>
            <ServicesComponent></ServicesComponent>
        </AppLayout>
    )
};