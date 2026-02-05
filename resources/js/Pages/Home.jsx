import { Head, Link , usePage} from '@inertiajs/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faMoneyBillWave,
  faShieldAlt,
  faBuilding,
  faChartLine,
  faFileContract,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'

import AppLayout from './Layouts/AppLayout'
import FAQSection from './Component/FAQSection'

export default function Home() {
    const { props } = usePage();
    return (
        <AppLayout>
            <Head>
                <title>Triumph Residential Services | Apartments for Rent in Los Angeles</title>
                <meta property="og:site_name" content={`${props.APP_DOMAIN}`}></meta>
                <meta property="og:url" content={`${props.APP_URL}`}></meta>
                <meta name="description" content="Da Vinci offers world-class resort apartments in downtown LA.  Enjoy comfortable Studio, One, Two, and Three bedroom floor plans with upscale features and a convenient location.The Da Vinci, the newest member of the Renaissance collection, offers fifteen unique apartment floor plans to match your California lifestyle. Indulge in world-class amenities, such as a state of the art fitness facility, a full-size indoor basketball court, a residential lounge, a library, a theater and a business center. 
                Find your perfect home in Los Angeles with Triumph Residential Services. Affordable apartments, comfortable living, 
                and exceptional service. Explore our listings today!  Enjoy easy access to the best shops and restaurants of Atwater Village, Highland Park, Eagle Rock, 
                Cypress Park, Mount Washington, Echo Park, Silverlake and Frogtown." />
                <meta name="keywords" content={`Los Angeles, CA Apartment Homes, Apartment Homes in Los Angeles, Los Angeles Apartment Homes, Da Vinci 
                Apartments for rent, Los Angeles apartments, residential services, affordable housing, ${props.BRAND_WORD} `} />
                <meta property="og:title" content={`${props.BRAND_WORD} | Apartments for Rent in Los Angeles `} />
                <meta property="og:description" content={`Explore affordable apartments in Los Angeles with  ${props.BRAND_WORD} . Comfort, convenience, and exceptional service await!`}/>
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${props.APP_URL}`} />
                <meta property="og:image" content="https://www.yourwebsite.com/og-image.jpg" />
            </Head>
            {/* Hero Section */}
            <section className="relative h-[90vh] w-full overflow-hidden">
                <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop playsInline>
                    <source src="/desgin/two.mp4" type="video/mp4" />
                </video>
                
                <div className="absolute inset-0 bg-black/50"></div>
                
                <div className="relative z-10 h-full flex items-center">
                    <div className="lg-ml-2 mx-auto px-6 w-full">
                        <div className="max-w-2xl text-left">
                            <h1 className="text-white font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                                {props.HOME_WORD_1} <br />
                                {props.HOME_WORD_2} <br />
                                {props.HOME_WORD_3}
                            </h1>
                            
                            <p className="mt-6 text-gray-200 text-base md:text-lg leading-relaxed">
                               Find your perfect home in the heart of the city with our affordable apartments for rent in Los Angeles
                               designed to fit your lifestyle and budget while offering comfort, convenience, and exceptional service. Explore our listings today!
                            </p>
                            
                            {/* <div className="mt-8 flex items-center gap-6">
                                <div className="px-6 py-3 bg-coral text-white font-semibold rounded-full transition">
                                    Are you the one?
                                </div>
                                <div className="text-white font-medium underline underline-offset-4 transition">
                                    Request Floor Plan
                                </div>
                            </div> */}
                            
                            <div className="mt-12 flex flex-wrap gap-10 text-white justify-center">
                                <div className="w-full sm:w-1/2 lg:w-auto px-10 border-r border-gray-400">
                                    <h3 className="text-2xl font-bold">4,500+</h3>
                                    <p className="text-sm text-gray-300">RESIDENCES</p>
                                </div>
                                <div className="w-full sm:w-1/2 lg:w-auto px-10 border-r border-gray-400">
                                    <h3 className="text-2xl font-bold">2,175+</h3>
                                    <p className="text-sm text-gray-300">Properties</p>
                                </div>
                                <div className="w-full sm:w-full lg:w-auto pl-10">
                                    <h3 className="text-2xl font-bold">40+</h3>
                                    <p className="text-sm text-gray-300">Buildings </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <ServicesSection />

            {/* FAQ Section */}
            <FAQSection />
        </AppLayout>
    )
}

// Services Section Component
function ServicesSection() {
   const services = [
    {
    icon: faHome,
    title: 'PROPERTY OPERATIONS',
    description: 'Our Management approach allows us to recognize operational efficiencies',
    link:"/PropertyOperations"
  },
  {
    icon: faMoneyBillWave,
    title: 'REGULATORY COMPLIANCE',
    description: 'We are familiar with requirements from the various Federal, State and City agencies and their administrators',
    link:"/RegulatoryCompliance"
  },
//   {
//     icon: faHome,
//     title: 'Property Buying',
//     description: 'Find your dream home with our extensive property listings...',
//     link:"/propertyBuyingPage"
//   },
//   {
//     icon: faMoneyBillWave,
//     title: 'Property Selling',
//     description: 'Maximize your property value with our marketing expertise...',
//     link:"/propertySellingPage"
//   },
//   {
//     icon: faShieldAlt,
//     title: 'Property Management',
//     description: 'Comprehensive property management services...',
//     link:"/propertyManagement"
//   },
//   {
//     icon: faBuilding,
//     title: 'Commercial Real Estate',
//     description: 'Office spaces, retail locations, and industrial properties...',
//     link:"/realEstateInvestment"
//   },
//   {
//     icon: faChartLine,
//     title: 'Real Estate Investment',
//     description: 'Strategic investment opportunities, market analysis...',
//     link:"/realEstateInvestment"
//   },
//   {
//     icon: faFileContract,
//     title: 'Legal & Documentation',
//     description: 'Complete legal support, contract preparation...',
//     link:"/legal_Documentation"
//   },
]


    return (
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block text-coral font-semibold text-sm uppercase tracking-wider mb-2">
                    Our Services
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-darkbluegray mb-4">
                    
                </h2>
                <p className="text-darkbluegraylight text-lg">
                   We strive to provide a consistent level of service across our portfolio of affordable apartments for  rent in Los Angeles while personalizing our approach for each community.
                </p>
            </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-4">
                {services.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div>
        </section>
    )
}

// Service Card Component
function ServiceCard({ icon, title, description, link }) {
  return (
    <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3">
      {/* Icon */}
      <div className="bg-coral/20 w-20 h-20 rounded-xl flex items-center justify-center mb-8">
        <FontAwesomeIcon icon={icon} className="w-10 h-10 text-coral" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-darkbluegray mb-5">{title}</h3>

      {/* Description */}
      <p className="text-darkbluegraylight mb-8 text-lg">{description}</p>

      {/* Link */}
      <Link href={link} className="text-coral font-semibold flex items-center group">
        Learn More
        <i className="fas fa-arrow-right ml-1 md:ml-2 text-xs md:text-sm"></i>
      </Link>
    </div>
  )
}