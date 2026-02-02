import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ReferralCard from '../components/referral/ReferralCard';
import ProfileSettings from '../components/profile/ProfileSettings';
import RewardsCard from '../components/rewards/RewardsCard';
import { LogOut, User, Gift, Users, Settings, PlusCircle } from 'lucide-react';
import FileUploader from '../components/upload/FileUploader';

const ClientDashboard = () => {
    const { user, profile, signOut } = useAuth();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('overview');
    const [myProjects, setMyProjects] = useState([]);

    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
            // Clear state to avoid reopening on refresh? (Optional, but React Router handles state per navigation)
        }
    }, [location]);

    useEffect(() => {
        if (user) {
            // Fetch my projects
            fetch('http://localhost:3000/api/projects', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
            })
                .then(res => res.json())
                .then(data => setMyProjects(data))
                .catch(err => console.error(err));
        }
    }, [user, activeTab]);

    if (!user) return (
        <div className="pt-32 text-center text-white min-h-screen bg-brand-black">
            <div className="animate-pulse">กำลังโหลด...</div>
        </div>
    );

    const tabs = [
        { id: 'overview', name: 'ภาพรวม', icon: User },
        { id: 'referral', name: 'แนะนำเพื่อน', icon: Users },
        { id: 'rewards', name: 'รางวัล', icon: Gift },
        { id: 'settings', name: 'ตั้งค่า', icon: Settings },
        { id: 'upload', name: 'ส่งงานใหม่', icon: PlusCircle, isAction: true },
    ];

    return (
        <div className="pt-24 pb-20 min-h-screen bg-brand-black px-4">
            <div className="container mx-auto max-w-5xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-gold to-yellow-600 flex items-center justify-center text-2xl font-bold text-black">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                profile?.username?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white font-heading">
                                สวัสดี, {profile?.username || user?.email?.split('@')[0]}!
                            </h1>
                            <p className="text-gray-400 text-sm">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={signOut}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                        <LogOut size={18} />
                        ออกจากระบบ
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-brand-gold text-black'
                                : tab.isAction
                                    ? 'bg-brand-gold/20 text-brand-gold border border-brand-gold/50 hover:bg-brand-gold hover:text-black'
                                    : 'bg-brand-gray text-gray-400 hover:text-white border border-white/10'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Main Content Area (Left/Center) */}
                    <div className="md:col-span-2 space-y-6">
                        {activeTab === 'overview' && (
                            <>
                                <section className="bg-brand-gray rounded-2xl p-6 border border-white/10">
                                    <h2 className="text-xl font-bold text-white mb-4">สถานะงานของฉัน</h2>
                                    {myProjects.length === 0 ? (
                                        <p className="text-gray-400">ยังไม่มีโปรเจกต์ที่กำลังดำเนินการ</p>
                                    ) : (
                                        <div className="space-y-4">
                                            {myProjects.map(project => (
                                                <div key={project.id} className="bg-black/30 rounded-xl p-4 border border-white/5 flex justify-between items-center">
                                                    <div>
                                                        <h3 className="text-white font-bold">{project.title}</h3>
                                                        <p className="text-xs text-gray-500">Updated: {new Date(project.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${project.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                                                        project.status === 'review' ? 'bg-purple-500/20 text-purple-500' :
                                                            'bg-yellow-500/20 text-yellow-500'
                                                        }`}>
                                                        {project.status === 'pending' ? 'รอคิว' :
                                                            project.status === 'in_progress' ? 'กำลังทำ' :
                                                                project.status === 'review' ? 'ตรวจงาน' :
                                                                    project.status === 'completed' ? 'เสร็จสิ้น' : project.status}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>

                                <section className="bg-brand-gray rounded-2xl p-6 border border-white/10">
                                    <h2 className="text-xl font-bold text-white mb-4">ข้อมูลบัญชี</h2>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                                            <span className="text-gray-400">Provider</span>
                                            <span className="text-white capitalize">{user.app_metadata?.provider || 'Email'}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                                            <span className="text-gray-400">รหัสแนะนำ</span>
                                            <span className="text-brand-gold font-mono">{profile?.referral_code || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3">
                                            <span className="text-gray-400">คะแนนสะสม</span>
                                            <span className="text-brand-gold font-bold">{profile?.points || 0} คะแนน</span>
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-gradient-to-br from-brand-gold/10 to-yellow-600/5 rounded-2xl p-6 border border-brand-gold/20">
                                    <h2 className="text-xl font-bold text-white mb-4">🎁 โปรโมชั่นพิเศษ</h2>
                                    <p className="text-gray-300 mb-4">
                                        แนะนำเพื่อนมาใช้บริการ รับคะแนนสะสม!
                                    </p>
                                    <ul className="space-y-2 text-sm text-gray-400">
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                                            แนะนำเพื่อน 1 คน = 50 คะแนน
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                                            เพื่อนได้รับส่วนลด 10% ทันที
                                        </li>
                                    </ul>
                                    <button
                                        onClick={() => setActiveTab('referral')}
                                        className="mt-4 w-full bg-brand-gold text-black font-bold py-3 rounded-xl hover:bg-yellow-500 transition-colors"
                                    >
                                        เริ่มแนะนำเพื่อน
                                    </button>
                                </section>
                            </>
                        )}

                        {activeTab === 'referral' && (
                            <>
                                <ReferralCard />
                                <section className="bg-brand-gray rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-xl font-bold text-white mb-4">📊 สถิติการแนะนำ</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-black/30 rounded-xl p-4 text-center">
                                            <p className="text-3xl font-bold text-brand-gold">0</p>
                                            <p className="text-gray-400 text-sm">เพื่อนที่แนะนำ</p>
                                        </div>
                                        <div className="bg-black/30 rounded-xl p-4 text-center">
                                            <p className="text-3xl font-bold text-brand-gold">0</p>
                                            <p className="text-gray-400 text-sm">คะแนนที่ได้รับ</p>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {activeTab === 'rewards' && (
                            <>
                                <RewardsCard />
                                <section className="bg-brand-gray rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-xl font-bold text-white mb-4">📜 ประวัติการแลก</h3>
                                    <div className="text-center py-8 text-gray-500">
                                        <Gift size={48} className="mx-auto mb-3 opacity-30" />
                                        <p>ยังไม่มีประวัติการแลกรางวัล</p>
                                    </div>
                                </section>
                            </>
                        )}

                        {activeTab === 'settings' && (
                            <>
                                <ProfileSettings />
                                <section className="bg-brand-gray rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-xl font-bold text-white mb-4">🔐 ความปลอดภัย</h3>
                                    <div className="space-y-4">
                                        <button className="w-full text-left p-4 bg-black/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                            <p className="text-white font-medium">เปลี่ยนรหัสผ่าน</p>
                                            <p className="text-gray-500 text-sm">อัพเดทรหัสผ่านของคุณ</p>
                                        </button>
                                        <button className="w-full text-left p-4 bg-black/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                            <p className="text-white font-medium">การยืนยันตัวตน 2 ชั้น</p>
                                            <p className="text-gray-500 text-sm">เพิ่มความปลอดภัยให้บัญชี</p>
                                        </button>
                                    </div>
                                </section>
                            </>
                        )}
                        {activeTab === 'upload' && (
                            <FileUploader onUploadComplete={(data) => {
                                console.log('Upload complete:', data);
                                setActiveTab('overview');
                            }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
