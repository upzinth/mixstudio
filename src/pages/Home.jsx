import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Music, Mic2, Sliders, Film, GraduationCap, Play, ArrowRight } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const servicesRef = useRef(null);
    const portfolioRef = useRef(null);

    useEffect(() => {
        // Hero Animation
        const tl = gsap.timeline();

        tl.fromTo(titleRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        )
            .fromTo(subtitleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                "-=0.5"
            )
            .fromTo(ctaRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                "-=0.5"
            );

        // Services Animation
        gsap.fromTo(servicesRef.current.children,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: servicesRef.current,
                    start: "top 80%",
                }
            }
        );
        // Portfolio Animation
        gsap.fromTo(portfolioRef.current.children,
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: portfolioRef.current,
                    start: "top 80%",
                }
            }
        );

    }, []);

    const services = [
        {
            title: 'รับทำเพลงครบวงจร',
            description: 'บริการสร้างสรรค์บทเพลงตั้งแต่เริ่มแต่งทำนอง เรียบเรียง ไปจนถึงขั้นตอนสุดท้ายตามสไตล์ที่คุณต้องการ',
            icon: Music
        },
        {
            title: 'จูนเสียงร้อง & ปรับคีย์',
            description: 'แก้ไขระดับเสียงร้องให้ตรงคีย์อย่างเป็นธรรมชาติ และปรับคีย์เพลงให้เข้ากับช่วงเสียงของคุณ',
            icon: Mic2
        },
        {
            title: 'มิกซ์ & มาสเตอร์ริ่ง',
            description: 'ปรับแต่งรายละเอียดเสียงให้คมชัด มีมิติ และได้มาตรฐานระดับสากล ด้วยอุปกรณ์คุณภาพสูง',
            icon: Sliders
        },
        {
            title: 'ดนตรีประกอบ & เสียงพากย์',
            description: 'สร้างสรรค์ดนตรีประกอบภาพยนตร์ โฆษณา และรับบันทึกเสียงพากย์คุณภาพระดับสตูดิโอ',
            icon: Film
        },
        {
            title: 'สอนทำเพลงออนไลน์',
            description: 'คอร์สเรียนทำเพลงออนไลน์ โดยโปรดิวเซอร์มืออาชีพ ที่จะสอนเทคนิคแบบเจาะลึก',
            icon: GraduationCap
        }
    ];

    const stats = [
        { number: '500+', label: 'โปรเจกต์ที่สำเร็จ' },
        { number: '50+', label: 'ลูกค้าที่พึงพอใจ' },
        { number: '10+', label: 'ปีแห่งประสบการณ์' },
        { number: '100%', label: 'การันตีคุณภาพ' }
    ];

    return (
        <div className="w-full">
            <Helmet>
                <title>MixStudio - รับทำเพลง มิกซ์ & มาสเตอร์ริ่งระดับมืออาชีพ</title>
                <meta name="description" content="ยกระดับเพลงของคุณให้มีคุณภาพระดับสากล ด้วยบริการ Mix & Mastering ครบวงจร โดย Sound Engineer มืออาชีพ" />
            </Helmet>
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden" ref={heroRef}>
                {/* Placeholder for Video Background */}
                <div className="absolute inset-0 bg-brand-black z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-black/60 z-10"></div>
                </div>

                <div className="relative z-20 container mx-auto px-6 text-center">
                    <div ref={titleRef}>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-brand-white mb-6 leading-tight">
                            บริการรับทำเพลง <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">และคีย์เสียงคุณภาพระดับมืออาชีพ</span>
                        </h1>
                    </div>
                    <p ref={subtitleRef} className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light">
                        ยกระดับผลงานของคุณด้วยบริการระดับพรีเมียม ทั้งการมิกซ์ มาสเตอร์ริ่ง และการผลิตเพลง ที่ออกแบบมาเพื่อศิลปินที่ต้องการคุณภาพสูงสุด
                    </p>
                    <div ref={ctaRef} className="flex flex-col md:flex-row justify-center gap-4">
                        <Link to="/services" className="px-8 py-3 bg-brand-gold text-brand-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1">
                            ดูบริการของเรา
                        </Link>
                        <Link to="/portfolio" className="px-8 py-3 border border-brand-white text-brand-white font-bold rounded-full hover:bg-white hover:text-black transition-all">
                            ชมผลงานตัวอย่าง
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 border-b border-white/5 bg-brand-gray/20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <div className="text-3xl md:text-4xl font-bold text-brand-gold mb-2">{stat.number}</div>
                                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Preview Section */}
            <section className="py-20 bg-brand-black">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-brand-gold font-bold tracking-widest text-sm uppercase">สิ่งที่เราทำ</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-white mt-3">
                            บริการ <span className="text-gray-500 font-light">ระดับพรีเมียม</span>
                        </h2>
                    </div>

                    <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/services" className="text-brand-white underline underline-offset-4 decoration-brand-gold hover:text-brand-gold transition-colors">
                            ดูบริการทั้งหมด
                        </Link>
                    </div>
                </div>
            </section>

            {/* Portfolio Preview */}
            <section className="py-20 bg-brand-gray/10 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-brand-gold font-bold tracking-widest text-sm uppercase">ผลงานของเรา</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-white mt-3">
                                ตัวอย่าง <span className="text-gray-500 font-light">โปรเจกต์</span>
                            </h2>
                        </div>
                        <Link to="/portfolio" className="hidden md:flex items-center text-brand-white hover:text-brand-gold transition-colors">
                            ดูผลงานทั้งหมด <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>

                    <div ref={portfolioRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Mock Portfolio Items */}
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer">
                                <img src={`https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop`} alt="Project" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button className="w-16 h-16 rounded-full bg-brand-gold text-brand-black flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                                        <Play fill="currentColor" size={24} className="ml-1" />
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-xl font-bold text-white">ชื่อผลงาน {item}</h3>
                                    <p className="text-brand-gold text-sm">มิกซ์ & มาสเตอร์ริ่ง</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/10"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-white mb-8">พร้อมที่จะยกระดับเสียงของคุณหรือยัง?</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto">เข้าร่วมกับศิลปินนับร้อยที่ไว้วางใจให้ MixStudio ดูแลวิสัยทัศน์ทางดนตรีของพวกเขา</p>
                    <Link to="/contact" className="px-10 py-4 bg-brand-gold text-brand-black font-bold text-lg rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all transform hover:-translate-y-1">
                        เริ่มโปรเจกต์ของคุณ
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
