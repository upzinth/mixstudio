import React from 'react';
import { Check, Music, Mic2, Sliders, Film } from 'lucide-react';

const Services = () => {
    const servicesList = [
        {
            id: 'production',
            title: 'Full Music Production',
            icon: Music,
            description: 'From a rough demo or just an idea, we build a full, radio-ready track.',
            features: ['Composition & Arrangement', 'Professional Session Musicians', 'Programming & Sound Design', 'Guide Vocals'],
            price: 'Starting at $500',
            duration: '2-4 Weeks'
        },
        {
            id: 'mixing',
            title: 'Mixing & Mastering',
            icon: Sliders,
            description: 'Transform your raw recordings into a polished, balanced, and loud master.',
            features: ['Balance & EQ', 'Compression & Saturation', 'Vocal Tuning (Melodyne)', 'Mastering for Streaming'],
            price: 'Starting at $150/track',
            duration: '3-5 Days'
        },
        {
            id: 'vocal',
            title: 'Vocal Production',
            icon: Mic2,
            description: 'Pitch correction, timing alignment, and harmony creation.',
            features: ['Natural Pitch Correction', 'Creative Vocal Effects', 'Harmony Arrangement', 'De-essing & Cleanup'],
            price: 'Starting at $80/track',
            duration: '1-2 Days'
        },
        {
            id: 'soundtrack',
            title: 'Soundtrack & Foley',
            icon: Film,
            description: 'Custom audio for films, games, and commercials.',
            features: ['Original Score', 'Sound Effects (Foley)', 'Voiceover Recording', 'Audio Branding'],
            price: 'Custom Quote',
            duration: 'Project Based'
        }
    ];

    return (
        <div className="w-full pt-20">
            <section className="bg-brand-black py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">Our <span className="text-brand-gold">Services</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Comprehensive audio solutions tailored to your unique needs. transparent pricing, professional results.
                    </p>
                </div>
            </section>

            <section className="py-12 bg-brand-black">
                <div className="container mx-auto px-6">
                    <div className="space-y-24">
                        {servicesList.map((service, index) => (
                            <div key={service.id} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-brand-gray/50 rounded-2xl flex items-center justify-center text-brand-gold border border-brand-gold/20">
                                            <service.icon size={32} />
                                        </div>
                                        <h2 className="text-3xl font-heading font-bold text-brand-white">{service.title}</h2>
                                    </div>

                                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center text-gray-300">
                                                <Check size={18} className="text-brand-gold mr-3" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-col sm:flex-row gap-6 border-t border-white/10 pt-8">
                                        <div>
                                            <span className="block text-xs uppercase text-brand-gold tracking-wider mb-1">Pricing</span>
                                            <span className="text-xl font-bold text-white">{service.price}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs uppercase text-brand-gold tracking-wider mb-1">Turnaround</span>
                                            <span className="text-xl font-bold text-white">{service.duration}</span>
                                        </div>
                                        <div className="sm:ml-auto">
                                            <button className="w-full sm:w-auto px-8 py-3 border border-brand-gold text-brand-gold font-bold rounded-lg hover:bg-brand-gold hover:text-black transition-all">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 w-full">
                                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 group">
                                        <div className="absolute inset-0 bg-brand-black/50 z-10 flex items-center justify-center group-hover:bg-brand-black/40 transition-all">
                                            <span className="text-white font-heading font-bold text-lg tracking-widest border border-white px-6 py-2 rounded uppercase backdrop-blur-sm">Example Work</span>
                                        </div>
                                        <img
                                            src={`https://images.unsplash.com/photo-${index === 0 ? '1514525253440-b393452e6193' : index === 1 ? '1598488035139-bdbb2231ce04' : index === 2 ? '1516280440614-6697288d5d38' : '1478720568477-152d9b164e63'}?q=80&w=1000&auto=format&fit=crop`}
                                            className="w-full h-full object-cover"
                                            alt={service.title}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
