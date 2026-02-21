import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    BookOpen,
    ShoppingCart,
    User,
    LogOut,
    Menu,
    X,
    Home,
    Globe,
    Sparkles,
    ChevronDown,
    Shield
} from 'lucide-react';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: <Home size={18} /> },
        { name: 'Books', path: '/books', icon: <BookOpen size={18} /> },
        { name: 'Articles', path: '/articles', icon: <Globe size={18} /> },
        { name: 'E-Books', path: '/ebooks', icon: <Sparkles size={18} /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
            ? 'py-4 bg-white/90 backdrop-blur-2xl shadow-xl shadow-teal-900/5'
            : 'py-6 bg-white/10 backdrop-blur-md border-b border-white/10'
            }`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex items-center justify-between">
                    {}
                    <Link to="/" className="group flex items-center gap-3">
                        <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-200 group-hover:rotate-12 transition-transform duration-500">
                            <BookOpen size={24} />
                        </div>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">
                            Googlopedia<span className="text-teal-600">.</span>
                        </span>
                    </Link>

                    {}
                    <div className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 ${isActive(link.path)
                                    ? 'bg-teal-50 text-teal-600 shadow-sm'
                                    : 'text-slate-500 hover:text-teal-600 hover:bg-teal-50/50'
                                    }`}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    {}
                    <div className="hidden lg:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                                {isAdmin && (
                                    <Link
                                        to="/admin"
                                        className={`p-3 rounded-xl border-2 transition-all ${isActive('/admin')
                                            ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                                            : 'border-slate-100 text-slate-400 hover:border-slate-900 hover:text-slate-900'
                                            }`}
                                    >
                                        <Shield size={20} />
                                    </Link>
                                )}
                                <Link
                                    to="/cart"
                                    className={`p-3 rounded-xl border-2 transition-all ${isActive('/cart')
                                        ? 'bg-teal-600 border-teal-600 text-white shadow-lg'
                                        : 'border-slate-100 text-slate-400 hover:border-teal-600 hover:text-teal-600'
                                        }`}
                                >
                                    <ShoppingCart size={20} />
                                </Link>
                                <div className="group relative">
                                    <button className="flex items-center gap-3 p-1.5 pr-4 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-colors">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-teal-600 font-black shadow-sm">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="text-left">
                                            <div className="text-xs font-black text-slate-400 leading-none mb-0.5">PROFILE</div>
                                            <div className="text-sm font-black text-slate-900 leading-none">{user.username}</div>
                                        </div>
                                        <ChevronDown size={14} className="text-slate-400 group-hover:rotate-180 transition-transform" />
                                    </button>

                                    {}
                                    <div className="absolute top-full right-0 mt-4 w-56 bg-white rounded-3xl shadow-2xl shadow-teal-900/10 border border-slate-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 p-2 overflow-hidden">
                                        <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition text-slate-600 font-bold">
                                            <User size={18} /> Profile Settings
                                        </Link>
                                        <div className="h-px bg-slate-50 my-1 mx-2"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-rose-50 text-rose-500 transition font-bold"
                                        >
                                            <LogOut size={18} /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="px-6 py-3 text-slate-700 font-bold hover:text-teal-600 transition">
                                    Sign In
                                </Link>
                                <Link to="/register" className="px-8 py-3 bg-teal-600 text-white rounded-2xl font-black shadow-lg shadow-teal-100 hover:bg-teal-700 hover:scale-105 active:scale-95 transition-all">
                                    Join Now
                                </Link>
                            </div>
                        )}
                    </div>

                    {}
                    <button
                        className="lg:hidden w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-900 rounded-2xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {}
            <div className={`lg:hidden fixed inset-0 top-[88px] bg-white z-40 transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="p-8 space-y-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-4 text-2xl font-black text-slate-900"
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive(link.path) ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-400'
                                }`}>
                                {link.icon}
                            </div>
                            {link.name}
                        </Link>
                    ))}
                    <div className="h-px bg-slate-100 my-8"></div>
                    {user ? (
                        <div className="space-y-4">
                            <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-2xl font-black text-slate-900">
                                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center">
                                    <User />
                                </div>
                                Profile
                            </Link>
                            <button onClick={handleLogout} className="flex items-center gap-4 text-2xl font-black text-rose-500">
                                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
                                    <LogOut />
                                </div>
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="h-16 flex items-center justify-center bg-slate-50 text-slate-900 rounded-2xl font-black">
                                Sign In
                            </Link>
                            <Link to="/register" onClick={() => setIsMenuOpen(false)} className="h-16 flex items-center justify-center bg-teal-600 text-white rounded-2xl font-black">
                                Join Free
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
