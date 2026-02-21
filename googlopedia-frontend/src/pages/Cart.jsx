import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, CreditCard, ShieldCheck, Ticket, PackageCheck, Zap } from 'lucide-react';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await api.get('/cart');
            setItems(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id) => {
        try {
            await api.delete(`/cart/${id}`);
            fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            await api.post('/orders/place');
            alert('Order successfully placed! Welcome to the family.');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Checkout failed. Please try again.');
        }
    };

    const total = items.reduce((acc, item) => acc + item.book.price * item.quantity, 0);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-teal-50 border-t-teal-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="space-y-4">
                    <div className="text-teal-600 font-black text-sm uppercase tracking-widest flex items-center gap-2">
                        <ShoppingBag size={18} /> YOUR SELECTION
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">My <span className="text-teal-600">Cart.</span></h1>
                    <p className="text-slate-500 text-xl font-medium">Review your items before starting your next reading chapter.</p>
                </div>
                <div className="flex items-center gap-4 text-slate-400 font-black text-lg">
                    <span className="text-teal-600">{items.length}</span> Items
                    <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                    <span>Free Express Delivery</span>
                </div>
            </div>

            {items.length === 0 ? (
                <div className="text-center py-40 glass rounded-[4rem] border-2 border-dashed border-slate-100">
                    <div className="bg-slate-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-10 text-slate-200">
                        <ShoppingBag size={64} />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-4">Your basket is floating... empty.</h2>
                    <p className="text-slate-500 text-xl mb-12 max-w-md mx-auto font-medium">Add some world-changing knowledge to your collection to get started.</p>
                    <Link to="/books" className="group h-16 px-10 bg-teal-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-teal-700 transition shadow-2xl hover:scale-105 active:scale-95 mx-auto w-fit">
                        Start Exploring <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition" />
                    </Link>
                </div>
            ) : (
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-8 space-y-8">
                        {items.map((item) => (
                            <div key={item.id} className="group bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-50 flex gap-10 items-center animate-in slide-in-from-left duration-700">
                                <div className="relative w-32 h-44 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                    <img
                                        src={item.book.imageUrl || 'https://images.unsplash.com/photo-1543005120-a1bb3ea4d28e?auto=format&fit=crop&q=80&w=200'}
                                        alt={item.book.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 line-clamp-1 group-hover:text-teal-600 transition">{item.book.title}</h3>
                                        <p className="text-slate-400 font-bold tracking-tight">{item.book.author}</p>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center bg-slate-50 rounded-xl p-1 px-4 h-12 gap-6 border border-slate-100">
                                            <span className="text-slate-400 hover:text-teal-600 cursor-pointer transition"><Minus size={14} /></span>
                                            <span className="text-lg font-black text-slate-900">{item.quantity}</span>
                                            <span className="text-slate-400 hover:text-teal-600 cursor-pointer transition"><Plus size={14} /></span>
                                        </div>
                                        <div className="h-8 w-px bg-slate-100"></div>
                                        <div className="text-2xl font-black text-teal-600">₹{item.book.price}</div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-6 h-full justify-between py-2">
                                    <div className="text-2xl font-black text-slate-900">₹{item.book.price * item.quantity}</div>
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-300 hover:bg-rose-50 hover:text-rose-500 transition-all flex items-center justify-center shadow-inner"
                                    >
                                        <Trash2 size={24} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-4 lg:sticky lg:top-32">
                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-3xl space-y-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                                <CreditCard size={200} />
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-3xl font-black tracking-tight leading-tight">Order Summary</h2>
                                <div className="space-y-5 relative z-10">
                                    <div className="flex justify-between items-center text-slate-400 font-medium pb-2 border-b border-white/5">
                                        <span>Cart Subtotal</span>
                                        <span className="text-white font-black text-xl">₹{total}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-400 font-medium pb-2 border-b border-white/5">
                                        <span>Shipping Fee</span>
                                        <div className="flex items-center gap-2 text-emerald-400 font-black">
                                            <Zap size={14} /> <span>FREE</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-400 font-medium">
                                        <span>Tax Estimate (0%)</span>
                                        <span className="text-white font-black">₹0</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 relative z-10">
                                <div className="text-slate-400 font-black uppercase tracking-widest text-xs">Final Total</div>
                                <div className="text-5xl font-black text-white tracking-tighter">₹{total}</div>
                            </div>

                            <div className="space-y-4 pt-4 relative z-10">
                                <button
                                    onClick={handlePlaceOrder}
                                    className="w-full h-18 bg-teal-500 hover:bg-teal-400 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95"
                                >
                                    Checkout Now <CreditCard className="w-6 h-6" />
                                </button>
                                <div className="flex items-center justify-center gap-3 text-slate-500 font-bold text-sm">
                                    <ShieldCheck size={18} /> 128-bit Encrypted Checkout
                                </div>
                            </div>

                            <div className="space-y-4 pt-10 border-t border-white/5 relative z-10">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition cursor-pointer">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-teal-400"><Ticket size={24} /></div>
                                    <span className="font-bold text-slate-200">Apply Promo Code</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-8 bg-teal-50 rounded-[2rem] flex items-center gap-6 border border-teal-100/50">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm"><PackageCheck size={28} /></div>
                            <div>
                                <div className="font-black text-slate-900 leading-tight">60-Day Returns</div>
                                <p className="text-sm text-slate-500 font-medium">Risk-free knowledge acquisition.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
