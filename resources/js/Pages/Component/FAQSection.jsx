import { useState } from 'react'
import { Head, Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FAQSection() {
    const { props } = usePage();
    return (

        <section className="w-full max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-darkbluegray mb-4">Frequently Asked Questions</h2>
                <p className="text-darkbluegraylight text-lg max-w-2xl mx-auto">Most frequent questions and answers</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 ">
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="divide-y divide-gray-100 pt-2 pb-2">

                            <details className="group">
                                <summary className="list-none cursor-pointer">
                                    <div className="flex justify-between items-center p-6 md:p-8 hover:bg-gray-50 transition-colors duration-200">
                                        <h3 className="text-lg md:text-xl font-semibold text-darkbluegray pr-8">WHAT SERVICES DOES TRIUMPH RESIDENTIAL OFFER?</h3>
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-coral flex items-center justify-center ml-4 group-open:rotate-45 transition-transform duration-300">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v12M6 12h12"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </summary>
                                <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-4">
                                    <p className="text-darkbluegraylight">Triumph Residential Services is Property Management Company in Los Angeles, where we have around 40 affordable properties listed which we provide for rent.</p>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="list-none cursor-pointer">
                                    <div className="flex justify-between items-center p-6 md:p-8 hover:bg-gray-50 transition-colors duration-200">
                                        <h3 className="text-lg md:text-xl font-semibold text-darkbluegray pr-8">WHAT IS THE PROCESS FOR RENTING A CONVENTIONAL APARTMENT THROUGH YOUR COMPANY?</h3>
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-coral flex items-center justify-center ml-4 group-open:rotate-45 transition-transform duration-300">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v12M6 12h12"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </summary>
                                <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-4">
                                    <p className="text-darkbluegraylight">First of all you have to get connected to our Leasing Team, they will help you schedule an appointment to visit the
                                    property. By visiting the property you will have to fill up an application form for further proceedings.</p>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="list-none cursor-pointer">
                                    <div className="flex justify-between items-center p-6 md:p-8 hover:bg-gray-50 transition-colors duration-200">
                                        <h3 className="text-lg md:text-xl font-semibold text-darkbluegray pr-8">HOW DO YOU HANDLE MAINTENANCE REQUESTS FOR THE PROPERTIES YOU MANAGE?</h3>
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-coral flex items-center justify-center ml-4 group-open:rotate-45 transition-transform duration-300">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v12M6 12h12"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </summary>
                                <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-4">
                                    <p className="text-darkbluegraylight">We have a separate team for the maintenance related issues where you can connect to them and they will solve your query.</p>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="list-none cursor-pointer">
                                    <div className="flex justify-between items-center p-6 md:p-8 hover:bg-gray-50 transition-colors duration-200">
                                        <h3 className="text-lg md:text-xl font-semibold text-darkbluegray pr-8">CAN I RENEW MY LEASE?</h3>
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-coral flex items-center justify-center ml-4 group-open:rotate-45 transition-transform duration-300">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v12M6 12h12"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </summary>
                                <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-4">
                                    <p className="text-darkbluegraylight">Yes, by contacting the respective Property Manager available
at the proprty.</p>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="list-none cursor-pointer">
                                    <div className="flex justify-between items-center p-6 md:p-8 hover:bg-gray-50 transition-colors duration-200">
                                        <h3 className="text-lg md:text-xl font-semibold text-darkbluegray pr-8">ARE PETS ALLOWED IN YOUR CONVENTIONAL APARTMENTS FOR RENT IN LOS ANGELES?</h3>
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-coral flex items-center justify-center ml-4 group-open:rotate-45 transition-transform duration-300">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v12M6 12h12"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </summary>
                                <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-4">
                                    <p className="text-darkbluegraylight">We only allow Emotional Support animal and Service Animal after verifying all the documents.</p>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="list-none cursor-pointer">
                                    <div className="flex justify-between items-center p-6 md:p-8 hover:bg-gray-50 transition-colors duration-200">
                                        <h3 className="text-lg md:text-xl font-semibold text-darkbluegray pr-8">HOW DO YOU SCREEN POTENTIAL TENANTS?</h3>
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-coral flex items-center justify-center ml-4 group-open:rotate-45 transition-transform duration-300">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v12M6 12h12"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </summary>
                                <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-4">
                                    <p className="text-darkbluegraylight">We follow a thorough screening process to ensure we select responsi ble tenants who will take good care of the property and meet their financial obligations.</p>
                                </div>
                            </details>

                        </div>
                    </div>

                </div>

                <div className="lg:w-1/3">

                    <div className="bg-white rounded-2xl shadow-xl p-5">
                        <div className="flex items-start">
                            <div
                                className="flex-shrink-0 w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center mr-4">
                                <span className="text-coral text-lg">💡</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-darkbluegray mb-1">Helpful Tip</h4>
                                <p className="text-darkbluegraylight text-sm">Click on any question to expand and see the
                                    answer.</p>
                            </div>
                        </div>
                        <div className="mt-5 pt-4 border-t border-gray-100">
                            <h5 className="font-semibold text-darkbluegray mb-4">FAQ Stats</h5>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-darkbluegraylight text-sm">Total Questions</span>
                                    <span className="font-medium text-darkbluegray">6</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-darkbluegraylight text-sm">Most Viewed</span>
                                    <span className="font-medium text-darkbluegray">Pricing Structure</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-darkbluegraylight text-sm">Updated</span>
                                    <span className="font-medium text-darkbluegray">Today</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-100">
                            <h5 className="font-semibold text-darkbluegray mb-2">Quick Contact</h5>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center text-darkbluegraylight mt-5 lg:mt-0 mb-5 lg:mb-0">
                                    <svg className="w-4 h-4 mr-2 text-coral" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path   
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                                        </path>
                                    </svg>
                                    <span>{`${props.Contact}`}</span>
                                </div>
                                <div className="flex items-center text-darkbluegraylight ">
                                    <svg className="w-4 h-4 mr-2 text-coral" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path   
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                    <span>{`${props.Email}`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-darkbluegray text-white rounded-2xl shadow-xl p-5 mt-6 sticky top-8">
                        <h3 className="text-xl font-bold mb-3">Still have questions?</h3>
                        <p className="mb-4 opacity-90 text-sm md:text-base">We're here to help. Contact our support team for
                            personalized assistance.</p>
                        {/* <button
                            className="w-full bg-coral hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-opacity-50">
                            Contact Support
                        </button> */}
                    </div>
                </div>
            </div>
        </section>

    )
}

/* ---------- Helper Components ---------- */

function Stat({ label, value }) {
    return (
        <div className="flex justify-between">
            <span className="text-darkbluegraylight text-sm">{label}</span>
            <span className="font-medium text-darkbluegray">{value}</span>
        </div>
    )
}

function ContactItem({ text }) {
    return (
        <div className="flex items-center text-darkbluegraylight">
            <span>{text}</span>
        </div>
    )
}

const faqData = [
    {
        question: "What services do you offer?",
        answer: "We provide web development, mobile apps, UI/UX design, digital marketing, and cloud solutions."
    },
    {
        question: "How long does a typical project take?",
        answer: "Small projects take 2–4 weeks, large applications can take 3–6 months."
    },
    {
        question: "What is your pricing structure?",
        answer: "We offer fixed-price, hourly, and retainer-based pricing models."
    },
    {
        question: "Do you provide post-launch support?",
        answer: "Yes, including bug fixes, updates, performance monitoring, and enhancements."
    },
    {
        question: "What technologies do you work with?",
        answer: "React, Vue, Laravel, Node.js, Flutter, AWS, Docker, and more."
    },
    {
        question: "Can I see examples of your previous work?",
        answer: "Yes, we provide case studies and live demos from our portfolio."
    }
]
