import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import BeforeAfterPlayer from '../components/audio/BeforeAfterPlayer';

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState('ทั้งหมด');

    const categories = ['ทั้งหมด', 'โปรดิวซ์', 'มิกซ์ & มาสเตอร์', 'ซาวด์แทร็ก'];

    // Mock Projects Data with Audio
    // In a real app, these URLs would point to actual audio files
    const projects = [
        {
            id: 1,
            title: 'Neon Dreams',
            artist: 'Lunar Soul',
            category: 'โปรดิวซ์',
            beforeSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Dummy Audio
            afterSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'   // Dummy Audio
        },
        {
            id: 2,
            title: 'Midnight City',
            artist: 'The Voyagers',
            category: 'มิกซ์ & มาสเตอร์',
            beforeSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            afterSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
        },
        {
            id: 3,
            title: 'Ocean Waves',
            artist: 'Ambient Collective',
            category: 'ซาวด์แทร็ก',
            beforeSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
            afterSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
        },
    ];

    const filteredProjects = activeCategory === 'ทั้งหมด'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    return (
        <div className="w-full pt-20">
            <Helmet>
                <title>ผลงานของเรา - MixStudio Portfolio</title>
                <meta name="description" content="ฟังตัวอย่างผลงานเพลงที่ผ่านการมิกซ์และมาสเตอร์ริ่งจาก MixStudio คุณภาพเสียงที่คุณมั่นใจได้" />
            </Helmet>
            {/* Header */}
            <section className="bg-brand-black py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 z-0"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">ผลงาน <span className="text-brand-gold">ของเรา</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
                        ฟังความแตกต่างก่อนและหลังการทำงานของเรา (Before / After)
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
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
                            <BeforeAfterPlayer
                                key={project.id}
                                title={project.title}
                                artist={project.artist}
                                beforeSrc={project.beforeSrc}
                                afterSrc={project.afterSrc}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
