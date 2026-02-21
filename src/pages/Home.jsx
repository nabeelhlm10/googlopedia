import React from 'react';
import { Link } from 'react-router-dom';
import { Book, FileText, ArrowRight, Zap, Shield, Rocket, Sparkles, Globe, Heart } from 'lucide-react';

const Home = () => {
    return (
        <div className="space-y-32 pb-32 overflow-hidden">
            {}
            <section className="relative min-h-[90vh] flex items-center pt-32 px-4">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-100 rounded-full blur-[120px] opacity-60 animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100 rounded-full blur-[120px] opacity-60 animate-pulse delay-1000"></div>
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-100 rounded-full text-teal-600 font-bold text-sm tracking-wide animate-bounce">
                                <Sparkles size={16} /> <span>THE ULTIMATE LEARNING HUB</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                                Expand Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-400">Horizon.</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-600 max-w-xl leading-relaxed">
                                Unlock a world of premium books and insightful articles. Googlopedia is the modern sanctuary for students and lifelong learners.
                            </p>

                            <div className="flex flex-wrap gap-6 pt-4">
                                <Link to="/books" className="group h-16 px-10 bg-teal-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-teal-700 transition-all shadow-2xl shadow-teal-200 hover:scale-105 active:scale-95 text-lg">
                                    Explore Books <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition" />
                                </Link>
                                <Link to="/articles" className="h-16 px-10 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold flex items-center justify-center hover:bg-slate-50 transition-all text-lg shadow-sm">
                                    Read Articles
                                </Link>
                            </div>

                            <div className="flex items-center gap-8 pt-6 border-t border-slate-100">
                                <div>
                                    <div className="text-3xl font-black text-slate-900">12K+</div>
                                    <div className="text-slate-500 font-medium">Active Students</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-slate-900">4.9/5</div>
                                    <div className="text-slate-500 font-medium">User Rating</div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 relative hidden lg:block">
                            <div className="relative z-10 w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition duration-700 group">
                                <img
                                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1000"
                                    alt="Library"
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                <div className="absolute bottom-10 left-10 text-white">
                                    <div className="text-2xl font-bold">Curated for Excellence</div>
                                    <div className="text-slate-200">Only the best resources for you.</div>
                                </div>
                            </div>
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500 rounded-full flex items-center justify-center text-white scale-75 animate-pulse">
                                <Heart size={48} fill="currentColor" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 px-6 py-4 bg-white rounded-2xl shadow-xl flex items-center gap-4 border border-slate-50 animate-float">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                                    <Rocket />
                                </div>
                                <div>
                                    <div className="font-bold">Fast Delivery</div>
                                    <div className="text-sm text-gray-500 text-xs">Instant access</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {}
            <section className="bg-slate-900 py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="grid grid-cols-6 gap-8 h-full">
                        {[...Array(24)].map((_, i) => <div key={i} className="border-r border-slate-100 h-full"></div>)}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-4 gap-12 text-center text-white">
                        {[
                            { label: "Total Books", value: "5,000+" },
                            { label: "Free Articles", value: "1,200+" },
                            { label: "Daily Readers", value: "800+" },
                            { label: "Success Rate", value: "99%" }
                        ].map((stat, i) => (
                            <div key={i} className="space-y-2">
                                <div className="text-5xl font-black text-teal-400">{stat.value}</div>
                                <div className="text-slate-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {}
            <section className="max-w-7xl mx-auto px-4">
                <div className="text-center space-y-4 mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Redefining Your <br /><span className="text-teal-600">Reading Experience</span></h2>
                    <p className="text-slate-500 text-xl max-w-2xl mx-auto">We don't just provide content; we provide clarity and growth through curated knowledge.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Zap size={32} />,
                            title: "Smart Recommendations",
                            desc: "Our engine learns your tastes and suggests articles that actually matter to your goals.",
                            color: "bg-amber-50 text-amber-600"
                        },
                        {
                            icon: <Globe size={32} />,
                            title: "Global Community",
                            desc: "Join thousands of students sharing insights and growing together in a shared space.",
                            color: "bg-teal-50 text-teal-600"
                        },
                        {
                            icon: <Shield size={32} />,
                            title: "Trusted Sources",
                            desc: "Every article and book is verified for quality and academic relevance.",
                            color: "bg-emerald-50 text-emerald-600"
                        }
                    ].map((item, i) => (
                        <div key={i} className="group p-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-teal-100 transition-all duration-500 hover:-translate-y-2">
                            <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition duration-500`}>
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-slate-900 leading-tight">{item.title}</h3>
                            <p className="text-slate-500 text-lg leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {}
            <section className="max-w-7xl mx-auto px-4">
                <div className="bg-teal-600 rounded-[3.5rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-3xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-900/40 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Ready to Master <br />Your Next Subject?</h2>
                        <p className="text-teal-100 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">Join Googlopedia today and gain access to the tools you need to succeed in your academic journey.</p>
                        <div className="pt-6">
                            <Link to="/register" className="bg-white text-teal-600 px-12 py-5 rounded-2xl font-black text-xl hover:bg-teal-50 transition shadow-xl inline-block hover:scale-105 active:scale-95">
                                Start Your Journey Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
