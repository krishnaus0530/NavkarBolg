import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

const RegulatoryCompliance = ({ auth }) => {
    const { props } = usePage();
    // console.log(props);
    const compliancePrograms = [
        {
            id: 1,
            title: "Low Income Housing Tax Credit",
            icon: "fa-hand-holding-usd",
            description: "Tax incentive program for affordable housing investments",
            link: "https://triumphresidential.com/low-income-housing-tax-credit/"
        },
        {
            id: 2,
            title: "Housing Choice Voucher Program Section 8",
            icon: "fa-search-dollar",
            description: "Program for assisting very low-income families, the elderly, and the disabled to afford decent, safe, and sanitary housing in the private market.",
            link: "https://triumphresidential.com/housing-choice-voucher-program-section-8/"
        },
        {
            id: 3,
            title: "Home Funds",
            icon: "fa-home",
            description: "Grants to States to implement local housing strategies designed to increase homeownership and affordable housing opportunities for low and very low-income Americans.",
            link: "https://triumphresidential.com/home-funds/"
        }
    ];

    return (
        <AppLayout>
            <Head>
                <title>{`Regulatory Compliance - ${props.BRAND_WORD}`}</title>
                <meta 
                    name="description" 
                    content={` ${props.BRAND_WORD} ensures compliance with affordable housing regulations through meticulous record-keeping and effective property management. Learn about our regulatory programs.`} 
                />
                <meta name="keywords" content="Triumph Residential Services, regulatory compliance, affordable housing, property management, compliance programs, housing regulations, Los Angeles apartments" />

                {/* Open Graph */}
                <meta property="og:title" content={`Regulatory Compliance -  ${props.BRAND_WORD}`} />
                <meta property="og:description" content={`Explore  ${props.BRAND_WORD}' comprehensive compliance monitoring services for affordable housing programs.`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.triumphresidential.com/regulatory-compliance" />
                <meta property="og:image" content="https://www.triumphresidential.com/images/compliance-og.jpg" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Regulatory Compliance -  ${props.BRAND_WORD}`} />
                <meta name="twitter:description" content={`Explore  ${props.BRAND_WORD} comprehensive compliance monitoring services for affordable housing programs.`} />
                <meta name="twitter:image" content="https://www.triumphresidential.com/images/compliance-og.jpg" />
            </Head>
            {/* Hero Section */}
            <section className="hero-bg bg-gradient-to-r from-darkbluegray to-darkbluegray/90 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Regulatory Compliance</h1>
                        <p className="text-xl mb-10">
                            {props.BRAND_WORD} offers a comprehensive compliance monitoring service. Our meticulous record-keeping and attention to detail allow us to comply with the numerous complex regulations governing affordable housing. Our relationships with government agencies enable effective property management while adhering to reporting requirements.
                        </p>
                    </div>
                </div>
            </section>
            <div className="site-content fade-in bg-[#f5f5f7] ">
                <div className="max-w-7xl mx-auto px-4 py-16">

                    {/* Page Header */}
                    {/* <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#323751] mb-4">Regulatory Compliance</h1>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            Triumph Residential Services offers a comprehensive compliance monitoring service. Our meticulous record-keeping and attention to detail allow us to comply with the numerous complex regulations governing affordable housing. Our relationships with government agencies enable effective property management while adhering to reporting requirements.
                        </p>
                    </div> */}

                    {/* Programs Section */}
                    <div>
                        <div className="text-center mb-12">
                            <p className="text-gray-700 max-w-2xl mx-auto">
                                We offer comprehensive management services for the following affordable housing programs:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {compliancePrograms.map((program) => (
                                <div key={program.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-20 h-20 bg-[#e76b53]/10 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#e76b53]/20">
                                            <i className={`fas ${program.icon} text-[#e76b53] text-3xl transition-all duration-300`}></i>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#323751] mb-4 transition-colors">
                                            {program.title}
                                        </h3>
                                        <p className="text-gray-600 mb-6 flex-grow">{program.description}</p>
                                        {/* <a
                                            href={program.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#e76b53] font-semibold hover:text-[#323751] transition-colors flex items-center group/link"
                                        >
                                            Learn About Program
                                            <i className="fas fa-arrow-right ml-2 group-hover/link:translate-x-2 transition-transform"></i>
                                        </a> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
};

export default RegulatoryCompliance;
