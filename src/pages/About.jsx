import React from 'react';
import { Award, Users, Target, Heart } from 'lucide-react';

const About = () => {
    return (
        <div className="w-full pt-20">
            {/* Header */}
            <section className="bg-brand-black py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 z-0"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-white mb-6">About Mix<span className="text-brand-gold">Studio</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Where passion meets precision. We are a team of dedicated audio engineers and producers committed to bringing your musical vision to life.
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
                            <h2 className="text-3xl font-heading font-bold text-brand-white mb-6">Our <span className="text-brand-gold">Story</span></h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Founded in 2015, MixStudio began as a small project studio with a big dream: to provide major-label quality sound to independent artists. Over the years, we've grown into a full-service production house, working with artists from across the globe and spanning every genre imaginable.
                            </p>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                We believe that every artist deserves to be heard at their best. That's why we combine state-of-the-art analog gear with the latest digital technology to create a sound that is both classic and modern.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-4 bg-brand-gray/30 rounded-lg border border-white/5">
                                    <Target className="text-brand-gold mb-3" size={24} />
                                    <h3 className="font-bold text-white mb-2">Our Mission</h3>
                                    <p className="text-sm text-gray-500">To empower artists with professional sound that stands out in a crowded industry.</p>
                                </div>
                                <div className="p-4 bg-brand-gray/30 rounded-lg border border-white/5">
                                    <Heart className="text-brand-gold mb-3" size={24} />
                                    <h3 className="font-bold text-white mb-2">Our Passion</h3>
                                    <p className="text-sm text-gray-500">Music is more than just sound; it's emotion, and we treat every project with care.</p>
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
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-white mb-4">Meet the <span className="text-brand-gold">Team</span></h2>
                        <p className="text-gray-400">The ears behind your next hit.</p>
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
                                    <p className="text-gray-500 text-sm">10+ years of experience working with top chart artists.</p>
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
