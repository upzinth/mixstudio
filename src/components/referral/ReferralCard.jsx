import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Copy, Check } from 'lucide-react';

const ReferralCard = () => {
    const { user } = useAuth();
    const [referralCode, setReferralCode] = useState('');
    const [referrerCode, setReferrerCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user) {
            fetchReferralData();
        }
    }, [user]);

    const fetchReferralData = async () => {
        try {
            // In a real scenario, we would join with a profiles table
            // For now, we'll try to get it from a potential 'profiles' table
            const { data, error } = await supabase
                .from('profiles')
                .select('referral_code, referred_by')
                .eq('id', user.id)
                .single();

            if (data) {
                setReferralCode(data.referral_code || 'Generating...');
                if (data.referred_by) {
                    setReferrerCode(data.referred_by);
                }
            } else if (error) {
                // Creating profile if not exists (conceptual)
                console.log('Profile fetch error or new user:', error);
                setReferralCode('USER-' + user.id.slice(0, 5).toUpperCase());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmitReferrer = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Logic to update referred_by in database
        // await supabase.from('profiles').update({ referred_by: referrerCode }).eq('id', user.id);

        // Mock success for UI demo
        setSuccess('บันทึกผู้แนะนำเรียบร้อยแล้ว');
    };

    if (loading) return <div className="text-white">Loading referral data...</div>;

    return (
        <div className="rounded-2xl bg-brand-gray p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">แนะนำเพื่อน</h3>

            <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">รหัสแนะนำของคุณ</label>
                <div className="flex gap-2">
                    <div className="flex-1 bg-black/30 rounded-lg border border-white/10 p-3 text-white font-mono text-lg text-center">
                        {referralCode}
                    </div>
                    <button
                        onClick={handleCopy}
                        className="p-3 bg-brand-gold/10 text-brand-gold rounded-lg border border-brand-gold/20 hover:bg-brand-gold/20 transition-colors"
                    >
                        {copied ? <Check size={24} /> : <Copy size={24} />}
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">แชร์รหัสนี้ให้เพื่อนเพื่อรับสิทธิพิเศษทั้งคุณและเพื่อน</p>
            </div>

            <form onSubmit={handleSubmitReferrer} className="pt-6 border-t border-white/10">
                <label className="block text-sm text-gray-400 mb-2">ใส่รหัสผู้แนะนำ (ถ้ามี)</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={referrerCode}
                        onChange={(e) => setReferrerCode(e.target.value.toUpperCase())}
                        placeholder="ENTER-CODE"
                        className="flex-1 bg-black/30 rounded-lg border border-white/10 p-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold/50"
                        disabled={!!referrerCode && referrerCode.length > 0} // Disable if already set (mock logic)
                    />
                    <button
                        type="submit"
                        className="px-4 bg-brand-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                        disabled={!referrerCode}
                    >
                        ยืนยัน
                    </button>
                </div>
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                {success && <p className="text-green-400 text-sm mt-2">{success}</p>}
            </form>
        </div>
    );
};

export default ReferralCard;
