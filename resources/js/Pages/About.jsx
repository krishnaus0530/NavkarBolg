import React from "react";
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from './Layouts/AppLayout'

const Aboutus = () => {
    return (
        <>
            {/* Hero Section */}
            <section className=" relative h-[60vh] w-full overflow-hidden bg-darkbluegray">
                <div className="absolute inset-0 bg-darkbluegray/90 z-10"></div>

                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-darkbluegray to-darkbluegray/80 z-0"></div>
                <div
                    className="absolute inset-0 opacity-10 z-0"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1973&q=80')",
                        backgroundSize: "cover",
                    }}
                ></div>

                {/* Hero Content */}
                <div className="hero-bg relative z-20 h-full flex items-center">
                    <div className="ml-10 mx-auto px-6 w-full">
                        <div className="max-w-3xl text-left">
                            {/* Breadcrumb */}
                            <div className="flex items-center mb-6 text-white/80">
                                <a href="/" className="hover:text-coral transition">
                                    Home
                                </a>
                                <span className="mx-2">/</span>
                                <span className="text-coral">About Us</span>
                            </div>

                            <h1 className="text-white font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                                Building Dreams,
                                <br />
                                Creating Homes
                            </h1>

                            <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-2xl">
                                For over a decade, Triumph Real Estate has been transforming the
                                property landscape, connecting people with their ideal homes and
                                investment opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block text-coral font-semibold text-sm uppercase tracking-wider mb-2">
                                Our Story
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-darkbluegray mb-6">
                                A Decade of Excellence in Real Estate
                            </h2>

                            <div className="space-y-4 text-darkbluegraylight">
                                <p>
                                    Founded in 2012, Triumph Real Estate began as a small local
                                    agency with a big vision: to revolutionize the way people find
                                    and experience their dream homes.
                                </p>
                                <p>
                                    Every transaction is more than business, it is a
                                    life-changing moment approached with dedication and care.
                                </p>
                                <p>
                                    With over 72,000 satisfied clients and 28,000+ properties
                                    handled, our success is measured in real stories.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mt-10">
                                <div className="text-center">
                                    <h3 className="text-3xl font-bold text-coral mb-2">10+</h3>
                                    <p className="text-darkbluegray font-medium">
                                        Years Experience
                                    </p>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-3xl font-bold text-coral mb-2">72k+</h3>
                                    <p className="text-darkbluegray font-medium">
                                        Happy Clients
                                    </p>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-3xl font-bold text-coral mb-2">28k+</h3>
                                    <p className="text-darkbluegray font-medium">
                                        Properties
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative lg:px-0 px-6">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1973&q=80"
                                    alt="Triumph Real Estate Team"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 lg:-left-6 left-2 bg-coral text-white p-6 rounded-2xl shadow-xl max-w-xs">
                                <h4 className="text-xl font-bold mb-2">Since 2012</h4>
                                <p className="text-sm">
                                    Transforming real estate experiences for over a decade
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-6xl mx-auto bg-gradient-to-r from-darkbluegray to-darkbluegray/90 rounded-3xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                        <div className="p-10 md:p-12 lg:p-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Ready to Find Your Dream Home?
                            </h2>
                            <p className="text-gray-200 mb-8">
                                Join thousands of satisfied clients who have found their perfect
                                property with Triumph Real Estate.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                               <Link
                                    href="/contact"
                                    className="px-6 py-3 bg-coral text-white font-semibold rounded-full hover:bg-white hover:text-coral transition text-center"
                                >
                                    Contact Our Team
                                </Link>
                                <Link
                                    href="/properties"
                                    className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-darkbluegray transition text-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    View Properties
                                </Link>
                            </div>
                        </div>

                        <div className="h-64 lg:h-full">
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1973&q=80"
                                alt="Modern Property"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default function About() {

    return (
        <AppLayout>
            <Aboutus></Aboutus>
        </AppLayout>
    );
};
