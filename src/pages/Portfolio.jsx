import React, { useState } from 'react';
import { Play } from 'lucide-react';

const Portfolio = () => {
    const [filter, setFilter] = useState('all');

    const projects = [
        { id: 1, title: 'Summer Vibes', artist: 'Jane Doe', category: 'production', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop' },
        { id: 2, title: 'Deep Ocean', artist: 'The Whales', category: 'mixing', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop' },
        { id: 3, title: 'Podcast Intro', artist: 'Tech Talk', category: 'soundtrack', image: 'https://images.unsplash.com/photo-1478737270239-2f63b8625881?q=80&w=2038&auto=format&fit=crop' },
        { id: 4, title: 'Acoustic Soul', artist: 'John Smith', category: 'production', image: 'https://images.unsplash.com/photo-1465225314224-587cd83d322b?q=80&w=2070&auto=format&fit=crop' },
        { id: 5, title: 'Urban Night', artist: 'City Lights', category: 'mixing', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop' },
        { id: 6, title: 'Game OST', artist: 'Indie Devs', category: 'soundtrack', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop' },
    ];

    const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    return (
        <div className="w-full pt-20">
            <section className="bg-brand-black py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">Our <span className="text-brand-gold">Work</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-12">
                        Listen to some of our recent projects. Quality you can hear.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {['all', 'production', 'mixing', 'soundtrack'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${filter === cat
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
