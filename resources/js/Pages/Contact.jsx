import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from './Layouts/AppLayout';
import ContactForm from './ContactForm'; // Import the new component

const Contact = () => {
    const { props } = usePage();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [activeOffice, setActiveOffice] = useState('losangeles');

    // Google Maps Embed URLs (No API Key Required)
    const mapEmbedURLs = {
        // newyork: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387194.058514235!2d-73.92884073436802!3d40.697149420670235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1705679455767!5m2!1sen!2sin",
        losangeles: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192047471653!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1705679520942!5m2!1sen!2sin",
        // chicago: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190255.33858352053!2d-87.73178952756534!3d41.83390380487462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL%2C%20USA!5e0!3m2!1sen!2sin!4v1705679564567!5m2!1sen!2sin"
    };

    const offices = [
        // { 
        //     id: 'newyork', 
        //     name: 'New York HQ', 
        //     address: '123 Business Avenue, Suite 100<br />New York, NY 10001', 
        //     phone: '(213) 252-4444',
        //     lat: 40.7128, 
        //     lng: -74.0060,
        //     color: 'bg-coral'
        // },
        { 
            id: 'losangeles', 
            name: 'Los Angeles Office', 
            address: `${props.Address_1} ${props.Address_2}` , 
            phone: `${props.Contact}`,
            lat: 34.0522, 
            lng: -118.2437,
            color: 'bg-blue-500'
        },
        // { 
        //     id: 'chicago', 
        //     name: 'Chicago Office', 
        //     address: '789 Michigan Avenue<br />Chicago, IL 60611', 
        //     phone: '(213) 252-4444',
        //     lat: 41.8781, 
        //     lng: -87.6298,
        //     color: 'bg-green-500'
        // }
    ];

    const handleOfficeClick = (officeId) => {
        setActiveOffice(officeId);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[60vh] w-full overflow-hidden bg-darkbluegray">
                <div className="absolute inset-0 bg-darkbluegray/90 z-10"></div>
                
                {/* Background Image/Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-darkbluegray to-darkbluegray/80 z-0"></div>
                <div 
                    className="absolute inset-0 opacity-10 z-0" 
                    style={{
                        // backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80')`,
                        backgroundImage: `url('desgin/contact.jfif')`,
                        backgroundSize: 'cover'
                    }}
                ></div>

                {/* Hero Content */}
                <div className="hero-bg-contact relative z-20 h-full flex items-center">
                    <div className="ml-10 mx-auto px-6 w-full">
                        <div className="max-w-3xl text-left">
                            {/* Breadcrumb */}
                            <div className="flex items-center mb-6 text-white/80">
                                <Link href="/" className="hover:text-coral transition">Home</Link>
                                <span className="mx-2">/</span>
                                <span className="text-coral">Contact Us</span>
                            </div>

                            {/* Heading */}
                            <h1 className="text-white font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                            Need<br />
                                Help ?
                            </h1>

                            {/* Paragraph */}
                            <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-2xl">
                                We would be happy to assist You Stay in touch with us.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <div className="lg:col-span-1">
                            <div className="space-y-8">
                                {/* Contact Card 1 */}
                                <div className="bg-white rounded-2xl p-8 darkblue-shadow contact-card transition-all duration-300">
                                    <div className="flex items-start mb-6">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center mr-4">
                                            <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-darkbluegray mb-2">Visit Our Office</h3>
                                            <p className="text-darkbluegraylight">
                                                {`${props.Address_1}`}<br />
                                                 {`${props.Address_2}`}<br />
                                                
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <h4 className="font-semibold text-darkbluegray mb-2">Office Hours</h4>
                                        <p className="text-darkbluegraylight">
                                            Monday - Friday: 9:00 AM - 6:00 PM<br />
                                            Saturday: Closed<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>

                                {/* Contact Card 2 */}
                                <div className="bg-white rounded-2xl p-8 darkblue-shadow contact-card transition-all duration-300">
                                    <div className="flex items-start mb-6">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center mr-4 ">
                                            <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-darkbluegray mb-2">Call Us</h3>
                                            <p className="text-darkbluegraylight">
                                                Main Office: {`${props.Contact}`}<br />
                                                Sales Department: {`${props.Contact}`}<br />
                                                Support: {`${props.Contact}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <h4 className="font-semibold text-darkbluegray mb-2">Emergency Contact</h4>
                                        <p className="text-darkbluegraylight">
                                            After Hours: {`${props.Contact}`}<br />
                                            Available 24/7 for urgent matters
                                        </p>
                                    </div>
                                </div>

                                {/* Contact Card 3 */}
                                <div className="bg-white rounded-2xl p-8 darkblue-shadow contact-card transition-all duration-300">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center mr-4">
                                            <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-darkbluegray mb-2">Email Us</h3>
                                            <p className="text-darkbluegraylight">
                                                General Inquiries: {`${props.Email}`}<br />
                                                Sales: {`${props.Email}`}<br />
                                                Support: {`${props.Email}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <h4 className="font-semibold text-darkbluegray mb-4">Response Time</h4>
                                        <p className="text-darkbluegraylight">
                                            We typically respond within 24 hours during business days.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form - Now using the separate component */}
                        <div className="lg:col-span-2">
                            <ContactForm 
                                formDataa={formData}
                                setFormData={setFormData}
                                formSubmitted={formSubmitted}
                                setFormSubmitted={setFormSubmitted} 
                                //interested_property={true}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Map Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-darkbluegray mb-4">Find Our Office</h2>
                        <p className="text-darkbluegraylight text-lg max-w-3xl mx-auto">
                            Visit our headquarters or schedule an appointment at one of our regional offices.
                        </p>
                    </div>

                    {/* Interactive Map Selector */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {offices.map((office) => (
                            <button
                                key={office.id}
                                onClick={() => handleOfficeClick(office.id)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeOffice === office.id ? `${office.color} text-white` : 'bg-gray-100 text-darkbluegray hover:bg-gray-200'}`}
                            >
                                {office.name}
                            </button>
                        ))}
                    </div>

                    {/* Google Maps Embed Container */}
                    <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
                        <iframe 
                            src={mapEmbedURLs[activeOffice]} 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`Google Maps - ${offices.find(o => o.id === activeOffice)?.name}`}
                        ></iframe>
                    </div>

                    {/* Office Details */}
                    <div className="mt-8">
                        {offices.filter(office => office.id === activeOffice).map(office => (
                            <div key={office.id} className="text-center">
                                <h3 className="text-2xl font-bold text-darkbluegray mb-4">{office.name}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-semibold text-darkbluegray mb-2">Address</h4>
                                        <p className="text-darkbluegraylight" dangerouslySetInnerHTML={{ __html: office.address }} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-darkbluegray mb-2">Contact</h4>
                                        <p className="text-darkbluegraylight">{office.phone}</p>
                                        <a 
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center mt-4 px-6 py-2 bg-coral text-white font-semibold rounded-full hover:bg-darkbluegray transition duration-300"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                                            </svg>
                                            Get Directions
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* All Offices Quick Info */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {offices.map((office) => (
                            <div 
                                key={office.id} 
                                className={`text-center p-6 rounded-xl cursor-pointer transition-all duration-300 ${activeOffice === office.id ? 'bg-coral/10 border-2 border-coral' : 'bg-gray-50 hover:bg-gray-100'}`}
                                onClick={() => handleOfficeClick(office.id)}
                            >
                                <h4 className="font-bold text-darkbluegray mb-3">{office.name}</h4>
                                <p className="text-darkbluegraylight text-sm" dangerouslySetInnerHTML={{ __html: office.address }} />
                                <p className="text-coral font-medium mt-2">{office.phone}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-darkbluegray mb-4">Common Questions</h2>
                        <p className="text-darkbluegraylight text-lg max-w-3xl mx-auto">
                            Quick answers to some of our most frequently asked questions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 darkblue-shadow">
                            <h4 className="font-bold text-darkbluegray mb-3">How quickly will I receive a response?</h4>
                            <p className="text-darkbluegraylight">
                                We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our direct line.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 darkblue-shadow">
                            <h4 className="font-bold text-darkbluegray mb-3">Do I need to schedule an appointment?</h4>
                            <p className="text-darkbluegraylight">
                                While walk-ins are welcome, we recommend scheduling an appointment to ensure dedicated time with one of our specialists.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 darkblue-shadow">
                            <h4 className="font-bold text-darkbluegray mb-3">What documents should I bring?</h4>
                            <p className="text-darkbluegraylight">
                                For property consultations, bring any relevant documents: ID, property details, financial pre-approval (if applicable).
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 darkblue-shadow">
                            <h4 className="font-bold text-darkbluegray mb-3">Is the initial consultation free?</h4>
                            <p className="text-darkbluegraylight">
                                Yes, all initial consultations are completely free with no obligation. We're here to understand your needs and provide guidance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CSS Styles for hover effects */}
            <style jsx global>{`
                .contact-card {
                    transition: all 0.3s ease;
                }
                
                .contact-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px -15px rgba(231, 107, 83, 0.2);
                }
                
                input:focus, 
                select:focus, 
                textarea:focus {
                    box-shadow: 0 0 0 3px rgba(231, 107, 83, 0.1);
                }
            `}</style>
        </>
    );
};

// Main Page Component
export default function ContactPage() {
    return (
        <AppLayout>
            <Contact />
        </AppLayout>
    );
}