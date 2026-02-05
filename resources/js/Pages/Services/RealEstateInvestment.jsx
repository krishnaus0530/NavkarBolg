import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

const RealEstateInvestmentContent = () => {
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

    const handleCallInvestmentDesk = () => {
        window.location.href = 'tel:+15551234567';
    };

    const handleEmailInvestmentTeam = () => {
        window.location.href = 'mailto:investment@triumphrealestate.com';
    };

    return (
        <>
            {/* Hero Section */}
            <section className="hero-bg bg-gradient-to-r from-darkbluegray to-darkbluegray/90 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Real Estate Investment Services</h1>
                        <p className="text-xl max-w-3xl mx-auto mb-10">
                            Strategic investment opportunities, market analysis, and portfolio management for maximum returns.
                        </p>
                        <button 
                            onClick={() => scrollToSection('portfolio')}
                            className="inline-block bg-coral hover:bg-white hover:text-coral text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                        >
                            Start Your Investment Journey
                        </button>
                    </div>
                </div>
            </section>

            {/* Investment Overview */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Investment Strategy */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h2 className="text-3xl font-bold text-darkbluegray mb-6">Smart Real Estate Investment Strategies</h2>
                            <p className="text-darkbluegraylight mb-6">
                                Real estate remains one of the most reliable wealth-building assets. Our expert team provides
                                strategic investment guidance, comprehensive market analysis, and professional portfolio
                                management to maximize your returns.
                            </p>
                            <p className="text-darkbluegraylight">
                                Whether you're a first-time investor or looking to expand your portfolio, we offer
                                personalized investment solutions tailored to your financial goals and risk tolerance.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-600 to-green-400 rounded-2xl p-8 text-white">
                            <div className="text-4xl font-bold mb-4">12-18%</div>
                            <p className="text-xl mb-6">Average Annual Returns</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/20 p-4 rounded-lg">
                                    <div className="text-2xl font-bold">₹250+ Cr</div>
                                    <p className="text-sm opacity-90">Assets Under Management</p>
                                </div>
                                <div className="bg-white/20 p-4 rounded-lg">
                                    <div className="text-2xl font-bold">500+</div>
                                    <p className="text-sm opacity-90">Investor Portfolios</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Investment Opportunities */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Investment Opportunities</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Residential Investment */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-300 flex items-center justify-center">
                                    <span className="text-5xl">🏠</span>
                                </div>
                                <div className="p-8">
                                    <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
                                        Residential
                                    </div>
                                    <h3 className="text-xl font-bold text-darkbluegray mb-4">Residential Properties</h3>
                                    <p className="text-darkbluegraylight mb-6">
                                        Apartments, villas, and plotted developments with high rental yields and capital
                                        appreciation potential.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-darkbluegray">Avg. Rental Yield</span>
                                            <span className="font-bold text-green-600">3-5%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-darkbluegray">Appreciation Potential</span>
                                            <span className="font-bold text-green-600">8-12%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-darkbluegray">Investment Horizon</span>
                                            <span className="font-bold text-darkbluegray">3-7 Years</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Commercial Investment */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="h-48 bg-gradient-to-r from-purple-500 to-purple-300 flex items-center justify-center">
                                    <span className="text-5xl">🏢</span>
                                </div>
                                <div className="p-8">
                                    <div className="inline-block bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
                                        Commercial
                                    </div>
                                    <h3 className="text-xl font-bold text-darkbluegray mb-4">Commercial Properties</h3>
                                    <p className="text-darkbluegraylight mb-6">
                                        Office spaces, retail complexes, and warehouses with stable income streams and long-term
                                        leases.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-darkbluegray">Avg. Rental Yield</span>
                                            <span className="font-bold text-green-600">6-9%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-darkbluegray">Appreciation Potential</span>
                                            <span className="font-bold text-green-600">10-15%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-darkbluegray">Investment Horizon</span>
                                            <span className="font-bold text-darkbluegray">5-10 Years</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* REITs & Funds */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="h-48 bg-gradient-to-r from-yellow-500 to-yellow-300 flex items-center justify-center">
                                    <span className="text-5xl">📈</span>
                                </div>
                                <div className="p-8">
                                    <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
                                        REITs & Funds
                                    </div>
                                    <h3 className="text-xl font-bold text-darkbluegray mb-4">Real Estate Funds</h3>
                                    <p className="text-darkbluegraylight mb-6">
                                        Real Estate Investment Trusts (REITs) and managed funds for diversified exposure with
                                        lower capital requirements.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-darkbluegray">Avg. Annual Return</span>
                                            <span className="font-bold text-green-600">10-12%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-darkbluegray">Liquidity</span>
                                            <span className="font-bold text-green-600">High</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-darkbluegray">Minimum Investment</span>
                                            <span className="font-bold text-darkbluegray">₹5 Lakhs</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Investment Process */}
                    <div className="mb-16 bg-darkbluegray rounded-3xl p-12 text-white">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Investment Process</h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">1</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Financial Assessment</h3>
                                <p className="text-gray-300">Analyze goals, risk appetite & investment capacity</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">2</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Market Research</h3>
                                <p className="text-gray-300">Identify high-growth locations & opportunities</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">3</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Deal Sourcing</h3>
                                <p className="text-gray-300">Source & evaluate investment-grade properties</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">4</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Portfolio Management</h3>
                                <p className="text-gray-300">Ongoing management & performance tracking</p>
                            </div>
                        </div>
                    </div>

                    {/* Investment Services */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Investment Services</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">📊</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Market Analysis</h3>
                                <p className="text-darkbluegraylight mb-6">
                                    Comprehensive market research, trend analysis, and growth projections for informed
                                    investment decisions.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Demographic & economic analysis</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Supply-demand analysis</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Future growth projections</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">💼</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Deal Sourcing</h3>
                                <p className="text-darkbluegraylight mb-6">
                                    Access to off-market deals, pre-launch projects, and distressed properties with high ROI
                                    potential.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Off-market opportunities</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Pre-launch project access</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">NRI investment options</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">📈</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Portfolio Management</h3>
                                <p className="text-darkbluegraylight mb-6">
                                    Professional management of your real estate portfolio including acquisition, disposal, and
                                    optimization.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Asset allocation strategy</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Performance monitoring</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Exit strategy planning</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">💰</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Financial Planning</h3>
                                <p className="text-darkbluegraylight mb-6">
                                    Investment planning, tax optimization, and financing solutions for real estate investments.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Tax-efficient structures</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Financing solutions</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">ROI optimization</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">⚖️</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Due Diligence</h3>
                                <p className="text-darkbluegraylight mb-6">
                                    Comprehensive property evaluation, legal verification, and risk assessment for safe
                                    investments.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Legal & title verification</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Property valuation</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Risk assessment</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">📱</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Investor Portal</h3>
                                <p className="text-darkbluegraylight mb-6">
                                    Online platform for portfolio tracking, document management, and performance reporting.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Real-time portfolio tracking</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Document management</span>
                                    </li>
                                    <li className="flex items-center text-darkbluegray">
                                        <span className="mr-2">•</span>
                                        <span className="text-sm">Performance reports</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Investor Success */}
                    <div id="portfolio" className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Investor Success Stories</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-xl">📈</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">Portfolio Growth</h4>
                                        <p className="text-darkbluegraylight text-sm">5-Year Investment</p>
                                    </div>
                                </div>
                                <p className="text-darkbluegraylight mb-6">
                                    "Invested ₹50 lakhs in 2018. Today portfolio value is ₹1.2 crores - 140% returns in 5 years
                                    through strategic acquisitions."
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-coral font-semibold">Mr. Sharma</span>
                                    <span className="text-sm text-darkbluegraylight">140% Returns</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-xl">🏠</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">NRI Investment</h4>
                                        <p className="text-darkbluegraylight text-sm">US-based Investor</p>
                                    </div>
                                </div>
                                <p className="text-darkbluegraylight mb-6">
                                    "Managed my ₹2 crore investment from USA. Regular income of ₹1.5 lakhs/month with 12% annual
                                    appreciation."
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-coral font-semibold">Dr. Patel (NRI)</span>
                                    <span className="text-sm text-darkbluegraylight">12% Annual Appreciation</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-xl">💼</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">Commercial Investment</h4>
                                        <p className="text-darkbluegraylight text-sm">Office Space Portfolio</p>
                                    </div>
                                </div>
                                <p className="text-darkbluegraylight mb-6">
                                    "Invested in Bangalore tech park. 9% rental yield with 100% occupancy. Portfolio valued 40%
                                    higher in 3 years."
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-coral font-semibold">Tech Startup Founder</span>
                                    <span className="text-sm text-darkbluegraylight">9% Rental Yield</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Consultation */}
                    <div className="mb-16">
                        <div className="bg-darkbluegray rounded-3xl p-12 text-white text-center">
                            <h2 className="text-3xl font-bold mb-6">Ready to Build Your Real Estate Portfolio?</h2>
                            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
                                Schedule a free investment consultation with our expert advisors
                            </p>
                            <div className="flex flex-col md:flex-row gap-6 justify-center">
                                <button
                                    onClick={handleCallInvestmentDesk}
                                    className="bg-coral hover:bg-white hover:text-coral text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                                >
                                    Call Investment Desk: (213) 252-4444
                                </button>
                                <Link
                                    href="/contact"
                                    className="border-2 border-white hover:bg-white hover:text-darkbluegray text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                                    >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Investment FAQs</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-xl font-bold text-darkbluegray mb-3">What's the minimum investment amount?</h3>
                                    <p className="text-darkbluegraylight">We work with investments starting from ₹10 lakhs for
                                        direct properties and ₹5 lakhs for REITs/fund investments.</p>
                                </div>
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-xl font-bold text-darkbluegray mb-3">How do you ensure investment safety?</h3>
                                    <p className="text-darkbluegraylight">Rigorous due diligence, legal verification, market
                                        research, and ongoing portfolio monitoring minimize risks.</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-xl font-bold text-darkbluegray mb-3">Can NRIs invest through you?</h3>
                                    <p className="text-darkbluegraylight">Yes, we specialize in NRI investments with complete
                                        compliance, documentation, and portfolio management services.</p>
                                </div>
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-xl font-bold text-darkbluegray mb-3">What are your fees?</h3>
                                    <p className="text-darkbluegraylight">Transparent fee structure based on services. Typically
                                        1-2% of AUM for portfolio management, with success fees for high-return deals.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default function RealEstateInvestment(){
    
        return (
            <AppLayout>
                <RealEstateInvestmentContent />
            </AppLayout>
        );
};