import React, { useState } from 'react';
import { Play } from 'lucide-react';

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState('ทั้งหมด');

    const categories = ['ทั้งหมด', 'โปรดิวซ์', 'มิกซ์ & มาสเตอร์', 'ซาวด์แทร็ก'];

    // Mock Projects Data
    const projects = [
        { id: 1, title: 'Neon Dreams', artist: 'Lunar Soul', category: 'โปรดิวซ์', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop' },
        { id: 2, title: 'Midnight City', artist: 'The Voyagers', category: 'มิกซ์ & มาสเตอร์', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop' },
        { id: 3, title: 'Ocean Waves', artist: 'Ambient Collective', category: 'ซาวด์แทร็ก', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop' },
        { id: 4, title: 'Retro Vibes', artist: 'Synthwave King', category: 'โปรดิวซ์', image: 'https://images.unsplash.com/photo-1514525253440-b393452e6193?q=80&w=2070&auto=format&fit=crop' },
        { id: 5, title: 'Acoustic Sessions', artist: 'Sarah Jenkins', category: 'มิกซ์ & มาสเตอร์', image: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=2070&auto=format&fit=crop' },
        { id: 6, title: 'Epic Journey', artist: 'Cinematic Orchestra', category: 'ซาวด์แทร็ก', image: 'https://images.unsplash.com/photo-1507838153414-b4b713384ebd?q=80&w=2070&auto=format&fit=crop' },
    ];

    const filteredProjects = activeCategory === 'ทั้งหมด'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    return (
        <div className="w-full pt-20">
            {/* Header */}
            <section className="bg-brand-black py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 z-0"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">ผลงาน <span className="text-brand-gold">ของเรา</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        รวมผลงานที่เราภูมิใจ จากศิลปินหลากหลายแนวเพลงที่เราได้มีส่วนร่วมในการสร้างสรรค์
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${activeCategory === cat
                                    ? 'bg-brand-gold text-brand-black'
                                    : 'bg-transparent border border-white/20 text-white hover:border-brand-gold hover:text-brand-gold'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-20 bg-brand-black min-h-screen">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="group relative bg-brand-gray rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-brand-gold/30 transition-all">
                                <div className="aspect-square relative overflow-hidden">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <button className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center text-brand-black hover:scale-110 transition-transform">
                                            <Play fill="currentColor" className="ml-1" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-xs font-bold text-brand-gold uppercase mb-1">{project.category}</div>
                                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                                    <p className="text-gray-400 text-sm">by {project.artist}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
