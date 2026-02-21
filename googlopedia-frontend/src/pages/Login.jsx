import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { LogIn, User, Lock, ArrowRight, ShieldCheck, Sparkles, LogOut } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/login', formData);
            login({ username: response.data.username, role: response.data.role }, response.data.token);
            navigate('/');
        } catch (err) {
            setError('Our systems could not verify these credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
            {}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-[120px] mix-blend-multiply animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[120px] mix-blend-multiply animate-pulse delay-700"></div>

            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10 py-20">
                <div className="hidden lg:flex flex-col space-y-12">
                    <div className="space-y-6">
                        <div className="w-20 h-20 bg-teal-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-teal-200">
                            <Sparkles size={40} />
                        </div>
                        <h1 className="text-7xl font-black text-slate-900 leading-tight tracking-tighter">
                            Welcome <br /> <span className="text-teal-600 italic">Back.</span>
                        </h1>
                        <p className="text-2xl text-slate-500 font-medium max-w-lg leading-relaxed">
                            Your personal library of knowledge is waiting for its next chapter.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-teal-600 border border-slate-50">
                                <ShieldCheck size={28} />
                            </div>
                            <div>
                                <div className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">Secure Sign-in</div>
                                <div className="text-slate-400 font-bold">Encrypted multi-role access</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-emerald-600 border border-slate-50">
                                <LogOut size={28} className="rotate-180" />
                            </div>
                            <div>
                                <div className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">Instant Session</div>
                                <div className="text-slate-400 font-bold">Pick up right where you left off</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] shadow-3xl shadow-teal-100 border border-white relative group overflow-hidden max-w-xl mx-auto lg:mx-0 w-full">
                    <div className="absolute top-0 right-0 p-12 text-teal-50/50 group-hover:scale-110 transition duration-700 pointer-events-none">
                        <LogIn size={200} />
                    </div>

                    <div className="relative z-10 space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Login.</h2>
                            <p className="text-lg text-slate-500 font-medium italic">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-teal-600 font-black border-b-2 border-teal-100 hover:border-teal-600 transition">
                                    Create Account
                                </Link>
                            </p>
                        </div>

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div className="space-y-2 group">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Username</label>
                                    <div className="relative h-16 bg-slate-100 rounded-2xl border-2 border-transparent group-focus-within:border-teal-600 transition-all overflow-hidden flex items-center px-6 gap-4">
                                        <User className="text-slate-400 group-focus-within:text-teal-600 transition" size={20} />
                                        <input
                                            type="text"
                                            required
                                            className="bg-transparent w-full h-full font-bold text-slate-900 placeholder-slate-400 outline-none text-lg"
                                            placeholder="Your unique ID"
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Password</label>
                                    <div className="relative h-16 bg-slate-100 rounded-2xl border-2 border-transparent group-focus-within:border-teal-600 transition-all overflow-hidden flex items-center px-6 gap-4">
                                        <Lock className="text-slate-400 group-focus-within:text-teal-600 transition" size={20} />
                                        <input
                                            type="password"
                                            required
                                            className="bg-transparent w-full h-full font-bold text-slate-900 placeholder-slate-400 outline-none text-lg"
                                            placeholder="••••••••"
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {error && <p className="text-rose-500 font-bold text-sm bg-rose-50 p-4 rounded-xl text-center border border-rose-100 animate-shake">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`group h-20 w-full flex items-center justify-center gap-4 bg-teal-600 text-white rounded-[1.5rem] font-black text-xl transition-all shadow-2xl shadow-teal-100 active:scale-95 ${loading ? 'opacity-50 grayscale' : 'hover:bg-teal-700'}`}
                            >
                                {loading ? 'Authenticating...' : 'Sign In Now'}
                                <ArrowRight className="group-hover:translate-x-1 transition" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
