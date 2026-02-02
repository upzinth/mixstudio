import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Check, Music, Mic2, Sliders, Film, Clock } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: "มิกซ์ & มาสเตอร์ริ่ง",
            description: "ปรับสมดุลทุกย่านเสียง เพิ่มมิติและความคมชัด เพื่อให้เพลงของคุณมีคุณภาพระดับมาตรฐานสากล",
            price: "เริ่มต้น ฿3,500 / เพลง",
            features: [
                "ปรับสมดุล (Level & EQ)",
                "เพิ่มมิติเสียง (Stereo Imaging)",
                "Analog & Digital Processing",
                "ไฟล์ความละเอียดสูง (WAV & MP3)",
                "Mastered for Streaming"
            ],
            turnaround: "3-5 วัน"
        },
        {
            title: "รับทำเพลงครบวงจร",
            description: "ดูแลทุกขั้นตอนตั้งแต่ออกแบบเมโลดี้, เรียบเรียงดนตรี, บันทึกเสียง จนถึงขั้นตอนสุดท้าย",
            price: "เริ่มต้น ฿15,000 / เพลง",
            features: [
                "แต่งเนื้อร้อง & ทำนอง",
                "เรียบเรียงดนตรี (Arrangement)",
                "บันทึกเสียงเครื่องดนตรีจริง",
                "คุมร้อง & บันทึกเสียง",
                "รวมค่า Mix & Master"
            ],
            turnaround: "10-14 วัน"
        },
        {
            title: "จูนเสียงร้อง & แก้ไขเสียง",
            description: "แก้ไขพิทช์เสียงร้องให้ตรงคีย์อย่างเป็นธรรมชาติ และจัดการจังหวะให้แม่นยำ (Time Alignment)",
            price: "เริ่มต้น ฿1,500 / เพลง",
            features: [
                "Melodyne & Auto-Tune",
                "แก้ไขจังหวะร้อง (Time Editing)",
                "ปรับเนื้อเสียงให้ใสสะอาด",
                "สร้างไลน์ประสาน (Harmony)",
                "ส่งงานเป็น Stems"
            ],
            turnaround: "2 วัน"
        },
        {
            title: "ดนตรีประกอบ (Score & OST)",
            description: "สร้างสรรค์ดนตรีประกอบสำหรับภาพยนตร์, โฆษณา, เกม หรือสื่อออนไลน์ เพื่อสื่ออารมณ์ที่คุณต้องการ",
            price: "ติดต่อสอบถาม",
            features: [
                "Orchestral / Cinematic / Electronic",
                "Sound Design & Foley",
                "Synchronized to Picture",
                "Broadcast Standards",
                "ลิขสิทธิ์ถูกต้อง"
            ],
            turnaround: "7-10 วัน"
        }
    ];

    return (
        <div className="w-full pt-20">
            <Helmet>
                <title>บริการของเรา - MixStudio | Mixing, Mastering, Music Production</title>
                <meta name="description" content="บริการทำเพลงครบวงจร มิกซ์ มาสเตอร์ริ่ง จูนเสียงร้อง และดนตรีประกอบ โดยทีมงานมืออาชีพ ราคาเริ่มต้น 3,500 บาท" />
            </Helmet>
            {/* Header */}
            <section className="bg-brand-black py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 z-0"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">บริการ <span className="text-brand-gold">ของเรา</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        โซลูชั่นเสียงครบวงจร เพื่อผลงานที่โดดเด่นและเป็นมืออาชีพที่สุดสำหรับคุณ
                    </p>
                </div>
            </section>

            <section className="py-20 bg-brand-black">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {services.map((service, index) => (
                            <div key={index} className="bg-brand-gray/20 border border-white/5 rounded-2xl p-8 hover:border-brand-gold/30 transition-all group">
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">{service.title}</h3>
                                <p className="text-gray-400 mb-6 min-h-[50px]">{service.description}</p>

                                <div className="text-3xl font-bold text-brand-gold mb-6 font-heading">{service.price}</div>

                                <div className="bg-brand-black/50 rounded-xl p-6 mb-6">
                                    <ul className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-gray-300 text-sm">
                                                <Check size={16} className="text-brand-gold mr-3 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <Clock size={16} className="mr-2" />
                                            ระยะเวลา: {service.turnaround}
                                        </div>
                                    </div>
                                    <Link
                                        to="/client-area"
                                        state={{ activeTab: 'upload' }}
                                        className="text-brand-white font-bold text-sm tracking-wide group-hover:underline decoration-brand-gold underline-offset-4"
                                    >
                                        จองคิวบริการ →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-brand-gray/10 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-heading font-bold text-brand-white mb-4">
                        มีโปรเจกต์พิเศษ?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        หากคุณมีความต้องการที่แตกต่าง เรายินดีให้คำปรึกษาและออกแบบแพ็คเกจที่เหมาะสมกับคุณ
                    </p>
                    <button className="px-8 py-3 border border-brand-gold text-brand-gold font-bold rounded-full hover:bg-brand-gold hover:text-brand-black transition-colors">
                        ติดต่อสอบถาม
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Services;
