import React from 'react';
import { Calendar, User } from 'lucide-react';

const Blog = () => {
    // Mock Blog Data
    const posts = [
        {
            id: 1,
            title: "การทำมาสเตอร์ริ่งสำคัญอย่างไรกับเพลงของคุณ?",
            excerpt: "เจาะลึกกระบวนการมาสเตอร์ริ่ง และเหตุผลว่าทำไมมันถึงเป็นขั้นตอนสุดท้ายที่ขาดไม่ได้ก่อนปล่อยเพลง",
            image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
            date: "15 พ.ค. 2024",
            category: "Tips & Tricks"
        },
        {
            id: 2,
            title: "5 เทคนิคการอัดเสียงร้องที่บ้านให้เหมือนมืออาชีพ",
            excerpt: "เรียนรู้วิธีการจัดห้อง เลือกไมโครโฟน และเทคนิคการบันทึกเสียงที่จะทำให้ Home Studio ของคุณคุณภาพเทียบเท่าห้องอัด",
            image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop",
            date: "10 พ.ค. 2024",
            category: "Recording"
        },
        {
            id: 3,
            title: "เบื้องหลังการทำเพลง ''Neon Dreams''",
            excerpt: "พาทัวร์โปรเจกต์เพลง Synthwave ยอดฮิต ตั้งแต่เริ่มเดโมจนถึงขั้นตอนสุดท้ายของการมิกซ์",
            image: "https://images.unsplash.com/photo-1478737270239-2f63b8625881?q=80&w=2038&auto=format&fit=crop",
            date: "1 พ.ค. 2024",
            category: "Behind the Scenes"
        },
        {
            id: 4,
            title: "เลือกไมโครโฟนยังไงให้เหมาะกับเสียงคุณ",
            excerpt: "แนะนำประเภทของไมโครโฟนและการเลือกใช้ให้เข้ากับโทนเสียงและแนวเพลงของคุณ",
            image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop",
            date: "25 เม.ย. 2024",
            category: "Gear Guide"
        },
        {
            id: 5,
            title: "ความแตกต่างระหว่าง Mix และ Master",
            excerpt: "หลายคนยังสับสนระหว่างสองขั้นตอนนี้ บทความนี้จะไขข้อสงสัยให้กระจ่าง",
            image: "https://images.unsplash.com/photo-1460023485667-17210eb738f6?q=80&w=2074&auto=format&fit=crop",
            date: "20 เม.ย. 2024",
            category: "Knowledge"
        },
        {
            id: 6,
            title: "เริ่มต้นทำเพลงต้องใช้อุปกรณ์อะไรบ้าง?",
            excerpt: "คู่มือสำหรับมือใหม่ งบน้อยก็เริ่มได้ แนะนำอุปกรณ์ที่จำเป็นสำหรับการทำเพลง",
            image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2070&auto=format&fit=crop",
            date: "15 เม.ย. 2024",
            category: "Beginner Guide"
        }
    ];

    return (
        <div className="w-full pt-20">
            {/* Header */}
            <section className="bg-brand-black py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 z-0"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">บทความ <span className="text-brand-gold">ล่าสุด</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        สาระความรู้ เทคนิค และเบื้องหลังการทำงาน จากทีมงานมืออาชีพของเรา
                    </p>
                </div>
            </section>

            <section className="bg-brand-black pb-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <article key={post.id} className="bg-brand-gray/20 rounded-xl overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all group">
                                <div className="aspect-video overflow-hidden">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center text-xs text-brand-gold mb-3 space-x-4">
                                        <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
                                        <span className="flex items-center"><User size={14} className="mr-1" /> {post.author}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">{post.title}</h2>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                                    <button className="text-brand-white text-sm font-bold hover:text-brand-gold transition-colors">Read More &rarr;</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
