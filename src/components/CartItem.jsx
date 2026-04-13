import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, updateQuantity, removeItem }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b border-gray-200 bg-white p-4 rounded-lg shadow-sm mb-4">
            <Link to={`/product/${item.id}`} className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-center object-cover" />
            </Link>

            <div className="flex-1 flex flex-col justify-between w-full">
                <div>
                    <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                            <Link to={`/product/${item.id}`} className="hover:text-brand-600">{item.name}</Link>
                        </h3>
                        <p className="ml-4 text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                </div>

                <div className="flex flex-1 items-end justify-between text-sm mt-4 sm:mt-0">
                    <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 px-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 font-medium text-gray-900">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 text-gray-600 hover:bg-gray-50"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex">
                        <button
                            onClick={() => removeItem(item.id)}
                            className="font-medium text-red-600 hover:text-red-500 flex items-center"
                        >
                            <Trash2 className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">Remove</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
