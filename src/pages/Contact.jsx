import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="w-full pt-20">
            {/* Header */}
            <section className="bg-brand-black py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 z-0"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">ติดต่อ <span className="text-brand-gold">เรา</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        พร้อมที่จะเริ่มโปรเจกต์ของคุณแล้วหรือยัง? ติดต่อเราเพื่อพูดคุยเกี่ยวกับความต้องการและเป้าหมายทางดนตรีของคุณ
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 bg-brand-black/50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* Contact Info */}
                        <div className="lg:w-1/3 space-y-8">
                            <div>
                                <h3 className="text-2xl font-heading font-bold text-brand-white mb-6">ช่องทางติดต่อ</h3>
                                <p className="text-gray-400 mb-8">
                                    เรายินดีตอบคำถามและให้คำปรึกษาเกี่ยวกับทุกบริการของเรา สามารถติดต่อได้ตามช่องทางด้านล่าง
                                </p>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-brand-gray/50 p-3 rounded-lg text-brand-gold border border-white/5">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">ที่อยู่</h4>
                                    <p className="text-gray-400 mt-1">
                                        123 ซอยดนตรี, ถนนสร้างสรรค์,<br />
                                        แขวงศิลปะ เขตวัฒนธรรม,<br />
                                        กรุงเทพมหานคร 10110
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-brand-gray/50 p-3 rounded-lg text-brand-gold border border-white/5">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">เบอร์โทรศัพท์</h4>
                                    <p className="text-gray-400 mt-1">089-123-4567</p>
                                    <p className="text-gray-500 text-sm">(จันทร์ - ศุกร์, 10:00 - 20:00 น.)</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-brand-gray/50 p-3 rounded-lg text-brand-gold border border-white/5">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">อีเมล</h4>
                                    <p className="text-gray-400 mt-1">contact@mixstudio.com</p>
                                    <p className="text-gray-400 mt-1">booking@mixstudio.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:w-2/3 bg-brand-gray/20 p-8 md:p-10 rounded-2xl border border-white/5">
                            <h3 className="text-2xl font-heading font-bold text-brand-white mb-6">ส่งข้อความหาเรา</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-brand-gold text-sm font-bold mb-2 uppercase tracking-wider">ชื่อของคุณ</label>
                                        <input type="text" className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all" placeholder="ชื่อ-นามสกุล" />
                                    </div>
                                    <div>
                                        <label className="block text-brand-gold text-sm font-bold mb-2 uppercase tracking-wider">อีเมล</label>
                                        <input type="email" className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all" placeholder="example@email.com" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-brand-gold text-sm font-bold mb-2 uppercase tracking-wider">บริการที่สนใจ</label>
                                    <select className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all appearance-none cursor-pointer">
                                        <option>เลือกบริการ...</option>
                                        <option>ทำเพลงครบวงจร (Full Production)</option>
                                        <option>มิกซ์ & มาสเตอร์ริ่ง (Mixing & Mastering)</option>
                                        <option>จูนเสียง/แก้ไขเสียง (Vocal Tuning)</option>
                                        <option>ดนตรีประกอบ (Soundtrack)</option>
                                        <option>อื่นๆ</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-brand-gold text-sm font-bold mb-2 uppercase tracking-wider">ข้อความ / รายละเอียด</label>
                                    <textarea rows="5" className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all" placeholder="บอกเล่าเกี่ยวกับโปรเจกต์ของคุณ..."></textarea>
                                </div>

                                <button type="button" className="w-full md:w-auto px-10 py-4 bg-brand-gold text-brand-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1">
                                    ส่งข้อความ
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="h-[400px] w-full bg-brand-gray/30 relative flex items-center justify-center border-t border-white/5">
                <div className="absolute inset-0 grayscale opacity-40">
                    {/* In a real app, this would be a Google Map Iframe */}
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover" alt="Map Background" />
                </div>
                <div className="relative z-10 bg-brand-black/90 p-8 rounded-xl border border-brand-gold/20 backdrop-blur-md">
                    <h4 className="text-xl font-bold text-white mb-2 text-center">แผนที่สตูดิโอ</h4>
                    <p className="text-gray-400 text-sm text-center">คลิกเพื่อดูเส้นทางใน Google Maps</p>
                </div>
            </section>
        </div>
    );
};

export default Contact;
