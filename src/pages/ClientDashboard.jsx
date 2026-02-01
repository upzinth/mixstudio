import { useAuth } from '../context/AuthContext';
import ReferralCard from '../components/referral/ReferralCard';
import { LogOut } from 'lucide-react';

const ClientDashboard = () => {
    const { user, signOut } = useAuth();

    if (!user) return <div className="pt-32 text-center text-white">Please login...</div>;

    return (
        <div className="pt-24 pb-20 min-h-screen bg-brand-black px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white font-heading">บัญชีของคุณ</h1>
                        <p className="text-gray-400">{user.email}</p>
                    </div>
                    <button
                        onClick={signOut}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                        <LogOut size={18} />
                        ออกจากระบบ
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <section className="bg-brand-gray rounded-2xl p-6 border border-white/10">
                            <h2 className="text-xl font-bold text-white mb-4">ข้อมูลส่วนตัว</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Provider</label>
                                    <p className="text-white capitalize">{user.app_metadata.provider || 'Email'}</p>
                                </div>
                                <div className="p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                                    <p className="text-yellow-500 text-sm">
                                        ยินดีต้อนรับสมาชิกใหม่! เริ่มต้นใช้งานระบบ Referral เพื่อรับสิทธิพิเศษ
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <ReferralCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
