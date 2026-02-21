import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import {
    Calendar,
    User,
    Clock,
    ArrowLeft,
    Share2,
    Bookmark,
    Sparkles,
    Quote,
    Award
} from 'lucide-react';

const ArticleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            const response = await api.get(`/articles/${id}`);
            setArticle(response.data);
        } catch (err) {
            console.error(err);
            navigate('/articles');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="w-16 h-16 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
        </div>
    );

    if (!article) return null;

    return (
        <div className="pt-32 pb-40 bg-slate-50 min-h-screen selection:bg-teal-100 selection:text-teal-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-8">
                {}
                <div className="flex items-center justify-between mb-16">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-3 text-slate-400 font-black text-sm uppercase tracking-widest hover:text-teal-600 transition"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition" /> <span>The Archive</span>
                    </button>
                    <div className="flex gap-4">
                        <button className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-teal-600 transition shadow-sm">
                            <Bookmark size={20} />
                        </button>
                        <button className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-teal-600 transition shadow-sm">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {}
                <header className="space-y-10 mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-100 rounded-full text-teal-600 font-black text-xs uppercase tracking-widest">
                        <Sparkles size={14} /> <span>Scientific Discovery</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter">
                        {article.title}<span className="text-teal-600">.</span>
                    </h1>

                    <div className="flex flex-wrap items-center gap-8 py-8 border-y border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-slate-900 rounded-[1.25rem] flex items-center justify-center text-teal-400 font-black text-xl shadow-xl">
                                {article.author?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <div className="text-slate-900 font-black text-lg">{article.author || 'Senior Fellow'}</div>
                                <div className="text-slate-400 font-bold text-sm tracking-tight">Academic Contributor</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 ml-auto">
                            <div className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest">
                                <Calendar size={16} className="text-teal-500" />
                                {new Date(article.date_published || article.datePublished).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                            <div className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest">
                                <Clock size={16} className="text-teal-500" /> 12 MIN READ
                            </div>
                        </div>
                    </div>
                </header>

                {}
                <article className="relative">
                    <div className="absolute -left-16 top-0 hidden xl:block text-teal-100">
                        <Quote size={80} fill="currentColor" />
                    </div>

                    <div className="prose prose-2xl prose-slate max-w-none">
                        <p className="text-3xl font-black text-slate-900 leading-tight mb-12 first-letter:text-7xl first-letter:font-black first-letter:text-teal-600 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.85]">
                            {article.content?.substring(0, 150)}...
                        </p>

                        <div className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium space-y-10 italic">
                            {article.content}
                        </div>

                        <div className="my-16 p-10 bg-slate-900 rounded-[3rem] text-white space-y-6 shadow-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <Award size={120} />
                            </div>
                            <h3 className="text-3xl font-black tracking-tight relative z-10">Key Takeaway</h3>
                            <p className="text-slate-400 text-xl font-medium relative z-10">
                                This research emphasizes the convergence of innovation and ethics in the modern digital landscape. Understanding these dynamics is crucial for any aspiring scholar.
                            </p>
                        </div>

                        <div className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
                            The collective efforts of interdisciplinary teams are reshaping our world. As we look forward to 2026 and beyond, the integration of these principles will define the standard of excellence.
                        </div>
                    </div>
                </article>

                {}
                <div className="mt-32 pt-20 border-t border-slate-100">
                    <div className="bg-teal-600 rounded-[3.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-3xl">
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-4xl font-black tracking-tight">Expand Your Knowledge Base</h3>
                            <p className="text-teal-100 text-xl font-medium max-w-xl mx-auto">Discover more insights and research articles in our extensive digital archive.</p>
                            <Link to="/articles" className="inline-block bg-white text-teal-600 px-10 py-5 rounded-2xl font-black text-xl hover:bg-teal-50 transition shadow-xl active:scale-95 mt-4">
                                Explore Further
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetails;
