import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { Calendar, User, ArrowRight, BookOpen, Clock, Sparkles, TrendingUp } from 'lucide-react';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await api.get('/articles');
            setArticles(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 sm:px-8">
            <div className="relative mb-24 overflow-hidden rounded-[4rem] bg-slate-900 px-8 py-20 text-center text-white shadow-3xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 space-y-6 animate-in fade-in slide-in-from-bottom duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-teal-300 font-black text-xs uppercase tracking-widest border border-white/10">
                        <Sparkles size={14} /> <span>Curated Insights</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                        Knowledge <br /><span className="text-teal-400 font-extrabold italic">Without Borders.</span>
                    </h1>
                    <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto py-4 leading-relaxed">
                        Dive into our collection of expert-written articles. No paywalls, no limits—just pure intellectual growth.
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="grid gap-12">
                    {[1, 2].map(n => (
                        <div key={n} className="h-80 bg-slate-100 rounded-[3rem] animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid gap-16 lg:grid-cols-12">
                    <div className="lg:col-span-8 space-y-16">
                        {articles.map((article) => (
                            <Link key={article.id} to={`/articles/${article.id}`} className="group relative bg-white p-10 md:p-14 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all duration-700 border border-slate-50 flex flex-col gap-8 no-underline">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-teal-600 font-black text-2xl group-hover:bg-teal-600 group-hover:text-white transition-all duration-500">
                                        {article.author?.charAt(0) || 'S'}
                                    </div>
                                    <div>
                                        <div className="text-slate-900 font-black text-lg">{article.author || 'Staff Writer'}</div>
                                        <div className="flex items-center gap-2 text-slate-400 font-bold text-sm tracking-tight capitalize">
                                            <Calendar size={14} /> {new Date(article.date_published || article.datePublished).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                            <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                                            <Clock size={14} /> 8 min read
                                        </div>
                                    </div>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition duration-500 hidden md:block">
                                        <TrendingUp className="text-teal-600" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight group-hover:text-teal-600 transition-colors duration-500">{article.title}</h2>
                                    <p className="text-slate-500 text-xl leading-relaxed line-clamp-4 font-medium italic">"{article.content}"</p>
                                </div>

                                <div className="pt-4 flex items-center justify-between">
                                    <span className="flex items-center gap-3 font-black text-teal-600 text-lg group-hover:gap-5 transition-all">
                                        Continue Reading <ArrowRight className="w-6 h-6 transform transition group-hover:translate-x-1" />
                                    </span>
                                    <div className="flex gap-2">
                                        {['Research', 'Technology'].map(tag => (
                                            <span key={tag} className="px-4 py-1.5 bg-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-teal-50 hover:text-teal-600 transition cursor-pointer">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {!loading && articles.length === 0 && (
                            <div className="p-20 text-center glass rounded-[3.5rem] border-2 border-dashed border-slate-200">
                                <BookOpen className="w-20 h-20 text-slate-200 mx-auto mb-6" />
                                <h3 className="text-3xl font-black text-slate-900">The library is currently silent.</h3>
                                <p className="text-slate-500 text-lg mt-2 font-medium">New insights are being drafted by our authors. Check back shortly.</p>
                            </div>
                        )}
                    </div>

                    {}
                    <div className="lg:col-span-4 space-y-12">
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-teal-50/50 border border-slate-50 space-y-8">
                            <h3 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-6">Trending Topics</h3>
                            <div className="flex flex-wrap gap-3">
                                {['Quantum Physics', 'Digital Ethics', 'Ancient History', 'AI Architecture', 'Modern Psychology', 'Micro-Economics'].map(topic => (
                                    <button key={topic} className="px-5 py-2.5 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-teal-600 hover:text-white transition-all shadow-sm">
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-teal-600 p-10 rounded-[2.5rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition duration-700"></div>
                            <h3 className="text-2xl font-black leading-tight relative z-10">Subscribe to our Weekly Digest</h3>
                            <p className="text-teal-100 font-medium relative z-10">Get the best articles delivered to your inbox every Friday.</p>
                            <div className="space-y-4 relative z-10 pt-2">
                                <input type="email" placeholder="email@address.com" className="w-full h-14 bg-teal-500/30 border border-teal-400 rounded-xl px-4 text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-white transition shadow-inner" />
                                <button className="w-full h-14 bg-white text-teal-600 rounded-xl font-black text-lg hover:bg-slate-50 transition active:scale-95 shadow-lg">Sign Up Free</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Articles;
