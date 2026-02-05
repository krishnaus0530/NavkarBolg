import { Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

const PropertyBuyingServices = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="hero-bg py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Property Buying Services</h1>
                        <p className="text-xl max-w-3xl mx-auto mb-10">
                            Find your dream home with our extensive property listings, personalized search, and expert negotiation assistance.
                        </p>
                        <Link 
                            href="/" 
                            className="inline-block bg-coral hover:bg-white hover:text-coral text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                        >
                            Start Your Home Search
                        </Link>
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h2 className="text-3xl font-bold text-darkbluegray mb-6">Your Dream Home Awaits</h2>
                            <p className="text-darkbluegraylight mb-6">
                                We understand that buying a property is one of the most significant decisions you'll make. 
                                Our dedicated team of experts guides you through every step of the process, ensuring a 
                                seamless and stress-free experience.
                            </p>
                            <p className="text-darkbluegraylight">
                                With access to exclusive listings, market insights, and negotiation expertise, we help you 
                                find not just a house, but a home that matches your lifestyle, preferences, and budget.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mr-6">
                                    <span className="text-3xl">🏠</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-darkbluegray">Why Choose Us?</h3>
                                    <p className="text-darkbluegraylight">Expert guidance at every step</p>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                    <span className="text-darkbluegray">Personalized property search</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                    <span className="text-darkbluegray">Expert negotiation team</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                    <span className="text-darkbluegray">Legal & documentation support</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                    <span className="text-darkbluegray">Post-purchase assistance</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* How We Work */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Our Buying Process</h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="bg-coral/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">1</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-3">Consultation</h3>
                                <p className="text-darkbluegraylight">Understanding your needs and budget</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-coral/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">2</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-3">Property Search</h3>
                                <p className="text-darkbluegraylight">Curated selection based on criteria</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-coral/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">3</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-3">Viewing & Selection</h3>
                                <p className="text-darkbluegraylight">Guided property visits</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-coral/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">4</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-3">Closing</h3>
                                <p className="text-darkbluegraylight">Seamless documentation & handover</p>
                            </div>
                        </div>
                    </div>

                    {/* Property Types */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Types of Properties We Specialize In</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg service-card">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">🏡</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Family Homes</h3>
                                <p className="text-darkbluegraylight">
                                    Spacious residences with modern amenities, perfect for growing families. 
                                    From 2BHK apartments to 5BHK villas.
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg service-card">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">🏢</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Luxury Apartments</h3>
                                <p className="text-darkbluegraylight">
                                    Premium apartments with world-class facilities, security, and 
                                    premium locations in the city's best neighborhoods.
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg service-card">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">🌳</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Plots & Land</h3>
                                <p className="text-darkbluegraylight">
                                    Prime residential plots for those who want to build their dream home 
                                    from scratch in approved residential areas.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">What Our Clients Say</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="testimonial-card">
                                <p className="text-darkbluegraylight mb-6">
                                    "The team helped us find our dream home within our budget. Their negotiation skills saved us 15% on the asking price!"
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">Rahul Sharma</h4>
                                        <p className="text-darkbluegraylight text-sm">Software Engineer</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="testimonial-card">
                                <p className="text-darkbluegraylight mb-6">
                                    "As first-time home buyers, we were overwhelmed. Their guidance made the process smooth and stress-free."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">Priya Patel</h4>
                                        <p className="text-darkbluegraylight text-sm">Doctor</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="testimonial-card">
                                <p className="text-darkbluegraylight mb-6">
                                    "Excellent service! They found properties that weren't even listed publicly. Truly exclusive access!"
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">Amit Kumar</h4>
                                        <p className="text-darkbluegraylight text-sm">Business Owner</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div id="contact" className="bg-darkbluegray rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
                        <p className="text-xl mb-10 max-w-2xl mx-auto">
                            Contact our property buying experts today for a free consultation
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <a 
                                href="tel:+15551234567" 
                                className="bg-coral hover:bg-white hover:text-coral text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                            >
                                Call Now: (213) 252-4444
                            </a>
                             <Link
                                href="/contact"
                                className="border-2 border-white hover:bg-white hover:text-darkbluegray text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                            >
                                Contact Us
                            </Link>
                            {/* <a 
                                href="mailto:buying@triumphrealestate.com" 
                                className="border-2 border-white hover:bg-white hover:text-darkbluegray text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                            >
                                
                            </a> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-xl font-bold text-darkbluegray mb-3">How long does the buying process take?</h3>
                            <p className="text-darkbluegraylight">Typically 30-60 days, depending on property type, financing, and legal requirements.</p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-xl font-bold text-darkbluegray mb-3">Do I need to pay for your services?</h3>
                            <p className="text-darkbluegraylight">Our buying services are completely free for buyers. We're compensated by property sellers.</p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-xl font-bold text-darkbluegray mb-3">Can you help with home loans?</h3>
                            <p className="text-darkbluegraylight">Yes, we have partnerships with leading banks and can help you get the best home loan rates.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CSS Styles */}
            <style jsx global>{`
                .hero-bg {
                    background: linear-gradient(rgba(50, 55, 81, 0.9), rgba(50, 55, 81, 0.9)),
                        url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80');
                    background-size: cover;
                    background-position: center;
                }
                
                .service-card {
                    transition: all 0.3s ease;
                }
                
                .service-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px -15px rgba(231, 107, 83, 0.3);
                }
                
                .step-number {
                    width: 40px;
                    height: 40px;
                    background: #e76b53;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    margin-right: 15px;
                }
                
                .testimonial-card {
                    background: white;
                    border-radius: 15px;
                    padding: 30px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    position: relative;
                }
                
                .testimonial-card:before {
                    content: '"';
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    font-size: 60px;
                    color: #e76b53;
                    opacity: 0.2;
                    font-family: serif;
                }
            `}</style>
        </>
    );
};

// Main Page Component
export default function PropertyBuyingPage() {
    return (
        <AppLayout>
            <PropertyBuyingServices />
        </AppLayout>
    );
}