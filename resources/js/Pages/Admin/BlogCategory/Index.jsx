import React, { useState, useRef, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Toast } from 'primereact/toast';
import AppLayout from '../Layouts/AppLayout';

const Index = () => {
    const { categories, flash, errors } = usePage().props; // grab Inertia errors
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const toast = useRef(null);

    // Flash messages
    useEffect(() => {
        if (flash?.success) {
             toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: flash.success,
                life: 3000,
                className: 'bg-green-500 text-white font-bold border-l-4 border-green-700 px-4 py-2 rounded shadow-lg',
            });
        }
        if (errors?.category_name) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: errors.category_name,
                life: 4000,
                className: 'bg-red-500 text-white font-bold border-l-4 border-red-700 px-4 py-2 rounded shadow-lg',
            });
        }
    }, [flash, errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
               toast.current.show({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Category name cannot be empty!',
                life: 3000,
                className: 'bg-orange-500 text-white font-bold border-l-4 border-orange-700 px-4 py-2 rounded shadow-lg',
            });
            return;
        }

        router.post('/categories', { category_name: categoryName }, {
            onError: (err) => {
                if (err.category_name) {
                     toast.current.show({
                        severity: 'error',
                        summary: 'Duplicate Error',
                        detail: err.category_name,
                        life: 3000,
                        className: 'bg-red-500 text-white font-bold border-l-4 border-red-700 px-4 py-2 rounded shadow-lg',
                    });
                }
            }
        });

        setCategoryName('');
    };

    const handleEdit = (category) => {
        setEditId(category.id);
        setEditValue(category.category_name);
    };

    const handleCancel = () => {
        setEditId(null);
        setEditValue('');
    };

    const handleUpdate = (id) => {
        if (!editValue.trim()) {
           toast.current.show({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Category name cannot be empty!',
                life: 3000,
                className: 'bg-orange-500 text-white font-bold border-l-4 border-orange-700 px-4 py-2 rounded shadow-lg',
            });
            return;
        }

        router.put(`/categories/${id}`, { category_name: editValue }, {
            onError: (err) => {
                if (err.category_name) {
                     toast.current.show({
                        severity: 'error',
                        summary: 'Duplicate Error',
                        detail: err.category_name,
                        life: 4000,
                        className: 'bg-red-500 text-white font-bold border-l-4 border-red-700 px-4 py-2 rounded shadow-lg',
                    });
                }
            }
        });

        setEditId(null);
        setEditValue('');
    };

    const handleDelete = (category) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(`/categories/${category.id}`);
        }
    };
 
    return (
        <>
            <h1 className="text-gray-800 dark:text-white mb-5 text-2xl font-bold">
                Blog Categories
            </h1>
             <Toast ref={toast}  position="top-right" />
            {/* Add new category */}
            <form className="flex gap-2 mb-5" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Category Name"
                    className="flex-1 p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-black"
                />
                <button
                    type="submit"
                    className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700"
                >
                    Add
                </button>
            </form>

            {/* Table */}
            <div className="overflow-x-auto rounded shadow-lg">
                <table className="w-full border-collapse text-gray-800 dark:text-white">
                    <thead>
                        <tr className="bg-white dark:bg-gray-800">
                            <th className="border dark:border-gray-600 px-4 py-2">ID</th>
                            <th className="border dark:border-gray-600 px-4 py-2">Category Name</th>
                            <th className="border dark:border-gray-600 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <tr
                                    key={category.id}
                                    className={index % 2 === 0
                                        ? 'bg-white dark:bg-gray-100'
                                        : 'bg-gray-100 dark:bg-gray-800'}
                                >
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">
                                        {editId === category.id ? (
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="w-full p-1 rounded border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            />
                                        ) : (
                                            category.category_name
                                        )}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {editId === category.id ? (
                                            <>
                                                <button
                                                    onClick={() => handleUpdate(category.id)}
                                                    className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="mr-2 px-2 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category)}
                                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default function Ind() {
    return (
        <AppLayout>
            <Index />
        </AppLayout>
    );
}
