import React from "react";
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from './Layouts/AppLayout'


const CCPACompliance = ({ lastUpdated, contactEmail, companyName, companyAddress }) => {
    const { props } = usePage();
    return (
        <>
            <AppLayout>
                <Head title="CALIFORNIA CONSUMER PRIVACY ACT - Triumph Residential Services" />
                <Head>
                <title>{`California Consumer Privacy Act (CCPA) -  ${props.BRAND_WORD}`}</title>
                <meta 
                    name="description" 
                    content={`Learn how  Triumph Residential complies with the California Consumer Privacy Act (CCPA). Understand your rights regarding the collection, use, and protection of your personal information.`} 
                />
                <meta name="keywords" content="CCPA, California Consumer Privacy Act, Triumph Residential Services, data protection, privacy rights, consumer rights" />

                {/* Open Graph Tags */}
                <meta property="og:title" content="California Consumer Privacy Act (CCPA) - Triumph Residential Services" />
                <meta property="og:description" content={`Learn how  Triumph Residentialcomplies with the California Consumer Privacy Act (CCPA) and protects consumer personal information.`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.triumphresidential.com/ccpa-compliance" />
                <meta property="og:image" content="https://www.triumphresidential.com/og-image.jpg" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="California Consumer Privacy Act (CCPA) - Triumph Residential Services" />
                <meta name="twitter:description" content={`Learn how  Triumph Residential complies with the California Consumer Privacy Act (CCPA) and protects consumer personal information.`} />
                <meta name="twitter:image" content="https://www.triumphresidential.com/og-image.jpg" />
            </Head>
                {/* Main Content */}
                <div className="mt-8"></div>
                <main className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Navigation */}
                        <div className="lg:w-1/4">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                                <h3 className="font-bold text-lg text-[#323751] mb-4 pb-2 border-b border-gray-200">
                                    CCPA Sections
                                </h3>
                                <ul className="space-y-3">
                                    <li><a href="#intro" className="flex items-center hover:text-[#e76b53] transition-colors"><i className="fas fa-chevron-right text-xs mr-3 text-[#e76b53]"></i>CCPA Regulations</a></li>
                                    <li><a href="#notice" className="flex items-center hover:text-[#e76b53] transition-colors"><i className="fas fa-chevron-right text-xs mr-3 text-[#e76b53]"></i>Notice of Collection</a></li>
                                    <li><a href="#categories" className="flex items-center hover:text-[#e76b53] transition-colors"><i className="fas fa-chevron-right text-xs mr-3 text-[#e76b53]"></i>Categories of Information</a></li>
                                    <li><a href="#purpose" className="flex items-center hover:text-[#e76b53] transition-colors"><i className="fas fa-chevron-right text-xs mr-3 text-[#e76b53]"></i>Purpose of Collection</a></li>
                                    <li><a href="#rights" className="flex items-center hover:text-[#e76b53] transition-colors"><i className="fas fa-chevron-right text-xs mr-3 text-[#e76b53]"></i>Consumer's Rights</a></li>
                                    <li><a href="#disclaimer" className="flex items-center hover:text-[#e76b53] transition-colors"><i className="fas fa-chevron-right text-xs mr-3 text-[#e76b53]"></i>Disclaimer about Sale</a></li>
                                    <li><a href="#miscellaneous" className="flex items-center hover:text-[#e76b53] transition-colors"><i className="fas fa-chevron-right text-xs mr-3 text-[#e76b53]"></i>Miscellaneous</a></li>
                                    <li><a href="#contact" className="flex items-center hover:text-[#e76b53] transition-colors"><i className="fas fa-chevron-right text-xs mr-3 text-[#e76b53]"></i>Contact Us</a></li>
                                </ul>
                                
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <h4 className="font-bold text-[#323751] mb-3">CCPA Rights Summary</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <i className="fas fa-eye text-[#e76b53] mr-3 mt-1"></i>
                                            <span className="text-sm">Right to know data collection</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i className="fas fa-ban text-[#e76b53] mr-3 mt-1"></i>
                                            <span className="text-sm">Right to opt-out of data sale</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i className="fas fa-trash text-[#e76b53] mr-3 mt-1"></i>
                                            <span className="text-sm">Right to request deletion</span>
                                        </div>
                                        <div className="flex items-start">
                                            <i className="fas fa-balance-scale text-[#e76b53] mr-3 mt-1"></i>
                                            <span className="text-sm">Non-discrimination rights</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CCPA Content */}
                        <div className="lg:w-3/4">
                            {/* Section 1: Introduction */}
                            <section id="intro" className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[#e76b53] p-3 rounded-full mr-4">
                                        <i className="fas fa-gavel text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#323751]">
                                        CALIFORNIA CONSUMER PRIVACY ACT
                                    </h2>
                                </div>
                                
                                <div className="space-y-4 text-gray-700">
                                    <p>The CCPA regulations govern compliance with the California Consumer Privacy Act, 2018. CCPA provides a set of rules for consumers to have more control over their Personal Information. Per It gives citizens the right to know when and how their information is being collected and/or sold along with the ability to opt-out.</p>
                                    
                                    <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-500 my-4">
                                        <div className="flex items-start">
                                            <i className="fas fa-exclamation-circle text-yellow-500 text-xl mr-4 mt-1"></i>
                                            <div>
                                                <p className="text-gray-700 font-medium">Kindly read these provisions along with PRIVACY POLICY.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 2: Notice */}
                            <section id="notice" className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[#e76b53] p-3 rounded-full mr-4">
                                        <i className="fas fa-clipboard-check text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#323751]">
                                        Notice of Personal Information that is collected
                                    </h2>
                                </div>
                                
                                <div className="space-y-4 text-gray-700">
                                    <p> {`${props.BRAND_WORD}`}  does not collect any Personal Information if users simply browse or access the website. If consumers have any enquiry, they may fill out a form that contains Personal Information such as Name, Contact Details, Email address and a brief message about their enquiry.</p>
                                    
                                    <p>Further, after due scrutiny of enquiry or applications, consumers may be asked for the following categories of Personal Information:</p>
                                </div>
                            </section>

                            {/* Section 3: Categories */}
                            <section id="categories" className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[#e76b53] p-3 rounded-full mr-4">
                                        <i className="fas fa-list-alt text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#323751]">
                                        Categories of Personal Information
                                    </h2>
                                </div>
                                
                                <div className="space-y-6">
                                    {/* Identity */}
                                    <div className="bg-gray-50 p-5 rounded-lg">
                                        <h3 className="font-bold text-lg text-[#323751] mb-3 flex items-center">
                                            <i className="fas fa-id-card text-[#e76b53] mr-3"></i>
                                            Identity:
                                        </h3>
                                        <p className="text-gray-700 ml-8">
                                            Name, username, contact details, postal address, social security number, taxpayer identification number, bank account details, driver's license number, date of birth, picture, emergency contact details, households' information, any other relevant Personal Information as permitted by prevailing laws.
                                        </p>
                                    </div>
                                    
                                    {/* Protected Categories */}
                                    <div className="bg-blue-50 p-5 rounded-lg">
                                        <h3 className="font-bold text-lg text-[#323751] mb-3 flex items-center">
                                            <i className="fas fa-shield-alt text-blue-600 mr-3"></i>
                                            Categories protected under Federal and State Laws:
                                        </h3>
                                        <p className="text-gray-700 ml-8">
                                            Age, Race, color, ancestry, national origin, citizenship, marital status, sex, veteran, and/or military status.
                                        </p>
                                    </div>
                                    
                                    {/* Employment Details */}
                                    <div className="bg-green-50 p-5 rounded-lg">
                                        <h3 className="font-bold text-lg text-[#323751] mb-3 flex items-center">
                                            <i className="fas fa-briefcase text-green-600 mr-3"></i>
                                            Employment Details:
                                        </h3>
                                        <p className="text-gray-700 ml-8">
                                            Current employment and past employment history, job title, pay and income history.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 4: Purpose */}
                            <section id="purpose" className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[#e76b53] p-3 rounded-full mr-4">
                                        <i className="fas fa-bullseye text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#323751]">
                                        Purpose of Collection of Personal Information
                                    </h2>
                                </div>
                                
                                <div className="space-y-4 text-gray-700">
                                    <p>The aim of  {`${props.BRAND_WORD}`}  for collecting Personal Information is customer engagements that goes beyond the transactions with prospective residents. This information may be used for further marketing communications and/or related correspondence in accordance with our Privacy Policy as well as any other purpose permitted by prevailing laws.</p>
                                </div>
                            </section>

                            {/* Section 5: Rights */}
                            <section id="rights" className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[#e76b53] p-3 rounded-full mr-4">
                                        <i className="fas fa-user-shield text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#323751]">
                                        Consumer's Rights Pertaining to their Personal Information
                                    </h2>
                                </div>
                                
                                <div className="space-y-4 text-gray-700">
                                    <p>California Consumer Privacy Act of 2018 provides consumers more control over their Personal Information that is collected by businesses at any stage. It enhances privacy rights along with consumer protection. According to the provisions of this Act, ALL consumers have the right to request the use of their Personal Information that is being collected by businesses. After successful verification of such requests,  {`${props.BRAND_WORD}`}  agrees to provide consumers the following information:</p>
                                    
                                    <div className="bg-purple-50 p-5 rounded-lg my-4">
                                        <ul className="space-y-3 ml-4">
                                            <li className="flex items-start">
                                                <i className="fas fa-check text-purple-600 mr-3 mt-1"></i>
                                                <span>The Categories of Personal Information that was collected.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <i className="fas fa-check text-purple-600 mr-3 mt-1"></i>
                                                <span>Any/or commercial or business purpose for which their Personal Information has been used in the last 6-12 months.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <i className="fas fa-check text-purple-600 mr-3 mt-1"></i>
                                                <span>In case the Personal Information is ever shared with third parties, vendors, any/or affiliates, subsidiaries, etc.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <i className="fas fa-check text-purple-600 mr-3 mt-1"></i>
                                                <span>If the Personal Information is sold or disclosed to any other party than  {`${props.BRAND_WORD}`} , categories and purpose of any such transactions.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Section 6: Disclaimer */}
                            <section id="disclaimer" className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[#e76b53] p-3 rounded-full mr-4">
                                        <i className="fas fa-ban text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#323751]">
                                        Disclaimer about Sale of Personal Information
                                    </h2>
                                </div>
                                
                                <div className="space-y-4 text-gray-700">
                                    <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                                        <div className="flex items-center">
                                            <i className="fas fa-hand-paper text-red-500 text-3xl mr-4"></i>
                                            <div>
                                                <p className="text-gray-700 font-medium"> {`${props.BRAND_WORD}`}  does not sell consumer's Personal Information to anyone.</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="mt-4">ALL Consumers can direct their communications at  {`${props.Email}`}  and may ask to remove or delete their available information and disconnect further correspondence as provided in California Consumer Privacy Act.</p>
                                </div>
                            </section>

                            {/* Section 7: Miscellaneous */}
                            <section id="miscellaneous" className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[#e76b53] p-3 rounded-full mr-4">
                                        <i className="fas fa-info-circle text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#323751]">
                                        Miscellaneous
                                    </h2>
                                </div>
                                
                                <div className="space-y-4 text-gray-700">
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <i className="fas fa-child text-[#e76b53] mr-3 mt-1"></i>
                                            <span> {`${props.BRAND_WORD}`}  is not directed at children under the age of 16 years and does not collect any Personal Information for such enquiries.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fas fa-balance-scale text-[#e76b53] mr-3 mt-1"></i>
                                            <span>Any kind of discrimination against consumers is prohibited in the exercise of CCPA, including but not limited to quality of services, accessibility to any/or services provided by  {`${props.BRAND_WORD}`} , imposing of penalties, etc.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fas fa-lock text-[#e76b53] mr-3 mt-1"></i>
                                            <span>Any unauthorized access, alterations, disclosures, or destruction of Personal Information including username, password, transaction information and data stored with  {`${props.BRAND_WORD}`}  is prohibited.</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* Section 8: Contact */}
                            <section id="contact" className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[#e76b53] p-3 rounded-full mr-4">
                                        <i className="fas fa-envelope text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#323751]">
                                        Contact for CCPA Inquiries
                                    </h2>
                                </div>
                                
                                <div className="space-y-4 text-gray-700">
                                    <p>All Users and Consumers are requested hereby for any questions or concerns regarding {`${props.BRAND_WORD}`} CCPA, to write to us at {`${props.Email}`}. The correspondence may also be directed by postal mail at the below address:</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        <div className="bg-gray-50 p-5 rounded-lg">
                                            <h4 className="font-bold text-[#323751] mb-4 flex items-center">
                                                <i className="fas fa-envelope text-[#e76b53] mr-3"></i> 
                                                Email Address
                                            </h4>
                                            <a 
                                                href="mailto:info@triumphresidential.com"
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
                                                 {`${props.Address_1}`}<br />
                                                 {`${props.Address_2}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </AppLayout>
        </>
    );
};

export default CCPACompliance;