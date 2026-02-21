import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import {
    Search,
    ShoppingCart,
    ArrowRight,
    Filter,
    Star,
    Book,
    Sparkles,
    CheckCircle2
} from 'lucide-react';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async (title = '') => {
        setLoading(true);
        try {
            const url = title ? `/books?title=${title}` : '/books';
            const response = await api.get(url);
            setBooks(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchBooks(searchTerm);
    };

    const addToCart = async (bookId) => {
        setAddingToCart(bookId);
        try {
            await api.post(`/cart/add?bookId=${bookId}&quantity=1`);
            
            setTimeout(() => setAddingToCart(null), 1000);
        } catch (err) {
            console.error(err);
            setAddingToCart(null);
        }
    };

    return (
        <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 sm:px-8">
            {}
            <div className="relative mb-20 overflow-hidden rounded-[4rem] bg-slate-900 px-8 py-20 text-center text-white shadow-3xl">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="grid grid-cols-12 gap-4 h-full">
                        {[...Array(12)].map((_, i) => <div key={i} className="border-r border-white h-full"></div>)}
                    </div>
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 font-black text-xs uppercase tracking-widest">
                        <Sparkles size={14} /> <span>Curated Collection</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                        The Archive of <br /><span className="text-teal-400 italic">Excellence.</span>
                    </h1>
                    <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto py-4 leading-relaxed">
                        Discover 5,000+ premium volumes handpicked for the modern scholar. Your next breakthrough starts here.
                    </p>
                </div>

                {}
                <form onSubmit={handleSearch} className="relative z-20 max-w-2xl mx-auto mt-12">
                    <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-400 transition" size={24} />
                        <input
                            type="text"
                            placeholder="Search the archive..."
                            className="w-full h-20 pl-16 pr-32 bg-white rounded-[2rem] text-slate-900 font-bold text-xl outline-none focus:ring-4 focus:ring-teal-500/10 transition shadow-2xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-3 h-14 px-8 bg-teal-600 text-white rounded-2xl font-black hover:bg-teal-700 transition"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {}
            <div className="flex flex-wrap items-center justify-between mb-12 gap-6">
                <div className="flex gap-4 overflow-auto pb-2 scrollbar-none">
                    {['All Genres', 'Technology', 'Science', 'History', 'Philosophy'].map((cat, i) => (
                        <button key={i} className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${i === 0 ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                            }`}>
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-4 text-slate-400 font-bold">
                    <Filter size={18} /> <span>Showing {books.length} results</span>
                </div>
            </div>

            {}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {[1, 2, 3, 4].map(n => (
                        <div key={n} className="h-[500px] bg-slate-100 rounded-[3rem] animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {books.map((book) => (
                        <div key={book.id} className="group bg-white p-6 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-700 border border-slate-50 flex flex-col items-center text-center">
                            <Link to={`/books/${book.id}`} className="relative w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl group-hover:scale-105 transition-transform duration-700">
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://images.unsplash.com/photo-1543005120-a1bb3ea4d28e?auto=format&fit=crop&q=80&w=400';
                                    }}
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl font-black text-slate-900 text-xs shadow-lg">
                                    ₹{book.price}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                                    <span className="bg-white text-teal-600 px-6 py-3 rounded-2xl font-black shadow-xl">Quick View</span>
                                </div>
                            </Link>

                            <div className="space-y-2 flex-grow">
                                <h3 className="text-2xl font-black text-slate-900 line-clamp-1 group-hover:text-teal-600 transition">{book.title}</h3>
                                <p className="text-slate-400 font-bold tracking-tight mb-4">{book.author}</p>
                                <div className="flex items-center justify-center gap-1 text-amber-400 mb-6">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                    <span className="text-slate-300 ml-1 text-xs">(4.9)</span>
                                </div>
                            </div>

                            <button
                                onClick={() => addToCart(book.id)}
                                disabled={addingToCart === book.id}
                                className={`w-full h-16 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 ${addingToCart === book.id
                                    ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-100'
                                    : 'bg-slate-100 text-slate-900 hover:bg-teal-600 hover:text-white shadow-lg shadow-transparent hover:shadow-teal-100'
                                    }`}
                            >
                                {addingToCart === book.id ? (
                                    <><CheckCircle2 size={20} /> In Cart</>
                                ) : (
                                    <><ShoppingCart size={20} /> Add to Cart</>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {!loading && books.length === 0 && (
                <div className="py-32 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-100">
                    <Book className="w-20 h-20 text-slate-100 mx-auto mb-8" />
                    <h2 className="text-3xl font-black text-slate-900">No volumes found in current index.</h2>
                    <p className="text-slate-500 text-xl mt-4 font-medium">Try refining your search or explore our core collection.</p>
                </div>
            )}
        </div>
    );
};

export default Books;
