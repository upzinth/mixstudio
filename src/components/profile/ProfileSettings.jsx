import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Save, Camera } from 'lucide-react';

const ProfileSettings = () => {
    const { user, profile, updateProfile } = useAuth();
    const [username, setUsername] = useState(profile?.username || '');
    const [website, setWebsite] = useState(profile?.website || '');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await updateProfile({
                username: username || null,
                website: website || null,
            });
            setSuccess('บันทึกข้อมูลเรียบร้อยแล้ว');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-brand-gray rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <User className="text-brand-gold" />
                ตั้งค่าโปรไฟล์
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-gold to-yellow-600 flex items-center justify-center text-3xl font-bold text-black">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                username?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'
                            )}
                        </div>
                        <button
                            type="button"
                            className="absolute bottom-0 right-0 w-8 h-8 bg-brand-gray border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        >
                            <Camera size={16} />
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">อีเมล</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-gray-500 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">ชื่อผู้ใช้</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="ชื่อผู้ใช้ของคุณ"
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold/50"
                        minLength={3}
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">เว็บไซต์</label>
                    <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://yourwebsite.com"
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold/50"
                    />
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                        {success}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-brand-gold text-black font-bold p-3 rounded-xl hover:bg-yellow-500 transition-colors disabled:opacity-50"
                >
                    <Save size={18} />
                    {loading ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
                </button>
            </form>
        </div>
    );
};

export default ProfileSettings;
