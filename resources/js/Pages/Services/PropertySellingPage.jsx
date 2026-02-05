import { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

const PropertySellingServices = () => {
    const [valuationForm, setValuationForm] = useState({
        name: '',
        phone: '',
        email: '',
        propertyDetails: ''
    });

    const handleValuationChange = (e) => {
        const { name, value } = e.target;
        setValuationForm({
            ...valuationForm,
            [name]: value
        });
    };

    const handleValuationSubmit = (e) => {
        e.preventDefault();
        alert('Thank you! Our valuation expert will contact you within 24 hours.');
        setValuationForm({
            name: '',
            phone: '',
            email: '',
            propertyDetails: ''
        });
    };

    return (
        <>
            {/* Hero Section */}
            <section className="hero-bg py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Property Selling Services</h1>
                        <p className="text-xl max-w-3xl mx-auto mb-10">
                            Maximize your property value with our marketing expertise, professional staging, and strategic pricing.
                        </p>
                        <Link 
                            href="#valuation" 
                            className="inline-block bg-coral hover:bg-white hover:text-coral text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                        >
                            Get Free Property Valuation
                        </Link>
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Value Maximization Section */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h2 className="text-3xl font-bold text-darkbluegray mb-6">Maximize Your Property's Value</h2>
                            <p className="text-darkbluegraylight mb-6">
                                Selling a property is more than just listing it. It requires strategic pricing, 
                                professional marketing, and expert negotiation to ensure you get the best possible price 
                                in the shortest time.
                            </p>
                            <p className="text-darkbluegraylight">
                                Our comprehensive selling services are designed to present your property in the best light, 
                                attract qualified buyers, and negotiate the most favorable terms on your behalf.
                            </p>
                        </div>
                        <div className="price-tag">
                            <div className="text-4xl font-bold mb-2">15-25% Higher</div>
                            <p className="text-lg opacity-90">Properties sell for more with our professional services</p>
                        </div>
                    </div>

                    {/* Our Selling Process */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Our Selling Strategy</h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="bg-coral/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">💰</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-3">Strategic Pricing</h3>
                                <p className="text-darkbluegraylight">Data-driven pricing strategy for maximum returns</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-coral/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">📸</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-3">Professional Marketing</h3>
                                <p className="text-darkbluegraylight">Multi-channel marketing & professional photography</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-coral/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">🤝</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-3">Expert Negotiation</h3>
                                <p className="text-darkbluegraylight">Skilled negotiation for optimal terms and price</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-coral/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">📄</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-3">Seamless Closing</h3>
                                <p className="text-darkbluegraylight">Complete legal & documentation support</p>
                            </div>
                        </div>
                    </div>

                    {/* Marketing Services */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Comprehensive Marketing Solutions</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg service-card">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">🎥</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Professional Photography & Video</h3>
                                <p className="text-darkbluegraylight">
                                    High-quality photos, 360° virtual tours, and professional video walkthroughs 
                                    that showcase your property's best features.
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg service-card">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">📱</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Digital Marketing</h3>
                                <p className="text-darkbluegraylight">
                                    Targeted online advertising, social media campaigns, and premium listings 
                                    on all major real estate platforms.
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg service-card">
                                <div className="w-16 h-16 bg-coral/10 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-3xl">🏡</span>
                                </div>
                                <h3 className="text-xl font-bold text-darkbluegray mb-4">Property Staging</h3>
                                <p className="text-darkbluegraylight">
                                    Professional staging services to make your property more appealing to buyers 
                                    and create an emotional connection.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Free Valuation */}
                    <div id="valuation" className="mb-16 bg-white rounded-3xl p-12 shadow-xl">
                        <div className="grid md:grid-cols-1 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-darkbluegray mb-6">Get Your Free Property Valuation</h2>
                                <p className="text-darkbluegraylight mb-6">
                                    Find out what your property is worth in today's market. Our valuation experts 
                                    use current market data and comparable sales to provide an accurate estimate.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Free, no-obligation valuation</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Data-driven market analysis</span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center mr-3">
                                            <span className="text-white text-sm">✓</span>
                                        </div>
                                        <span className="text-darkbluegray">Personalized selling strategy</span>
                                    </li>
                                </ul>
                            </div>
                            {/* <div className="bg-gray-50 p-8 rounded-2xl">
                                <h3 className="text-xl font-bold text-darkbluegray mb-6">Request Your Valuation</h3>
                                <form onSubmit={handleValuationSubmit} className="space-y-4">
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={valuationForm.name}
                                        onChange={handleValuationChange}
                                        placeholder="Your Name" 
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coral"
                                        required
                                    />
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        value={valuationForm.phone}
                                        onChange={handleValuationChange}
                                        placeholder="Phone Number" 
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coral"
                                        required
                                    />
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={valuationForm.email}
                                        onChange={handleValuationChange}
                                        placeholder="Email Address" 
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coral"
                                        required
                                    />
                                    <textarea 
                                        name="propertyDetails"
                                        value={valuationForm.propertyDetails}
                                        onChange={handleValuationChange}
                                        placeholder="Property Details (Address, Size, etc.)" 
                                        rows="3" 
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-coral"
                                        required
                                    ></textarea>
                                    <button 
                                        type="submit" 
                                        className="w-full bg-coral hover:bg-darkbluegray text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                                    >
                                        Get Free Valuation
                                    </button>
                                </form>
                            </div> */}
                        </div>
                    </div>

                    {/* Success Stories */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Success Stories</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="testimonial-card">
                                <p className="text-darkbluegraylight mb-6">
                                    "Sold my apartment for 20% above market price! Their marketing strategy attracted multiple offers."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">Sanjay Mehta</h4>
                                        <p className="text-darkbluegraylight text-sm">Sold 3BHK in Bandra</p>
                                        <div className="flex items-center mt-1">
                                            <span className="text-yellow-500 mr-1">★★★★★</span>
                                            <span className="text-sm text-gray-500">Sold in 15 days</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="testimonial-card">
                                <p className="text-darkbluegraylight mb-6">
                                    "Professional staging made my old house look brand new. Received 5 offers within the first week!"
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">Neha Gupta</h4>
                                        <p className="text-darkbluegraylight text-sm">Sold Villa in Gurgaon</p>
                                        <div className="flex items-center mt-1">
                                            <span className="text-yellow-500 mr-1">★★★★★</span>
                                            <span className="text-sm text-gray-500">20% above asking</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="testimonial-card">
                                <p className="text-darkbluegraylight mb-6">
                                    "Their negotiation skills got me ₹50 lakhs more than I expected. Exceptional service!"
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                    <div>
                                        <h4 className="font-bold text-darkbluegray">Rohit Verma</h4>
                                        <p className="text-darkbluegraylight text-sm">Sold Commercial Space</p>
                                        <div className="flex items-center mt-1">
                                            <span className="text-yellow-500 mr-1">★★★★★</span>
                                            <span className="text-sm text-gray-500">Quick sale at premium</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Comparison */}
                    <div className="mb-16 bg-darkbluegray rounded-3xl p-12 text-white">
                        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Professional Selling?</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-xl font-bold mb-6">DIY Selling</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center text-gray-300">
                                        <span className="mr-3">❌</span>
                                        <span>Limited market exposure</span>
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <span className="mr-3">❌</span>
                                        <span>Emotional pricing decisions</span>
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <span className="mr-3">❌</span>
                                        <span>Time-consuming negotiations</span>
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <span className="mr-3">❌</span>
                                        <span>Legal risks without expert guidance</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold mb-6">With Our Service</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center">
                                        <span className="mr-3">✅</span>
                                        <span>Maximum market exposure</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-3">✅</span>
                                        <span>Data-driven pricing strategy</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-3">✅</span>
                                        <span>Expert negotiation for best price</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-3">✅</span>
                                        <span>Complete legal protection</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-darkbluegray mb-6">Ready to Maximize Your Property Value?</h2>
                        <p className="text-xl text-darkbluegraylight mb-10 max-w-2xl mx-auto">
                            Schedule a free consultation with our selling experts today
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
                                 className="border-2 border-coral hover:bg-coral hover:text-white text-coral font-semibold py-3 px-8 rounded-full transition duration-300"
                            >
                                Contact Us
                            </Link>
                            {/* <a 
                                href="mailto:sell@triumphrealestate.com" 
                                className="border-2 border-coral hover:bg-coral hover:text-white text-coral font-semibold py-3 px-8 rounded-full transition duration-300"
                            >
                                Email Our Selling Team
                            </a> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-darkbluegray text-center mb-12">Selling FAQs</h2>
                    <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-xl font-bold text-darkbluegray mb-3">What are your commission rates?</h3>
                            <p className="text-darkbluegraylight">Our commission is competitive and varies based on property value and services required. We offer transparent pricing with no hidden fees.</p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-xl font-bold text-darkbluegray mb-3">How long does it take to sell a property?</h3>
                            <p className="text-darkbluegraylight">With our marketing strategy, most properties sell within 30-60 days, though this varies based on market conditions and pricing.</p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-xl font-bold text-darkbluegray mb-3">Do you provide legal support?</h3>
                            <p className="text-darkbluegraylight">Yes, we provide complete legal and documentation support throughout the selling process.</p>
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
                
                .price-tag {
                    background: linear-gradient(135deg, #e76b53 0%, #ff8a73 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    text-align: center;
                }
            `}</style>
        </>
    );
};

// Main Page Component
export default function PropertySellingPage() {
    return (
        <AppLayout>
            <PropertySellingServices />
        </AppLayout>
    );
}