import React from 'react';
import { Award, Users, Target, Heart } from 'lucide-react';

const About = () => {
    return (
        <div className="w-full pt-20">
            {/* Header */}
            <section className="bg-brand-black py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 z-0"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">เกี่ยวกับ <span className="text-brand-gold">MixStudio</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        ที่ซึ่งความหลงใหลพบกับความแม่นยำ ทีมวิศวกรเสียงและโปรดิวเซอร์มืออาชีพของเรามุ่งมั่นที่จะทำให้วิสัยทัศน์ทางดนตรีของคุณกลายเป็นจริง
                    </p>
                </div>
            </section>

            {/* Story & Vision */}
            <section className="py-20 bg-brand-black">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2070&auto=format&fit=crop"
                                alt="Studio Interior"
                                className="rounded-2xl shadow-2xl border border-white/10"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl font-heading font-bold text-brand-white mb-6">เรื่องราว <span className="text-brand-gold">ของเรา</span></h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                ก่อตั้งขึ้นในปี 2015 MixStudio เริ่มต้นจากโฮมสตูดิโอเล็กๆ ด้วยความฝันที่ยิ่งใหญ่ คือการมอบเสียงคุณภาพระดับค่ายเพลงใหญ่ให้กับศิลปินอิสระ ตลอดหลายปีที่ผ่านมา เราเติบโตเป็นโปรดักชั่นเฮาส์ครบวงจร ทำงานร่วมกับศิลปินจากทั่วโลกในหลากหลายแนวเพลง
                            </p>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                เราเชื่อว่าศิลปินทุกคนสมควรได้รับการได้ยินในเวอร์ชันที่ดีที่สุด นั่นคือเหตุผลที่เราผสมผสานอุปกรณ์อนาล็อกระดับตำนานเข้ากับเทคโนโลยีดิจิทัลล่าสุด เพื่อสร้างเสียงที่มีเอกลักษณ์ทั้งคลาสสิกและทันสมัย
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-4 bg-brand-gray/30 rounded-lg border border-white/5">
                                    <Target className="text-brand-gold mb-3" size={24} />
                                    <h3 className="font-bold text-white mb-2">ภารกิจของเรา</h3>
                                    <p className="text-sm text-gray-500">เพื่อเพิ่มขีดความสามารถให้ศิลปินด้วยเสียงระดับมืออาชีพที่โดดเด่นในอุตสาหกรรม</p>
                                </div>
                                <div className="p-4 bg-brand-gray/30 rounded-lg border border-white/5">
                                    <Heart className="text-brand-gold mb-3" size={24} />
                                    <h3 className="font-bold text-white mb-2">ความหลงใหลของเรา</h3>
                                    <p className="text-sm text-gray-500">ดนตรีเป็นมากกว่าเสียง มันคืออารมณ์ และเราดูแลทุกโปรเจกต์ด้วยใจ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-brand-gray/10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-white mb-4">พบกับ <span className="text-brand-gold">ทีมงาน</span></h2>
                        <p className="text-gray-400">ผู้อยู่เบื้องหลังความสำเร็จของคุณ</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((member) => (
                            <div key={member} className="group relative bg-brand-black border border-white/5 rounded-xl overflow-hidden hover:border-brand-gold/50 transition-colors">
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img
                                        src={`https://images.unsplash.com/photo-15${member === 1 ? '70295999919-56ceb5ecca61' : member === 2 ? '00647551124-a94924374800' : '35713285030-d13087910452'}?q=80&w=1000&auto=format&fit=crop`}
                                        alt="Team Member"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-1">Alex Producer {member}</h3>
                                    <p className="text-brand-gold text-sm mb-4">Senior Audio Engineer</p>
                                    <p className="text-gray-500 text-sm">ประสบการณ์กว่า 10 ปี ร่วมงานกับศิลปินระดับท็อปชาร์ต</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
