import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Edit, Trash2, Book, FileText, LayoutDashboard, X, Search, Filter, MoreHorizontal, Settings, ArrowUpRight } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('books');
    const [books, setBooks] = useState([]);
    const [articles, setArticles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'books') {
                const res = await api.get('/books');
                setBooks(res.data);
            } else {
                const res = await api.get('/articles');
                setArticles(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('This action is irreversible. Proceed with deletion?')) return;
        try {
            await api.delete(`/admin/${activeTab}/${id}`);
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Security clearance check failed. Unable to delete.');
        }
    };

    const handleOpenModal = (item = null) => {
        setEditingItem(item);
        setFormData(item || { role: activeTab === 'books' ? 'BOOK' : 'ARTICLE' });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await api.put(`/admin/${activeTab}/${editingItem.id}`, formData);
            } else {
                await api.post(`/admin/${activeTab}`, formData);
            }
            setShowModal(false);
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Internal link failed. Check data format.');
        }
    };

    return (
        <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        <Settings size={12} /> Console Access
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Command <span className="text-indigo-600">Center.</span></h1>
                    <p className="text-slate-500 text-xl font-medium">Manage the world's knowledge repository with precision.</p>
                </div>

                <button
                    onClick={() => handleOpenModal()}
                    className="group h-16 px-8 bg-indigo-600 text-white rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-indigo-700 transition shadow-2xl shadow-indigo-100 active:scale-95"
                >
                    <Plus size={24} className="group-hover:rotate-90 transition duration-300" />
                    Add {activeTab === 'books' ? 'New Volume' : 'Publication'}
                </button>
            </div>

            <div className="bg-white rounded-[3rem] shadow-3xl shadow-slate-200/50 overflow-hidden border border-slate-50">
                <div className="bg-slate-50 p-4 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex bg-white p-1.5 rounded-[1.5rem] shadow-inner border border-slate-100">
                        <button
                            onClick={() => setActiveTab('books')}
                            className={`px-8 py-3 rounded-[1rem] font-black text-sm tracking-tight transition-all uppercase ${activeTab === 'books' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Volumes
                        </button>
                        <button
                            onClick={() => setActiveTab('articles')}
                            className={`px-8 py-3 rounded-[1rem] font-black text-sm tracking-tight transition-all uppercase ${activeTab === 'articles' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Publications
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                            <input type="text" placeholder="Filter index..." className="pl-12 pr-6 h-12 bg-white rounded-xl border border-slate-100 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition w-64" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Detail</th>
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{activeTab === 'books' ? 'Author' : 'Timeline'}</th>
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{activeTab === 'books' ? 'Price Index' : 'Status'}</th>
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="4" className="px-10 py-8"><div className="h-8 bg-slate-50 rounded-xl w-full"></div></td>
                                    </tr>
                                ))
                            ) : (activeTab === 'books' ? books : articles).map((item) => (
                                <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors group">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white transition shadow-inner">
                                                {activeTab === 'books' ? <Book size={20} /> : <FileText size={20} />}
                                            </div>
                                            <div className="font-black text-slate-900 group-hover:text-indigo-600 transition">{item.title}</div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="font-black text-slate-500">
                                            {activeTab === 'books' ? item.author : new Date(item.datePublished).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        {activeTab === 'books' ? (
                                            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg font-black text-sm">₹{item.price}</span>
                                        ) : (
                                            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg font-black text-[10px] uppercase tracking-widest">Published</span>
                                        )}
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => handleOpenModal(item)} className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all flex items-center justify-center shadow-sm"><Edit size={18} /></button>
                                            <button onClick={() => handleDelete(item.id)} className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all flex items-center justify-center shadow-sm"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[2000] animate-in fade-in duration-300">
                    <div className="bg-white rounded-[4rem] shadow-4xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300 border border-white">
                        <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <div className="space-y-1">
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                    {editingItem ? 'Edit' : 'Create'} {activeTab === 'books' ? 'Volume' : 'Publication'}
                                </h2>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Entry ID: {editingItem?.id || 'New'}</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-sm hover:shadow-lg transition-all"><X /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="col-span-2 space-y-2 group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Display Title</label>
                                    <input
                                        type="text" required value={formData.title || ''}
                                        className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-slate-900 transition"
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                {activeTab === 'books' ? (
                                    <>
                                        <div className="space-y-2 group">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Lead Author</label>
                                            <input
                                                type="text" required value={formData.author || ''}
                                                className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-slate-900 transition"
                                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Market Price (₹)</label>
                                            <input
                                                type="number" required value={formData.price || ''}
                                                className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-slate-900 transition"
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-span-2 space-y-2 group">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Image Resource URL</label>
                                            <input
                                                type="text" value={formData.imageUrl || ''}
                                                className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-slate-900 transition"
                                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                                placeholder="https://images.unsplash.com/..."
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="col-span-2 space-y-2 group">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Lead Writer</label>
                                        <input
                                            type="text" required value={formData.author || ''}
                                            className="w-full h-14 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-slate-900 transition"
                                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        />
                                    </div>
                                )}
                                <div className="col-span-2 space-y-2 group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">{activeTab === 'books' ? 'Content Abstract' : 'Full Publication Body'}</label>
                                    <textarea
                                        required rows="4" value={activeTab === 'books' ? formData.description || '' : formData.content || ''}
                                        className="w-full p-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-slate-900 transition resize-none"
                                        onChange={(e) => setFormData({ ...formData, [activeTab === 'books' ? 'description' : 'content']: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="h-16 flex-1 bg-slate-100 text-slate-500 rounded-2xl font-black text-lg hover:bg-slate-200 transition">Discard</button>
                                <button type="submit" className="h-16 flex-[2] bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition shadow-2xl shadow-indigo-100 active:scale-95">Commit Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
