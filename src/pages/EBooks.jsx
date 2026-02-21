import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { ExternalLink, BookOpen, Search, Download, Sparkles } from 'lucide-react';

const EBooks = () => {
    const [ebooks, setEbooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchEBooks();
    }, []);

    const fetchEBooks = async () => {
        try {
            const response = await api.get('/ebooks');
            setEbooks(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredEbooks = ebooks.filter(ebb =>
        ebb.title.toLowerCase().includes(search.toLowerCase()) ||
        ebb.author.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
                        <Download size={14} /> <span>Open Source Knowledge</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                        Digital <span className="text-teal-600">E-Books.</span>
                    </h1>
                    <p className="text-slate-500 text-2xl max-w-2xl font-medium leading-relaxed">
                        Access a hand-picked selection of the world's most influential technical literature, available instantly via external links.
                    </p>
                </div>

                <div className="w-full md:w-96 group">
                    <div className="relative glass rounded-[2rem] shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-slate-100">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-teal-600 transition" />
                        <input
                            type="text"
                            placeholder="Find your next read..."
                            className="w-full pl-16 pr-8 py-6 bg-transparent font-bold text-slate-900 placeholder-slate-400 outline-none rounded-[2rem]"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[1, 2, 3].map(n => (
                        <div key={n} className="h-[500px] bg-slate-100 rounded-[3.5rem] animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredEbooks.map((ebook) => (
                        <div key={ebook.id} className="group relative bg-white rounded-[3.5rem] p-8 shadow-sm hover:shadow-3xl hover:shadow-teal-900/10 transition-all duration-700 border border-slate-50 flex flex-col hover:-translate-y-4">
                            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 shadow-inner bg-slate-50">
                                <img
                                    src={ebook.coverUrl}
                                    alt={ebook.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://images.unsplash.com/photo-1543003919-a995d52549ad?auto=format&fit=crop&q=80&w=300';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-8">
                                    <a
                                        href={ebook.externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-white py-4 rounded-2xl text-slate-900 font-black flex items-center justify-center gap-3 hover:bg-teal-50 transition active:scale-95 translate-y-4 group-hover:translate-y-0 duration-500"
                                    >
                                        Read External <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-4 flex-1 flex flex-col">
                                <div className="flex justify-between items-start gap-4">
                                    <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-teal-600 transition">{ebook.title}</h3>
                                    <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
                                        <BookOpen size={20} />
                                    </div>
                                </div>
                                <p className="text-slate-400 font-bold text-sm tracking-tight uppercase">{ebook.author}</p>
                                <p className="text-slate-600 font-medium line-clamp-3 leading-relaxed flex-1">
                                    {ebook.description}
                                </p>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                                <span className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-widest">Digital Resource</span>
                                <a
                                    href={ebook.externalLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-600 font-black flex items-center gap-2 group/btn"
                                >
                                    Visit Source <Sparkles size={16} className="group-hover/btn:rotate-12 transition" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && filteredEbooks.length === 0 && (
                <div className="text-center py-40 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
                    <h2 className="text-3xl font-black text-slate-400">The library is quiet...</h2>
                    <p className="text-slate-400 font-bold mt-2">Try a different search term.</p>
                </div>
            )}
        </div>
    );
};

export default EBooks;
