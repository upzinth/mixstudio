import { useAuth } from '../../context/AuthContext';
import { Gift, Star, Trophy, Coins } from 'lucide-react';

const RewardsCard = () => {
    const { profile } = useAuth();
    const points = profile?.points || 0;

    const rewards = [
        { id: 1, name: 'ส่วนลด 10%', points: 100, icon: Gift, available: points >= 100 },
        { id: 2, name: 'ส่วนลด 20%', points: 250, icon: Star, available: points >= 250 },
        { id: 3, name: 'บริการฟรี 1 ครั้ง', points: 500, icon: Trophy, available: points >= 500 },
    ];

    return (
        <div className="bg-brand-gray rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Coins className="text-brand-gold" />
                คะแนนสะสม
            </h3>

            <div className="bg-gradient-to-br from-brand-gold/20 to-yellow-600/10 rounded-xl p-6 mb-6 border border-brand-gold/20">
                <div className="text-center">
                    <p className="text-5xl font-bold text-brand-gold mb-1">{points}</p>
                    <p className="text-gray-400 text-sm">คะแนนที่ใช้ได้</p>
                </div>
                <div className="mt-4 text-center text-xs text-gray-500">
                    แนะนำเพื่อน 1 คน = 50 คะแนน
                </div>
            </div>

            <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">รางวัลที่แลกได้</h4>

            <div className="space-y-3">
                {rewards.map((reward) => (
                    <div
                        key={reward.id}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all ${reward.available
                                ? 'bg-black/30 border-brand-gold/20 hover:border-brand-gold/40'
                                : 'bg-black/20 border-white/5 opacity-50'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <reward.icon className={reward.available ? 'text-brand-gold' : 'text-gray-600'} size={20} />
                            <span className="text-white">{reward.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm ${reward.available ? 'text-brand-gold' : 'text-gray-500'}`}>
                                {reward.points} คะแนน
                            </span>
                            {reward.available && (
                                <button className="px-3 py-1 bg-brand-gold text-black text-xs font-bold rounded-full hover:bg-yellow-500 transition-colors">
                                    แลก
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RewardsCard;
