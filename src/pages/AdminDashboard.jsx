import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../lib/api';
import { LogOut, Download, CheckCircle, Clock, Search } from 'lucide-react';

const AdminDashboard = () => {
    const { user, signOut } = useAuth();
    const [activeTab, setActiveTab] = useState('projects');
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (activeTab === 'projects') fetchProjects();
        if (activeTab === 'users') fetchUsers();
    }, [activeTab]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const data = await apiRequest('/admin/projects');
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await apiRequest('/admin/users');
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (projectId, newStatus) => {
        try {
            await apiRequest(`/admin/projects/${projectId}/status`, 'PUT', { status: newStatus });
            setProjects(projects.map(p => p.id === projectId ? { ...p, status: newStatus } : p));
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const toggleAdmin = async (userId, currentStatus) => {
        if (!window.confirm(`Are you sure you want to ${currentStatus ? 'demote' : 'promote'} this user?`)) return;
        try {
            await apiRequest(`/admin/users/${userId}/role`, 'PUT', { is_admin: !currentStatus });
            setUsers(users.map(u => u.id === userId ? { ...u, is_admin: !currentStatus } : u));
        } catch (error) {
            console.error('Failed to update role', error);
        }
    };

    const StatusBadge = ({ status }) => {
        const styles = {
            pending: 'bg-yellow-500/20 text-yellow-500',
            in_progress: 'bg-blue-500/20 text-blue-500',
            review: 'bg-purple-500/20 text-purple-500',
            completed: 'bg-green-500/20 text-green-500'
        };
        const labels = {
            pending: 'รอตรวจสอบ',
            in_progress: 'กำลังดำเนินการ',
            review: 'รอตรวจงาน',
            completed: 'เสร็จสิ้น'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status] || 'bg-gray-500/20 text-gray-500'}`}>
                {labels[status] || status}
            </span>
        );
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredUsers = users.filter(u =>
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pt-24 pb-20 min-h-screen bg-brand-black px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <button onClick={signOut} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                        <LogOut size={18} /> ออกจากระบบ
                    </button>
                </div>

                <div className="bg-brand-gray rounded-2xl p-6 border border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="flex gap-4">
                            <button
                                onClick={() => setActiveTab('projects')}
                                className={`px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'projects' ? 'bg-brand-gold text-black' : 'text-gray-400 hover:text-white'}`}
                            >
                                Projects
                            </button>
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'users' ? 'bg-brand-gold text-black' : 'text-gray-400 hover:text-white'}`}
                            >
                                Users
                            </button>
                        </div>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="ค้นหา..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-brand-gold"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12 text-gray-400">Loading...</div>
                    ) : activeTab === 'projects' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/10 text-gray-400 text-sm">
                                        <th className="py-4 font-normal">Project</th>
                                        <th className="py-4 font-normal">Client</th>
                                        <th className="py-4 font-normal">Date</th>
                                        <th className="py-4 font-normal">Status</th>
                                        <th className="py-4 font-normal">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredProjects.map((project) => (
                                        <tr key={project.id} className="hover:bg-white/5 transition-colors">
                                            <td className="py-4">
                                                <div className="font-bold text-white">{project.title}</div>
                                                <div className="text-xs text-gray-500">BPM: {project.files_meta?.bpm} | Key: {project.files_meta?.key}</div>
                                            </td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-xs">
                                                        {project.full_name?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <div className="text-white text-sm">{project.full_name}</div>
                                                        <div className="text-xs text-gray-500">{project.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 text-gray-400 text-sm">
                                                {new Date(project.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-4">
                                                <StatusBadge status={project.status} />
                                            </td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={project.status}
                                                        onChange={(e) => updateStatus(project.id, e.target.value)}
                                                        className="bg-black/30 text-white text-sm rounded px-2 py-1 border border-white/10 focus:outline-none focus:border-brand-gold"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="in_progress">In Progress</option>
                                                        <option value="review">Review</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/10 text-gray-400 text-sm">
                                        <th className="py-4 font-normal">User</th>
                                        <th className="py-4 font-normal">Role</th>
                                        <th className="py-4 font-normal">Projects</th>
                                        <th className="py-4 font-normal">Joined</th>
                                        <th className="py-4 font-normal">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredUsers.map((u) => (
                                        <tr key={u.id} className="hover:bg-white/5 transition-colors">
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-xs">
                                                        {u.full_name?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <div className="text-white text-sm">{u.full_name}</div>
                                                        <div className="text-xs text-gray-500">{u.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${u.is_admin ? 'bg-purple-500/20 text-purple-500' : 'bg-gray-500/20 text-gray-400'}`}>
                                                    {u.is_admin ? 'ADMIN' : 'USER'}
                                                </span>
                                            </td>
                                            <td className="py-4 text-white">
                                                {u.project_count}
                                            </td>
                                            <td className="py-4 text-gray-400 text-sm">
                                                {new Date(u.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-4">
                                                {u.id !== user.id && (
                                                    <button
                                                        onClick={() => toggleAdmin(u.id, u.is_admin)}
                                                        className="text-xs border border-white/10 hover:bg-white/10 px-3 py-1 rounded text-gray-300 transition-colors"
                                                    >
                                                        {u.is_admin ? 'Demote' : 'Promote'}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
