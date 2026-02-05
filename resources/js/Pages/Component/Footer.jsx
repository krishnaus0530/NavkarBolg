// Footer Component
import { Link, usePage } from '@inertiajs/react'
export default function Footer() {
    
    const { url } = usePage()
    const { props } = usePage();
    const isActive = (path) =>
        // url.startsWith(path)
        // ? 'text-coral font-semibold underline underline-offset-4'
        // : 'text-gray-300 hover:text-coral'
        url.startsWith(path)
        ? 'text-coral font-semibold border-l-4 border-coral pl-2'
        : 'text-gray-300 hover:text-coral'
    return (
        <footer className="bg-darkbluegray text-white mt-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

                    <div className="space-y-6">
                        <p className="text-gray-300 leading-relaxed lg:text-left text-center">
                            Find your dream home with our premium real estate services.
                            We connect you with opportunities that truly feel like home.
                        </p>

                         <div className="lg:px-0 px-[80px] flex space-x-4">
                           {[
                                {
                                    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                                    link:`${props.facebook}`
                                },
                               {
                                    path:  "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                                    link: `${props.twitter}`
                                },
                                {
                                    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",                        
                                    link:`${props.linkedin}`
                                },
                                {
                                    path: `M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919 .058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849 -.149 3.225-1.664 4.771-4.919 4.919 -1.266.058-1.644.07-4.85.07 -3.204 0-3.584-.012-4.849-.07 -3.26-.149-4.771-1.699-4.919-4.92 -.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849 .149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 7.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.4-8.8a1.15 1.15 0 1 0 0-2.3 1.15 1.15 0 0 0 0 2.3z`,
                                    link:`${props.instagram}`
                                }
                               ].map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-darkbluegraylight hover:bg-coral w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
                                    >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={item.path} />
                                    </svg>
                                    </a>
                            ))}
                        </div>
                    </div>
                    <div className="lg:px-0 px-[110px]">
                        <h3 className="text-xl font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><a href="/" className="text-gray-300 hover:text-coral">› Home</a></li>
                            <li><a href="/About" className="text-gray-300 hover:text-coral">› About Us</a></li>
                            {/* <li><a href="/service" className="text-gray-300 hover:text-coral">› Services</a></li>
                            <li><a href="/property" className="text-gray-300 hover:text-coral">› Property Services</a></li> */}
                            <li><a href="/contact" className="text-gray-300 hover:text-coral">› Contact</a></li>
                            <li><a href="/blog" className="text-gray-300 hover:text-coral">› Blogs</a></li>
                        </ul>
                    </div>

                    <div className="lg:px-0 px-[110px]">
                        <h3 className="text-xl font-bold mb-6">Our Services</h3>
                        <ul className="space-y-4">
                            <li><a href="/RegulatoryCompliance" className="text-gray-300 hover:text-coral">› Regulatory Compliance</a></li>
                            <li><a href="/PropertyOperations" className="text-gray-300 hover:text-coral">› Property Operations</a></li>
                            <li><a href="/properties" className="text-gray-300 hover:text-coral">› Properties</a></li>
                            <li><a href="/PrivacyPolicy" className="text-gray-300 hover:text-coral">› Privacy Policy</a></li>
                            <li><a href="/CCPACompliance" className="text-gray-300 hover:text-coral">› CCPA</a></li>
                            {/* <li><a href="/propertyBuyingPage" className="text-gray-300 hover:text-coral">› Property Buying</a></li>
                            <li><a href="/propertySellingPage" className="text-gray-300 hover:text-coral">› Property Selling</a></li>
                            <li><a href="/propertyManagement" className="text-gray-300 hover:text-coral">› Property Management</a></li>
                            <li><a href="/realEstateInvestment" className="text-gray-300 hover:text-coral">› Real Estate Investment</a></li>
                            <li><a href="/legal_Documentation" className="text-gray-300 hover:text-coral">› Legal & Documentation</a></li> */}
                        </ul>
                    </div>
                    <div className="lg:px-0 px-[110px]">
                        <h3 className="text-xl font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-gray-300">
                            <li>
                               {`${props.Address_1}`} <br />
                                {`${props.Address_2}`}
                            </li>
                            <li>{`${props.Contact}`}</li>
                            <li>{`${props.Email}`}</li>
                        </ul>
                        <div className="flex mt-5">
                            <img src="../desgin/wheel.png" alt="Logo" className="h-16 w-16 filter invert brightness-0" />
                            <img src="../desgin/home.png" alt="Logo" className="h-16 w-16 filter invert brightness-0" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        {`${props.footer_content}`}
                    </p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <Link href="/PrivacyPolicy" className={`text-sm ${isActive('/PrivacyPolicy')}`}>
                            Privacy Policy
                        </Link>
                        <Link href="/CCPACompliance" className={`text-sm ${isActive('/CCPACompliance')}`}>
                            CCPA
                        </Link>
                    </div>
                    {/* <div className="mt-4 md:mt-0 flex space-x-6">
                        <a href="/PrivacyPolicy" className="text-gray-400 hover:text-coral text-sm">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-coral text-sm">Terms of Service</a> 
                        <a href="CCPACompliance" className="text-gray-400 hover:text-coral text-sm">CCPA</a> 
                    </div> */}
                </div>

            </div>

            {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
                
                <div className="space-y-6 flex flex-col items-center md:items-start">
                <p className="text-gray-300 leading-relaxed">
                    Find your dream home with our premium real estate services.
                    We connect you with opportunities that truly feel like home.
                </p>

                <div className="flex space-x-4 justify-center md:justify-start">
                    {[
                    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                    "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"
                    ].map((path, index) => (
                    <a
                        key={index}
                        href="#"
                        className="bg-darkbluegraylight hover:bg-coral w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={path} />
                        </svg>
                    </a>
                    ))}
                </div>
                </div>

                <div className="flex flex-col items-center md:items-start">
                <h3 className="text-xl font-bold mb-6">Quick Links</h3>
                <ul className="space-y-4">
                    <li><a href="/" className="text-gray-300 hover:text-coral">› Home</a></li>
                    <li><a href="/About" className="text-gray-300 hover:text-coral">› About Us</a></li>
                    <li><a href="/service" className="text-gray-300 hover:text-coral">› Services</a></li>
                    <li><a href="/property" className="text-gray-300 hover:text-coral">› Property Services</a></li>
                    <li><a href="/contact" className="text-gray-300 hover:text-coral">› Contact</a></li>
                </ul>
                </div>

                <div className="flex flex-col items-center md:items-start">
                <h3 className="text-xl font-bold mb-6">Our Services</h3>
                <ul className="space-y-4">
                    <li><a href="/propertyBuyingPage" className="text-gray-300 hover:text-coral">› Property Buying</a></li>
                    <li><a href="/propertySellingPage" className="text-gray-300 hover:text-coral">› Property Selling</a></li>
                    <li><a href="/propertyManagement" className="text-gray-300 hover:text-coral">› Property Management</a></li>
                    <li><a href="/realEstateInvestment" className="text-gray-300 hover:text-coral">› Real Estate Investment</a></li>
                    <li><a href="/legal_Documentation" className="text-gray-300 hover:text-coral">› Legal & Documentation</a></li>
                </ul>
                </div>

                <div className="flex flex-col items-center md:items-start">
                <h3 className="text-xl font-bold mb-6">Contact Us</h3>
                <ul className="space-y-4 text-gray-300 text-center md:text-left">
                    <li>
                    631 S Olive St Suite 600, <br />
                    Los Angeles, CA 90014
                    </li>
                    <li>+1 (555) 123-4567</li>
                    <li>info@triumphrealestate.com</li>
                </ul>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col items-center md:flex-row md:justify-between">
                <p className="text-gray-400 text-sm text-center md:text-left">
                © 2023 Triumph Real Estate. All rights reserved.
                </p>

                <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-6">
                <a href="/privacy" className="text-gray-400 hover:text-coral text-sm">Privacy Policy</a>
                <a href="/terms" className="text-gray-400 hover:text-coral text-sm">Terms of Service</a>
                <a href="/cookies" className="text-gray-400 hover:text-coral text-sm">Cookie Policy</a>
                </div>
            </div>
            </div> */}

        </footer>
    );
}

// // Footer Component
// export default function Footer() {
//     return (
//         <footer className="bg-darkbluegray text-white mt-5">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

//                     <div className="space-y-6">
//                         <p className="text-gray-300 leading-relaxed">
//                             Find your dream home with our premium real estate services. We connect you with opportunities
//                             that truly feel like home.
//                         </p>

//                         <div className="flex space-x-4">
//                             {[
//                                 "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                               
//                                 "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                            
//                                 "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                               
//                                 "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"
//                             ].map((path, index) => (
//                                 <a
//                                     key={index}
//                                     href="#"
//                                     className="bg-darkbluegraylight hover:bg-coral w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
//                                 >
//                                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                                         <path d={path} />
//                                     </svg>
//                                 </a>
//                             ))}
//                         </div>
//                     </div>

//                     <FooterLinks title="Quick Links" items={[
//                         "Home", "About Us", "Services", "Properties", "Contact"
//                     ]} />
//                     <FooterLinks title="Our Services" items={[
//                         "Property Buying",
//                         "Property Selling",
//                         "Property Management",
//                         "Real Estate Investment",
//                         "Legal & Documentation"
//                     ]} />

//                     <div>
//                         <h3 className="text-xl font-bold mb-6">Contact Us</h3>
//                         <ul className="space-y-4 text-gray-300">
//                             <li>123 Business Avenue, Suite 100<br />New York, NY 10001</li>
//                             <li>+1 (555) 123-4567</li>
//                             <li>info@triumphrealestate.com</li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
//                     <p className="text-gray-400 text-sm">
//                         © 2023 Triumph Real Estate. All rights reserved.
//                     </p>

//                     <div className="mt-4 md:mt-0 flex space-x-6">
//                         {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
//                             <a key={item} href="#" className="text-gray-400 hover:text-coral text-sm">
//                                 {item}
//                             </a>
//                         ))}
//                     </div>
//                 </div>

//             </div>
//         </footer>
//     );
// }

// function FooterLinks({ title, items }) {
//     return (
//         <div>
//             <h3 className="text-xl font-bold mb-6">{title}</h3>
//             <ul className="space-y-4">
//                 {items.map(item => (
//                     <li key={item}>
//                         <a href="#" className="text-gray-300 hover:text-coral transition duration-300 flex items-center">
//                             <span className="mr-2">›</span>
//                             {item}
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
