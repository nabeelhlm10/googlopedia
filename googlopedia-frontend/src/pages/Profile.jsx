import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { User, Mail, Save, Shield, Camera, CheckCircle2, ChevronRight, Lock } from 'lucide-react';

const Profile = () => {
    const { user, login } = useAuth();
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await api.put('/users/profile', formData);
            
            login({ ...user, username: response.data.username, email: response.data.email }, localStorage.getItem('token'));
            setStatus({ type: 'success', message: 'Profile updated successfully!' });
        } catch (err) {
            setStatus({ type: 'error', message: 'Failed to update profile. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-32 bg-slate-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-8">
                <div className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                        Your <span className="text-teal-600 italic">Identity.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium mt-6">Manage your digital presence and account preferences.</p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-teal-900/5 border border-white relative overflow-hidden text-center">
                            <div className="relative inline-block mb-6">
                                <div className="w-32 h-32 bg-teal-600 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-teal-200">
                                    {user?.username?.charAt(0).toUpperCase()}
                                </div>
                                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl shadow-lg border border-slate-50 flex items-center justify-center text-teal-600 hover:scale-110 transition">
                                    <Camera size={18} />
                                </button>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-1">{user?.username}</h3>
                            <p className="text-slate-400 font-bold text-sm tracking-widest uppercase mb-8">{user?.role} ACCOUNT</p>

                            <div className="pt-8 border-t border-slate-50 space-y-4 text-left">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400 font-bold overflow-hidden text-ellipsis whitespace-nowrap">Member Since</span>
                                    <span className="text-slate-900 font-black">Feb 2026</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400 font-bold overflow-hidden text-ellipsis whitespace-nowrap">Status</span>
                                    <span className="text-emerald-500 font-black flex items-center gap-1">
                                        Verified <CheckCircle2 size={14} />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-6">
                            <h4 className="text-xl font-black">Account Security</h4>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed">Your data is protected with 256-bit encryption and multi-factor authentication.</p>
                            <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold flex items-center justify-center gap-2 transition">
                                Change Password <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    {}
                    <div className="lg:col-span-8">
                        <form onSubmit={handleSubmit} className="bg-white rounded-[4rem] p-10 md:p-16 shadow-2xl shadow-teal-900/5 border border-white space-y-12">
                            <div className="space-y-10">
                                <div className="space-y-2 group">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] pl-4">Account Username</label>
                                    <div className="relative h-20 bg-slate-50 rounded-[2rem] border-2 border-transparent focus-within:border-teal-600 focus-within:bg-white transition-all flex items-center px-8 gap-6 group">
                                        <User className="text-slate-300 group-focus-within:text-teal-600 transition" size={24} />
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="bg-transparent w-full h-full font-black text-slate-900 outline-none text-xl"
                                            placeholder="Your unique handle"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] pl-4">Primary Email</label>
                                    <div className="relative h-20 bg-slate-50 rounded-[2rem] border-2 border-transparent focus-within:border-teal-600 focus-within:bg-white transition-all flex items-center px-8 gap-6 group">
                                        <Mail className="text-slate-300 group-focus-within:text-teal-600 transition" size={24} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="bg-transparent w-full h-full font-black text-slate-900 outline-none text-xl"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 opacity-50 pointer-events-none">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] pl-4">Account Rank</label>
                                    <div className="relative h-20 bg-slate-100 rounded-[2rem] flex items-center px-8 gap-6">
                                        <Shield className="text-slate-400" size={24} />
                                        <input
                                            type="text"
                                            value={user?.role}
                                            readOnly
                                            className="bg-transparent w-full h-full font-black text-slate-400 outline-none text-xl"
                                        />
                                        <Lock className="text-slate-300" size={20} />
                                    </div>
                                </div>
                            </div>

                            {status.message && (
                                <div className={`p-6 rounded-3xl font-black text-center animate-shake border ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                                    }`}>
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full h-24 bg-teal-600 text-white rounded-[2.5rem] font-black text-2xl shadow-3xl shadow-teal-200 flex items-center justify-center gap-4 hover:bg-teal-700 active:scale-95 transition-all ${loading ? 'opacity-50 grayscale' : ''
                                    }`}
                            >
                                {loading ? 'Saving Changes...' : 'Persist Profile'}
                                <Save size={28} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
