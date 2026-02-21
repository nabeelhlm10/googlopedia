import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Mail, Lock, Shield, ArrowRight, BookOpen, GraduationCap } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'USER' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/register', formData);
            login({ username: response.data.username, role: response.data.role }, response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Try a different username/email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
            {}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-100/30 rounded-full blur-[150px] mix-blend-multiply opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[150px] mix-blend-multiply opacity-60"></div>

            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-20 items-center relative z-10 py-20">
                <div className="hidden lg:flex flex-col space-y-16">
                    <div className="space-y-8">
                        <div className="w-20 h-20 bg-teal-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-teal-200 rotate-3">
                            <GraduationCap size={44} />
                        </div>
                        <h1 className="text-7xl font-black text-slate-900 tracking-tighter leading-[0.85]">
                            Begin Your <br /><span className="text-teal-600">Great Ascent.</span>
                        </h1>
                        <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-lg">
                            Knowledge is the only wealth that grows when shared. Join 12,000+ students on the quest for mastery.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        {[
                            { icon: <BookOpen />, label: "5K+ Books", desc: "Premium library" },
                            { icon: <Shield />, label: "Secure ID", desc: "Private encrypted data" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-teal-50 border border-slate-50 space-y-4">
                                <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-slate-900">{item.label}</div>
                                    <div className="text-slate-400 font-bold">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/90 backdrop-blur-3xl p-10 md:p-16 rounded-[4.5rem] shadow-3xl shadow-teal-100 border border-white relative w-full max-w-xl mx-auto flex flex-col items-center">
                    <div className="w-full space-y-10">
                        <div className="space-y-4 text-center lg:text-left">
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Create Identity.</h2>
                            <p className="text-lg text-slate-500 font-medium italic">
                                Already registered?{' '}
                                <Link to="/login" className="text-teal-600 font-black border-b-2 border-teal-100 hover:border-teal-600 transition">
                                    Sign In
                                </Link>
                            </p>
                        </div>

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2">Unique ID</label>
                                    <div className="relative h-14 bg-slate-100/80 rounded-2xl border-2 border-transparent group-focus-within:border-teal-600 transition-all flex items-center px-5 gap-3">
                                        <User className="text-slate-400 group-focus-within:text-teal-600 transition" size={18} />
                                        <input
                                            type="text" required
                                            className="bg-transparent w-full h-full font-bold text-slate-900 placeholder-slate-400 outline-none"
                                            placeholder="Username"
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2">Role Access</label>
                                    <div className="relative h-14 bg-slate-100/80 rounded-2xl border-2 border-transparent group-focus-within:border-teal-600 transition-all flex items-center px-5 pr-2 gap-3">
                                        <Shield className="text-slate-400 group-focus-within:text-teal-600 transition" size={18} />
                                        <select
                                            className="bg-transparent w-full h-full font-black text-slate-900 outline-none cursor-pointer"
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        >
                                            <option value="USER">Student</option>
                                            <option value="ADMIN">Administrator</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-span-2 space-y-2 group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2">Email Address</label>
                                    <div className="relative h-14 bg-slate-100/80 rounded-2xl border-2 border-transparent group-focus-within:border-teal-600 transition-all flex items-center px-5 gap-3">
                                        <Mail className="text-slate-400 group-focus-within:text-teal-600 transition" size={18} />
                                        <input
                                            type="email" required
                                            className="bg-transparent w-full h-full font-bold text-slate-900 placeholder-slate-400 outline-none"
                                            placeholder="you@university.edu"
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-2 space-y-2 group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2">Secure Key</label>
                                    <div className="relative h-14 bg-slate-100/80 rounded-2xl border-2 border-transparent group-focus-within:border-teal-600 transition-all flex items-center px-5 gap-3">
                                        <Lock className="text-slate-400 group-focus-within:text-teal-600 transition" size={18} />
                                        <input
                                            type="password" required
                                            className="bg-transparent w-full h-full font-bold text-slate-900 placeholder-slate-400 outline-none"
                                            placeholder="••••••••••••"
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {error && <p className="text-rose-500 font-bold text-sm bg-rose-50 p-4 rounded-xl border border-rose-100 animate-shake">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`group h-20 w-full flex items-center justify-center gap-4 bg-teal-600 text-white rounded-3xl font-black text-xl transition-all shadow-2xl shadow-teal-100 active:scale-95 ${loading ? 'opacity-50 grayscale' : 'hover:bg-teal-700 hover:shadow-teal-300'}`}
                            >
                                {loading ? 'Processing...' : 'Secure Identity'}
                                <ArrowRight className="group-hover:translate-x-1 transition" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
