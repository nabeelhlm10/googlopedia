import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import {
    ShoppingCart,
    ArrowLeft,
    Star,
    ShieldCheck,
    Zap,
    Package,
    Heart,
    Share2,
    CheckCircle2,
    BookOpen
} from 'lucide-react';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchBook();
    }, [id]);

    const fetchBook = async () => {
        try {
            const response = await api.get(`/books/${id}`);
            setBook(response.data);
        } catch (err) {
            console.error(err);
            navigate('/books');
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async () => {
        setAddingToCart(true);
        try {
            await api.post(`/cart/add?bookId=${id}&quantity=${quantity}`);
            setTimeout(() => setAddingToCart(false), 1500);
        } catch (err) {
            console.error(err);
            setAddingToCart(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="w-16 h-16 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
        </div>
    );

    if (!book) return null;

    return (
        <div className="pt-32 pb-32 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                {}
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-3 text-slate-400 font-black text-sm uppercase tracking-widest mb-12 hover:text-teal-600 transition"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition" />
                    <span>Back to Collection</span>
                </button>

                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    {}
                    <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
                        <div className="relative group perspective-1000">
                            <div className="aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-3xl shadow-teal-900/10 rotate-y-[-5deg] group-hover:rotate-y-0 transition-transform duration-1000">
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://images.unsplash.com/photo-1543005120-a1bb3ea4d28e?auto=format&fit=crop&q=80&w=600';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center text-teal-600 shadow-xl hover:scale-110 transition cursor-pointer">
                                    <Heart size={24} />
                                </div>
                            </div>
                            {}
                            <div className="absolute -bottom-10 -right-10 w-full h-full bg-teal-600/5 rounded-[4rem] -z-10 blur-3xl"></div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="aspect-square rounded-3xl bg-white border border-slate-100 p-2 overflow-hidden hover:border-teal-200 transition cursor-pointer">
                                    <img src={book.imageUrl} className="w-full h-full object-cover rounded-2xl opacity-40 hover:opacity-100 transition" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
                                    In Stock & Ready
                                </div>
                                <div className="flex items-center gap-1 text-amber-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                    <span className="text-slate-400 font-bold ml-2">4.9 (124 reviews)</span>
                                </div>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter">
                                {book.title}<span className="text-teal-600">.</span>
                            </h1>
                            <p className="text-2xl text-slate-400 font-black italic tracking-tight">— {book.author}</p>
                        </div>

                        <div className="h-px bg-slate-100 w-full"></div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <BookOpen className="text-teal-600" size={24} /> Abstract
                            </h3>
                            <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                {book.description || "A revolutionary volume that explores deep concepts through an immersive narrative. Perfect for students and professionals seeking intellectual growth and mastery."}
                            </p>
                        </div>

                        {}
                        <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl shadow-teal-900/5 border border-white space-y-10">
                            <div className="flex flex-wrap items-center justify-between gap-8">
                                <div className="space-y-1">
                                    <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Market Value</p>
                                    <div className="text-6xl font-black text-slate-900 tracking-tighter">₹{book.price}</div>
                                </div>
                                <div className="flex items-center bg-slate-50 rounded-2xl p-2 gap-4 h-16 border border-slate-100">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:bg-white rounded-xl transition"
                                    >
                                        -
                                    </button>
                                    <span className="text-xl font-black text-slate-900 px-4">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:bg-white rounded-xl transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <button
                                    onClick={addToCart}
                                    disabled={addingToCart}
                                    className={`h-20 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95 ${addingToCart
                                        ? 'bg-emerald-500 text-white shadow-emerald-200'
                                        : 'bg-teal-600 text-white hover:bg-teal-700 shadow-teal-100'
                                        }`}
                                >
                                    {addingToCart ? (
                                        <><CheckCircle2 /> Adding...</>
                                    ) : (
                                        <><ShoppingCart /> Acquire Now</>
                                    )}
                                </button>
                                <button className="h-20 bg-slate-900 text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 hover:bg-black transition shadow-xl active:scale-95">
                                    <Share2 /> Share Discovery
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                                    <ShieldCheck size={18} className="text-teal-500" /> Secure Payment
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                                    <Zap size={18} className="text-teal-500" /> Instant Access
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                                    <Package size={18} className="text-teal-500" /> Global Delivery
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
