// import React, { useState } from 'react';

// const PropertyQuery = () => {
//     // Static data
//     const [inquiries, setInquiries] = useState({
//         data: [
//             {
//                 id: 1,
//                 first_name: 'John',
//                 last_name: 'Doe',
//                 email: 'john.doe@example.com',
//                 phone: '+1 (555) 123-4567',
//                 interested_property: 'Luxury Villa Malibu',
//                 subject: 'Interested in viewing the property',
//                 message: 'I would like to schedule a viewing for this weekend.',
//                 interested: true,
//                 created_at: '2024-01-15T10:30:00Z'
//             },
//             {
//                 id: 2,
//                 first_name: 'Sarah',
//                 last_name: 'Smith',
//                 email: 'sarah.smith@example.com',
//                 phone: '+1 (555) 987-6543',
//                 interested_property: 'Downtown Penthouse',
//                 subject: 'Price negotiation',
//                 message: 'Is the price negotiable?',
//                 interested: true,
//                 created_at: '2024-01-14T14:45:00Z'
//             },
//             {
//                 id: 3,
//                 first_name: 'Robert',
//                 last_name: 'Johnson',
//                 email: 'robert.j@example.com',
//                 phone: '+1 (555) 456-7890',
//                 interested_property: 'Beachfront Condo',
//                 subject: 'Rental inquiry',
//                 message: 'Is this available for rent?',
//                 interested: false,
//                 created_at: '2024-01-13T09:15:00Z'
//             },
//             {
//                 id: 4,
//                 first_name: 'Maria',
//                 last_name: 'Garcia',
//                 email: 'maria.g@example.com',
//                 phone: '+1 (555) 234-5678',
//                 interested_property: 'Mountain Retreat',
//                 subject: 'Property details needed',
//                 message: 'Can you send me more photos?',
//                 interested: true,
//                 created_at: '2024-01-12T16:20:00Z'
//             },
//             {
//                 id: 5,
//                 first_name: 'David',
//                 last_name: 'Wilson',
//                 email: 'david.wilson@example.com',
//                 phone: '+1 (555) 876-5432',
//                 interested_property: 'Urban Loft',
//                 subject: 'Mortgage options',
//                 message: 'Do you work with any preferred lenders?',
//                 interested: false,
//                 created_at: '2024-01-11T11:10:00Z'
//             }
//         ],
//         from: 1,
//         to: 5,
//         total: 5,
//         links: [
//             { url: null, label: '&laquo; Previous', active: false },
//             { url: '#', label: '1', active: true },
//             { url: null, label: 'Next &raquo;', active: false }
//         ]
//     });

//     // Static stats
//     const stats = {
//         total: 127,
//         interested: 89,
//         contacted: 73,
//         properties: 45
//     };

//     const [search, setSearch] = useState('');
//     const [filter, setFilter] = useState('all');
//     const [localInquiries, setLocalInquiries] = useState(inquiries.data);

//     const handleSearch = (e) => {
//         const value = e.target.value;
//         setSearch(value);

//         if (!value.trim()) {
//             setLocalInquiries(inquiries.data);
//             return;
//         }

//         const filtered = inquiries.data.filter(inquiry => 
//             inquiry.first_name.toLowerCase().includes(value.toLowerCase()) ||
//             inquiry.last_name.toLowerCase().includes(value.toLowerCase()) ||
//             inquiry.email.toLowerCase().includes(value.toLowerCase()) ||
//             inquiry.subject.toLowerCase().includes(value.toLowerCase()) ||
//             inquiry.interested_property.toLowerCase().includes(value.toLowerCase())
//         );

//         setLocalInquiries(filtered);
//     };

//     const handleFilter = (newFilter) => {
//         setFilter(newFilter);

//         let filtered = inquiries.data;

//         switch(newFilter) {
//             case 'interested':
//                 filtered = inquiries.data.filter(inquiry => inquiry.interested);
//                 break;
//             case 'not-interested':
//                 filtered = inquiries.data.filter(inquiry => !inquiry.interested);
//                 break;
//             case 'new':
//                 // Filter for last 7 days
//                 const sevenDaysAgo = new Date();
//                 sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//                 filtered = inquiries.data.filter(inquiry => 
//                     new Date(inquiry.created_at) > sevenDaysAgo
//                 );
//                 break;
//             default:
//                 filtered = inquiries.data;
//         }

//         setLocalInquiries(filtered);
//     };

//     const handleDelete = (id) => {
//         if (window.confirm('Are you sure you want to delete this inquiry?')) {
//             const updatedInquiries = localInquiries.filter(inquiry => inquiry.id !== id);
//             setLocalInquiries(updatedInquiries);

//             // Also update the main data array
//             const updatedData = inquiries.data.filter(inquiry => inquiry.id !== id);
//             setInquiries({
//                 ...inquiries,
//                 data: updatedData,
//                 total: updatedData.length,
//                 to: updatedData.length
//             });
//         }
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     const getInitials = (firstName, lastName) => {
//         return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
//     };

//     return (
//         <>
//             <head>
//                 <title>Property Inquiries</title>
//                 <style>{`
//                     .status-badge {
//                         display: inline-flex;
//                         align-items: center;
//                         padding: 0.25rem 0.75rem;
//                         border-radius: 9999px;
//                         font-size: 0.75rem;
//                         font-weight: 600;
//                     }
//                     .status-interested {
//                         background-color: #10B98120;
//                         color: #10B981;
//                     }
//                     .status-not-interested {
//                         background-color: #F59E0B20;
//                         color: #F59E0B;
//                     }
//                 `}</style>
//             </head>

//             <div className="container max-w-7xl px-4 py-8">
//                 {/* Header */}
//                 <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//                     <div>
//                         <h1 className="text-3xl font-bold text-[#323751] dark:text-white">Property Inquiries</h1>
//                         <p className="text-gray-600 dark:text-gray-400 mt-2">
//                             Manage and track property inquiries from potential clients
//                         </p>
//                     </div>


//                 </header>

//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 border-[#e76b53]">
//                         <div className="flex justify-between items-start">
//                             <div>
//                                 <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Inquiries</p>
//                                 <p className="text-3xl font-bold mt-2">{stats.total}</p>
//                             </div>
//                             <div className="bg-[#e76b53] bg-opacity-10 p-3 rounded-lg">
//                                 <i className="fas fa-inbox text-[#e76b53] text-xl"></i>
//                             </div>
//                         </div>
//                         <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
//                             <span className="text-green-600 dark:text-green-400 font-medium">
//                                 +{Math.floor(stats.total * 0.12)} this week
//                             </span>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 border-[#323751]">
//                         <div className="flex justify-between items-start">
//                             <div>
//                                 <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Interested</p>
//                                 <p className="text-3xl font-bold mt-2">{stats.interested}</p>
//                             </div>
//                             <div className="bg-[#323751] bg-opacity-10 p-3 rounded-lg">
//                                 <i className="fas fa-thumbs-up text-[#323751] text-xl"></i>
//                             </div>
//                         </div>
//                         <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
//                             <span className="text-[#e76b53] font-medium">
//                                 {stats.total > 0 ? Math.round((stats.interested / stats.total) * 100) : 0}% positive response
//                             </span>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 border-green-500">
//                         <div className="flex justify-between items-start">
//                             <div>
//                                 <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Contacted</p>
//                                 <p className="text-3xl font-bold mt-2">{stats.contacted}</p>
//                             </div>
//                             <div className="bg-green-500 bg-opacity-10 p-3 rounded-lg">
//                                 <i className="fas fa-phone-alt text-green-500 text-xl"></i>
//                             </div>
//                         </div>
//                         <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
//                             <span className="text-green-600 dark:text-green-400 font-medium">
//                                 {stats.total > 0 ? Math.round((stats.contacted / stats.total) * 100) : 0}% follow-up rate
//                             </span>
//                         </div>
//                     </div>

//                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 border-purple-500">
//                         <div className="flex justify-between items-start">
//                             <div>
//                                 <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Properties</p>
//                                 <p className="text-3xl font-bold mt-2">{stats.properties}</p>
//                             </div>
//                             <div className="bg-purple-500 bg-opacity-10 p-3 rounded-lg">
//                                 <i className="fas fa-home text-purple-500 text-xl"></i>
//                             </div>
//                         </div>
//                         <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
//                             <span className="text-purple-600 dark:text-purple-400 font-medium">
//                                 {Math.floor(stats.properties * 0.6)} unique this month
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Filters and Search */}
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow mb-8 p-6">
//                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                         <div className="flex flex-wrap gap-2">
//                             <button 
//                                 onClick={() => handleFilter('all')}
//                                 className={`px-4 py-2 rounded-lg font-medium ${filter === 'all' ? 'bg-[#e76b53] text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
//                             >
//                                 All Inquiries
//                             </button>
//                             <button 
//                                 onClick={() => handleFilter('interested')}
//                                 className={`px-4 py-2 rounded-lg font-medium ${filter === 'interested' ? 'bg-[#e76b53] text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
//                             >
//                                 Interested
//                             </button>
//                             <button 
//                                 onClick={() => handleFilter('not-interested')}
//                                 className={`px-4 py-2 rounded-lg font-medium ${filter === 'not-interested' ? 'bg-[#e76b53] text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
//                             >
//                                 Not Interested
//                             </button>

//                         </div>

//                         <div className="relative w-full md:w-auto">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <i className="fas fa-search text-gray-400"></i>
//                             </div>
//                             <input 
//                                 type="search" 
//                                 value={search}
//                                 onChange={handleSearch}
//                                 className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 w-full md:w-64 focus:ring-2 focus:ring-[#e76b53] focus:border-[#e76b53] outline-none" 
//                                 placeholder="Search inquiries..."
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Inquiries Table */}
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                             <thead className="bg-gray-50 dark:bg-gray-900">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</th>
//                                     <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
//                                     <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Property</th>
//                                     <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject</th>
//                                     <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
//                                     <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
//                                     <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                                 {localInquiries.map((inquiry) => (
//                                     <tr key={inquiry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="flex items-center">
//                                                 <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#323751] flex items-center justify-center text-white font-bold">
//                                                     {getInitials(inquiry.first_name, inquiry.last_name)}
//                                                 </div>
//                                                 <div className="ml-4">
//                                                     <div className="text-sm font-medium">
//                                                         {inquiry.first_name} {inquiry.last_name}
//                                                     </div>
//                                                     <div className="text-sm text-gray-500 dark:text-gray-400">
//                                                         Inquiry #{inquiry.id.toString().padStart(3, '0')}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="text-sm">{inquiry.email}</div>
//                                             <div className="text-sm text-gray-500 dark:text-gray-400">{inquiry.phone}</div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="text-sm font-medium">{inquiry.interested_property}</div>
//                                             <div className="text-sm text-gray-500 dark:text-gray-400">
//                                                 Property #{inquiry.interested_property ? `P-${inquiry.interested_property.slice(-2)}` : 'N/A'}
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <div className="text-sm max-w-xs truncate">{inquiry.subject}</div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <span className={`status-badge ${inquiry.interested ? 'status-interested' : 'status-not-interested'}`}>
//                                                 <i className={`fas ${inquiry.interested ? 'fa-thumbs-up' : 'fa-clock'} mr-1`}></i>
//                                                 {inquiry.interested ? 'Interested' : 'Not Interested'}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                                             {formatDate(inquiry.created_at)}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                             <button 
//                                                 onClick={() => alert(`Viewing inquiry #${inquiry.id}`)}
//                                                 className="text-[#e76b53] hover:text-opacity-80 mr-3"
//                                             >
//                                                 <i className="fas fa-eye"></i>
//                                             </button>
//                                             <button 
//                                                 onClick={() => alert(`Editing inquiry #${inquiry.id}`)}
//                                                 className="text-[#323751] hover:text-opacity-80 mr-3"
//                                             >
//                                                 <i className="fas fa-edit"></i>
//                                             </button>
//                                             <button 
//                                                 onClick={() => handleDelete(inquiry.id)}
//                                                 className="text-red-500 hover:text-opacity-80"
//                                             >
//                                                 <i className="fas fa-trash-alt"></i>
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Pagination */}
//                     {localInquiries.length > 0 && (
//                         <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
//                             <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
//                                 Showing <span className="font-medium">1</span> to <span className="font-medium">{localInquiries.length}</span> of <span className="font-medium">{localInquiries.length}</span> results
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 {inquiries.links.map((link, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => link.url && alert('Pagination would work with API')}
//                                         className={`px-3 py-1 rounded-lg ${
//                                             link.active
//                                                 ? 'bg-[#e76b53] text-white'
//                                                 : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//                                         } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                         dangerouslySetInnerHTML={{ __html: link.label }}
//                                         disabled={!link.url}
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Footer */}
//                 <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
//                     <p>Property Inquiries Dashboard • Using color theme: <span className="font-medium">#323751</span> and <span className="font-medium">#e76b53</span></p>
//                     <p className="mt-2">Schema fields displayed: first_name, last_name, email, phone, subject, interested_property, message, interested</p>
//                 </footer>
//             </div>
//         </>
//     );
// };
import React, { useEffect, useRef, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function PropertyQuery({ inquiries, stats, filters }) {
    const { props } = usePage();

    // State for search, filter and modal
    const [search, setSearch] = useState(filters?.search ?? '');
    const [filter, setFilter] = useState(filters?.filter ?? 'all');
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Debounce for search
    const debounceRef = useRef(null);
    useEffect(() => {
        clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            router.get(
                route('property-inquiries.index'),
                { search, filter },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 400);

        return () => clearTimeout(debounceRef.current);
    }, [search, filter]);

    // Handle filter change
    const handleFilterChange = (value) => {
        setFilter(value);
        router.get(
            route('property-inquiries.index'),
            { search, filter: value },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Handle view button click - open modal with inquiry data
    const handleViewClick = (inquiry) => {
        setSelectedInquiry(inquiry);
        setShowModal(true);
    };

    // Handle delete
    const handleDelete = (id) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return;

        router.delete(route('property-inquiries.destroy', id), {
            preserveScroll: true,
        });
    };

    // Format date
    const formatDate = (date) =>
        new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

    // Get initials
    const initials = (f, l) =>
        `${f?.[0] || ''}${l?.[0] || ''}`.toUpperCase();

    // Pagination handler
    const handlePagination = (url) => {
        if (!url) return;
        router.get(url, { search, filter }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Close modal when clicking outside
    const handleOutsideClick = (e) => {
        if (e.target.id === 'inquiry-modal') {
            setShowModal(false);
        }
    };

    // Close modal with escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setShowModal(false);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <>
            <AppLayout>
                <Head title="Property Inquiries" />

                <div className="px-4 py-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-primary dark:text-white">
                                Property Inquiries
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                                Manage and track client inquiries
                            </p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[
                            {
                                label: 'Total Messages',
                                value: stats?.total || 0,
                                icon: 'fa-inbox',
                                iconBg: 'bg-blue-100 dark:bg-blue-900',
                                iconColor: 'text-blue-600 dark:text-blue-400'
                            },
                            {
                                label: 'Property-Inquiry',
                                value: stats?.interested || 0,
                                icon: 'fa-thumbs-up',
                                iconBg: 'bg-green-100 dark:bg-green-900',
                                iconColor: 'text-green-600 dark:text-green-400'
                            },
                            {
                                label: 'User Query',
                                value: stats?.not_intrested || 0,
                                icon: 'fa-home',
                                iconBg: 'bg-yellow-100 dark:bg-yellow-900',
                                iconColor: 'text-yellow-600 dark:text-yellow-400'
                            },
                            {
                                label: 'Contacted',
                                value: stats?.contacted || 0,
                                icon: 'fa-phone',
                                iconBg: 'bg-purple-100 dark:bg-purple-900',
                                iconColor: 'text-purple-600 dark:text-purple-300'
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex justify-between border border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                                    <p className="text-2xl font-bold mt-1 dark:text-white">{item.value}</p>
                                </div>
                                <div className={`h-12 w-12 rounded-lg ${item.iconBg} flex items-center justify-center`}>
                                    <i className={`fas ${item.icon} ${item.iconColor} text-xl`} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 justify-between border border-gray-200 dark:border-gray-700">
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleFilterChange('all')}
                                className={`px-4 py-2 rounded-lg capitalize transition-colors ${filter === 'all'
                                    ? 'bg-accent text-white dark:bg-accent-dark'
                                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-300'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => handleFilterChange('interested')}
                                className={`px-4 py-2 rounded-lg capitalize transition-colors ${filter === 'interested'
                                    ? 'bg-accent text-white dark:bg-accent-dark'
                                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-300'
                                    }`}
                            >
                                Property-Inquiry
                            </button>
                            <button
                                onClick={() => handleFilterChange('not-interested')}
                                className={`px-4 py-2 rounded-lg capitalize transition-colors ${filter === 'not-interested'
                                    ? 'bg-accent text-white dark:bg-accent-dark'
                                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-300'
                                    }`}
                            >
                                User Query
                            </button>
                        </div>

                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search inquiries..."
                            className="border dark:border-gray-600 rounded-lg px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark focus:border-transparent dark:focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                    </div>

                    {/* Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto mb-6 border border-gray-200 dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    {['Client', 'Contact', 'Property', 'Subject', 'Status', 'Date', 'Actions'].map((h) => (
                                        <th
                                            key={h}
                                            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {(inquiries?.data || []).map((q) => (
                                    <tr key={q.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary dark:bg-primary-dark text-white flex items-center justify-center font-bold">
                                                {initials(q.first_name, q.last_name)}
                                            </div>
                                            <div>
                                                <p className="font-medium dark:text-white">
                                                    {q.first_name} {q.last_name}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    #{q.id.toString().padStart(3, '0')}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="dark:text-white">{q.email}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{q.phone}</p>
                                        </td>

                                        <td className="px-6 py-4 dark:text-white">
                                            {q.interested_property || '-'}
                                        </td>

                                        <td className="px-6 py-4 max-w-xs truncate dark:text-white">
                                            {q.subject}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${q.interested
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    }`}
                                            >
                                                {q.interested ? 'Property-Inquiry' : 'User Query'}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(q.created_at)}
                                        </td>

                                        <td className="px-6 py-4 flex gap-3">

                                            <button
                                                onClick={() => handleViewClick(q)}
                                                className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-50 text-blue-600 mr-3  hover:bg-blue-100
                                                transition-colors"
                                            >
                                                View
                                                <i className="fas fa-eye" />
                                            </button>
                                            {/* Delete Button - Pill */}
                                            <button
                                                onClick={() => handleDelete(q.id)}
                                                className="flex items-center gap-2 px-3 py-2 rounded-full bg-red-50 text-red-600 mr-3  hover:bg-red-100
                                                transition-colors"
                                            >
                                                Delete
                                                <i className="fas fa-trash" />
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Empty state */}
                        {(inquiries?.data || []).length === 0 && (
                            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                                <i className="fas fa-inbox text-4xl mb-3 text-gray-300 dark:text-gray-600"></i>
                                <p>No inquiries found</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {inquiries?.links && inquiries.links.length > 3 && (
                        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 rounded-b-xl shadow">
                            {/* Mobile pagination */}
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button
                                    onClick={() => handlePagination(inquiries.prev_page_url)}
                                    disabled={!inquiries.prev_page_url}
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors ${inquiries.prev_page_url
                                        ? 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                                        : 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                        }`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => handlePagination(inquiries.next_page_url)}
                                    disabled={!inquiries.next_page_url}
                                    className={`ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors ${inquiries.next_page_url
                                        ? 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                                        : 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>

                            {/* Desktop pagination */}
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        Showing <span className="font-medium dark:text-white">{inquiries.from || 0}</span> to{' '}
                                        <span className="font-medium dark:text-white">{inquiries.to || 0}</span> of{' '}
                                        <span className="font-medium dark:text-white">{inquiries.total || 0}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <button
                                            onClick={() => handlePagination(inquiries.prev_page_url)}
                                            disabled={!inquiries.prev_page_url}
                                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium transition-colors ${inquiries.prev_page_url
                                                ? 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                                                : 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                                }`}
                                        >
                                            <span className="sr-only">Previous</span>
                                            <i className="fas fa-chevron-left" />
                                        </button>

                                        {inquiries.links.map((link, index) => {
                                            if (link.url === null) return null;
                                            const isActive = link.active;
                                            const isNumber = !['Previous', 'Next', '...'].includes(link.label);

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => handlePagination(link.url)}
                                                    disabled={link.url === null || isActive}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${isActive
                                                        ? 'z-10 bg-accent border-accent text-white dark:bg-accent-dark dark:border-accent-dark'
                                                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                                                        } ${!isNumber ? 'px-3' : ''}`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        })}

                                        <button
                                            onClick={() => handlePagination(inquiries.next_page_url)}
                                            disabled={!inquiries.next_page_url}
                                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium transition-colors ${inquiries.next_page_url
                                                ? 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                                                : 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                                }`}
                                        >
                                            <span className="sr-only">Next</span>
                                            <i className="fas fa-chevron-right" />
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Inquiry Detail Modal */}
                {showModal && selectedInquiry && (
                    <div
                        id="inquiry-modal"
                        onClick={handleOutsideClick}
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-primary dark:bg-primary-dark text-white flex items-center justify-center font-bold text-lg">
                                        {initials(selectedInquiry.first_name, selectedInquiry.last_name)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {selectedInquiry.first_name} {selectedInquiry.last_name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Inquiry #{selectedInquiry.id.toString().padStart(3, '0')}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                                >
                                    <i className="fas fa-times" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Client Info */}
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                                                Client Information
                                            </h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Full Name</p>
                                                    <p className="font-medium dark:text-white">
                                                        {selectedInquiry.first_name} {selectedInquiry.last_name}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                                                    <p className="font-medium dark:text-white">{selectedInquiry.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                                                    <p className="font-medium dark:text-white">{selectedInquiry.phone}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Property Info */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                                                Property Details
                                            </h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Property Name</p>
                                                    <p className="font-medium dark:text-white">
                                                        {selectedInquiry.interested_property || 'Not specified'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Inquiry Details */}
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                                                Inquiry Details
                                            </h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Subject</p>
                                                    <p className="font-medium dark:text-white">{selectedInquiry.subject}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${selectedInquiry.interested
                                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                            }`}
                                                    >
                                                        {selectedInquiry.interested ? 'Property-Inquiry' : 'User Query'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Submitted</p>
                                                    <p className="font-medium dark:text-white">
                                                        {formatDate(selectedInquiry.created_at)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                                        Message
                                    </h4>
                                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                            {selectedInquiry.message || 'No message provided.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* Add custom styles for modal animation */}
                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    .animate-fadeIn {
                        animation: fadeIn 0.2s ease-out;
                    }
                `}</style>
            </AppLayout>
        </>
    );
}
// import React, { useEffect, useRef, useState } from 'react';
// import { Head, Link, router, usePage } from '@inertiajs/react';
// import AppLayout from '../Layouts/AppLayout';


// export default function PropertyQuery({ inquiries, stats, filters }) {
//     const { props } = usePage();

//     // Provide safe default values to prevent null/undefined issues
//     const [search, setSearch] = useState(filters?.search ?? '');
//     const [filter, setFilter] = useState(filters?.filter ?? 'all');

//     const debounceRef = useRef(null);
//     useEffect(() => {
//         clearTimeout(debounceRef.current);

//         debounceRef.current = setTimeout(() => {
//             router.get(
//                 route('property-inquiries.index'),
//                 { search, filter },
//                 {
//                     preserveState: true,
//                     replace: true,
//                 }
//             );
//         }, 400);

//         return () => clearTimeout(debounceRef.current);
//     }, [search, filter]); // Added filter to dependencies

//     const handleFilterChange = (value) => {
//         setFilter(value);

//         // Update URL with both search and filter
//         router.get(
//             route('property-inquiries.index'),
//             { search, filter: value },
//             {
//                 preserveState: true,
//                 replace: true,
//             }
//         );
//     };

//     const handleDelete = (id) => {
//         if (!confirm('Are you sure you want to delete this inquiry?')) return;

//         router.delete(route('property-inquiries.destroy', id), {
//             preserveScroll: true,
//         });
//     };

//     const formatDate = (date) =>
//         new Date(date).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//         });

//     const initials = (f, l) =>
//         `${f?.[0] || ''}${l?.[0] || ''}`.toUpperCase();

//     // Pagination handler
//     const handlePagination = (url) => {
//         if (!url) return;

//         router.get(url, { search, filter }, {
//             preserveState: true,
//             preserveScroll: true,
//         });
//     };

//     return (
//         <>
//             <AppLayout>
//                 <Head title="Property Inquiries" />

//                 <div className=" px-4 py-8">
//                     {/* Header */}
//                     <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
//                         <div>
//                             <h1 className="text-3xl font-bold text-primary dark:text-white">
//                                 Property Inquiries
//                             </h1>
//                             <p className="text-gray-500 dark:text-gray-400 mt-1">
//                                 Manage and track client inquiries
//                             </p>
//                         </div>
//                     </div>

//                     {/* Stats - StatsCard ke pattern pe */}
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//                         {[
//                             {
//                                 label: 'Total Messages',
//                                 value: stats?.total || 0,
//                                 icon: 'fa-inbox',
//                                 iconBg: 'bg-blue-100 dark:bg-blue-900',
//                                 iconColor: 'text-blue-600 dark:text-blue-400'
//                             },
//                             {
//                                 label: 'Property-Inquiry',
//                                 value: stats?.interested || 0,
//                                 icon: 'fa-thumbs-up',
//                                 iconBg: 'bg-green-100 dark:bg-green-900',
//                                 iconColor: 'text-green-600 dark:text-green-400'
//                             },
//                             {
//                                 label: 'User Query',
//                                 value: stats?.not_intrested || 0,
//                                 icon: 'fa-home',
//                                 iconBg: 'bg-yellow-100 dark:bg-yellow-900',
//                                 iconColor: 'text-yellow-600 dark:text-yellow-400'
//                             },
//                             {
//                                 label: 'Contacted',
//                                 value: stats?.contacted || 0,
//                                 icon: 'fa-phone',
//                                 iconBg: 'bg-purple-100 dark:bg-purple-900',
//                                 iconColor: 'text-purple-600 dark:text-purple-300'
//                             },
//                         ].map((item, i) => (
//                             <div
//                                 key={i}
//                                 className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex justify-between border border-gray-200 dark:border-gray-700"
//                             >
//                                 <div>
//                                     <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
//                                     <p className="text-2xl font-bold mt-1 dark:text-white">{item.value}</p>
//                                 </div>
//                                 <div className={`h-12 w-12 rounded-lg ${item.iconBg} flex items-center justify-center`}>
//                                     <i className={`fas ${item.icon} ${item.iconColor} text-xl`} />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Filters */}
//                     <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 justify-between border border-gray-200 dark:border-gray-700">
//                         <div className="flex gap-2">
//                             <button
//                                 onClick={() => handleFilterChange('all')}
//                                 className={`px-4 py-2 rounded-lg capitalize transition-colors ${filter === 'all'
//                                     ? 'bg-accent text-white dark:bg-accent-dark'
//                                     : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-300'
//                                     }`}
//                             >
//                                 All
//                             </button>

//                             <button
//                                 onClick={() => handleFilterChange('interested')}
//                                 className={`px-4 py-2 rounded-lg capitalize transition-colors ${filter === 'interested'
//                                     ? 'bg-accent text-white dark:bg-accent-dark'
//                                     : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-300'
//                                     }`}
//                             >
//                                 Property-Inquiry
//                             </button>

//                             <button
//                                 onClick={() => handleFilterChange('not-interested')}
//                                 className={`px-4 py-2 rounded-lg capitalize transition-colors ${filter === 'not-interested'
//                                     ? 'bg-accent text-white dark:bg-accent-dark'
//                                     : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-300'
//                                     }`}
//                             >
//                                 User Query
//                             </button>
//                         </div>

//                         <input
//                             type="search"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             placeholder="Search inquiries..."
//                             className="border dark:border-gray-600 rounded-lg px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark focus:border-transparent dark:focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//                         />
//                     </div>

//                     {/* Table */}
//                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto mb-6 border border-gray-200 dark:border-gray-700">
//                         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                             <thead className="bg-gray-50 dark:bg-gray-900">
//                                 <tr>
//                                     {['Client', 'Contact', 'Property', 'Subject', 'Status', 'Date', 'Actions'].map((h) => (
//                                         <th
//                                             key={h}
//                                             className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
//                                         >
//                                             {h}
//                                         </th>
//                                     ))}
//                                 </tr>
//                             </thead>

//                             <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                                 {(inquiries?.data || []).map((q) => (
//                                     <tr key={q.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                                         <td className="px-6 py-4 flex items-center gap-3">
//                                             <div className="h-10 w-10 rounded-full bg-primary dark:bg-primary-dark text-white flex items-center justify-center font-bold">
//                                                 {initials(q.first_name, q.last_name)}
//                                             </div>
//                                             <div>
//                                                 <p className="font-medium dark:text-white">
//                                                     {q.first_name} {q.last_name}
//                                                 </p>
//                                                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                                                     #{q.id.toString().padStart(3, '0')}
//                                                 </p>
//                                             </div>
//                                         </td>

//                                         <td className="px-6 py-4">
//                                             <p className="dark:text-white">{q.email}</p>
//                                             <p className="text-sm text-gray-500 dark:text-gray-400">{q.phone}</p>
//                                         </td>

//                                         <td className="px-6 py-4 dark:text-white">
//                                             {q.interested_property || '-'}
//                                         </td>

//                                         <td className="px-6 py-4 max-w-xs truncate dark:text-white">
//                                             {q.subject}
//                                         </td>

//                                         <td className="px-6 py-4">
//                                             <span
//                                                 className={`px-3 py-1 rounded-full text-xs font-medium ${q.interested
//                                                     ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
//                                                     : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
//                                                     }`}
//                                             >
//                                                 {q.interested ? 'Property-Inquiry' : 'User Query'}
//                                             </span>
//                                         </td>

//                                         <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
//                                             {formatDate(q.created_at)}
//                                         </td>

//                                         <td className="px-6 py-4 flex gap-3">
//                                             <Link
//                                                 href="#"
//                                                 className="text-accent dark:text-accent-light hover:text-accent-dark dark:hover:text-accent transition-colors"
//                                             >
//                                                 <i className="fas fa-eye" />
//                                             </Link>

//                                             <button
//                                                 onClick={() => handleDelete(q.id)}
//                                                 className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
//                                             >
//                                                 <i className="fas fa-trash" />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         {/* Empty */}
//                         {(inquiries?.data || []).length === 0 && (
//                             <div className="text-center py-10 text-gray-500 dark:text-gray-400">
//                                 <i className="fas fa-inbox text-4xl mb-3 text-gray-300 dark:text-gray-600"></i>
//                                 <p>No inquiries found</p>
//                             </div>
//                         )}
//                     </div>

//                     {/* Pagination */}
//                     {inquiries?.links && inquiries.links.length > 3 && (
//                         <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 rounded-b-xl shadow">
//                             {/* Mobile pagination info */}
//                             <div className="flex-1 flex justify-between sm:hidden">
//                                 <button
//                                     onClick={() => handlePagination(inquiries.prev_page_url)}
//                                     disabled={!inquiries.prev_page_url}
//                                     className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors ${inquiries.prev_page_url
//                                         ? 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
//                                         : 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
//                                         }`}
//                                 >
//                                     Previous
//                                 </button>
//                                 <button
//                                     onClick={() => handlePagination(inquiries.next_page_url)}
//                                     disabled={!inquiries.next_page_url}
//                                     className={`ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors ${inquiries.next_page_url
//                                         ? 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
//                                         : 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
//                                         }`}
//                                 >
//                                     Next
//                                 </button>
//                             </div>

//                             {/* Desktop pagination */}
//                             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                                 <div>
//                                     <p className="text-sm text-gray-700 dark:text-gray-300">
//                                         Showing <span className="font-medium dark:text-white">{inquiries.from || 0}</span> to{' '}
//                                         <span className="font-medium dark:text-white">{inquiries.to || 0}</span> of{' '}
//                                         <span className="font-medium dark:text-white">{inquiries.total || 0}</span> results
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                                         {/* Previous button */}
//                                         <button
//                                             onClick={() => handlePagination(inquiries.prev_page_url)}
//                                             disabled={!inquiries.prev_page_url}
//                                             className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium transition-colors ${inquiries.prev_page_url
//                                                 ? 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
//                                                 : 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
//                                                 }`}
//                                         >
//                                             <span className="sr-only">Previous</span>
//                                             <i className="fas fa-chevron-left" />
//                                         </button>

//                                         {/* Page numbers */}
//                                         {inquiries.links.map((link, index) => {
//                                             if (link.url === null) return null;

//                                             const isActive = link.active;
//                                             const isNumber = !['Previous', 'Next', '...'].includes(link.label);

//                                             return (
//                                                 <button
//                                                     key={index}
//                                                     onClick={() => handlePagination(link.url)}
//                                                     disabled={link.url === null || isActive}
//                                                     className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${isActive
//                                                         ? 'z-10 bg-accent border-accent text-white dark:bg-accent-dark dark:border-accent-dark'
//                                                         : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
//                                                         } ${!isNumber ? 'px-3' : ''}`}
//                                                     dangerouslySetInnerHTML={{ __html: link.label }}
//                                                 />
//                                             );
//                                         })}

//                                         {/* Next button */}
//                                         <button
//                                             onClick={() => handlePagination(inquiries.next_page_url)}
//                                             disabled={!inquiries.next_page_url}
//                                             className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium transition-colors ${inquiries.next_page_url
//                                                 ? 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
//                                                 : 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
//                                                 }`}
//                                         >
//                                             <span className="sr-only">Next</span>
//                                             <i className="fas fa-chevron-right" />
//                                         </button>
//                                     </nav>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </AppLayout>
//         </>
//     );
// }