import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit, Trash2, LogOut } from 'lucide-react';
import ItemModal from './ItemModal';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await axios.get('/api/items');
            setItems(res.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (itemData) => {
        try {
            if (currentItem) {
                await axios.put(`/api/items/${currentItem.id}`, itemData);
            } else {
                await axios.post('/api/items', itemData);
            }
            fetchItems();
            setIsModalOpen(false);
            setCurrentItem(null);
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`/api/items/${id}`);
                fetchItems();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const openModal = (item = null) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    const totalValue = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const lowStockCount = items.filter(item => item.status === 'Low Stock').length;

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-blue-600">InventoryPro</h1>
                </div>
                <nav className="mt-6">
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 bg-blue-50 text-blue-700 border-r-4 border-blue-700">
                        Dashboard
                    </a>
                </nav>
                <div className="absolute bottom-0 w-64 p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            {user?.username[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-semibold">{user?.username}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                    <button onClick={logout} className="flex items-center gap-2 text-red-500 hover:text-red-700 w-full">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium">Total Items</h3>
                        <p className="text-3xl font-bold text-gray-800">{items.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium">Total Value</h3>
                        <p className="text-3xl font-bold text-gray-800">${totalValue.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium">Low Stock Items</h3>
                        <p className="text-3xl font-bold text-orange-500">{lowStockCount}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Inventory Items</h2>
                        <button
                            onClick={() => openModal()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                        >
                            <Plus size={18} /> Add Item
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600">Category</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600">Quantity</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600">Price</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                                        <td className="p-4 text-gray-800 font-medium">{item.name}</td>
                                        <td className="p-4 text-gray-600">{item.category}</td>
                                        <td className="p-4 text-gray-600">{item.quantity}</td>
                                        <td className="p-4 text-gray-600">${item.price}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                                                    item.status === 'Low Stock' ? 'bg-orange-100 text-orange-800' :
                                                        'bg-red-100 text-red-800'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4 flex gap-2">
                                            <button onClick={() => openModal(item)} className="text-blue-500 hover:text-blue-700">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {items.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-500">
                                            No items found. Add one to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                item={currentItem}
            />
        </div>
    );
};

export default Dashboard;
